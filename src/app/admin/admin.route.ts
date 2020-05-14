import { Routes } from '@angular/router';

import { UserRouteAccessService } from '@xm-ngx/core/auth';
import { adminConfigState } from './admin-config.route';
import { auditsRoute } from './audits.route';
import { clientMgmtRoute } from './client-management.route';
import { docsRoute } from './docs.route';
import { formPlaygroundRoute } from './form-playground.route';
import { gatewayRoute } from './gateway.route';
import { healthRoute } from './health.route';
import { logsRoute } from './logs.route';
import { maintenanceRoute } from './maintenance.route';
import { metricsRoute } from './metrics.route';
import { rolesMgmtRoute } from './roles-management.route';
import { rolesMatrixRoute } from './roles-matrix.route';
import { translationRoute } from './translation.route';
import { userMgmtRoute } from './user-management.route';


const ADMIN_ROUTES = [
    auditsRoute,
    docsRoute,
    healthRoute,
    formPlaygroundRoute,
    maintenanceRoute,
    translationRoute,
    logsRoute,
    gatewayRoute,
    rolesMatrixRoute,
    ...userMgmtRoute,
    ...clientMgmtRoute,
    ...rolesMgmtRoute,
    metricsRoute,
    ...adminConfigState,
];

export const adminState: Routes = [{
    path: '',
    data: {
        authorities: ['ROLE_ADMIN'],
    },
    // canActivate: [UserRouteAccessService],
    canActivateChild: [UserRouteAccessService],
    children: ADMIN_ROUTES,
},
];
