import { TestBed } from '@angular/core/testing';
import { Dashboard, DashboardStore, XmDashboardDynamicRouteResolverGuard } from '@xm-ngx/dashboard';
import { MockDashboardStore } from '@xm-ngx/dashboard/testing';
import { dashboardRoutesFactory, RouteFactory } from './xm-dashboard-dynamic-route-resolver-guard.service';
import { Routes } from '@angular/router';

describe('XmDashboardDynamicRouteResolverGuard', () => {
    let guard: XmDashboardDynamicRouteResolverGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                XmDashboardDynamicRouteResolverGuard,
                { provide: DashboardStore, useValue: MockDashboardStore },
            ],
        });
        guard = TestBed.inject(XmDashboardDynamicRouteResolverGuard);
    });

    it('should be created', () => {
        void expect(guard).toBeTruthy();
    });

    describe('dashboardRoutesFactory', () => {

        const routeFactory: RouteFactory = (dashboard, slug: string) => ({
            path: slug,
            data: { dashboard },
        });
        const containerFactory: RouteFactory = (dashboard, slug: string) => ({
            path: slug,
            data: { dashboard },
            children: [routeFactory(dashboard, '')]
        });

        it('empty dashboards should be empty routes', () => {
            const dashboards: Dashboard[] = [];
            const expectedResult: Routes = [];

            const result = dashboardRoutesFactory(dashboards, containerFactory, routeFactory);
            void expect(result).toEqual(expectedResult);
        });

        it('dashboard slug "" should be routes with path ""', () => {
            const dashboards: Dashboard[] = [{ config: { slug: '' } }];
            const expectedResult: Routes = [{ path: '', data: { dashboard: dashboards[0] } }];

            const result = dashboardRoutesFactory(dashboards, containerFactory, routeFactory);
            void expect(result).toEqual(expectedResult);
        });

        it('dashboard slug "users" should be routes with path "users"', () => {
            const dashboards: Dashboard[] = [{ config: { slug: 'users' } }];
            const expectedResult: Routes = [{ path: 'users', data: { dashboard: dashboards[0] } }];

            const result = dashboardRoutesFactory(dashboards, containerFactory, routeFactory);
            void expect(result).toEqual(expectedResult);
        });

        it('dashboard slug "users" and "users/:id" and "users/:id/edit" should be routes with path "users" and children and "", ":id" as a parent for "/edit"', () => {
            const dashboards: Dashboard[] = [
                { config: { slug: 'users' } },
                { config: { slug: 'users/:id' } },
                { config: { slug: 'users/:id/edit' } }
            ];
            const expectedResult: Routes = [{
                path: 'users',
                data: { dashboard: dashboards[0] },
                children: [
                    { path: '', data: { dashboard: dashboards[0] }, },
                    {
                        path: ':id', data: { dashboard: dashboards[1] },
                        children: [
                            { path: '', data: { dashboard: dashboards[1] } },
                            { path: 'edit', data: { dashboard: dashboards[2] }, },
                        ]
                    }
                ]
            }];

            const result = dashboardRoutesFactory(dashboards, containerFactory, routeFactory);
            void expect(result).toEqual(expectedResult);
        });

        it('dashboard slug "users" and "users/:id" should be routes with path "users" and children ":id" and ""', () => {
            const dashboards: Dashboard[] = [
                { config: { slug: 'users' } },
                { config: { slug: 'users/:id' } }
            ];
            const expectedResult: Routes = [{
                path: 'users',
                data: { dashboard: dashboards[0] },
                children: [
                    { path: '', data: { dashboard: dashboards[0] }, },
                    { path: ':id', data: { dashboard: dashboards[1] }, }
                ]
            }];

            const result = dashboardRoutesFactory(dashboards, containerFactory, routeFactory);
            void expect(result).toEqual(expectedResult);
        });

        it('dashboard slug only "users/:id" should not create', () => {
            const dashboards: Dashboard[] = [
                { config: { slug: 'users/:id' } }
            ];
            const expectedResult: Routes = [];

            const result = dashboardRoutesFactory(dashboards, containerFactory, routeFactory);
            void expect(result).toEqual(expectedResult);
        });

    });
});
