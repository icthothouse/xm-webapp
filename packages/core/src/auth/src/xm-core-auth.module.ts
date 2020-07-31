import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injector, ModuleWithProviders, NgModule } from '@angular/core';
import { XmCoreConfig } from '@xm-ngx/core';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { AuthExpiredInterceptor } from './auth-expired.interceptor';
import { AuthInterceptor } from './auth.interceptor';

@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [],
})
export class XmCoreAuthModule {
    public static forRoot(): ModuleWithProviders<XmCoreAuthModule> {
        return {
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: AuthInterceptor,
                    multi: true,
                    deps: [
                        LocalStorageService,
                        SessionStorageService,
                        XmCoreConfig,
                    ],
                },
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: AuthExpiredInterceptor,
                    multi: true,
                    deps: [Injector],
                },
            ],
            ngModule: XmCoreAuthModule,
        };
    }
}
