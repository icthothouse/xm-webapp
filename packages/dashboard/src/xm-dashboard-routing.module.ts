import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PendingChangesGuard } from './guards/pending-changes.guard';
import { UserRouteAccessService } from '@xm-ngx/core/auth';
import { DashboardGuard } from './guards/dashboard.guard';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        data: {
            privileges: {
                value: ['DASHBOARD.GET_LIST.ITEM'],
            },
        },
        canDeactivate: [PendingChangesGuard],
        canActivate: [UserRouteAccessService, DashboardGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class XmDashboardRoutingModule {
}
