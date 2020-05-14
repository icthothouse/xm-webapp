import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { matExpansionAnimations } from '@angular/material/expansion';
import { NavigationEnd, Router } from '@angular/router';
import { Dashboard, DashboardService, JavascriptCode } from '@xm-ngx/dynamic';
import { XmEntitySpec, XmEntitySpecWrapperService } from '@xm-ngx/entity';
import { transpilingForIE } from '@xm-ngx/json-scheme-form';
import * as _ from 'lodash';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map, share, shareReplay, take, tap } from 'rxjs/operators';

import { ContextService, Principal } from '../../../shared';
import { XmPublicUiConfigService } from '../../xm-core/src/config/xm-public-ui-config.service';
import { DEFAULT_MENU_LIST } from './menu-const';
import { MenuCategory, MenuItem } from './menu-models';

function checkCondition(item: { config?: { condition?: JavascriptCode } }, contextService: ContextService): boolean {

    // if configurator do not provide configs, return true
    if (!item.config || !item.config.condition) {
        return true;
    }

    try {
        const code = transpilingForIE(item.config.condition, contextService);
        return !!(new Function('context', code))(contextService);
    } catch (e) {
        console.warn('RUNTIME JS:', e);
        return false;
    }
}

function filterByConditionDashboards(dashboards: Dashboard[], contextService: ContextService): Dashboard[] {
    return dashboards.filter((i) => checkCondition(i, contextService));
}

function dashboardToCategory(dashboard: Dashboard): MenuCategory {
    const config = dashboard.config || {};
    const menu = config.menu || {};
    let group = menu.group || {};

    let groupKey = Object.keys(menu).length > 0 ? menu.group.key : 'DASHBOARD';

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
        permission: 'APPLICATION.' + i.key,
        icon: i.icon,
        position: 0,
    }));

    return [{
        position: 0,
        permission: 'XMENTITY_SPEC.GET',
        url: null,
        key: 'APPLICATION',
        title: 'global.menu.applications.main',
        isLink: false,
        icon: 'apps',
        children,
    }];
}

function dashboardToMenuItem(dashboard: Dashboard): MenuItem {
    const config = dashboard.config || {};
    const menu = config.menu || {};

    return ({
        position: config.orderIndex,
        class: config.hidden ? 'd-none' : '',
        permission: config.permission || 'DASHBOARD.GET_LIST',
        url: ['dashboard', (config.slug || String(dashboard.id))],
        title: config.name || menu.name || dashboard.name || '',
        icon: config.icon || '',
    });
}

function dashboardsToCategories(dashboards: Dashboard[]): MenuCategory[] {

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

@Component({
    selector: 'xm-menu',
    templateUrl: './menu.component.html',
    host: {
        class: 'xm-menu',
    },
    styleUrls: ['./menu.component.scss'],
    animations: [
        matExpansionAnimations.bodyExpansion,
        matExpansionAnimations.indicatorRotate,
    ],
    changeDetection: ChangeDetectionStrategy.Default,
})
export class MenuComponent implements OnInit, OnDestroy {

    public categories$: Observable<MenuCategory[]>;
    public activeCategories: MenuCategory;

    protected subscriptions: Subscription[] = [];

    constructor(protected readonly dashboardService: DashboardService,
                protected readonly router: Router,
                protected readonly principal: Principal,
                protected readonly uiConfigService: XmPublicUiConfigService<{ sidebar?: { hideAdminConsole?: boolean } }>,
                protected readonly entityConfigService: XmEntitySpecWrapperService,
                protected readonly contextService: ContextService) {
    }

    public ngOnInit(): void {
        const dashboards$ = this.dashboardService.query().pipe(
            map((i) => i.body),
            map((i) => filterByConditionDashboards(i, this.contextService)),
            // map((i) => _.filter(i, (j) => !!(j.config && j.config.slug))),
            map(dashboardsToCategories),
        );

        const applications$ = this.entityConfigService.entitySpec$().pipe(
            map((spec) => {
                if (!spec) {
                    spec = [];
                }
                let applications = spec.filter((t) => t.isApp);
                applications = applications.filter((t) => this.principal.hasPrivilegesInline(['APPLICATION.' + t.key]));
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
            map(([a, b, c]) => [...a, ...b, ...c]),
            share(),
        );

        this.subscriptions.push(combineLatest([
            this.categories$,
            this.router.events.pipe(filter((e) => e instanceof NavigationEnd)),
        ]).pipe(
            map((i) => i[0]),
            tap(this.selectActiveCategory.bind(this)),
        ).subscribe());

    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((i) => i.unsubscribe());
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
