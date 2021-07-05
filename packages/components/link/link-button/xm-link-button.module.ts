import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XmLinkButtonComponent } from './xm-link-button.component';
import { MatButtonModule } from '@angular/material/button';
import { IfDashboardSlugModule } from '@xm-ngx/components/if-dashboard-slug';
import { XmPermissionModule } from '@xm-ngx/core/permission';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { XmTranslationModule } from '@xm-ngx/translation';


@NgModule({
    declarations: [
        XmLinkButtonComponent
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        IfDashboardSlugModule,
        XmPermissionModule,
        MatTooltipModule,
        RouterModule,
        MatIconModule,
        XmTranslationModule
    ]
})
export class XmLinkButtonModule {
    public entry: Type<XmLinkButtonComponent> = XmLinkButtonComponent;
}
