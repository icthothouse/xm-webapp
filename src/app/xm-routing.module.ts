import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRouteAccessService } from '@xm-ngx/core/auth';

const ROUTES: Routes = [
    {
        path: 'error',
        loadChildren: () => import('@xm-ngx/components/error').then((m) => m.ErrorModule),
        data: { authorities: [], pageTitle: 'error.title' },
    },
    {
        path: 'accessdenied',
        loadChildren: () => import('@xm-ngx/components/error').then((m) => m.ErrorModule),
        data: { authorities: [], pageTitle: 'error.title', error403: true },
    },
    { path: 'administration', loadChildren: () => import('./admin/admin.module').then((m) => m.XmAdminModule) },
    { path: '', loadChildren: () => import('./home/home.module').then((m) => m.GateHomeModule) },
    { path: '', loadChildren: () => import('./account/account.module').then((m) => m.GateAccountModule) },
    {
        path: 'application',
        loadChildren: () => import('./application').then((m) => m.ApplicationModule),
    },
    { path: 'search', pathMatch: 'full', redirectTo: 'application/search' },
    {
        path: 'dashboard',
        data: { privileges: { value: ['DASHBOARD.GET_LIST'], }, },
        canActivate: [UserRouteAccessService],
        canLoad: [UserRouteAccessService],
        loadChildren: () => import('@xm-ngx/dynamic/route').then((m) => m.XmDynamicRouteModule),
    },
    {
        path: 'public',
        loadChildren: () => import('./xm-public/xm-public.module').then((m) => m.XmPublicModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule],
})
export class XmRoutingModule {
}
