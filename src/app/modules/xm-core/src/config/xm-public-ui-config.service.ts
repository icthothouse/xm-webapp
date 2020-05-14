import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestCache } from '../cache/request-cache';
import { RequestCacheFactoryService } from '../cache/request-cache-factory.service';
import { XmCoreConfig } from '../xm-core-config';
import { UIPublicConfig } from './xm-ui-config-model';

@Injectable({
    providedIn: 'root',
})
export class XmPublicUiConfigService<T = UIPublicConfig> implements OnDestroy {
    public readonly UI_PUBLIC_CONFIG_URL: string;

    private requestCache: RequestCache<T>;

    constructor(private httpClient: HttpClient,
                private cacheFactoryService: RequestCacheFactoryService,
                private xmCoreConfig: XmCoreConfig) {
        this.UI_PUBLIC_CONFIG_URL = this.xmCoreConfig.UI_PUBLIC_CONFIG_URL;
        this.requestCache = this.cacheFactoryService.create<T>({request: () => this.publicAPI()});
    }

    public config$(): Observable<T | null> {
        return this.requestCache.get();
    }

    public ngOnDestroy(): void {
        this.requestCache.ngOnDestroy();
    }

    private publicAPI(): Observable<T> {
        return this.httpClient.get<T>(this.UI_PUBLIC_CONFIG_URL);
    }

}
