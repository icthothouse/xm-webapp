import { Injectable } from '@angular/core';
import { CanLoad, LoadChildren, Route, Routes } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArgumentException } from '@xm-ngx/shared/exceptions';
import * as _ from 'lodash';
import { XmDynamicRouteResolverGuard } from '@xm-ngx/dynamic/route';
import { DashboardStore } from '../stores/dashboard-store.service';
import { Dashboard } from '../models/dashboard.model';
import { DashboardGuard } from '../guards/dashboard.guard';


function getRouteBySlug(routes: Routes, slug: string): Route | null {
    for (const route of routes) {
        if (route.path === slug) {
            return route;
        }
    }
    return null;
}

export type RouteFactory = (dashboard: Dashboard, slug: string) => Route;

export function dashboardRoutesFactory(
    dashboards: Dashboard[],
    containerFactory: RouteFactory,
    routeFactory: RouteFactory,
): Routes {
    const routes: Routes = [];
    dashboards = _.orderBy(dashboards, 'config.slug');

    _.forEach(dashboards, (dashboard) => {
        if (dashboard.config.slug === undefined || dashboard.config.slug === null) {
            console.warn(`Dashboard should have a config.slug, id=${dashboard.id}, name=${dashboard.name}.`);
            return;
        }

        let parentRoutes = routes;
        const slugs = _.split(dashboard.config.slug, '/');
        for (const slug of slugs) {
            const node = getRouteBySlug(parentRoutes, slug);

            if (node === null) {
                // check for a new child
                if (_.last(slugs) === slug) {

                    const child = _.find(dashboards, d => _.startsWith(d.config.slug, dashboard.config.slug) && d !== dashboard);
                    if (child !== null && child !== undefined) {
                        const route = containerFactory(dashboard, slug);
                        parentRoutes.push(route);
                    } else {
                        const route = routeFactory(dashboard, slug);
                        parentRoutes.push(route);
                    }

                } else {
                    console.warn(`Dashboard with the slug "${dashboard.config.slug}", must have a parent dashboard with the slug equals to "${slug}", id=${dashboard.config.slug}, name=${dashboard.name}.`);
                    return;
                }
            } else {
                if (_.last(slugs) !== slug) {
                    parentRoutes = node.children;
                } else {
                    console.warn(`Dashboard with the slug "${dashboard.config.slug}" exists already, id=${dashboard.id}, name=${dashboard.name}.`);
                    return;
                }
            }
        }
    });

    return routes;
}


@Injectable()
export class XmDashboardDynamicRouteResolverGuard extends XmDynamicRouteResolverGuard implements CanLoad {
    private routes: Routes | null = null;

    constructor(private dashboardStore: DashboardStore) {
        super();
    }

    public getRoutes(): Routes | null {
        return this.routes;
    }

    public canLoad(): Observable<boolean> {
        return this.dashboardStore.dashboards$().pipe(
            map((dashboards) => {
                if (dashboards === null) {
                    throw new ArgumentException('Dashboards should not be empty!');
                }
                this.routes = this.dashboardRoutesFactory(dashboards);

                // Add default empty page dashboard
                if (!_.find(this.routes, d => d.path === '')) {
                    // Redirect to first available
                    this.routes.unshift({ path: '', pathMatch: 'full', canActivate: [DashboardGuard], })
                }

                return true;
            })
        );
    }

    private dashboardLoadChildren: LoadChildren = () => import('@xm-ngx/dashboard').then(m => m.XmDashboardModule);

    private dashboardRoutesFactory(dashboards: Dashboard[]): Routes {
        const routeFactory: RouteFactory = (dashboard, slug: string) => {
            return {
                path: slug,
                data: {
                    title: dashboard.config?.name || dashboard.name,
                    dashboard,
                },
                loadChildren: this.dashboardLoadChildren,
            };
        }

        const containerFactory: RouteFactory = (dashboard, slug: string) => {
            return {
                path: slug,
                data: {
                    title: dashboard.config?.name || dashboard.name,
                    dashboard,
                },
                children: [
                    routeFactory(dashboard, '')
                ]
            };
        }

        return dashboardRoutesFactory(dashboards, containerFactory, routeFactory);
    }
}
