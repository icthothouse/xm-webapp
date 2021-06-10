import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarUserWidgetComponent } from './navbar-user-widget.component';
import { XmPermissionModule } from '@xm-ngx/core/permission';
import { XmSidebarUserModule } from '@xm-ngx/components/sidebar-user';
import { XmMenuModule } from '@xm-ngx/components/menu';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { XmTranslationModule } from '@xm-ngx/translation';


@NgModule({
    declarations: [NavbarUserWidgetComponent],
    exports: [NavbarUserWidgetComponent],
    imports: [
        CommonModule,
        XmPermissionModule,
        XmSidebarUserModule,
        XmMenuModule,
        MatMenuModule,
        MatIconModule,
        RouterModule,
        XmTranslationModule,
    ]
})
export class NavbarUserWidgetModule {
    public entry: Type<NavbarUserWidgetComponent> = NavbarUserWidgetComponent;
}
