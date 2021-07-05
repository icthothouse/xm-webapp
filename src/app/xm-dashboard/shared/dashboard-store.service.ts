import { Injectable } from '@angular/core';
import { RequestCache, RequestCacheFactoryService } from '@xm-ngx/core';
import * as _ from 'lodash';
import { MonoTypeOperatorFunction, Observable, of, throwError } from 'rxjs';
import { catchError, filter, map, pluck, shareReplay, switchMap, take } from 'rxjs/operators';
import { Dashboard, DashboardWithWidgets } from './dashboard.model';
import { DashboardService } from './dashboard.service';

@Injectable()
export class DashboardStore {

    private _dashboards: RequestCache<Dashboard[]>;
    private dashboardsWithWidgetsCache: { [id: number]: Observable<DashboardWithWidgets> } = {};

    constructor(private cacheFactoryService: RequestCacheFactoryService,
                private dashboardService: DashboardService) {
        this._dashboards = this.cacheFactoryService.create<Dashboard[]>({
            request: () => this.loadDashboards(),
            onlyWithUserSession: true,
        });
    }

    public dashboards$(): Observable<Dashboard[] | null> {
        return this._dashboards.get();
    }

    public getBySlug(slug: string): Observable<DashboardWithWidgets | null> {
        return this.dashboards$().pipe(
            map<Dashboard[] | null, Dashboard[]>((ds) => ds || []),
            map((ds) => ds.find((d) => (d.config && d.config.slug === slug))),
            this.getFromCacheOrLoad(),
        );
    }

    public forceReload(): void {
        this._dashboards.forceReload();
    }

    public getById(id: number): Observable<DashboardWithWidgets | null> {
        return this.dashboards$().pipe(
            map<Dashboard[] | null, Dashboard[]>((ds) => ds || []),
            map((ds) => ds.find((d) => (d.id === id))),
            this.getFromCacheOrLoad(),
        );
    }

    public getByIdOrSlug(idOrSlug: number | string): Observable<DashboardWithWidgets | null> {
        if (!idOrSlug) {
            return of(null);
        }
        return this.dashboards$().pipe(
            filter((data) => Boolean(data)),
            map((ds) => ds.find((d) => (d.id === Number(idOrSlug)) || (d.config && d.config.slug === idOrSlug))),
            this.getFromCacheOrLoad(),
        );
    }

    /** @deprecated use dashboards$ instead */
    public dashboards(): Promise<Dashboard[]> {
        return this.dashboards$().pipe(
            take(1),
            map((i) => _.cloneDeep(i)),
        ).toPromise();
    }

    public getDashboardByIdOrSlug(idOrSlug: number | string): Observable<DashboardWithWidgets> {
        return this.getByIdOrSlug(idOrSlug).pipe(
            take(1),
            map((i) => _.cloneDeep(i)),
        );
    }

    private getFromCacheOrLoad<T>(): MonoTypeOperatorFunction<DashboardWithWidgets | null> {
        return switchMap((d) => {
            if (d && d.id) {
                if (this.hasCache(d.id)) {
                    return this.getFromCache(d.id);
                }
                return this.getAndCache(d.id);
            } else {
                return of(d);
            }
        });
    }

    private hasCache(id: number): boolean {
        return Boolean(this.dashboardsWithWidgetsCache[id]);
    }

    private getFromCache(id: number): Observable<DashboardWithWidgets> {
        return this.dashboardsWithWidgetsCache[id];
    }

    private getAndCache(id: number): Observable<DashboardWithWidgets> {
        return this.dashboardsWithWidgetsCache[id] = this.dashboardService.find(id).pipe(
            map((i) => i.body),
            catchError((err) => {
                delete this.dashboardsWithWidgetsCache[id];
                return throwError(err);
            }),
            shareReplay(1),
        );
    }

    private loadDashboards(): Observable<Dashboard[]> {
        this.dashboardsWithWidgetsCache = {};
        return this.dashboardService.query().pipe(
            pluck('body'),
            catchError(() => []),
        );
    }
}
