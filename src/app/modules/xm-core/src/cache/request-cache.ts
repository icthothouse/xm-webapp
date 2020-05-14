import { OnDestroy } from '@angular/core';
import { takeUntilOnDestroyDestroy } from '@xm-ngx/shared/operators';
import { of, ReplaySubject, Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';

export interface IRequestCache<T> extends OnDestroy {

    get(): Observable<T | null>;

    forceReload(): void;

    ngOnDestroy(): void;

    clear(): void;
}

export class RequestCache<T> implements IRequestCache<T> {

    private _cache$: ReplaySubject<T | null>;
    private _subscription: Subscription;

    constructor(public request: () => Observable<T> = (): Observable<null> => of(null)) {
    }

    public get(): Observable<T | null> {
        if (!this._cache$) {
            this.initialize();
            this.updateData();
        }
        return this._cache$.asObservable();
    }

    public ngOnDestroy(): void {
        if (this._cache$) {
            this._cache$.complete();
        }
        takeUntilOnDestroyDestroy(this);
    }

    public setAndReload(request: () => Observable<T>): void {
        this.request = request;
        this.forceReload();
    }

    public forceReload(): void {
        if (!this._cache$) {
            this.initialize();
        }
        this.updateData();
    }

    public clear(): void {
        if (!this._cache$) {
            return;
        }

        this._cache$.next(null);
    }

    public next(value: T): void {
        if (!this._cache$) {
            this._cache$ = new ReplaySubject<T>(1);
        }

        this._cache$.next(value);
    }

    private initialize(): void {
        this._cache$ = new ReplaySubject<T>(1);
    }

    private updateData(): void {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }

        this._subscription = this.request().subscribe({
            next: this._cache$.next.bind(this._cache$),
            error: this._cache$.error.bind(this._cache$),
        });
    }
}
