import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XmPoweredBy } from './xm-powered-by.component';
import { XmTranslationModule } from '@xm-ngx/translation';


@NgModule({
    declarations: [
        XmPoweredBy,
    ],
    imports: [
        CommonModule,
        XmTranslationModule,
    ],
    exports: [
        XmPoweredBy
    ]
})
export class XmPoweredByModule {
}
