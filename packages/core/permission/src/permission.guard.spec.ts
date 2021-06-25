import { inject, TestBed } from '@angular/core/testing';

import { PermissionGuard } from './permission.guard';
import { MockPermissionService } from '@xm-ngx/core/permission/testing';
import { XmPermissionService } from './xm-permission.service';

describe('PermissionGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: XmPermissionService, useClass: MockPermissionService },
                PermissionGuard,
            ],
        });
    });

    it('should ...', inject([PermissionGuard], (guard: PermissionGuard) => {
        expect(guard).toBeTruthy();
    }));
});
