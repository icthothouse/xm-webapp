import { TestBed } from '@angular/core/testing';

import { XmAuthenticationService } from './xm-authentication.service';

describe('XmAuthenticationService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: XmAuthenticationService = TestBed.get(XmAuthenticationService);
        expect(service).toBeTruthy();
    });
});
