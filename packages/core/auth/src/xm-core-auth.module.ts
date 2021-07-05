import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injector, ModuleWithProviders, NgModule } from '@angular/core';
import { AuthRefreshTokenService } from './auth-refresh-token.service';
import { AuthInterceptor } from './auth.interceptor';
import { XmAuthenticationStoreService } from './xm-authentication-store.service';
import { XmAuthenticationService } from './xm-authentication.service';
import { XmAuthenticationRepository } from './xm-authentication-repository.service';
import { XmAuthenticationConfig } from './xm-authentication-config.service';

@NgModule()
export class XmCoreAuthModule {
    public static forRoot(): ModuleWithProviders<XmCoreAuthModule> {
        return {
            providers: [
                XmAuthenticationConfig,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: AuthInterceptor,
                    multi: true,
                    deps: [Injector],
                },
                AuthRefreshTokenService,
                XmAuthenticationRepository,
                XmAuthenticationService,
                XmAuthenticationStoreService,
            ],
            ngModule: XmCoreAuthModule,
        };
    }
}
