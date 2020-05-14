import { Route } from '@angular/router';
import { JhiMetricsMonitoringComponent } from '@xm-ngx/administration/metrics';

export const metricsRoute: Route = {
    path: 'metrics',
    component: JhiMetricsMonitoringComponent,
    data: {
        privileges: {value: ['ROUTE.GET_LIST']},
        pageTitle: 'global.menu.admin.main',
        pageSubTitleTrans: 'global.menu.admin.metrics',
    },
};
