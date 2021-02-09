import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ControlErrorModule } from '@xm-ngx/components/control-error';
import { IControlFn } from '@xm-ngx/dynamic';
import { XmTranslationModule } from '@xm-ngx/translation';

import { XmPasswordControl } from './xm-password-control';
import { XmPasswordControlOptions } from './xm-password-control-options';

@NgModule({
    imports: [
        MatFormFieldModule,
        ControlErrorModule,
        MatInputModule,
        ReactiveFormsModule,
        XmTranslationModule,
        MatIconModule,
    ],
    exports: [XmPasswordControl],
    declarations: [XmPasswordControl],
})
export class XmPasswordControlModule {
    public entry: IControlFn<string, XmPasswordControlOptions> = XmPasswordControl;
}
