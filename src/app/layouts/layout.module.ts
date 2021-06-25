import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouteChangeAnimationModule } from '@xm-ngx/components/animations/route-change-animation';
import { FeedbackModule } from '@xm-ngx/components/feedback';
import { GuestBackgroundModule } from '@xm-ngx/components/guest-background/guest-background.module';
import { LanguageModule } from '@xm-ngx/components/language';
import { LoaderModule } from '@xm-ngx/components/loader';
import { RouteLoadingDirectiveModule } from '@xm-ngx/components/route-loading';
import { XmPasswordNeededModule } from '@xm-ngx/components/password-needed';
import { XmRibbonModule } from '@xm-ngx/components/ribbon';
import { XmDynamicModule } from '@xm-ngx/dynamic';
import { XmEntityModule } from '@xm-ngx/entity';
import { XmSharedModule } from '@xm-ngx/shared';
import { XmBalanceModule } from '@xm-ngx/xm-balance';
import { XmMaintenanceViewModule } from '@xm-ngx/components/maintenance';
import { XmSidebarRightModule } from '@xm-ngx/components/sidebar-right';
import { XmSidebarModule } from '../modules/xm-sidebar';
import { XmInputPatternModule } from '@xm-ngx/components/inputPattern';
import { XmTimelineModule } from '../xm-timeline/xm-timeline.module';
import { FooterComponent } from './footer/footer.component';
import { XmMainComponent } from './main/main.component';
import { XmNavbarModule } from './navbar/xm-navbar.module';
import { PageRibbonComponent } from './profiles/page-ribbon.component';

@NgModule({
    imports: [
        XmPasswordNeededModule,
        LanguageModule,
        LoaderModule,
        XmInputPatternModule,
        XmBalanceModule,
        XmMaintenanceViewModule,
        XmEntityModule,
        XmTimelineModule,
        RouterModule,
        XmSidebarModule,
        XmSidebarRightModule,
        XmRibbonModule,
        XmSharedModule,
        XmDynamicModule,
        FeedbackModule,
        XmNavbarModule,
        GuestBackgroundModule,
        RouteLoadingDirectiveModule,
        RouteChangeAnimationModule,
    ],
    exports: [XmMainComponent],
    declarations: [
        XmMainComponent,
        PageRibbonComponent,
        FooterComponent,
    ],
    providers: [],
})
export class LayoutModule {
}
