import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ConditionModule} from '@xm-ngx/components/condition';
import {XmDynamicModule} from '@xm-ngx/dynamic';
import {FormLayoutComponent} from './form-layout.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [FormLayoutComponent],
    exports: [FormLayoutComponent],
    imports: [
        CommonModule,
        XmDynamicModule,
        ConditionModule,
        ReactiveFormsModule,
    ],
})
export class FormLayoutModule {
}
