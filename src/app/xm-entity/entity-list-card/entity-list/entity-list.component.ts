import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { XmAlertService } from '@xm-ngx/alert';
import { TABLE_CONFIG_DEFAULT } from '@xm-ngx/components/table';
import { XmEventManager } from '@xm-ngx/core';
import { Spec, XmEntity, XmEntityService, XmEntitySpec, XmEntitySpecWrapperService } from '@xm-ngx/entity';
import {
    ActionOptions,
    EntityListCardOptions,
    EntityOptions,
    FieldOptions,
} from '@xm-ngx/entity/entity-list-card/entity-list-card-options.model';
import { FunctionCallDialogComponent } from '@xm-ngx/entity/function-call-dialog/function-call-dialog.component';
import { buildJsfAttributes, transpilingForIE } from '@xm-ngx/json-scheme-form';
import { takeUntilOnDestroy } from '@xm-ngx/shared/operators';
import { XmToasterService } from '@xm-ngx/toaster';
import { TranslatePipe } from '@xm-ngx/translation';
import { merge, Observable, of, Subscription } from 'rxjs';
import { catchError, delay, finalize, map, startWith, switchMap, tap } from 'rxjs/operators';
import { flattenEntityWithPath, getFieldValue } from 'src/app/shared/helpers/entity-list-helper';
import { ContextService } from '../../../shared';
import { saveFile } from '../../../shared/helpers/file-download-helper';
import { XM_EVENT_LIST } from '../../../xm.constants';

@Component({
    selector: 'xm-entity-list',
    templateUrl: './entity-list.component.html',
    styleUrls: ['./entity-list.component.scss'],
})
export class EntityListComponent implements OnInit, OnDestroy {

    @ViewChild(MatSort) public sort: MatSort;
    @ViewChild(MatPaginator) public paginator: MatPaginator;

    @Input() public options: EntityListCardOptions;
    @Input() public entitiesUiConfig: any[];
    @Input() public item: EntityOptions;
    @Input() public predicate: string;
    @Input() public reverse: boolean;
    @Input() public pageSize: number;
    @Input() public spec: Spec;

    public showLoader: boolean;
    public currentEntitiesUiConfig: any[];
    public isShowFilterArea: boolean;
    public totalItems: number;
    public itemsPerPageOptions: number[] = TABLE_CONFIG_DEFAULT.pageSizeOptions;
    public tableDataSource: MatTableDataSource<XmEntity>;

    private entityListActionSuccessSubscription: Subscription;
    private entityEntityListModificationSubscription: Subscription;


    constructor(public translate: TranslatePipe,
                private modalService: MatDialog,
                private translateService: TranslateService,
                private router: Router,
                private contextService: ContextService,
                private xmEntitySpecWrapperService: XmEntitySpecWrapperService,
                private toasterService: XmToasterService,
                private eventManager: XmEventManager,
                private xmEntityService: XmEntityService,
                private alertService: XmAlertService) {
    }

    public ngOnInit(): void {
        this.tableDataSource = this.createDataSource(this.item.entities);
        this.entityListActionSuccessSubscription = this.eventManager.listenTo(XM_EVENT_LIST.XM_FUNCTION_CALL_SUCCESS)
            .subscribe(() => {
                this.onRefresh();
            });
        this.entityEntityListModificationSubscription = this.eventManager.listenTo(XM_EVENT_LIST.XM_ENTITY_LIST_MODIFICATION)
            .subscribe(() => {
                this.onRefresh();
            });

        if (this.options) {
            this.isShowFilterArea = Boolean(this.options.isShowFilterArea);
        }

        if (this.item.filter) {
            this.item.filterJsfAttributes = buildJsfAttributes(this.item.filter.dataSpec, this.item.filter.dataForm);
        }

        if (this.item.fields) { // Workaround: server sorting doesn't work atm for nested "data" fields
            this.item.fields
                .filter((f) => f.field && f.field.startsWith('data.'))
                .map((f) => f.sortable = false);
        }
    }


    public ngAfterViewInit(): void {
        merge(this.sort.sortChange, this.paginator.page).pipe(
            startWith({}),
            delay(0),
            switchMap(() => {
                return this.loadEntitiesPaged(this.item);
            }),
            takeUntilOnDestroy(this),
        ).subscribe((list: Array<XmEntity>) => this.tableDataSource = new MatTableDataSource(list));

        this.sort.sortChange.pipe(takeUntilOnDestroy(this)).subscribe(() => this.paginator.pageIndex = 0);
    }

    public getFastSearches(entityOptions: EntityOptions): any {
        return entityOptions.fastSearch ? entityOptions.fastSearch.filter((s) => Boolean(s.name)) : null;
    }

    public ngOnDestroy(): void {
        takeUntilOnDestroy(this);
        this.entityListActionSuccessSubscription.unsubscribe();
        this.entityEntityListModificationSubscription.unsubscribe();
    }

    public getDefaultSearch(entityOptions: EntityOptions): string {
        if (!entityOptions.fastSearch) {
            return entityOptions.query;
        }
        let fastSearchWithoutName: any;
        if (this.isHideAll(entityOptions.typeKey)) {
            fastSearchWithoutName = entityOptions.fastSearch[0];
        } else {
            fastSearchWithoutName = entityOptions.fastSearch.filter((s) => !s.name).shift();
        }
        return !fastSearchWithoutName ? null : fastSearchWithoutName.query;
    }

    public onApplyFastSearch(entityOptions: EntityOptions, query: string): void {
        entityOptions.currentQuery = query;
        this.paginator.pageIndex = 0;
        this.loadEntitiesPaged(entityOptions).subscribe((result) => this.tableDataSource.data = result);
    }

    public isHideAll(typeKey: string): boolean {
        if (this.currentEntitiesUiConfig && this.currentEntitiesUiConfig.length) {
            const entityConfig = this.currentEntitiesUiConfig.find((e) => e && e.typeKey === typeKey) || {};
            return entityConfig && entityConfig.fastSearchHideAll;
        } else {
            return false;
        }
    }

    public onApplyFilter(entityOptions: EntityOptions, data: any): void {
        const copy = { ...entityOptions };
        let funcValue;
        try {
            funcValue = new Function(`return \`${entityOptions.filter.template}\`;`).call(data);
        } catch (e) {
            funcValue = transpilingForIE(entityOptions.filter.template, data);
        }
        copy.currentQuery = `${copy.currentQuery ? copy.currentQuery : ''} ${funcValue}`;
        entityOptions.currentQuery = copy.currentQuery;

        if (entityOptions.overrideCurrentQuery) {
            entityOptions.currentQuery = funcValue;
        }

        entityOptions.page = 0;
        this.loadEntitiesPaged(entityOptions).subscribe((resp) => this.tableDataSource.data = resp);
    }

    public getFieldValue(xmEntity: any = {}, field: FieldOptions): any {
        return getFieldValue(xmEntity, field);
    }

    public transition(): void {
        this.loadEntitiesPaged(this.item).subscribe((resp) => this.tableDataSource.data = resp);
    }

    public createDataSource(data: Array<XmEntity>): MatTableDataSource<XmEntity> {
        return new MatTableDataSource<XmEntity>(data);
    }

    public getColumnsToDisplay(fields: Array<FieldOptions>) {
        return ['avatarUrl', ...fields?.map(i => i.field), 'deleteButton'];
    }

    public onNavigate(entityOptions: EntityOptions, xmEntity: XmEntity): void {
        this.getRouterLink(entityOptions, xmEntity)
            .pipe(
                finalize(() => this.contextService.put('xmEntityId', xmEntity.id)),
            ).subscribe((commands) => this.router.navigate(commands));
    }

    public onAction(entityOptions: EntityOptions, xmEntity: XmEntity, action: ActionOptions): MatDialogRef<any> | null {
        if (action.handler) {
            action.handler(xmEntity);
            return null;
        }
        if (action.navigateByInnerUrl) {
            this.navigateByConfigUrl(action.navigateByInnerUrl, xmEntity);
            return null;
        }
        const modalRef = this.modalService.open(FunctionCallDialogComponent, { width: '500px' });
        this.translateService.get('xm-entity.entity-list-card.action-dialog.question', {
            action: this.translate.transform(action.name),
            name: xmEntity.name,
        }).subscribe((result) => {
            modalRef.componentInstance.dialogTitle = result;
        });
        modalRef.componentInstance.buttonTitle = action.name;
        modalRef.componentInstance.xmEntity = xmEntity;
        modalRef.componentInstance.functionSpec = entityOptions.xmEntitySpec.functions
            ? entityOptions.xmEntitySpec.functions
                .filter((f) => f.key === action.functionKey)
                .shift() : { key: action.functionKey };
        return modalRef;
    }

    public onFileExport(entityOptions: EntityOptions, exportType: string): void {
        this.showLoader = true;
        this.xmEntityService.fileExport(exportType, entityOptions.typeKey).pipe(
            // TODO: file name extract from the headers
            tap((resp: Blob) => saveFile(resp, `${entityOptions.typeKey}.` + exportType, 'text/csv')),
            finalize(() => this.showLoader = false),
        ).subscribe(
            () => {
                console.info(`Exported ${entityOptions.typeKey}`);
            },
            (err) => {
                console.info(err);
                this.showLoader = false;
            },
        );
    }

    public onRefresh(): void {
        this.filtersReset(this.item);
        this.getCurrentEntitiesConfig();
        this.paginator.pageIndex = 0;
        this.loadEntitiesPaged(this.item).subscribe((result) => {
            this.tableDataSource.data = result;
        });
    }

    public filtersReset(activeList: any): void {
        const filter = activeList.filter || null;
        if (filter) {
            activeList.filterJsfAttributes = buildJsfAttributes(filter.dataSpec, filter.dataForm);
            activeList.currentQuery = null;
            activeList.currentQuery = this.getDefaultSearch(activeList);
        }
    }

    public onRemove(xmEntity: XmEntity): void {
        this.alertService.open({
            title: 'xm-entity.entity-list-card.delete.title',
            showCancelButton: true,
            buttonsStyling: false,
            confirmButtonClass: 'btn mat-button btn-primary',
            cancelButtonClass: 'btn mat-button',
            confirmButtonText: 'xm-entity.entity-list-card.delete.button',
            cancelButtonText: this.translateService.instant('xm-entity.entity-list-card.delete.button-cancel'),
        }).subscribe((result) => {
            if (result.value) {
                this.xmEntityService.delete(xmEntity.id).subscribe(
                    () => {
                        this.eventManager.broadcast({
                            name: XM_EVENT_LIST.XM_ENTITY_LIST_MODIFICATION,
                        });
                        this.toasterService.success('xm-entity.entity-list-card.delete.remove-success');
                    },
                    () => this.toasterService.error('xm-entity.entity-list-card.delete.remove-error'),
                );
            }
        });
    }

    protected loadEntitiesPaged(entityOptions: EntityOptions): Observable<XmEntity[]> {
        this.showLoader = true;
        const options: any = {
            typeKey: this.item.typeKey,
            page: this.paginator.pageIndex,
            size: this.paginator.pageSize,
            sort: [`${this.sort.active},${this.sort.direction}`],
        };

        let method = 'query';
        if (entityOptions.currentQuery) {
            options.query = entityOptions.currentQuery;
            method = 'search';
        }

        return this.xmEntityService[method](options).pipe(
            tap((xmEntities: HttpResponse<XmEntity[]>) => {
                this.item.totalItems = xmEntities.headers.get('X-Total-Count');
            }),
            map((xmEntities: HttpResponse<XmEntity[]>) => xmEntities.body),
            map((xmEntities: XmEntity[]) => xmEntities.map(e => this.enrichEntity(e))),
            catchError((err) => {
                this.showLoader = false;
                return of([]);
            }),
            finalize(() => this.showLoader = false));
    }

    private getCurrentEntitiesConfig(): void {
        this.currentEntitiesUiConfig = [];
        if (this.entitiesUiConfig && this.entitiesUiConfig.length) {
            this.options.entities.forEach((entity) => {
                this.currentEntitiesUiConfig.push(
                    this.entitiesUiConfig.filter((e) => e.typeKey === entity.typeKey).shift());
            });
        }
    }

    private getRouterLink(entityOptions: EntityOptions, xmEntity: XmEntity): Observable<any[]> {
        if (entityOptions && entityOptions.routerLink) {
            const result = [];
            for (const l of entityOptions.routerLink) {
                if (l.startsWith('xmEntity')) {
                    result.push(xmEntity[l.split('.').pop()]);
                } else {
                    result.push(l);
                }
            }
            return of(result);
        }

        return this.getSpec(entityOptions, xmEntity).pipe(
            map((xmSpec) => this.processXmSpec(xmSpec, xmEntity)),
            catchError(() => []),
        );
    }

    private getSpec(entityOptions: EntityOptions, xmEntity: XmEntity): Observable<XmEntitySpec> {
        if (entityOptions && entityOptions.xmEntitySpec) {
            return of(entityOptions.xmEntitySpec);
        }

        if (xmEntity && xmEntity.hasOwnProperty('type')) {
            return of(xmEntity.type);
        }

        if (xmEntity && xmEntity.typeKey) {
            return this.xmEntitySpecWrapperService.xmSpecByKey(xmEntity.typeKey);
        }

        console.info(`No spec found by options=${entityOptions} or entity=${xmEntity}`); // Tslint:disable-line

        throw new Error('No spec found');
    }

    private processXmSpec(xmSpec: XmEntitySpec, xmEntity: XmEntity): any[] {
        if (!xmSpec) {
            return [''];
        }
        const form: string = xmSpec.dataForm || '{}';
        const entityConfig: any = JSON.parse(form).entity || {};

        return ['/application', xmEntity.typeKey, entityConfig.useKeyOnList ? xmEntity.key : xmEntity.id];
    }

    /**
     * Method is used to enrich XmEntity with spec details
     * @param entity - current entity
     */
    private enrichEntity(entity: XmEntity): XmEntity {
        entity.type = this.spec.types.filter((t) => t.key === entity.typeKey).shift();
        const states = entity.type.states;
        if (states && states.length && entity.stateKey) {
            entity.state = states.filter((s) => s.key === entity.stateKey).shift();
        }
        return entity;
    }

    private navigateByConfigUrl(configUrl: string, e: XmEntity): void {
        const fEntity = flattenEntityWithPath(e);
        const navUrl = configUrl && configUrl.split('?')[0];
        const strParams = configUrl && configUrl.split('?')[1];
        if (navUrl) {
            try {
                const params =
                    strParams && JSON.parse(
                        '{"' + decodeURI(strParams)
                            .replace(/"/g, '\\"')
                            .replace(/&/g, '","')
                            .replace(/=/g,'":"') + '"}');
                const queryParams = {};
                params && Object.keys(params).forEach(key => {
                    Object.assign(queryParams, {[key]: fEntity[params[key]]});
                })
                this.router.navigate([navUrl], {queryParams});
            } catch (e) {
                this.router.navigate([navUrl])
            }
        }
    }
}
