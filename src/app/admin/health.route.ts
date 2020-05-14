import { Route } from '@angular/router';
import { JhiHealthCheckComponent } from '@xm-ngx/administration/health';

export const healthRoute: Route = {
    path: 'health',
    component: JhiHealthCheckComponent,
    data: {
        privileges: {value: ['ROUTE.GET_LIST']},
        pageTitle: 'global.menu.admin.main',
        pageSubTitleTrans: 'global.menu.admin.health',
    },
};
