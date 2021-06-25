import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { TABLE_CONFIG_DEFAULT } from '@xm-ngx/components/table';
import { Spec, XmEntity, XmEntityService, XmEntitySpec, XmEntitySpecWrapperService } from '@xm-ngx/entity';
import * as _ from 'lodash';
import { Observable, of } from 'rxjs';
import { catchError, finalize, map, take, tap } from 'rxjs/operators';

import { ContextService, XmConfigService } from '../../shared';
import { getFieldValue } from '../../shared/helpers/entity-list-helper';
import { EntityListCardOptions, EntityOptions, FieldOptions } from './entity-list-card-options.model';


@Component({
    selector: 'xm-entity-list-card',
    templateUrl: './entity-list-card.component.html',
    styleUrls: ['./entity-list-card.component.scss'],
})
export class EntityListCardComponent implements OnInit, OnChanges {

    @Input() public spec: Spec;
    @Input() public options: EntityListCardOptions;
    @Input() public searchTemplateParams: any;

    public list: EntityOptions[];
    public activeItemId: number;
    public entitiesPerPage: any;
    public predicate: string;
    public reverse: boolean;
    public showLoader: boolean;
    public showPagination: boolean;
    private entitiesUiConfig: any[] = [];
    private currentEntitiesUiConfig: any[] = [];


    constructor(private xmEntitySpecWrapperService: XmEntitySpecWrapperService,
                private xmEntityService: XmEntityService,
                private xmConfigService: XmConfigService,
                private router: Router,
                private contextService: ContextService) {
        this.entitiesPerPage = TABLE_CONFIG_DEFAULT.pageSize;
        this.activeItemId = 0;
        this.predicate = 'id';
    }

    public ngOnInit(): void {
        this.getEntitiesUIConfig();
    }

    public isHideAll(typeKey: string): boolean {
        if (this.currentEntitiesUiConfig && this.currentEntitiesUiConfig.length) {
            const entityConfig = this.currentEntitiesUiConfig.find((e) => e && e.typeKey === typeKey) || {};
            return entityConfig && entityConfig.fastSearchHideAll;
        } else { return false; }
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.options && !_.isEqual(changes.options.previousValue, changes.options.currentValue)) {
            this.getCurrentEntitiesConfig();
            this.predicate = 'id';
            this.reverse = false;

            if (!this.spec) {
                this.loadSpec().pipe(take(1)).subscribe((spec: Spec) => {
                    this.spec = spec;
                    this.load();
                })
            } else {
                this.load();
            }
        }
    }

    public setActiveTab(i: number): void {
        this.activeItemId = i;
        const entityOptions = this.list[i];
        entityOptions.currentQuery = entityOptions.query;
        this.loadEntities(entityOptions).subscribe((result) => this.list[i].entities = result);
    }

    public getFieldValue(xmEntity: any = {}, field: FieldOptions): any {
        return getFieldValue(xmEntity, field);
    }

    public transition(): void {
        this.load();
    }

    public onNavigate(entityOptions: EntityOptions, xmEntity: XmEntity): void {
        this.getRouterLink(entityOptions, xmEntity)
            .pipe(
                finalize(() => this.contextService.put('xmEntityId', xmEntity.id)),
            ).subscribe((commands) => this.router.navigate(commands));
    }

    private getEntitiesUIConfig(): void {
        this.xmConfigService.getUiConfig().pipe(
            map((res) => res.applications || {}),
            map((app) => app.config || {}),
            map((conf) => conf.entities || []),
            tap((entities) => this.entitiesUiConfig = entities),
            tap(() => { this.getCurrentEntitiesConfig(); }),
        ).subscribe();
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

    private load(): void {
        // TODO: move processing of options.entities to onChange hook.
        //  Will options ever change after component initialization?
        if (this.options.entities) {
            this.list = this.options.entities.map((e: any) => {
                e.xmEntitySpec = this.spec.types.filter((t) => t.key === e.typeKey).shift();
                return e;
            });
            if (!this.list.length) {
                return;
            }

            if (!this.list[this.activeItemId]) {
                this.setActiveTab(0);
            } else {
                const activeItem = this.list[this.activeItemId];
                if (activeItem.query) {
                    activeItem.currentQuery = activeItem.query;
                }
            }
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

    private processXmSpec(xmSpec: XmEntitySpec, xmEntity: XmEntity): any[] {
        if (!xmSpec) {
            return [''];
        }
        const form: string = xmSpec.dataForm || '{}';
        const entityConfig: any = JSON.parse(form).entity || {};

        return ['/application', xmEntity.typeKey, entityConfig.useKeyOnList ? xmEntity.key : xmEntity.id];
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

        console.info(`No spec found by options=${entityOptions} or entity=${xmEntity}`);

        throw new Error('No spec found');
    }

    private loadEntities(entityOptions: EntityOptions): Observable<XmEntity[]> {
        this.showLoader = true;
        const {options, method}: any = this.getQueryOptions(entityOptions);

        return this.xmEntityService[method](options).pipe(
            tap((xmEntities: HttpResponse<XmEntity[]>) => {
                entityOptions.totalItems = xmEntities.headers.get('X-Total-Count');
                entityOptions.queryCount = entityOptions.totalItems;
                this.showPagination = (this.entitiesPerPage < entityOptions.totalItems);
            }),
            map((xmEntities: HttpResponse<XmEntity[]>) => xmEntities.body),
            map((xmEntities: XmEntity[]) => {
                return xmEntities.map((e) => this.enrichEntity(e));
            }),
            catchError((err) => {
                console.info(err);
                this.showLoader = false;
                return of([]);
            }),
            finalize(() => this.showLoader = false));
    }



    private getQueryOptions(entityOptions: EntityOptions): any {
        let options: any;
        let method = 'query';

        if (this.searchTemplateParams) {
            options = {
                'template': this.searchTemplateParams.templateName,
                'templateParams[page]': entityOptions.page - 1,
                'templateParams[size]': this.entitiesPerPage,
                'templateParams[sort]': [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')],
            };
            method = 'searchByTemplate';
        } else {
            options = {
                typeKey: entityOptions.typeKey,
                page: entityOptions.page - 1,
                size: this.entitiesPerPage,
                sort: [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')],
            };
            if (entityOptions.currentQuery) {
                options.query = entityOptions.currentQuery;
                method = 'search';
            }
        }
        return {options, method};
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

    private loadSpec(): Observable<Spec> {
        return this.xmEntitySpecWrapperService.entitySpec$()
            .pipe(
                take(1),
                map((specs: XmEntitySpec[]) => ({types: specs}))
            );
    }
}
