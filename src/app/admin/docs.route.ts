import { Route } from '@angular/router';

import { JhiDocsComponent } from '@xm-ngx/administration/docs';

export const docsRoute: Route = {
    path: 'docs',
    component: JhiDocsComponent,
    data: {
        privileges: {value: ['ROUTE.GET_LIST']},
        pageTitle: 'global.menu.admin.main',
        pageSubTitleTrans: 'global.menu.admin.apidocs',
    },
};
