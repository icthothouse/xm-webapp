import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { CovalentTextEditorModule } from '@covalent/text-editor';
import { XmJsonSchemaFormModule } from '@xm-ngx/json-schema-form/core';
import { ReCaptchaModule } from 'angular2-recaptcha';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { MarkdownModule } from 'ngx-markdown';
import { XmUserLoginWidgetModule } from '../../../packages/xm-account/src/xm-user-login-widget/xm-user-login-widget.module';

import { MatModule } from '../mat.module';
import {
    AccountService,
    AuthServerProvider,
    AuthService,
    ClientService,
    ContextService,
    CSRFService,
    FocusDirective,
    HasAnyAuthorityDirective,
    InputPreventPasteDirective,
    LoginComponent,
    LoginService,
    ParseByPathService,
    PrivilegeService,
    RegisterComponent,
    RegisterService,
    StateStorageService,
    UserLoginService,
    UserService,
    XmConfigService,
    XmConfirmDialogComponent,
    XmGMapApiInitDirective,
    IdpComponent,
} from './';
import { PrivacyAndTermsDialogComponent } from './components/privacy-and-terms-dialog/privacy-and-terms-dialog.component';
import { DigitOnlyDirective } from './directives/digit-only.directive';
import { SafeNamePipe } from './helpers/safe-name.pipe';
import { XmCondition } from './helpers/xm-condition';
import { XmDateTimePipe } from './helpers/xm-date-time.pipe';
import { XmEntityIconPipe } from './helpers/xm-entity-icon.pipe';
import { XmEntityStateSpecPipe } from './helpers/xm-entity-state-spec.pipe';
import { CurrentLocationComponent } from './jsf-extention/widgets/current-location/current-location.component';
import { DatetimePickerComponent } from './jsf-extention/widgets/datetime-picker/datetime-picker.component';
import { DatePickerComponent } from './jsf-extention/widgets/date-picker/date-picker.component';
import { DatetimeUtcComponent } from './jsf-extention/widgets/datetime-utc/datetime-utc.component';
import { EmailMatcherComponent } from './jsf-extention/widgets/email-matcher/email-matcher.component';
import { ExtAutocompleteService } from './jsf-extention/widgets/ext-autocomplete/ext-autocomplete-service';
import { ExtAutocompleteComponent } from './jsf-extention/widgets/ext-autocomplete/ext-autocomplete.component';
import { ExtMdEditorComponent } from './jsf-extention/widgets/ext-md-editor/ext-md-editor.component';
import { ExtMultiSelectComponent } from './jsf-extention/widgets/ext-multi-select/ext-multi-select.component';
import { ExtQuerySelectComponent } from './jsf-extention/widgets/ext-query-select/ext-query-select.component';
import { ExtSelectService } from './jsf-extention/widgets/ext-select/ext-select-service';
import { ExtSelectComponent } from './jsf-extention/widgets/ext-select/ext-select.component';
import { ExtTextareaComponent } from './jsf-extention/widgets/ext-textarea/ext-textarea.component';
import { ContentTextareaComponent } from './jsf-extention/widgets/content-textarea/content-textarea.component';
import { LinkFieldComponent } from './jsf-extention/widgets/link-field/link-field.component';
import { FileUploadComponent } from './jsf-extention/widgets/file-upload/file-upload.component';
import { ContentUploaderComponent } from './jsf-extention/widgets/content-uploader/content-uploader.component';
import { MultilingualInputComponent } from './jsf-extention/widgets/multilingual-input/multilingual-input.component';
import { TextSectionComponent } from './jsf-extention/widgets/text-section/text-section.component';
import { ValidationComponent } from './jsf-extention/widgets/validation-component/validation-component.component';
import { PasswordStrengthBarComponent } from './password-strength-bar/password-strength-bar.component';
import { RoleService } from './role/role.service';
import { GateSharedLibsModule } from './shared-libs.module';
import { ModalCloseModule } from '@xm-ngx/components/modal-close';

const PIPES = [XmEntityIconPipe];

@NgModule({
    imports: [
        XmJsonSchemaFormModule,
        XmUserLoginWidgetModule,
        GateSharedLibsModule,
        ReCaptchaModule,
        MarkdownModule.forChild(),
        MatModule,
        CovalentTextEditorModule,
        OwlDateTimeModule,
        GooglePlaceModule,
        OwlNativeDateTimeModule,
        ModalCloseModule,
    ],
    declarations: [
        LoginComponent,
        RegisterComponent,
        HasAnyAuthorityDirective,
        SafeNamePipe,
        XmCondition,
        XmEntityStateSpecPipe,
        XmDateTimePipe,
        FocusDirective,
        InputPreventPasteDirective,
        DigitOnlyDirective,
        XmGMapApiInitDirective,
        PasswordStrengthBarComponent,
        XmConfirmDialogComponent,
        CurrentLocationComponent,
        ExtSelectComponent,
        ValidationComponent,
        ExtAutocompleteComponent,
        ExtMultiSelectComponent,
        ExtQuerySelectComponent,
        ExtTextareaComponent,
        ContentTextareaComponent,
        LinkFieldComponent,
        ExtMdEditorComponent,
        MultilingualInputComponent,
        DatetimeUtcComponent,
        DatetimePickerComponent,
        DatePickerComponent,
        EmailMatcherComponent,
        TextSectionComponent,
        FileUploadComponent,
        ContentUploaderComponent,
        PrivacyAndTermsDialogComponent,
        IdpComponent,
        PIPES,
    ],
    providers: [
        ContextService,
        LoginService,
        RegisterService,
        AccountService,
        StateStorageService,
        CSRFService,
        AuthServerProvider,
        AuthService,
        UserService,
        ClientService,
        ExtSelectService,
        ExtAutocompleteService,
        UserLoginService,
        DatePipe,
        SafeNamePipe,
        XmCondition,
        XmDateTimePipe,
        RoleService,
        PrivilegeService,
        ParseByPathService,
        PasswordStrengthBarComponent,
        XmConfigService,
        PIPES,
    ],
    exports: [
        GateSharedLibsModule,
        LoginComponent,
        RegisterComponent,
        HasAnyAuthorityDirective,
        DatePipe,
        SafeNamePipe,
        XmCondition,
        XmEntityStateSpecPipe,
        XmDateTimePipe,
        FocusDirective,
        InputPreventPasteDirective,
        DigitOnlyDirective,
        XmGMapApiInitDirective,
        PasswordStrengthBarComponent,
        XmConfirmDialogComponent,
        CurrentLocationComponent,
        ExtSelectComponent,
        ExtAutocompleteComponent,
        ExtMultiSelectComponent,
        ExtQuerySelectComponent,
        ValidationComponent,
        ExtTextareaComponent,
        ContentTextareaComponent,
        LinkFieldComponent,
        ExtMdEditorComponent,
        MultilingualInputComponent,
        MatModule,
        DatetimeUtcComponent,
        DatetimePickerComponent,
        DatePickerComponent,
        EmailMatcherComponent,
        TextSectionComponent,
        FileUploadComponent,
        ContentUploaderComponent,
        GooglePlaceModule,
        IdpComponent,
        PIPES,
        XmUserLoginWidgetModule,
        XmJsonSchemaFormModule,
    ],

})
export class XmSharedModule {
}
