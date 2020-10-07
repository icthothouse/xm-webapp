import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouteChangeAnimationModule } from '@xm-ngx/components/animations/route-change-animation';
import { FeedbackModule } from '@xm-ngx/components/feedback';
import { GuestBackgroundModule } from '@xm-ngx/components/guest-background/guest-background.module';
import { LanguageModule } from '@xm-ngx/components/language';
import { LoaderModule } from '@xm-ngx/components/loader';
import { RouteLoadingDirectiveModule } from '@xm-ngx/components/route-loading';
import { XmNotificationsModule } from '@xm-ngx/components/xm-notifications';
import { XmPasswordNeededModule } from '@xm-ngx/components/xm-password-needed';
import { XmRibbonModule } from '@xm-ngx/components/xm-ribbon';
import { XmDynamicModule } from '@xm-ngx/dynamic';
import { XmEntityModule } from '@xm-ngx/entity';
import { XmSharedModule } from '@xm-ngx/shared';
import { XmBalanceModule } from '@xm-ngx/xm-balance';
import { XmMaintenanceViewModule } from '@xm-ngx/components/maintenance';
import { XmSidebarRightModule } from '@xm-ngx/components/xm-sidebar-right';
import { XmSidebarModule } from '../modules/xm-sidebar';
import { InputModule } from '../shared/directives/input.module';
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
        InputModule,
        XmBalanceModule,
        XmMaintenanceViewModule,
        XmEntityModule,
        XmTimelineModule,
        XmNotificationsModule,
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
