import { Route } from '@angular/router';

import { FormPlaygroundComponent } from '@xm-ngx/administration/form-playground';

export const formPlaygroundRoute: Route = {
    path: 'form-playground',
    component: FormPlaygroundComponent,
    data: {
        privileges: {value: ['']},
        pageTitle: 'global.menu.admin.main',
        pageSubTitleTrans: 'global.menu.admin.formPlayground',
    },
};
