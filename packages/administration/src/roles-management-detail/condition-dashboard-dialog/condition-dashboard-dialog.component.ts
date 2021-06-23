import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { XmTextControlOptions, XmTextViewOptions } from '@xm-ngx/components/text';
import { Dashboard, DashboardWrapperService } from '@xm-ngx/dashboard';
import { takeUntilOnDestroy, takeUntilOnDestroyDestroy } from '@xm-ngx/shared/operators';
import { Translate } from '@xm-ngx/translation';
import { Permission } from '../../../../../src/app/shared/role/permission.model';

interface ConditionDashboardDialogConfig {
    privilegeKeyField: XmTextViewOptions,
    roleField: XmTextViewOptions,
    searchControl: XmTextControlOptions,
    slideControl: Translate,
    declineButton: Translate,
    approveButton: Translate
}

const DEFAULT_CONFIG: ConditionDashboardDialogConfig = {
    privilegeKeyField: {
        title: 'rolesManagement.permission.privilegeKey',
        dataQa: 'privilege-key-field'
    },
    roleField: {
        title: 'rolesManagement.detail.title',
        dataQa: 'role-field'
    },
    searchControl: {
        title: 'entity.search',
        dataQa: 'search-control',
        required: false,
    },
    slideControl: '',
    declineButton: 'global.common.cancel',
    approveButton: 'rolesManagement.ok',
};

@Component({
    selector: 'xm-condition-dashboard-detail',
    templateUrl: './condition-dashboard-dialog.component.html'
})
export class ConditionDashboardDialogComponent implements OnInit, OnDestroy {
    public get permission(): Permission {
        return this._permission;
    }

    public set permission(value: Permission) {
        this._permission = value;
    }

    public condition: string;
    private _permission: Permission;
    public dataSource: Dashboard[];
    public initialSelection = [];
    public allowMultiSelect = true;
    public selection = new SelectionModel<Dashboard>(this.allowMultiSelect, this.initialSelection);
    public searchControl: FormControl = new FormControl();
    public activeControl: FormControl = new FormControl(false);
    public columns: string[] = ['typeKey', 'select'];
    private dashboards: Dashboard[];
    public defaultConfig = DEFAULT_CONFIG;

    constructor(
        public activeModal: MatDialogRef<ConditionDashboardDialogComponent>,
        private dashboardWrapperService: DashboardWrapperService,
    ) {
    }

    public ngOnInit(): void {
        this.getAllowedDashboards();
        this.initControls();
    }

    public ngOnDestroy(): void {
        takeUntilOnDestroyDestroy(this);
    }

    public onCancel(): void {
        this.activeModal.close(false);
    }

    public onSave(): void {
        this.activeModal.close(ConditionDashboardDialogComponent.transformToSPELL(this.selection.selected));
    }

    private getAllowedDashboards() {
        this.dashboardWrapperService.dashboards$().subscribe((dashboards) => {
            this.dashboards = dashboards;
            this.dataSource = dashboards;
            if (this.condition) {
                const alreadySelected = dashboards.filter(dashboard => this.condition.includes(dashboard.typeKey));
                this.selection.select(...alreadySelected);
            }

        });
    }

    private initControls(): void {
        this.searchControl.valueChanges
            .pipe(takeUntilOnDestroy(this))
            .subscribe((value: string) => this.dataSource = this.dashboards.filter(dashboard => dashboard.typeKey.toUpperCase().includes(value.toUpperCase())));

        this.activeControl.valueChanges
            .pipe(takeUntilOnDestroy(this))
            .subscribe((value: boolean) => this.dataSource = this.dashboards.filter(dashboard => value ? this.selection.isSelected(dashboard) : true));
    }

    /** Whether the number of selected elements matches the total number of rows. */
    public isAllSelected(): boolean {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.length;
        return numSelected == numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    public masterToggle(): void {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.forEach(row => this.selection.select(row));
    }

    private static transformToSPELL(selectedData: Dashboard[]): string {
        const typeKeys = selectedData.map(dashboard => dashboard.typeKey);
        return typeKeys.map(key => `#returnObject.typeKey == '${key}'`).join(' || ');
    }
}
