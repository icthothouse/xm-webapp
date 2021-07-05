import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { matExpansionAnimations } from '@angular/material/expansion';
import { NavigationEnd, Router } from '@angular/router';
import { XmPublicUiConfigService } from '@xm-ngx/core';
import { Dashboard, DashboardStore } from '@xm-ngx/dashboard';
import { XmEntitySpec, XmEntitySpecWrapperService } from '@xm-ngx/entity';
import { transpilingForIE } from '@xm-ngx/json-scheme-form';
import { JavascriptCode } from '@xm-ngx/shared/interfaces';
import { takeUntilOnDestroy, takeUntilOnDestroyDestroy } from '@xm-ngx/shared/operators';
import * as _ from 'lodash';
import { combineLatest, from, Observable } from 'rxjs';
import { filter, map, shareReplay, switchMap, take, tap } from 'rxjs/operators';

import { ContextService, Principal } from '../../../src/app/shared';
import { DEFAULT_MENU_LIST } from './menu-const';
import { MenuCategory, MenuItem } from './menu-models';

function checkCondition(item: { config?: { condition?: JavascriptCode } }, contextService: ContextService): boolean {
    // If configurator do not provide configs, return true
    if (!item.config || !item.config.condition) {
        return true;
    }

    try {
        const code = transpilingForIE(item.config.condition, contextService);
        return Boolean((new Function('context', code))(contextService));
    } catch (e) {
        console.warn('RUNTIME JS:', e);
        return false;
    }
}

export function filterByConditionDashboards(dashboards: Dashboard[], contextService: ContextService): Dashboard[] {
    return dashboards.filter((i) => checkCondition(i, contextService));
}

function dashboardToCategory(dashboard: Dashboard): MenuCategory {
    const config = dashboard.config || {};
    const menu = config.menu || {};
    let group = menu.group || {};

    let groupKey = Object.keys(menu).length > 0 ? group.key : 'DASHBOARD';

    if (Object.keys(menu).length === 0 && !menu.groupIsLink) {
        group = {
            icon: 'dashboard',
            name: 'global.menu.dashboards.main',
        };
    }

    if (menu.groupIsLink) {
        groupKey = dashboard.config && dashboard.config.slug ? dashboard.config.slug : null;
    }

    return ({
        position: group.orderIndex,
        permission: group.permission || 'DASHBOARD.GET_LIST',
        url: ['dashboard', (groupKey || String(dashboard.id))],
        key: groupKey,
        title: group.name || dashboard.name || '',
        isLink: menu.groupIsLink || false,
        icon: group.icon || config.icon || '',
        children: [],
    });
}

function applicationsToCategory(applications: XmEntitySpec[]): MenuCategory[] {
    const children: MenuItem[] = applications.map((i) => ({
        title: i.pluralName ? i.pluralName : i.name,
        url: ['application', i.key],
        permission: `APPLICATION.${i.key}`,
        icon: i.icon,
        position: 0,
    }));

    return [
        {
            position: 0,
            permission: 'XMENTITY_SPEC.GET',
            url: null,
            key: 'APPLICATION',
            title: 'global.menu.applications.main',
            isLink: false,
            icon: 'apps',
            children,
        },
    ];
}

export function dashboardToMenuItem(dashboard: Dashboard): MenuItem {
    const config = dashboard.config || {};
    const menu = config.menu || {};

    return ({
        position: config.orderIndex,
        class: config.hidden ? 'd-none' : '',
        permission: config.permission || 'DASHBOARD.GET_LIST',
        url: ['dashboard', (config.slug || String(dashboard.id))],
        title: menu.name || config.name || dashboard.name || '',
        icon: config.icon || '',
    });
}

export function dashboardsToCategories(dashboards: Dashboard[]): MenuCategory[] {
    let categories: MenuCategory[] = [];

    _.forEach(dashboards, (dashboard) => {
        const menu = dashboard.config && dashboard.config.menu ? dashboard.config.menu : null;
        const _group = menu?.group || {};
        let groupKey = !menu ? 'DASHBOARD' : _group.key;

        if (menu?.groupIsLink) {
            groupKey = dashboard.config && dashboard.config.slug ? dashboard.config.slug : null;
        }

        let group = _.find(categories, (i) => i.key === groupKey);

        const isHidden = dashboard.config && dashboard.config.hidden;
        if (!group && !isHidden) {
            group = dashboardToCategory(dashboard);
            categories.push(group);
        }

        if (group) {
            group.children.push(dashboardToMenuItem(dashboard));
        }
    });

    categories = _.orderBy(categories, ['title', 'position'], 'asc');
    _.forEach(categories, (i) => i.children = _.orderBy(i.children, ['title', 'position'], 'asc'));

    return categories;
}

export function categoriesToMenuItems(categories: MenuCategory[]): MenuItem[] {
    return _.flatMap(categories.map((c) => c.children));
}

@Component({
    selector: 'xm-menu',
    templateUrl: './menu.component.html',
    host: {
        class: 'xm-menu',
    },
    animations: [
        matExpansionAnimations.bodyExpansion,
        matExpansionAnimations.indicatorRotate,
    ],
    changeDetection: ChangeDetectionStrategy.Default,
})
export class MenuComponent implements OnInit, OnDestroy {

    public categories$: Observable<MenuCategory[]>;
    public activeCategories: MenuCategory;

    constructor(
        protected readonly dashboardService: DashboardStore,
        protected readonly router: Router,
        protected readonly principal: Principal,
        protected readonly uiConfigService: XmPublicUiConfigService<{ sidebar?: { hideAdminConsole?: boolean; hideApplication?: boolean; } }>,
        protected readonly entityConfigService: XmEntitySpecWrapperService,
        protected readonly contextService: ContextService,
    ) {
    }

    public ngOnInit(): void {
        const dashboards$ = this.dashboardService.dashboards$().pipe(
            takeUntilOnDestroy(this),
            filter((dashboards) => Boolean(dashboards)),
            map((i) => filterByConditionDashboards(i, this.contextService)),
            map((i) => _.filter(i, (j) => (!j.config?.menu?.section || j.config.menu.section === 'xm-menu'))),
            map(dashboardsToCategories),
        );

        const applications$ = from(this.principal.identity()).pipe(
            switchMap(() => this.entityConfigService.entitySpec$()),
            switchMap((spec) => this.uiConfigService.config$().pipe(
                map((c) => c.sidebar?.hideApplication ? [] : spec)),
            ),
            map((spec) => {
                if (!spec) {
                    spec = [];
                }
                let applications = spec.filter((t) => t.isApp);
                applications = applications.filter((t) => this.principal.hasPrivilegesInline([`APPLICATION.${t.key}`]));
                return applications;
            }),
            map(applicationsToCategory),
        );

        const default$ = this.uiConfigService.config$().pipe(
            take(1),
            map(i => i?.sidebar?.hideAdminConsole ? [] : DEFAULT_MENU_LIST),
            shareReplay(1),
        );

        this.categories$ = combineLatest([dashboards$, applications$, default$]).pipe(
            takeUntilOnDestroy(this),
            map(([a, b, c]) => [...a, ...b, ...c]),
            shareReplay(1),
        );

        combineLatest([
            this.categories$,
            this.router.events.pipe(filter((e) => e instanceof NavigationEnd)),
        ]).pipe(
            takeUntilOnDestroy(this),
            map((i) => i[0]),
            tap(this.selectActiveCategory.bind(this)),
        ).subscribe();
    }

    public ngOnDestroy(): void {
        takeUntilOnDestroyDestroy(this);
    }

    public toggleMenu(category: MenuCategory): void {
        if (this.activeCategories === category) {
            category = null;
        }
        this.activeCategories = category;
    }

    public getCategoryState(category: MenuCategory): string {
        return this.activeCategories === category ? 'expanded' : 'collapsed';
    }

    public selectActiveCategory(categories: MenuCategory[]): void {
        const activateCategory = (i: MenuCategory, url: string[]) => {
            if (this.router.isActive(url.join('/'), false)) {
                this.activeCategories = i;
            }
        };

        _.forEach(categories, (category) => {
            if (category.isLink) {
                activateCategory(category, category.url);
            } else {
                _.forEach(category.children, (item) => {
                    activateCategory(category, item.url);
                });
            }
        });
    }

}
