import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LanguageModule } from '@xm-ngx/components/language';
import { MarkdownModule } from 'ngx-markdown';

import { XmUserLoginWidgetModule } from '../../../packages/account/src/user-login-widget/xm-user-login-widget.module';
import { XmUserSecuritySettingsModule } from '../../../packages/account/src/user-security-settings/xm-user-security-settings.module';
import { XmUserSettingsWidgetModule } from '../../../packages/account/src/user-settings-widget/xm-user-settings-widget.module';

import { XmSharedModule } from '../shared/shared.module';
import { accountState } from './account.route';
import { ActivateComponent } from './activate/activate.component';
import { Activate } from './activate/activate.service';
import { HelpComponent } from './help/help.component';
import { LogoutComponent } from './logout/logout.component';
import { PasswordResetFinishComponent } from './password-reset/finish/password-reset-finish.component';
import { PasswordResetFinish } from './password-reset/finish/password-reset-finish.service';
import { PasswordResetInitComponent } from './password-reset/init/password-reset-init.component';
import { PasswordResetInit } from './password-reset/init/password-reset-init.service';
import { PasswordModule } from './password/password.module';
import { PasswordSettingsComponent } from './password-settings/password-settings.component';
import { IdpCallbackComponent } from './idp-callback/idp-callback.component';
import { LoginErrorComponent } from './login-error/login-error.component';
import { Password } from './password/password.service';
import { SettingsComponent } from './settings/settings.component';
import { SignUpComponent } from './sign-up/sign-up.component';


@NgModule({
    imports: [
        PasswordModule,
        XmSharedModule,
        RouterModule.forChild(accountState),
        LanguageModule,
        XmUserSettingsWidgetModule,
        XmUserSecuritySettingsModule,
        XmUserLoginWidgetModule,
        MarkdownModule,
    ],
    declarations: [
        ActivateComponent,
        SignUpComponent,
        PasswordResetInitComponent,
        PasswordResetFinishComponent,
        SettingsComponent,
        LogoutComponent,
        HelpComponent,
        PasswordSettingsComponent,
        IdpCallbackComponent,
        LoginErrorComponent,
    ],
    providers: [
        Activate,
        Password,
        PasswordResetInit,
        PasswordResetFinish,
    ],
})
export class GateAccountModule {
}
