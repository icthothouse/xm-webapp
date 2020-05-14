import { Route } from '@angular/router';

import { LogsComponent } from '@xm-ngx/administration/logs';

export const logsRoute: Route = {
    path: 'logs',
    component: LogsComponent,
    data: {
        privileges: {value: ['']},
        pageTitle: 'global.menu.admin.main',
        pageSubTitleTrans: 'global.menu.admin.logs',
    },
};
