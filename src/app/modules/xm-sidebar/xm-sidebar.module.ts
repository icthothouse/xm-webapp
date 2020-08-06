import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XmLogoModule } from '@xm-ngx/components/logo';
import { XmMenuModule } from '@xm-ngx/components/menu';
import { XmPoweredByModule } from '@xm-ngx/components/xm-powered-by';
import { XmSidebarUserModule } from '@xm-ngx/components/sidebar-user';
import { XmUiConfigService } from '@xm-ngx/core';

import { XmSharedModule } from '../../shared/shared.module';

import { SidebarComponent } from './sidebar.component';

export const SIDEBAR_KEY = 'xm-widget-sidebar';

@NgModule({
    declarations: [
        SidebarComponent,
    ],
    imports: [
        XmSharedModule,
        RouterModule,
        CommonModule,
        XmLogoModule,
        XmSidebarUserModule,
        XmMenuModule,
        XmPoweredByModule,
    ],
    providers: [
        {provide: SIDEBAR_KEY, useValue: SidebarComponent},
        XmUiConfigService,
    ],
    exports: [SidebarComponent],
})
export class XmSidebarModule {}
