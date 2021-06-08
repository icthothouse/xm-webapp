import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { XmTextControlModule } from '@xm-ngx/components/text';
import { XmValidatorProcessingExampleComponent } from './xm-validator-processing-example.component';


@NgModule({
    declarations: [XmValidatorProcessingExampleComponent],
    exports: [XmValidatorProcessingExampleComponent],
    imports: [
        ReactiveFormsModule,
        XmTextControlModule,
        MatFormFieldModule,
        CommonModule,
        MatInputModule,
    ],
})
export class XmValidatorProcessingExampleModule {
}
