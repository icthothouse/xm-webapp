import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { XmDynamicModule } from '@xm-ngx/dynamic';
import { XmSharedModule } from '../../../shared/shared.module';
import { XmBalanceModule } from '@xm-ngx/xm-balance';
import { XmEntityModule } from '@xm-ngx/entity/xm-entity.module';
import { XmTimelineModule } from '../../../xm-timeline/xm-timeline.module';
import { AvailableOfferingsWidgetComponent } from '../available-offerings-widget/available-offerings-widget.component';
import { ChartistLineWidgetComponent } from '../chartist-line-widget/chartist-line-widget.component';
import { CustomerInfoWidgetComponent } from '../customer-info-widget/customer-info-widget.component';
import { EntityFabActionsComponent } from '../entity-fab-actions/entity-fab-actions.component';
import { EntityListWidgetComponent } from '../entity-list-widget/entity-list-widget.component';
import { EntityWidgetComponent } from '../entity-widget/entity-widget.component';
import { LocationCountriesWidgetComponent } from '../location-countries-widget/location-countries-widget.component';
import { MdTableComponent } from '../location-countries-widget/md-table.component';
import { LocationMapWidgetComponent } from '../location-map-widget/location-map-widget.component';
import { StatsWidgetComponent } from '../stats-widget/stats-widget.component';
import { TasksWidgetComponent } from '../tasks-widget/tasks-widget.component';

@NgModule({
    imports: [
        CommonModule,
        XmSharedModule,
        XmEntityModule,
        XmBalanceModule,
        XmTimelineModule,
        XmDynamicModule.forChild([
            {selector: 'xm-widget-available-offerings', loadChildren: () => AvailableOfferingsWidgetComponent},
            {selector: 'xm-widget-chartist-line', loadChildren: () => ChartistLineWidgetComponent},
            {selector: 'xm-widget-provide-customer-info', loadChildren: () => CustomerInfoWidgetComponent},
            {selector: 'xm-widget-entity-fab-actions', loadChildren: () => EntityFabActionsComponent},
            {selector: 'xm-widget-entities-list', loadChildren: () => EntityListWidgetComponent},
            {selector: 'xm-widget-entity', loadChildren: () => EntityWidgetComponent},
            {selector: 'xm-widget-general-map', loadChildren: () => LocationMapWidgetComponent},
            {selector: 'xm-widget-general-countries', loadChildren: () => LocationCountriesWidgetComponent},
            {selector: 'xm-widget-stats', loadChildren: () => StatsWidgetComponent},
            {selector: 'xm-widget-tasks', loadChildren: () => TasksWidgetComponent},
        ]),
    ],
    declarations: [
        AvailableOfferingsWidgetComponent,
        ChartistLineWidgetComponent,
        CustomerInfoWidgetComponent,
        EntityFabActionsComponent,
        EntityListWidgetComponent,
        EntityWidgetComponent,
        LocationCountriesWidgetComponent,
        LocationMapWidgetComponent,
        MdTableComponent,
        StatsWidgetComponent,
        TasksWidgetComponent,
    ],
    providers: [],
})
export class ExtCommonEntityModule {
}
