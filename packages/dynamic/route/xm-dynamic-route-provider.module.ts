import { NgModule } from '@angular/core';
import { Routes, ROUTES } from '@angular/router';
import { ArgumentException } from '@xm-ngx/shared/exceptions';
import { XmDynamicRouteResolverGuard } from './xm-dynamic-route-resolver-guard.service';

function dynamicRoutesFactory(route: XmDynamicRouteResolverGuard): Routes {
    if (!route) {
        throw new ArgumentException('XmDynamicRouteResolverGuard must be provided!')
    }
    if (!route.getRoutes) {
        throw new ArgumentException('The getRoutes() method at XmDynamicRouteResolverGuard must not be null!');
    }
    return route.getRoutes();
}

@NgModule({
    providers: [
        {
            provide: ROUTES,
            multi: true,
            useFactory: dynamicRoutesFactory,
            deps: [XmDynamicRouteResolverGuard]
        },
    ],
})
export class XmDynamicRouteProviderModule {
}


