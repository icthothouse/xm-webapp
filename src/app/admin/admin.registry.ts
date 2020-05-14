export const ADMIN_ELEMENTS = [
    {
        provide: '@xm-ngx/administration/audits',
        useFactory: () => import('@xm-ngx/administration/audits').then(m => m.AuditsModule),
    },
    {
        provide: '@xm-ngx/administration/docs',
        useFactory: () => import('@xm-ngx/administration/docs').then(m => m.DocsModule),
    },
    {
        provide: '@xm-ngx/administration/form-playground',
        useFactory: () => import('@xm-ngx/administration/form-playground').then(m => m.FormPlaygroundModule),
    },
    {
        provide: '@xm-ngx/administration/gateway',
        useFactory: () => import('@xm-ngx/administration/gateway').then(m => m.GatewayModule),
    },
    {
        provide: '@xm-ngx/administration/health',
        useFactory: () => import('@xm-ngx/administration/health').then(m => m.HealthModule),
    },
    {
        provide: '@xm-ngx/administration/high-level-architecture-widget',
        useFactory: () => import('@xm-ngx/administration/high-level-architecture-widget').then(m => m.HighLevelArchitectureWidgetModule),
    },
    {
        provide: '@xm-ngx/administration/logs',
        useFactory: () => import('@xm-ngx/administration/logs').then(m => m.LogsModule),
    },
    {
        provide: '@xm-ngx/administration/maintenance',
        useFactory: () => import('@xm-ngx/administration/maintenance').then(m => m.MaintenanceModule),
    },
    {
        provide: '@xm-ngx/administration/roles-matrix',
        useFactory: () => import('@xm-ngx/administration/roles-matrix').then(m => m.RolesMatrixModule),
    },
    {
        provide: '@xm-ngx/administration/metrics',
        useFactory: () => import('@xm-ngx/administration/metrics').then(m => m.MetricModule),
    },
    {
        provide: '@xm-ngx/administration/translations',
        useFactory: () => import('@xm-ngx/administration/translations').then(m => m.TranslationModule),
    },
    {
        provide: '@xm-ngx/administration/client-management',
        useFactory: () => import('@xm-ngx/administration/client-management').then(m => m.ClientManagementModule),
    },
    {
        provide: '@xm-ngx/administration/roles-management',
        useFactory: () => import('@xm-ngx/administration/roles-management').then(m => m.RolesManagementModule),
    },
    {
        provide: '@xm-ngx/administration/roles-management-detail',
        useFactory: () => import('@xm-ngx/administration/roles-management-detail').then(m => m.RolesManagementDetailModule),
    },
    {
        provide: '@xm-ngx/administration/user-management',
        useFactory: () => import('@xm-ngx/administration/user-management').then(m => m.UserManagementModule),
    },
    {
        provide: '@xm-ngx/administration/user-management-detail',
        useFactory: () => import('@xm-ngx/administration/user-management-detail').then(m => m.UserManagementDetailModule),
    },
    {
        provide: '@xm-ngx/administration/specification-management',
        useFactory: () => import('@xm-ngx/administration/specification-management').then(m => m.SpecificationManagementModule),
    },
    {
        provide: '@xm-ngx/administration/dashboard-mng/dashboard-list-card',
        useFactory: () => import('@xm-ngx/administration/dashboard-mng/dashboard-list-card').then(m => m.DashboardListCardModule),
    },
    {
        provide: '@xm-ngx/administration/dashboard-mng/widget-list-card',
        useFactory: () => import('@xm-ngx/administration/dashboard-mng/widget-list-card').then(m => m.WidgetListCardModule),
    },
    {
        provide: '@xm-ngx/components/navbar-heatmap-widget',
        useFactory: () => import('@xm-ngx/components/navbar-heatmap-widget').then(m => m.NavbarHeatmapWidgetModule),
    },
];
