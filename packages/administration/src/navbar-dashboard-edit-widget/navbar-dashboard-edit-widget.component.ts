import { Component, OnDestroy, OnInit } from '@angular/core';
import {
    DashboardEditorService,
    DASHBOARDS_TRANSLATES,
    DashboardsExportService,
    DashboardsImportService,
    DashboardsManagerService,
} from '@xm-ngx/administration/dashboards-config';
import { DashboardConfig } from '@xm-ngx/administration/dashboards-config/injectors';
import { XmEventManager } from '@xm-ngx/core';
import { Dashboard, DashboardStore, PageService } from '@xm-ngx/dashboard';
import { takeUntilOnDestroy, takeUntilOnDestroyDestroy } from '@xm-ngx/shared/operators';
import { skip, take } from 'rxjs/operators';

export const NAVBAR_EDIT_DASHBOARD_EVENT = 'NAVBAR_EDIT_DASHBOARD_EVENT';
export const NAVBAR_EDIT_WIDGET_EVENT = 'NAVBAR_EDIT_WIDGET_EVENT';

export const NAVBAR_DASHBOARD_EDIT_STORAGE_KEY = 'NAVBAR_DASHBOARD_EDIT_STORAGE_KEY';

export enum NavbarDashboardEditState {
    Open = 'OPEN',
    Close = 'CLOSE',
}

@Component({
    selector: 'xm-navbar-dashboard-edit-widget',
    template: `
        <button mat-icon-button
                *permitted="'DASHBOARD.CREATE'"
                [style.visibility]="page ? 'visible' : 'hidden'"
                [color]="isEditing ? 'primary' : undefined"
                [matTooltip]="TRS.editDashboard | translate" (click)="onEdit()">
            <mat-icon>edit</mat-icon>
        </button>
    `,
    providers: [
        DashboardEditorService,
        DashboardsExportService,
        DashboardsImportService,
        { provide: DashboardsManagerService, useValue: { setActiveWidget: () => null } },
    ],
})
export class NavbarDashboardEditWidgetComponent implements OnInit, OnDestroy {
    public TRS: typeof DASHBOARDS_TRANSLATES = DASHBOARDS_TRANSLATES;

    public page: Dashboard;
    public isEditing: boolean;

    constructor(
        protected readonly wrapperService: DashboardStore,
        protected readonly eventManager: XmEventManager,
        private pageService: PageService,
        protected readonly dashboardConfig: DashboardConfig,
        private editorService: DashboardEditorService,
    ) {
    }

    public ngOnInit(): void {
        this.pageService.active$().pipe(takeUntilOnDestroy(this)).subscribe((i) => {
            this.page = i as Dashboard;
            if (this.isEditing) {
                this.editorService.editDashboard(this.dashboardConfig.dashboardRef, this.page);
            } else if (sessionStorage.getItem(NAVBAR_DASHBOARD_EDIT_STORAGE_KEY) === NavbarDashboardEditState.Open) {
                this.onEdit();
            }
        });

        this.eventManager.listenTo(this.dashboardConfig.EDIT_DASHBOARD_EVENT)
            .pipe(takeUntilOnDestroy(this))
            .subscribe(({ id }) => this.updateView(id));

        this.eventManager.listenTo(this.dashboardConfig.EDIT_WIDGET_EVENT)
            .pipe(takeUntilOnDestroy(this))
            .subscribe(({ id }) => this.updateView(this.page.id));
    }

    public onEdit(): void {
        if (this.page && !this.isEditing) {
            this.isEditing = true;
            this.editorService.editDashboard(this.dashboardConfig.dashboardRef, this.page);
            sessionStorage.setItem(NAVBAR_DASHBOARD_EDIT_STORAGE_KEY, NavbarDashboardEditState.Open);
        } else {
            this.isEditing = false;
            sessionStorage.removeItem(NAVBAR_DASHBOARD_EDIT_STORAGE_KEY);
            this.editorService.close();
        }
    }

    public ngOnDestroy(): void {
        takeUntilOnDestroyDestroy(this);
    }

    private updateView(id: number): void {
        if (this.isEditing) {
            this.wrapperService.forceReload();
            this.wrapperService.dashboards$().pipe(skip(1), take(1)).subscribe(() => {
                this.pageService.load(String(id));
            });
        }
    }

}


