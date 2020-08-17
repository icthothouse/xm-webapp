import { ComponentType } from '@angular/cdk/overlay';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { XmToasterService } from '@xm-ngx/toaster';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ITEMS_PER_PAGE } from '@xm-ngx/components/pagination';
import { JhiLanguageHelper } from '@xm-ngx/components/language';
import { Permission } from '../../../../src/app/shared/role/permission.model';
import { Role } from '../../../../src/app/shared/role/role.model';
import { RoleService } from '../../../../src/app/shared/role/role.service';
import { RoleConditionDialogComponent } from './roles-management-condition-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { takeUntilOnDestroy, takeUntilOnDestroyDestroy } from '@xm-ngx/shared/operators';
import { XM_PAGE_SIZE_OPTIONS } from '../../../../src/app/xm.constants';

@Component({
    selector: 'xm-role-mgmt-datail',
    templateUrl: './roles-management-detail.component.html',
    styles: [`
        :host .role-details-table ::ng-deep th {
            padding: 4px 10px;
            white-space: nowrap;
        }
    `]
})
export class RoleMgmtDetailComponent implements OnInit, OnDestroy {

    public role: Role;
    public permissions: Permission[];
    public permissionsSort: Permission[];
    public totalItems: number;
    public itemsPerPage: number = ITEMS_PER_PAGE;
    public predicate: string = 'privilegeKey';
    public reverse: boolean = true;
    public routeData: any;
    public forbids: string[] = ['', 'EXCEPTION', 'SKIP'];
    public permits: any[] = [
        {},
        {trans: 'permitted', value: true},
        {trans: 'notPermitted', value: false},
    ];
    public resourceConditions: any[] = [
        {},
        {trans: 'permitted', value: true},
        {trans: 'notPermitted', value: false},
    ];
    public showLoader: boolean;
    public sortBy: any = {};
    public hasEnv: boolean;
    public entities: string[];
    public checkAll: boolean;
    private routeParamsSubscription: Subscription;
    private routeDataSubscription: Subscription;


    public itemsPerPageOptions: number[] = XM_PAGE_SIZE_OPTIONS;
    public displayedColumns: string[];
    public dataSource: MatTableDataSource<Permission> =
        new MatTableDataSource<Permission>([]);
    @ViewChild(MatSort, {static: true}) public sort: MatSort;
    @ViewChild(MatPaginator, {static: true}) public paginator: MatPaginator;


    constructor(private jhiLanguageHelper: JhiLanguageHelper,
                private roleService: RoleService,
                private alertService: XmToasterService,
                private activatedRoute: ActivatedRoute,
                private modalService: MatDialog) {
        this.routeDataSubscription = this.activatedRoute.data
            .subscribe((data) => this.routeData = data);
    }

    public ngOnInit(): void {
        this.routeParamsSubscription = this.activatedRoute.params.subscribe((params) => {
            const roleKey = params.roleKey;
            if (roleKey) {
                this.routeData.pageSubSubTitle = roleKey;
                this.jhiLanguageHelper.updateTitle();

                this.buildColumns();
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.load(roleKey);
            }
        });
    }

    public buildColumns(): void {
        this.displayedColumns = [
            'privilegeKey',
            'permissionDescription',
            'msName',
            'permit',
            'onForbid',
            'resourceCondition',
            'envCondition',
        ];
    }

    public ngOnDestroy(): void {
        this.routeParamsSubscription.unsubscribe();
        this.routeDataSubscription.unsubscribe();
        takeUntilOnDestroyDestroy(this);
    }

    public load(roleKey: string): void {
        this.showLoader = true;
        this.roleService.getRole(roleKey)
            .pipe(
                takeUntilOnDestroy(this),
                finalize(() => this.showLoader = false)
            )
            .subscribe(
                (result: Role) => {
                    result.permissions = result.permissions || [];
                    this.role = result;
                    this.hasEnv = !!(result.env && result.env.length);
                    this.entities = this.getEntities(result.permissions);
                    this.totalItems = this.role.permissions.length;
                    this.dataSource.data = [...this.role.permissions];
                },
                (resp: Response) => this.onError(resp),
            );
    }

    public onChangeSort(): void {
        this.paginator.pageIndex = 0;
        const booleanCompare = (obj) => typeof obj === 'boolean';
        if (this.sortBy.msName || this.sortBy.query
            || booleanCompare(this.sortBy.enabled)
            || booleanCompare(this.sortBy.condition)) {
            this.dataSource.data = this.groupByItem(this.role.permissions);

        } else {
            this.dataSource.data = this.role.permissions;
        }
    }

    public onCheckAll(): void {
        this.dataSource.data.forEach((el) => el.enabled = this.checkAll);
    }

    public onEditResource(item: Permission): void {
        this.openDialog(RoleConditionDialogComponent, item, item.resourceCondition,
            item.resources, 'rolesManagement.permission.conditionResourceInfo')
            .afterClosed()
            .subscribe(
                (result) => {
                    item.resourceCondition = result || '';
                });
    }

    public onEditEnv(item: Permission): void {
        this.openDialog(RoleConditionDialogComponent, item, item.envCondition, this.role.env,
            'rolesManagement.permission.conditionEnvInfo').afterClosed().subscribe((result) => {
            item.envCondition = result || '';
        });
    }

    public onSave(): void {
        this.showLoader = true;
        this.role.updatedDate = new Date().toJSON();
        this.roleService
            .update(this.role)
            .pipe(
                finalize(() => this.showLoader = false),
                takeUntilOnDestroy(this),
            )
            .subscribe((resp: Response) => this.onError(resp),
                (err) => console.warn(err));
    }

    private getEntities(list: Permission[] = []): string[] {
        return list.reduce((result, item) => {
            if (!result.find((el) => el === item.msName)) {
                result.push(item.msName);
            }
            return result;
        }, ['']).sort();
    }

    private groupByItem(list: any): any {
        const sortBy = this.sortBy;
        return list.reduce((result: Permission[], item: Permission) => {
            const resourceCondition = typeof item.resourceCondition !== 'object';
            if (
                (sortBy.msName && item.msName !== sortBy.msName) ||
                (typeof sortBy.enabled === 'boolean' && item.enabled !== sortBy.enabled) ||
                (typeof sortBy.condition === 'boolean' && resourceCondition !== sortBy.condition) ||
                // eslint-disable-next-line @typescript-eslint/prefer-includes
                (sortBy.query && item.privilegeKey.indexOf(sortBy.query.toUpperCase()) === -1)
            ) {
                // empty block
            } else {
                result.push(item);
            }
            return result;
        }, []);
    }

    private onError(resp: any): void {
        try {
            const res = resp.json() || {};
            this.alertService.error(res.error_description, res.params);
        } catch (e) {
            // empty block
        }
    }

    private openDialog(
        component: ComponentType<RoleConditionDialogComponent>,
        perm: Permission,
        condition: string,
        variables: string[],
        transInfo: string,
    ): MatDialogRef<any> {
        const modalRef = this.modalService.open(component, {width: '500px'});
        modalRef.componentInstance.condition = condition;
        modalRef.componentInstance.variables = variables;
        modalRef.componentInstance.transInfo = transInfo;
        modalRef.componentInstance.permission = perm;
        return modalRef;
    }

}
