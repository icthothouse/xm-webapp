import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoaderModule } from '@xm-ngx/components/loader';
import { XmPasswordNeededModule } from '@xm-ngx/components/xm-password-needed';
import { XmSharedModule } from '@xm-ngx/shared';
import { XmTranslationModule } from '@xm-ngx/translation';
import { JhiConfigService, NgJhipsterModule } from 'ng-jhipster';
import { XmMaintenanceViewModule } from './components/maintenance/xm-maintenance-view.module';
import { NoDataModule } from '@xm-ngx/components/no-data';
import { PerPageModule } from '@xm-ngx/components/xm-per-page';
import { AceEditorModule } from './directives/ace-editor.directive';
import { InputModule } from './directives/input.module';
import { WordAutocompleteModule } from './directives/word-autocomplete.directive';
import { LanguageModule } from './language/language.module';

@NgModule({
    imports: [
        LoaderModule,
        AceEditorModule,
        WordAutocompleteModule,
        PerPageModule,
        InputModule,
        NoDataModule,
        LanguageModule,
        XmPasswordNeededModule,
        XmMaintenanceViewModule,
        XmSharedModule,
        NgbModule,
        NgJhipsterModule,
        XmTranslationModule.forChild(),
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
    ],
    providers: [
        {
            provide: JhiConfigService,
            useValue: new JhiConfigService({defaultI18nLang: 'en', i18nEnabled: true}),
        },
    ],
    exports: [
        AceEditorModule,
        WordAutocompleteModule,
        LoaderModule,
        PerPageModule,
        InputModule,
        NoDataModule,
        LanguageModule,
        XmPasswordNeededModule,
        XmMaintenanceViewModule,
        XmSharedModule,
        NgbModule,
        NgJhipsterModule,
        XmTranslationModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
    ],
})
export class GateSharedLibsModule {
}
