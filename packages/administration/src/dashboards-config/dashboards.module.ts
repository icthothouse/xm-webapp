import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EDIT_DASHBOARD_EVENT } from '@xm-ngx/administration/dashboards-config/const';
import { LoaderModule } from '@xm-ngx/components/loader';
import { AceEditorControlModule } from '@xm-ngx/components/xm-ace-editor-control';
import { XmBoolViewModule } from '@xm-ngx/components/xm-bool-view';
import { XmTextControlModule } from '@xm-ngx/components/xm-text-control';
import { XmSharedModule } from '@xm-ngx/shared';
import { XmTranslationModule } from '@xm-ngx/translation';

import { DashboardEditComponent } from './dashboard-edit/dashboard-edit.component';
import { DashboardsConfigComponent } from './dashboards-config.component';
import { DashboardsListExpandComponent } from './dashboards-list/dashboards-list-expand/dashboards-list-expand.component';
import { DashboardsListComponent } from './dashboards-list/dashboards-list.component';

import { DashboardCollection, DashboardConfig, WidgetCollection } from './injectors';
import { EDIT_WIDGET_EVENT, WidgetEditComponent } from './widget-edit/widget-edit.component';

@NgModule({
    imports: [
        XmTranslationModule,
        CommonModule,
        XmSharedModule,
        LoaderModule,
        XmBoolViewModule,
        AceEditorControlModule,
        XmTextControlModule,
        RouterModule,
    ],
    exports: [
        DashboardsConfigComponent,
        DashboardEditComponent,
        WidgetEditComponent,
    ],
    declarations: [
        DashboardsConfigComponent,
        WidgetEditComponent,
        DashboardEditComponent,
        DashboardsListComponent,
        DashboardsListExpandComponent,

    ],
    entryComponents: [
        DashboardsConfigComponent,
        DashboardEditComponent,
        WidgetEditComponent,
    ],
    providers: [
        DashboardCollection,
        WidgetCollection,
        {
            provide: DashboardConfig,
            useValue: {
                dashboardRef: DashboardEditComponent,
                widgetRef: WidgetEditComponent,
                EDIT_DASHBOARD_EVENT: EDIT_DASHBOARD_EVENT,
                EDIT_WIDGET_EVENT: EDIT_WIDGET_EVENT,
            },
        },
    ],
})
export class DashboardsModule {
    public entry: Type<DashboardsConfigComponent> = DashboardsConfigComponent;
}
