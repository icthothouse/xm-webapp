import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XmBalanceModule } from '@xm-ngx/xm-balance';
import { TagInputModule } from 'ngx-chips';

import { RatingModule } from '@xm-ngx/components/xm-rating';
import { XmSharedModule } from '../shared/shared.module';
import { XmDynamicModule } from '@xm-ngx/dynamic';
import { XmEntityModule } from '../xm-entity/xm-entity.module';
import { ApplicationComponent } from './application.component';
import { ApplicationResolvePagingParams, applicationRoute } from './application.route';
import { EntityDetailComponent } from './entity-detail.component';

@NgModule({
    imports: [
        XmSharedModule,
        RouterModule.forChild(applicationRoute),
        TagInputModule,
        RatingModule,
        XmEntityModule,
        XmBalanceModule,
        XmDynamicModule,
    ],
    declarations: [
        ApplicationComponent,
        EntityDetailComponent,
    ],
    providers: [
        ApplicationResolvePagingParams,
    ],
})
export class ApplicationModule {
}
