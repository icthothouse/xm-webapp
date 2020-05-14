import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XmDynamicModule } from '@xm-ngx/dynamic';
import { XmSharedModule } from '@xm-ngx/shared';
import { HomeComponent } from './';
import { HOME_ROUTE } from './home.route';

@NgModule({
    imports: [
        XmSharedModule,
        RouterModule.forChild([HOME_ROUTE]),
        XmDynamicModule,
    ],
    declarations: [
        HomeComponent,
    ],
    providers: [],
})
export class GateHomeModule {
}
