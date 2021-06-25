import { NgModule, Type } from '@angular/core';
import { XmTranslationModule } from '@xm-ngx/translation';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { XmNavbarSearchWidget } from './xm-navbar-search-widget.component';
import { XmPermissionModule } from '@xm-ngx/core/permission';
import { XmInputPatternModule } from '@xm-ngx/components/inputPattern';

@NgModule({
    exports: [XmNavbarSearchWidget],
    declarations: [XmNavbarSearchWidget],
    imports: [
        XmTranslationModule,
        CommonModule,
        XmInputPatternModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        XmPermissionModule
    ]
})
export class XmNavbarSearchWidgetModule {
    public entry: Type<XmNavbarSearchWidget> = XmNavbarSearchWidget;
}
