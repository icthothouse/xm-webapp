import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import { RouterModule } from '@angular/router';

import { XmDynamicRouteProviderModule } from './xm-dynamic-route-provider.module';
import { XmDynamicRouteResolverGuard } from './xm-dynamic-route-resolver-guard.service';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                canLoad: [XmDynamicRouteResolverGuard],
                loadChildren: () => Promise.resolve(XmDynamicRouteProviderModule),
            }
        ])
    ],
    exports: [RouterModule],
})
export class XmDynamicRouteModule {
    public static forRoot(config: { routeResolverGuard: Type<XmDynamicRouteResolverGuard> }): ModuleWithProviders<XmDynamicRouteModule> {
        return {
            ngModule: XmDynamicRouteModule,
            providers: [{ provide: XmDynamicRouteResolverGuard, useClass: config.routeResolverGuard }],
        };
    }

}
