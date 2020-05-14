import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Routes } from '@angular/router';

import { DashboardListCardComponent } from '@xm-ngx/administration/dashboard-mng/dashboard-list-card';
import { WidgetListCardComponent } from '@xm-ngx/administration/dashboard-mng/widget-list-card';
import { JhiPaginationUtil } from 'ng-jhipster';

@Injectable()
export class DashboardResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {
    }

    public resolve(route: ActivatedRouteSnapshot): any {
        const page = route.queryParams.page ? route.queryParams.page : '1';
        const sort = route.queryParams.sort ? route.queryParams.sort : 'id,asc';
        const size = route.queryParams.size ? route.queryParams.size : '10';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort),
            size,
        };
    }
}

export const dashboardMngRoute: Routes = [
    {
        path: 'dashboard-management',
        component: DashboardListCardComponent,
        resolve: {
            pagingParams: DashboardResolvePagingParams,
        },
        data: {
            privileges: {value: ['DASHBOARD.GET_LIST']},
            pageTitle: 'admin-config.common.menu.title',
            pageSubTitleTrans: 'admin-config.common.menu.dashboard-mng',
        },
    },
    {
        path: 'dashboard-management/:id',
        component: WidgetListCardComponent,
        resolve: {
            pagingParams: DashboardResolvePagingParams,
        },
        data: {
            privileges: {value: ['WIDGET.GET_LIST']},
            pageTitle: 'admin-config.common.menu.title',
            pageSubTitleTrans: 'admin-config.common.menu.dashboard-mng',
        },
    },
];
