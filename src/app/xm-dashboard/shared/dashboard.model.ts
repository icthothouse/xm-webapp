import { BaseEntity } from '@xm-ngx/entity';
import { Translate } from '@xm-ngx/translation';
import { Layout } from './layout.model';
import { Widget } from './widget.model';

export type JavascriptCode = string;

export interface DashboardConfig {
    slug?: string;
    orderIndex?: number;
    condition?: JavascriptCode;
    name?: Translate;
    hidden?: boolean;
    permission?: string;
    icon?: string;
    menu?: {
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

export interface DashboardLayout {
    class?: string;
    layout?: Layout[];
    /** @deprecated use layout instead */
    grid?: Layout[];
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
    widgets?: Widget[];
}

export interface DashboardWithWidgets<C = DashboardConfig, L = DashboardLayout> extends Dashboard<C, L> {
    widgets?: Widget[];
}
