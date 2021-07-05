import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { LoaderModule } from '@xm-ngx/components/loader';
import { NoDataModule } from '@xm-ngx/components/no-data';
import { XmDynamicModule } from '@xm-ngx/dynamic';
import { XmSharedModule } from '@xm-ngx/shared';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PendingChangesGuard } from './pending-changes.guard';
import { DashboardStore } from './shared/dashboard-store.service';
import { DashboardService } from './shared/dashboard.service';
import { WidgetService } from './shared/widget.service';
import { XmDashboardRoutingModule } from './xm-dashboard-routing.module';

@NgModule({
    imports: [
        XmDynamicModule,
        CommonModule,
        XmSharedModule,
        XmDashboardRoutingModule,
        LoaderModule,
        NoDataModule,
    ],
    declarations: [DashboardComponent],
    exports: [],
    providers: [WidgetService, PendingChangesGuard],
})
export class XmDashboardModule {
    public static forRoot(): ModuleWithProviders<XmDashboardModule> {
        return {
            ngModule: XmDashboardModule,
            providers: [
                DashboardService,
                DashboardStore,
            ],
        };
    }
}
