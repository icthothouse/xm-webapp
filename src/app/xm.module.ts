import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { JhiEventManager } from 'ng-jhipster';
import { MarkdownModule } from 'ngx-markdown';
import { LocalStorageService, NgxWebstorageModule, SessionStorageService } from 'ngx-webstorage';
import { PaginationConfig } from './blocks/config/uib-pagination.config';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { ProfileService, XmMainComponent } from './layouts';
import { LayoutModule } from './layouts/layout.module';
import { HttpLoaderFactory, XmTranslationModule } from './modules/xm-translation/xm-translation.module';
import { UserRouteAccessService } from './shared';
import { XmApplicationConfigService } from './shared/spec/xm-config.service';
import { XmDashboardModule } from './xm-dashboard/xm-dashboard.module';
import { XmRoutingModule } from './xm-routing.module';
import {XmCoreModule} from '@xm-ngx/core';

export function appInitializerFn(appConfig: XmApplicationConfigService): () => Promise<any> {
    // tslint:disable-next-line
    const r = function (): Promise<void> {
        return appConfig.loadAppConfig();
    };
    return r;
}

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        XmRoutingModule,
        XmCoreModule.forRoot(),
        NgxWebstorageModule.forRoot({prefix: 'jhi', separator: '-'}),
        TranslateModule.forRoot({
            isolate: false,
            loader: { deps: [HttpClient], provide: TranslateLoader, useFactory: HttpLoaderFactory },
        }),
        XmTranslationModule.forRoot(),
        XmDashboardModule.forRoot(),
        MarkdownModule.forRoot(),
        LayoutModule,
    ],
    providers: [
        XmApplicationConfigService,
        {
            provide: APP_INITIALIZER,
            useFactory: appInitializerFn,
            multi: true,
            deps: [XmApplicationConfigService],
        },
        ProfileService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
            deps: [
                LocalStorageService,
                SessionStorageService,
            ],
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true,
            deps: [
                Injector,
            ],
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
            deps: [JhiEventManager],
        },
        PaginationConfig,
        UserRouteAccessService,
    ],
    bootstrap: [XmMainComponent],
})
export class XmModule {
}
