import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, UrlTree } from '@angular/router';
import { environment } from '@xm-ngx/core/environment';
import { XmLogger, XmLoggerService } from '@xm-ngx/logger';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { DashboardStore } from '../stores/dashboard-store.service';
import { DefaultDashboardService } from '../services/default-dashboard.service';

@Injectable({
    providedIn: 'root',
})
export class DashboardGuard implements CanActivate, CanActivateChild {

    private logger: XmLogger;

    constructor(
        private dashboardWrapperService: DashboardStore,
        private defaultDashboardService: DefaultDashboardService,
        loggerService: XmLoggerService,
        private router: Router,
    ) {
        this.logger = loggerService.create({ name: 'DashboardGuard' });
    }

    public canActivate(next: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
        return this.resolve(next.data?.dashboard?.id || null);
    }

    public canActivateChild(next: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
        return this.resolve(next.data?.dashboard?.id || null);
    }

    public resolve(idOrSlug: number | string | null): Observable<boolean | UrlTree> {
        return this.isDashboardAvailable(idOrSlug).pipe(
            switchMap((available) => {
                if (available) {
                    return of(available);
                } else if (idOrSlug) {
                    this.logger.warn(`The dashboard by the "${idOrSlug}" slag is not available. `
                        + 'A probable reason for this is an active user don\'t have the permission '
                        + 'or this dashboard do not exist.');
                }
                return this.getFirstAvailableDashboard();
            }));
    }

    private isDashboardAvailable(idOrSlug: number | string): Observable<boolean> {
        return this.dashboardWrapperService.getByIdOrSlug(idOrSlug).pipe(map(Boolean));
    }

    private getFirstAvailableDashboard(): Observable<UrlTree> {
        return this.defaultDashboardService.getDefaultOrFirstAvailable().pipe(
            map((d) => {
                const newUrl = d ? `/dashboard/${d.config?.slug || d.id}` : environment.notFoundUrl;
                this.logger.info(`Redirect router.url=${this.router.url}, newUrl=${newUrl}`);
                return this.router.parseUrl(newUrl);
            }),
        );
    }

}
