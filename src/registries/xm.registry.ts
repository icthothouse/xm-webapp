import { XmDynamicEntries } from '@xm-ngx/dynamic';
import { XM_DATE_ELEMENTS } from './xm-date.registry';
import { XM_HTML_ELEMENTS } from './xm-html.registry';
import { XM_TEXT_ELEMENTS } from './xm-text-registry';
import { XM_COPY_ELEMENTS } from './xm-copy.registry';
import { XM_LINK_ELEMENTS } from './xm-link.registry';
import { XM_ENUM_ELEMENTS } from './xm-enum.registry';
import { XM_BOOL_ELEMENTS } from './xm-bool-registry';
import { XM_ARRAY_ELEMENTS } from './xm-array-registry';
import { XM_NAVBAR_ELEMENTS } from './xm-navbar-registry';

export const XM_ELEMENTS: XmDynamicEntries = [
    ...XM_DATE_ELEMENTS,
    ...XM_HTML_ELEMENTS,
    ...XM_TEXT_ELEMENTS,
    ...XM_BOOL_ELEMENTS,
    ...XM_COPY_ELEMENTS,
    ...XM_LINK_ELEMENTS,
    ...XM_ENUM_ELEMENTS,
    ...XM_ARRAY_ELEMENTS,
    ...XM_NAVBAR_ELEMENTS,
    {
        selector: '@xm-ngx/components/navbar-user-widget',
        loadChildren: () => import('@xm-ngx/components/navbar-user-widget').then(m => m.NavbarUserWidgetModule),
    },
    {
        selector: '@xm-ngx/administration/audits',
        loadChildren: () => import('@xm-ngx/administration/audits').then(m => m.AuditsModule),
    },
    {
        selector: '@xm-ngx/administration/docs',
        loadChildren: () => import('@xm-ngx/administration/docs').then(m => m.DocsModule),
    },
    {
        selector: '@xm-ngx/administration/form-playground',
        loadChildren: () => import('@xm-ngx/administration/form-playground').then(m => m.FormPlaygroundModule),
    },
    {
        selector: '@xm-ngx/administration/gateway',
        loadChildren: () => import('@xm-ngx/administration/gateway').then(m => m.GatewayModule),
    },
    {
        selector: '@xm-ngx/administration/health',
        loadChildren: () => import('@xm-ngx/administration/health').then(m => m.HealthModule),
    },
    {
        selector: '@xm-ngx/administration/architecture',
        loadChildren: () => import('@xm-ngx/administration/architecture').then(m => m.HighLevelArchitectureWidgetModule),
    },
    {
        selector: '@xm-ngx/administration/logs',
        loadChildren: () => import('@xm-ngx/administration/logs').then(m => m.LogsModule),
    },
    {
        selector: '@xm-ngx/administration/maintenance',
        loadChildren: () => import('@xm-ngx/administration/maintenance').then(m => m.MaintenanceModule),
    },
    {
        selector: '@xm-ngx/administration/roles-matrix',
        loadChildren: () => import('@xm-ngx/administration/roles-matrix').then(m => m.RolesMatrixModule),
    },
    {
        selector: '@xm-ngx/administration/metrics',
        loadChildren: () => import('@xm-ngx/administration/metrics').then(m => m.MetricModule),
    },
    {
        selector: '@xm-ngx/administration/translations',
        loadChildren: () => import('@xm-ngx/administration/translations').then(m => m.TranslationModule),
    },
    {
        selector: '@xm-ngx/administration/client-management',
        loadChildren: () => import('@xm-ngx/administration/client-management').then(m => m.ClientManagementModule),
    },
    {
        selector: '@xm-ngx/administration/roles-management',
        loadChildren: () => import('@xm-ngx/administration/roles-management').then(m => m.RolesManagementModule),
    },
    {
        selector: '@xm-ngx/administration/style-guide',
        loadChildren: () => import('@xm-ngx/administration/style-guide').then(m => m.StyleGuideModule),
    },
    {
        selector: '@xm-ngx/administration/roles-management-detail',
        loadChildren: () => import('@xm-ngx/administration/roles-management-detail').then(m => m.RolesManagementDetailModule),
    },
    {
        selector: '@xm-ngx/administration/user-management',
        loadChildren: () => import('@xm-ngx/administration/user-management').then(m => m.UserManagementModule),
    },
    {
        selector: '@xm-ngx/administration/user-management/unblock-lock-user',
        loadChildren: () => import('@xm-ngx/administration/user-management/unblock-lock-user/unblock-lock-user.module').then(m => m.UnblockLockUserModule),
    },
    {
        selector: '@xm-ngx/administration/user-management-detail',
        loadChildren: () => import('@xm-ngx/administration/user-management-detail').then(m => m.UserManagementDetailModule),
    },
    {
        selector: '@xm-ngx/administration/specification-management',
        loadChildren: () => import('@xm-ngx/administration/specification-management').then(m => m.SpecificationManagementModule),
    },
    {
        selector: '@xm-ngx/components/navbar-heatmap-widget',
        loadChildren: () => import('@xm-ngx/components/navbar-heatmap-widget').then(m => m.NavbarHeatmapWidgetModule),
    },
    {
        selector: '@xm-ngx/administration/dashboards-config-widget',
        loadChildren: () => import('@xm-ngx/administration/dashboards-config').then(m => m.DashboardsModule),
    },
    {
        selector: '@xm-ngx/components/navbar-dashboard-edit-widget',
        loadChildren: () => import('@xm-ngx/administration/navbar-dashboard-edit-widget').then(m => m.NavbarDashboardEditWidgetModule),
    },
    {
        selector: '@xm-ngx/components/feedback',
        loadChildren: () => import('@xm-ngx/components/feedback').then(m => m.FeedbackModule),
    },
    {
        selector: '@xm-ngx/components/switch-theme-widget',
        loadChildren: () => import('@xm-ngx/components/switch-theme-widget').then(m => m.SwitchThemeWidgetModule),
    },
    {
        selector: '@xm-ngx/components/xm-ribbon',
        loadChildren: () => import('@xm-ngx/components/ribbon').then(m => m.XmRibbonModule),
    },
    {
        selector: '@xm-ngx/components/mat-fab',
        loadChildren: () => import('@xm-ngx/components/mat-fab').then(m => m.MatFabModule),
    },
    {
        selector: '@xm-ngx/components/file-control',
        loadChildren: () => import('@xm-ngx/components/file').then(m => m.FileControlModule),
    },
    {
        selector: '@xm-ngx/components/currency-value',
        loadChildren: () => import('@xm-ngx/components/currency').then(m => m.XmCurrencyValueModule),
    },
    {
        selector: '@xm-ngx/components/links-group-widget',
        loadChildren: () => import('@xm-ngx/components/links-group-widget').then(m => m.LinksGroupWidgetModule),
    },
    {
        selector: '@xm-ngx/components/links-group-button-widget',
        loadChildren: () => import('@xm-ngx/components/links-group-widget').then(m => m.LinksGroupButtonWidgetModule),
    },
    {
        selector: '@xm-ngx/components/by-entity-id',
        loadChildren: () => import('@xm-ngx/components/by-entity-id').then(m => m.ByEntityIdModule),
    },
    {
        selector: '@xm-ngx/components/by-entity-id-cell',
        loadChildren: () => import('@xm-ngx/components/by-entity-id/by-entity-id-value.component').then(m => m.ByEntityIdValueModule),
    },
    {
        selector: '@xm-ngx/account/xm-user-login-widget',
        loadChildren: () => import('@xm-ngx/account/user-login-widget').then(m => m.XmUserLoginWidgetModule),
    },
    {
        selector: '@xm-ngx/account/xm-user-security-settings',
        loadChildren: () => import('@xm-ngx/account/user-security-settings').then(m => m.XmUserSecuritySettingsModule),
    },
    {
        selector: '@xm-ngx/account/xm-user-settings-widget',
        loadChildren: () => import('@xm-ngx/account/user-settings-widget').then(m => m.XmUserSettingsWidgetModule),
    },
    {
        selector: '@xm-ngx/account/xm-user-password-widget',
        loadChildren: () => import('@xm-ngx/account/user-password-widget').then(m => m.XmUserPasswordWidgetModule),
    },
    {
        selector: '@xm-ngx/components/number-control',
        loadChildren: () => import('@xm-ngx/components/number-control').then(m => m.XmNumberControlModule),
    },
    {
        selector: '@xm-ngx/components/dynamic-list-widget',
        loadChildren: () => import('@xm-ngx/components/dynamic/xm-dynamic-list.module').then(m => m.XmDynamicListModule),
    },
    {
        selector: '@xm-ngx/documentation/examples',
        loadChildren: () => import('../../packages/documentation/doc-examples/xm-doc-examples.module').then(m => m.XmDocExamplesModule),
    },
];
