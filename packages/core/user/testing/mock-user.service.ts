import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { XmUser } from '@xm-ngx/core/user';

@Injectable()
export class MockUserService<T = XmUser> {
    public user$(): Observable<T | null> {
        return of(null);
    }

    public next(): Observable<T | null> {
        return of(null);
    }

    public forceReload(): void {
        // Mock empty
    }

}
