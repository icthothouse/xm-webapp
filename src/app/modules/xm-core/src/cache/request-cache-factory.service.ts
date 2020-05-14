import { Injectable } from '@angular/core';
import { takeUntilOnDestroy } from '@xm-ngx/shared/operators';
import { interval, Observable, of } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { XmSessionService } from '../xm-session.service';
import { RequestCache } from './request-cache';

interface RequestCacheFactoryParams<T> {
    request: () => Observable<T>;
    /**
     * If a user have a session the RequestCache will make a request to api
     * Otherwise it returns null
     */
    onlyWithUserSession?: boolean;
    reloadInterval?: number;
    requestTimeOut?: number;
}

@Injectable({providedIn: 'root'})
export class RequestCacheFactoryService {

    constructor(private sessionService: XmSessionService) {
    }

    public create<T>(params: RequestCacheFactoryParams<T>): RequestCache<T> {
        let storage: RequestCache<T> = new RequestCache<T>(params.request);
        storage = this.requestTimeOutHandle(storage, params);
        storage = this.reloadIntervalHandle(storage, params);
        storage = this.onlyWithUserSessionHandle(storage, params);
        return storage;
    }

    private onlyWithUserSessionHandle<T>(
        storage: RequestCache<T>,
        params: RequestCacheFactoryParams<T>,
    ): RequestCache<T> {
        const emptyRequest = (): Observable<null> => of(null);

        if (params.onlyWithUserSession) {
            const prevRequest = storage.request;

            storage.request = (): Observable<T> => this.sessionService.isActive().pipe(
                takeUntilOnDestroy(storage),
                switchMap((active) => active ? prevRequest() : emptyRequest()),
            );
        }

        return storage;
    }

    private requestTimeOutHandle<T>(
        storage: RequestCache<T>,
        params: RequestCacheFactoryParams<T>,
    ): RequestCache<T> {
        if (params.requestTimeOut) {
            const prevRequest = storage.request;
            storage.request = (): Observable<T> => prevRequest().pipe(takeUntil(interval(params.requestTimeOut)));
        }
        return storage;
    }

    private reloadIntervalHandle<T>(
        storage: RequestCache<T>,
        params: RequestCacheFactoryParams<T>,
    ): RequestCache<T> {
        if (params.reloadInterval) {
            interval(params.reloadInterval).pipe(takeUntilOnDestroy(storage)).subscribe(() => storage.forceReload());
        }
        return storage;
    }
}
