import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { XmTranslationModule } from '@xm-ngx/translation';
import { JhiAlertErrorComponent } from './toaster/alert-error.component';
import { XmAlertComponent } from './toaster/xm-alert';
import { XM_ALERT_CONFIG_PROVIDER } from './xm-alert-config.service';

import { XmAlertService } from './xm-alert.service';

@NgModule({
    declarations: [
        XmAlertComponent,
        JhiAlertErrorComponent,
    ],
    exports: [
        JhiAlertErrorComponent,
    ],
    imports: [
        CommonModule,
        XmTranslationModule,
    ],
    providers: [],
})
export class XmAlertModule {
    public static forRoot(): ModuleWithProviders<XmAlertModule> {
        return {
            ngModule: XmAlertModule,
            providers: [XmAlertService, XM_ALERT_CONFIG_PROVIDER],
        };
    }
}
