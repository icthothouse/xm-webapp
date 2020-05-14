import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
    {
        path: 'error',
        loadChildren: () => import('@xm-ngx/components/error').then((m) => m.ErrorModule),
        data: {authorities: [], pageTitle: 'error.title'},
    },
    {
        path: 'accessdenied',
        loadChildren: () => import('@xm-ngx/components/error').then((m) => m.ErrorModule),
        data: {authorities: [], pageTitle: 'error.title', error403: true},
    },
    {path: 'administration', loadChildren: () => import('./admin/admin.module').then((m) => m.XmAdminModule)},
    {path: '', loadChildren: () => import('./home/home.module').then((m) => m.GateHomeModule)},
    {path: '', loadChildren: () => import('./account/account.module').then((m) => m.GateAccountModule)},
    {
        path: 'application',
        loadChildren: () => import('./application/application.module').then((m) => m.ApplicationModule),
    },
    {path: 'search', pathMatch: 'full', redirectTo: 'application/search'},
    {
        path: 'dashboard',
        loadChildren: () => import('./xm-dashboard/xm-dashboard.module').then((m) => m.XmDashboardModule),
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(ROUTES),
    ],
    exports: [RouterModule],
})
export class XmRoutingModule {
}
