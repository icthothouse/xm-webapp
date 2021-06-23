import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { XmDynamicModule } from '@xm-ngx/dynamic';
import { XmSharedModule } from '../../../shared/shared.module';
import { PhoneNumberChoiceWidgetComponent } from '../phone-number-choice-widget/phone-number-choice-widget.component';

@NgModule({
    imports: [
        CommonModule,
        XmSharedModule,
        XmDynamicModule.forChild([{
            selector: 'phone-number-choice-widget',
            loadChildren: () => PhoneNumberChoiceWidgetComponent,
        }]),
    ],
    declarations: [
        PhoneNumberChoiceWidgetComponent,
    ],
})
export class ExtCommonCspModule {
}
