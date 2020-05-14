import { Route } from '@angular/router';

import { AuditsComponent } from '@xm-ngx/administration/audits';

export const auditsRoute: Route = {
    path: 'audits',
    component: AuditsComponent,
    data: {
        privileges: {value: ['']},
        pageTitle: 'global.menu.admin.main',
        pageSubTitleTrans: 'global.menu.admin.audits',
    },
};
