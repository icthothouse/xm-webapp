import { Layout } from '@xm-ngx/dynamic';
import { BaseEntity } from '@xm-ngx/entity';
import { JavascriptCode } from '@xm-ngx/shared/interfaces';
import { Translate } from '@xm-ngx/translation';
import { DashboardWidget } from './widget.model';

export interface DashboardConfig {
    slug?: string;
    orderIndex?: number;
    condition?: JavascriptCode;
    name?: Translate;
    hidden?: boolean;
    permission?: string;
    icon?: string;
    menu?: {
        section?: string;
        name?: string;
        groupIsLink?: boolean;
        group?: {
            name?: Translate;
            icon?: string;
            permission?: string;
            orderIndex?: number;
            key?: string;
        };
    };

    /*
     * Backward compatibility, @deprecated
     * @todo: add generics
     */
    [key: string]: any;
}

interface DashboardLayoutLayout extends Layout {
    widget?: number | string | DashboardWidget;
    widgetName?: string;
    content?: DashboardLayoutLayout[];
}

export interface DashboardLayout {
    class?: string;
    layout?: DashboardLayoutLayout[];
    /** @deprecated use layout instead */
    grid?: DashboardLayoutLayout[];
}

export interface Dashboard<C = DashboardConfig, L = DashboardLayout> extends BaseEntity {
    id?: number;
    name?: string;
    owner?: string;
    typeKey?: string;
    layout?: L;
    config?: C;
    isPublic?: boolean;

    /*
     * Backward compatibility, @deprecated, use DashboardWithWidgets instead
     * @todo: Backend, improve dashboard-microservice
     */
    widgets?: DashboardWidget[];
}

export interface DashboardWithWidgets<C = DashboardConfig, L = DashboardLayout> extends Dashboard<C, L> {
    widgets?: DashboardWidget[];
}
