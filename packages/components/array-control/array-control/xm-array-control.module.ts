import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ControlErrorModule } from '@xm-ngx/components/control-error';
import { DynamicModule } from '@xm-ngx/dynamic';
import { XmTranslationModule } from '@xm-ngx/translation';
import { XmArrayControlComponent } from './xm-array-control.component';


@NgModule({
    declarations: [XmArrayControlComponent],
    exports: [XmArrayControlComponent],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatChipsModule,
        MatIconModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        ControlErrorModule,
        XmTranslationModule,
    ],
})
export class XmArrayControlModule implements DynamicModule {
    public entry: Type<XmArrayControlComponent> = XmArrayControlComponent;
}
