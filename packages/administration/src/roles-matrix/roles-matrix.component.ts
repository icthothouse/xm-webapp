import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TABLE_CONFIG_DEFAULT } from '@xm-ngx/components/table';
import { Principal } from '@xm-ngx/core/auth';
import { takeUntilOnDestroy, takeUntilOnDestroyDestroy } from '@xm-ngx/shared/operators';
import { XmToasterService } from '@xm-ngx/toaster';
import { JhiOrderByPipe } from 'ng-jhipster';
import { finalize } from 'rxjs/operators';
import { XmConfigService } from '../../../../src/app/shared';
import { RoleMatrix, RoleMatrixPermission } from '../../../../src/app/shared/role/role.model';
import { RoleService } from '../../../../src/app/shared/role/role.service';

export interface TableDisplayColumn {
    key: string,
    hidden: boolean,
}

@Component({
    selector: 'xm-roles-matrix',
    templateUrl: './roles-matrix.component.html',
    providers: [JhiOrderByPipe],
    styleUrls: ['./roles-matrix.component.scss'],
})
export class RolesMatrixComponent implements OnInit, OnDestroy {

    @ViewChild('table', { static: false }) public table: ElementRef;

    public options: {
        pageSizeOptions: number[],
        pageSize: number,
        sortDirection: 'asc' | 'desc',
        sortBy: string
    } = {
        pageSizeOptions: TABLE_CONFIG_DEFAULT.pageSizeOptions,
        pageSize: TABLE_CONFIG_DEFAULT.pageSize,
        sortDirection: 'desc',
        sortBy: 'privilegeKey',
    };

    public matrix: RoleMatrix;
    public totalItems: number;
    public showLoader: boolean;
    public sortBy: any = {};
    public entities: string[];
    public hiddenRoles: any[] = [];
    public hasChanges: boolean;
    public permittedFilter: any[] = [
        {},
        { trans: 'permitted', value: 'allset' },
        { trans: 'notPermitted', value: 'notset' },
        { trans: 'permittedAny', value: 'anyset' },
    ];
    public originalColumns: TableDisplayColumn[];

    public displayedColumns: string[];
    public dataSource: MatTableDataSource<RoleMatrixPermission> =
        new MatTableDataSource<RoleMatrixPermission>([]);
    public readOnlyMode: boolean;

    @ViewChild(MatSort, { static: true }) public sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) public paginator: MatPaginator;

    constructor(
        private principal: Principal,
        private roleService: RoleService,
        private alertService: XmToasterService,
        private orderByPipe: JhiOrderByPipe,
        private configService: XmConfigService,
    ) {
    }

    public ngOnInit(): void {
        this.principal.identity().then(() => {
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            this.load();
        });

        this.configService.getUiConfig().subscribe(result => {
            this.readOnlyMode = result.readOnlyConfig;
        });
    }

    public ngOnDestroy(): void {
        takeUntilOnDestroyDestroy(this);
    }

    public load(): void {
        this.showLoader = true;
        this.roleService.getMatrix()
            .pipe(takeUntilOnDestroy(this))
            .subscribe(
                (result: RoleMatrix) => {
                    if (result.roles && result.roles.length && result.permissions && result.permissions.length) {
                        result.permissions.forEach((item) => {
                            item.roles = item.roles || [];
                            item.roles = result.roles.map((el) => {
                                const value = item.roles.indexOf(el) !== -1;
                                item.data = { ...item.data, [el]: { checked: value, valueOrg: value } };
                                return { value, valueOrg: value };
                            });
                        });
                        result.permissions = this.orderByPipe.transform(result.permissions, this.options.sortBy, this.options.sortDirection === 'asc');
                    }
                    this.hiddenRoles = [];
                    this.matrix = { ...result };
                    this.originalColumns = [
                        { key: 'privilegeKey', hidden: false },
                        { key: 'permissionDescription', hidden: false },
                        { key: 'msName', hidden: false },
                        ...this.matrix.roles.map(r => ({
                            key: r,
                            hidden: false,
                        })),
                    ];
                    this.dataSource.data = [...this.matrix.permissions];
                    this.entities = this.getEntities(result.permissions);

                    this.buildColumns(this.originalColumns);
                },
                (resp) => this.onError(resp),
                () => this.showLoader = false,
            );
    }

    public getValue(p: RoleMatrixPermission): RoleMatrixPermission {
        return p;
    }

    public buildColumns(cols: TableDisplayColumn[]): void {
        this.displayedColumns = cols.filter(c => !c.hidden).map(c => c.key);
    }

    public onChangeSort(): void {
        this.paginator.pageIndex = 0;
        if (this.sortBy.msName || this.sortBy.query || this.sortBy.permitted_filter) {
            this.dataSource.data = this.groupByItem(this.matrix.permissions);
        } else {
            this.dataSource.data = this.matrix.permissions;
        }
    }

    public onHideRole(role: string, indx: number): void {
        this.hiddenRoles.push({ role, indx });
        this.originalColumns.map(c => {
            if (c.key === role) {
                c.hidden = true;
            }
        });
        this.buildColumns(this.originalColumns);
    }

    public onViewRole(item: { role: string, indx: number | string }): void {
        this.hiddenRoles = this.hiddenRoles.filter((el) => el.indx !== item.indx);
        this.originalColumns = this.originalColumns.map(c => {
            if (c.key === item.role) {
                c.hidden = false;
            }
            return c;
        });
        this.buildColumns(this.originalColumns);
    }

    public onCancel(): void {
        this.load();
        this.hasChanges = false;
    }

    public onSave(): void {
        this.showLoader = true;
        const permissions = this.dataSource.data;
        const matrix: RoleMatrix = { ...Object.assign({}, this.matrix), permissions };
        matrix.permissions = matrix.permissions.map((perm, index) => {
            const item = Object.assign({}, perm);
            const newRoles: string[] = [];
            Object.keys(item.data).forEach((key) => {
                if (item.data[key].checked === true) {
                    newRoles.push(key);
                }
            });
            item.roles = newRoles;
            delete item.data;
            return item;
        });

        this.roleService.updateMatrix(matrix)
            .pipe(
                finalize(() => this.showLoader = false),
                takeUntilOnDestroy(this),
            )
            .subscribe(
                () => {
                    this.matrix.permissions.forEach((item) => item.roles.forEach((el) => el.valueOrg = el.value));
                    this.hasChanges = false;
                },
                (resp: Response) => {
                    this.onError(resp);
                    this.showLoader = false;
                },
                () => this.showLoader = false,
            );
    }

    public onPermissionChanged(p: RoleMatrixPermission, role: string, e?: MatCheckboxChange | MatSlideToggleChange): void {
        p.data[role].checked = e.checked;
        this.hasChanges = true;
    }

    public onAllChanged(role?: string, e?: MatCheckboxChange | MatSlideToggleChange): void {
        this.dataSource.data = this.dataSource.data.map((p: RoleMatrixPermission) => {
            Object.keys(p.data).forEach(key => {
                if (key === role) {
                    p.data[key].checked = e.checked;
                }
            });
            return p;
        });
        this.hasChanges = true;
    }

    public isAllChecked(role: string): boolean {
        const totalByRole = this.matrix.permissions.length;
        const totalByRoleChecked = this.matrix.permissions
            .filter((p: RoleMatrixPermission) => p.data[role].checked).length;
        return totalByRole === totalByRoleChecked;
    }

    private getEntities(list: RoleMatrixPermission[] = []): string[] {
        return list.reduce((result, item) => {
            if (!result.find((el) => el === item.msName)) {
                result.push(item.msName);
            }
            return result;
        }, ['']).sort();
    }

    private groupByItem(list: any): any {
        const sortBy = this.sortBy;
        return list.reduce((result: RoleMatrixPermission[], item: RoleMatrixPermission) => {
            const clearItemsbyRoles = item.roles.filter((x, y) => {
                if (!this.hiddenRoles.some((i) => i.indx === y)) {
                    return x;
                }
            });
            const anySet = clearItemsbyRoles.some((x) => x.value);
            const allSet = clearItemsbyRoles.every((x) => x.value);
            if (
                (sortBy.msName && item.msName !== sortBy.msName) ||
                (sortBy.query && item.privilegeKey.indexOf(sortBy.query.toUpperCase()) === -1) ||
                (sortBy.permitted_filter === 'anyset' && anySet !== true) ||
                (sortBy.permitted_filter === 'notset' && anySet !== false) ||
                (sortBy.permitted_filter === 'allset' && allSet !== true)
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
            const res = resp.body || {};
            this.alertService.error(res.error_description, res.params);
        } catch (e) {
            // empty block
        }
    }
}
