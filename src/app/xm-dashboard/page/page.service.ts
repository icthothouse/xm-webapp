import { Injectable, OnDestroy } from '@angular/core';
import { XmLogger, XmLoggerService } from '@xm-ngx/logger';
import { Observable, ReplaySubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { DashboardStore } from '../shared/dashboard-store.service';
import { DashboardWidget } from '../shared/widget.model';

export interface Page<C = unknown, L = unknown> {
    id?: number;
    name?: string;
    owner?: string;
    typeKey?: string;
    layout?: L;
    config?: C;
    isPublic?: boolean;
    widgets?: DashboardWidget[];
}

@Injectable({
    providedIn: 'root',
})
export class PageService<T extends Page = Page> implements OnDestroy {

    private _active$: ReplaySubject<T | null> = new ReplaySubject(1);
    private logger: XmLogger;

    constructor(
        private dashboard: DashboardStore,
        protected loggerService: XmLoggerService,
    ) {
        this.logger = this.loggerService.create({ name: 'PageService' });
    }

    public active$(): Observable<T | null> {
        return this._active$.asObservable();
    }

    public load(idOrSlug: string | null): void {
        this.logger.debug(`Load dashboard idOrSlug="${idOrSlug}".`);
        this.loadPage(idOrSlug);
    }

    public ngOnDestroy(): void {
        this._active$.complete();
        delete this._active$;
    }

    private loadPage(idOrSlug: string | null): void {
        if (idOrSlug) {
            this.dashboard.getByIdOrSlug(idOrSlug)
                .pipe(take(1))
                .subscribe((i) => this._active$.next(i as T));
        } else {
            this._active$.next(null);
        }
    }

}
