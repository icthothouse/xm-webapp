import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { LanguageModule } from '@xm-ngx/components/language';
import { NavbarGuestBackgroundModule } from '@xm-ngx/components/navbar-guest-background/navbar-guest-background.module';
import { XmNotificationsModule } from '@xm-ngx/components/xm-notifications';
import { XmTranslationModule } from '@xm-ngx/translation';
import { XmDynamicModule } from '../../../../packages/xm-dynamic/src/xm-dynamic.module';
import { InputModule } from '../../shared/directives/input.module';
import { NavbarComponent } from './navbar.component';
import { XmNavbarArrowBackComponent } from './xm-navbar-arrow-back.component';
import { XmNavbarInputSearchComponent } from './xm-navbar-input-search.component';
import { XmNavbarLanguageMenuComponent } from './xm-navbar-language-menu.component';
import { XmNavbarLogoComponent } from './xm-navbar-logo.component';
import { XmNavbarTitleComponent } from './xm-navbar-title.component';
import { XmNavbarToggleComponent } from './xm-navbar-toggle.component';
import { MatFormFieldModule } from "@angular/material/form-field";

@NgModule({
    imports: [
        MatIconModule,
        MatButtonModule,
        RouterModule,
        CommonModule,
        InputModule,
        XmTranslationModule,
        XmDynamicModule,
        XmNotificationsModule,
        LanguageModule,
        MatMenuModule,
        NavbarGuestBackgroundModule,
        MatFormFieldModule,
    ],
    exports: [NavbarComponent],
    declarations: [
        NavbarComponent,
        XmNavbarArrowBackComponent,
        XmNavbarLanguageMenuComponent,
        XmNavbarInputSearchComponent,
        XmNavbarLogoComponent,
        XmNavbarTitleComponent,
        XmNavbarToggleComponent,
    ],
    providers: [],
})
export class XmNavbarModule {
}
