import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { XmCoreConfig } from '@xm-ngx/core';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from '../../../xm.constants';

const TOKEN_URL = 'uaa/oauth/token';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private localStorage: LocalStorageService,
                private sessionStorage: SessionStorageService,
                private coreConfig: XmCoreConfig) {
    }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // eslint-disable-next-line @typescript-eslint/prefer-string-starts-ends-with
        if (!request || !request.url || ((/^http/).test(request.url)
            && !(SERVER_API_URL && request.url.startsWith(SERVER_API_URL)))) {
            return next.handle(request);
        }

        if ((TOKEN_URL === request.url) || (this.coreConfig.UI_PUBLIC_CONFIG_URL === request.url)) {
            return next.handle(request);
        }

        const token = this.localStorage.retrieve('authenticationToken')
            || this.sessionStorage.retrieve('authenticationToken');
        const noAuthHeader = !request.headers.get('Authorization');
        if (!!token && noAuthHeader) {
            request = request.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + token,
                },
            });
        }
        return next.handle(request);
    }

}
