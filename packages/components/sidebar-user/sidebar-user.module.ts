import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { XmMenuModule } from '@xm-ngx/components/menu';
import { SidebarUserSubtitle } from './sidebar-user-subtitle';
import { SidebarUserComponent } from './sidebar-user.component';
import { XmPermissionModule } from '@xm-ngx/core/permission';
import { XmDynamicModule } from '@xm-ngx/dynamic';
import { XmTranslationModule } from '@xm-ngx/translation';

@NgModule({
    imports: [
        CommonModule,
        XmMenuModule,
        XmPermissionModule,
        XmTranslationModule,
        XmDynamicModule,
    ],
    exports: [SidebarUserComponent, SidebarUserSubtitle],
    declarations: [SidebarUserComponent, SidebarUserSubtitle],
})
export class XmSidebarUserModule {
    public entry: Type<SidebarUserComponent> = SidebarUserComponent;
}
