import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from '../shared';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        data: {
            privileges: {
                value: ['DASHBOARD.GET_LIST'],
            },
            pageTitle: 'global.menu.admin.dashboard',
        },
        canActivate: [UserRouteAccessService],
    },
    {
        path: ':id',
        component: DashboardComponent,
        data: {
            privileges: {
                value: ['DASHBOARD.GET_LIST.ITEM'],
            },
            pageTitle: 'global.menu.admin.dashboard',
        },
        canActivate: [UserRouteAccessService],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class XmDashboardRoutingModule {
}
