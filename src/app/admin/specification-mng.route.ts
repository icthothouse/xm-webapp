import { Routes } from '@angular/router';
import { SpecificationManagementComponent } from '@xm-ngx/administration/specification-management';

export const specificationMngRoute: Routes = [
    {
        path: 'specification-management',
        children: [
            {
                path: ':slug',
                component: SpecificationManagementComponent,
                data: {
                    privileges: {value: ['CONFIG.CLIENT.GET_LIST.ITEM']},
                    pageTitle: 'admin-config.common.menu.title',
                    pageSubTitleTrans: 'admin-config.common.menu.specification-mng',
                },
            },
        ],
    },
];
