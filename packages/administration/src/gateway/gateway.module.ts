import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { LoaderModule } from '@xm-ngx/components/loader';
import { NoDataModule } from '@xm-ngx/components/no-data';
import { XmPermissionModule } from '@xm-ngx/core/permission';
import { XmTranslationModule } from '@xm-ngx/translation';
import { NgJhipsterModule } from 'ng-jhipster';
import { JhiGatewayComponent } from './gateway.component';

@NgModule({
    imports: [
        LoaderModule,
        XmTranslationModule,
        NoDataModule,
        MatButtonModule,
        CommonModule,
        NgJhipsterModule,
        XmPermissionModule,
    ],
    exports: [JhiGatewayComponent],
    declarations: [JhiGatewayComponent],
    providers: [],
})
export class GatewayModule {
    public entry: Type<JhiGatewayComponent> = JhiGatewayComponent;
}
