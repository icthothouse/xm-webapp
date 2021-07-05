import { Injectable } from '@angular/core';
import { Dashboard, DashboardWithWidgets } from '@xm-ngx/dashboard';
import { Observable, of } from 'rxjs';

@Injectable()
export class MockDashboardStore {

    public dashboards$(): Observable<Dashboard[] | null> {
        return of(null);
    }

    public getBySlug(): Observable<DashboardWithWidgets | null> {
        return of(null);
    }

    public forceReload(): void {
        // Mock empty
    }

    public getById(): Observable<DashboardWithWidgets | null> {
        return of(null);
    }

    public getByIdOrSlug(): Observable<DashboardWithWidgets | null> {
        return of(null);
    }

    /** @deprecated use dashboards$ instead */
    public dashboards(): Promise<Dashboard[]> {
        return Promise.resolve([]);
    }

    public getDashboardByIdOrSlug(): Observable<DashboardWithWidgets> {
        return of(null);
    }
}
