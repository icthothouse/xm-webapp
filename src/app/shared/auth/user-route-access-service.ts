import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    CanLoad,
    Route,
    Router,
    RouterStateSnapshot,
    UrlSegment
} from '@angular/router';
import { XmToasterService } from '@xm-ngx/toaster';

import { Principal } from './principal.service';
import { StateStorageService } from './state-storage.service';
import { PermissionGuardData } from '../../../../packages/core/permission';

@Injectable()
export class UserRouteAccessService implements CanActivate, CanActivateChild, CanLoad {

    constructor(
        private router: Router,
        private principal: Principal,
        private stateStorageService: StateStorageService,
        private alertService: XmToasterService) {
    }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return this.canActivateFunc(route.data as PermissionGuardData, state.url);
    }

    public canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return this.canActivateFunc(route.data as PermissionGuardData, state.url);
    }

    public canLoad(route: Route, _segments: UrlSegment[]): Promise<boolean> {
        return this.canActivateFunc(route.data as PermissionGuardData, this.router.url);
    }

    private canActivateFunc(data: PermissionGuardData, url: string): Promise<boolean> {
        const privileges = data.privileges || { value: [] };
        if (!(privileges.value && privileges.value.length)) {
            return Promise.resolve(true);
        }
        return this.checkLogin(url, privileges);
    }

    private checkLogin(url: string, privileges: any = {}): Promise<boolean> {
        const principal = this.principal;
        return Promise.resolve(principal.identity().then((account) => {
            if (account && privileges.value && privileges.value.length) {
                return principal.hasPrivileges(privileges.value, privileges.condition)
                    .then((result) => {
                        if (result instanceof Array) {
                            if (result.length) {
                                this.alertService.warning('error.privilegeInsufficient', { name: result.join(', ') });
                            }
                            return !result.length;
                        }
                        return result;
                    });
            }

            this.stateStorageService.storeUrl(url);
            this.router.navigate(['/']);
            return false;
        }));
    }
}
