import { TestBed } from '@angular/core/testing';
import { XmUserService } from '@xm-ngx/core/user';
import { MockUserService } from '@xm-ngx/core/user/testing';

import { XmPermissionService } from './xm-permission.service';

describe('XmPermissionService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [{ provide: XmUserService, useClass: MockUserService }],
    }));

    it('should be created', () => {
        const service: XmPermissionService = TestBed.inject<XmPermissionService>(XmPermissionService);
        expect(service).toBeTruthy();
    });
});
