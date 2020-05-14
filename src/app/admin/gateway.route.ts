import { Route } from '@angular/router';

import { JhiGatewayComponent } from '@xm-ngx/administration/gateway';

export const gatewayRoute: Route = {
    path: 'gateway',
    component: JhiGatewayComponent,
    data: {
        privileges: {value: ['ROUTE.GET_LIST']},
        pageTitle: 'global.menu.admin.main',
        pageSubTitleTrans: 'global.menu.admin.gateway',
    },
};
