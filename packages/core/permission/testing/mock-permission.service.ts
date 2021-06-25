import { Injectable } from '@angular/core';
import { XmUserPermission } from '@xm-ngx/core/user';
import { Observable, of } from 'rxjs';

@Injectable()
export class MockPermissionService {
    public permissions$(): Observable<XmUserPermission[]> {
        return of([]);
    }

    public privileges$(): Observable<string[]> {
        return of([]);
    }

    public hasPrivilege(): Observable<boolean> {
        return of(false);
    }

    public hasPrivileges(): Observable<boolean> {
        return of(false);
    }

    public hasAnyPrivilege(): Observable<boolean> {
        return of(false);
    }

    public hasPrivilegesBy(): Observable<boolean> {
        return of(false);
    }

}
