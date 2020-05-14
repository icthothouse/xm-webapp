import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { XmPermissionService } from '@xm-ngx/core/permission';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { RequestCache } from '../cache/request-cache';
import { RequestCacheFactoryService } from '../cache/request-cache-factory.service';
import { XmCoreConfig } from '../xm-core-config';
import { UIPrivateConfig } from './xm-ui-config-model';

@Injectable({
    providedIn: 'root',
})
export class XmPrivateUiConfigService<T = UIPrivateConfig> implements OnDestroy {
    public readonly UI_PRIVATE_CONFIG_URL: string;
    public readonly UI_PRIVATE_CONFIG_PERMISSION: string;

    private requestCache: RequestCache<T>;

    constructor(private httpClient: HttpClient,
                private cacheFactoryService: RequestCacheFactoryService,
                private permissionService: XmPermissionService,
                private xmCoreConfig: XmCoreConfig) {
        this.UI_PRIVATE_CONFIG_URL = this.xmCoreConfig.UI_PRIVATE_CONFIG_URL;
        this.UI_PRIVATE_CONFIG_PERMISSION = this.xmCoreConfig.UI_PRIVATE_CONFIG_PERMISSION;
        this.requestCache = this.cacheFactoryService.create<T>({
            request: () => this.resolveConfigAPI(),
            onlyWithUserSession: true,
        });
    }

    public config$(): Observable<T | null> {
        return this.requestCache.get();
    }

    public ngOnDestroy(): void {
        this.requestCache.ngOnDestroy();
    }

    private resolveConfigAPI(): Observable<T> {
        return this.permissionService.hasPrivilege(this.UI_PRIVATE_CONFIG_PERMISSION).pipe(
            take(1),
            switchMap((allow) => {
                if (allow) {
                    return this.privateAPI();
                } else {
                    return of(null);
                }
            }),
        );
    }

    private privateAPI(): Observable<T> {
        return this.httpClient.get<T>(this.UI_PRIVATE_CONFIG_URL);
    }

}
