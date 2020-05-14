import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { LanguageModule } from '@xm-ngx/components/language';
import { XmJsonSchemeFormModule } from '@xm-ngx/json-scheme-form';
import { XmTranslationModule } from '@xm-ngx/translation';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { AceEditorModule } from '../../../../src/app/shared/directives/ace-editor.directive';
import { FormPlaygroundComponent } from './form-playground.component';

@NgModule({
    imports: [
        MatFormFieldModule,
        MatSelectModule,
        XmTranslationModule,
        FormsModule,
        NgxMatSelectSearchModule,
        CommonModule,
        MatCardModule,
        LanguageModule,
        XmJsonSchemeFormModule,
        ReactiveFormsModule,
        AceEditorModule,
    ],
    exports: [FormPlaygroundComponent],
    declarations: [FormPlaygroundComponent],
    providers: [],
})
export class FormPlaygroundModule {
    public entry: Type<FormPlaygroundComponent> = FormPlaygroundComponent;
}
