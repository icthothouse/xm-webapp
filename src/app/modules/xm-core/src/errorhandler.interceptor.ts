import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { XmEventManagerService as XmEventManager } from './xm-event-manager.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

    constructor(private eventManager: XmEventManager) {
    }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(tap({
            error: (err: any) => {
                if (err instanceof HttpErrorResponse
                    && !(err.status === 401
                        && (err.message === '' || (err.url && err.url.includes('/api/account'))))) {
                    this.eventManager.broadcast({name: 'xm.httpError', content: err, request});
                }
            },
        }));
    }
}
