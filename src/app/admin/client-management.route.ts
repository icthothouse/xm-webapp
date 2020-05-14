import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Routes } from '@angular/router';

import { ClientMgmtComponent } from '@xm-ngx/administration/client-management/client-management.component';
import { JhiPaginationUtil } from 'ng-jhipster';

@Injectable()
export class ClientResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {
    }

    public resolve(route: ActivatedRouteSnapshot): any {
        const page = route.queryParams.page ? route.queryParams.page : '1';
        const sort = route.queryParams.sort ? route.queryParams.sort : 'lastModifiedDate,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort),
        };
    }
}

export const clientMgmtRoute: Routes = [
    {
        path: 'client-management',
        component: ClientMgmtComponent,
        resolve: {
            pagingParams: ClientResolvePagingParams,
        },
        data: {
            privileges: {value: ['CLIENT.GET_LIST']},
            pageTitle: 'global.menu.admin.main',
            pageSubTitleTrans: 'global.menu.admin.clientManagement',
        },
    },
];
