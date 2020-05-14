import { Route } from '@angular/router';
import { RolesMatrixComponent } from '@xm-ngx/administration/roles-matrix';

export const rolesMatrixRoute: Route = {
    path: 'roles-matrix',
    component: RolesMatrixComponent,
    data: {
        privileges: {value: ['ROLE.MATRIX.GET']},
        pageTitle: 'global.menu.admin.main',
        pageSubTitleTrans: 'global.menu.admin.rolesMatrix',
    },
};
