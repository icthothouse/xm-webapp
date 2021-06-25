import { PermissionDirective } from './permission.directive';
import { MockPermissionService } from '@xm-ngx/core/permission/testing';

describe('PermissionDirective', () => {
    it('should create an instance', () => {
        const directive = new PermissionDirective(null, new MockPermissionService() as any, null);
        expect(directive).toBeTruthy();
    });
});
