import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {XmCodeContainerModule, XmCodeModule} from '@xm-ngx/components/code';
import {XmDynamicControlExampleComponent} from './xm-dynamic-control-example.component';
import {XmDynamicModule} from '@xm-ngx/dynamic';
import {XmTextControlModule} from '@xm-ngx/components/text';
import {XmAceEditorControlModule} from '@xm-ngx/components/ace-editor';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [XmDynamicControlExampleComponent],
  exports: [XmDynamicControlExampleComponent],
    imports: [
        CommonModule,
        FormsModule,
        XmCodeModule,
        XmCodeContainerModule,
        ReactiveFormsModule,
        XmDynamicModule,
        XmTextControlModule,
        XmAceEditorControlModule,
        MatButtonModule,
    ],
})
export class XmDynamicControlExampleModule { }
