import { Translate } from '@xm-ngx/translation';

export interface MenuItem {
    class?: string;
    position: number;
    permission?: string | string[];
    url: string[];
    icon: string;
    title: Translate;
}

export interface MenuCategory extends MenuItem {
    isLink: boolean;
    key: string;
    children: MenuItem[];
}
