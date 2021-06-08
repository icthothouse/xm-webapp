import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { filter, first, map, switchMap } from 'rxjs/operators';
import { XmUser, XmUserPermission, XmUserService } from '@xm-ngx/core/user';
import { ArgumentException } from '@xm-ngx/shared/exceptions';

export const SUPER_ADMIN = 'SUPER-ADMIN';

function getPrivileges(permissions: XmUserPermission[]): string[] {
    return _.reduce(permissions, (result, el) => {
        if (el.enabled) {
            result.push(el.privilegeKey);
        }
        return result;
    }, []);
}

export enum PermissionCheckStrategy {
    ALL = 'all',
    ANY = 'any'
}

@Injectable({
    providedIn: 'root',
})
export class XmPermissionService {

    constructor(protected userService: XmUserService) {
    }

    public permissions$(): Observable<XmUserPermission[]> {
        return this.userService.user$().pipe(
            map((u) => u || { permissions: [] }),
            map((u: XmUser) => u.permissions),
        );
    }

    public privileges$(): Observable<string[]> {
        return this.permissions$().pipe(map(getPrivileges));
    }

    public hasPrivilege(privilege: string): Observable<boolean> {
        if (!privilege) {
            throw new ArgumentException('The privilege is empty!');
        }
        return this.privileges$().pipe(
            map((arr) => _.includes(arr, privilege)),
            switchMap((res) => this.isSuperAdmin(res)),
        );
    }

    public hasPrivileges(privileges: string[]): Observable<boolean> {
        if (!privileges && !privileges.length) {
            throw new ArgumentException('The privileges array is empty!');
        }
        return this.privileges$().pipe(
            map((arr) => _.intersection(arr, privileges).length === privileges.length),
            switchMap((res) => this.isSuperAdmin(res)),
        );
    }

    public hasAnyPrivilege(privileges: string[]): Observable<boolean> {
        if (!privileges && !privileges.length) {
            throw new ArgumentException('The privileges array is empty!');
        }
        return this.privileges$().pipe(
            map((arr) => _.intersection(arr, privileges).length !== 0),
            switchMap((res) => this.isSuperAdmin(res)),
        );
    }

    public hasPrivilegesBy(
        privileges: string[],
        strategy: PermissionCheckStrategy = PermissionCheckStrategy.ALL,
    ): Observable<boolean> {
        switch (strategy) {
            case PermissionCheckStrategy.ALL:
                return this.hasPrivileges(privileges);
            case PermissionCheckStrategy.ANY:
                return this.hasAnyPrivilege(privileges);
            default:
                return this.hasPrivileges(privileges);
        }
    }

    private isSuperAdmin(res: boolean): Observable<boolean> {
        return this.userService.user$().pipe(
            filter((u) => Boolean(u)),
            first(),
            map((user) => user.roleKey === SUPER_ADMIN ? true : res),
        );
    }
}
