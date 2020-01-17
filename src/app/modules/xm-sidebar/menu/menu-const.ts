import { MenuCategory } from './menu-models';

export const DEFAULT_MENU_LIST: MenuCategory[] = [
    {
        key: null,
        permission: 'DASHBOARD.CREATE',
        position: null,
        isLink: false,
        title: 'admin-config.common.menu.title',
        icon: 'tune',
        url: null,
        children: [
            {
                position: 0,
                permission: 'DASHBOARD.CREATE',
                url: ['/configuration/dashboard-management'],
                icon: 'dashboard',
                title: 'admin-config.common.menu.dashboard-mng'
            },
            {
                position: 1,
                permission: null,
                url: ['/configuration/specification-management/ui'],
                icon: 'settings_applications',
                title: 'admin-config.common.menu.specification-mng'
            }
        ],
    },
    {
        key: 'administration',
        permission: ['ROUTE.GET_LIST', 'ROLE.GET_LIST', 'ROLE.MATRIX.GET', 'USER.GET_LIST', 'CLIENT.GET_LIST'],
        position: null,
        isLink: false,
        title: 'global.menu.admin.main',
        icon: 'settings',
        url: null,
        children: [
            {
                position: 0,
                permission: 'ROUTE.GET_LIST',
                url: ['/administration/gateway'],
                icon: 'traffic',
                title: 'global.menu.admin.gateway'
            },
            {
                position: 1,
                permission: 'ROUTE.GET_LIST',
                url: ['/administration/metrics'],
                icon: 'network_check',
                title: 'global.menu.admin.metrics'
            },
            {
                position: 2,
                permission: 'ROUTE.GET_LIST',
                url: ['/administration/health'],
                icon: 'network_check',
                title: 'global.menu.admin.health'
            },
            {
                position: 3,
                permission: 'ROUTE.GET_LIST',
                url: ['/administration/roles-management'],
                icon: 'supervisor_account',
                title: 'global.menu.admin.rolesManagement'
            },
            {
                position: 4,
                permission: 'ROUTE.MATRIX.GET',
                url: ['/administration/roles-matrix'],
                icon: 'view_comfy',
                title: 'global.menu.admin.rolesMatrix'
            },
            {
                position: 5,
                permission: 'ROUTE.GET_LIST',
                url: ['/administration/user-management'],
                icon: 'supervisor_account',
                title: 'global.menu.admin.userManagement'
            },
            {
                position: 6,
                permission: 'ROUTE.GET_LIST',
                url: ['/administration/client-management'],
                icon: 'account_circle',
                title: 'global.menu.admin.clientManagement'
            },
            {
                position: 7,
                permission: '',
                url: ['/administration/audits'],
                icon: 'track_changes',
                title: 'global.menu.admin.audits'
            },
            {
                position: 8,
                permission: '',
                url: ['/administration/logs'],
                icon: 'list',
                title: 'global.menu.admin.logs'
            },
            {
                position: 9,
                permission: '',
                url: ['/administration/form-playground'],
                icon: 'content_paste',
                title: 'global.menu.admin.formPlayground'
            },
            {
                position: 10,
                permission: ['ELASTICSEARCH.INDEX', 'CONFIG.ADMIN.REFRESH', 'CONFIG.CLIENT.REFRESH'],
                url: ['/administration/maintenance'],
                icon: 'M',
                title: 'global.menu.admin.maintenance'
            },
            {
                position: 11,
                permission: '',
                url: ['/administration/translation'],
                icon: 'translate',
                title: 'global.menu.admin.translation'
            },
            {
                position: 12,
                permission: 'ROUTE.GET_LIST',
                url: ['/administration/docs'],
                icon: 'A',
                title: 'global.menu.admin.apidocs'
            },
        ],
    }
];
