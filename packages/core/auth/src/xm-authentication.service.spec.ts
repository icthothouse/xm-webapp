import { TestBed } from '@angular/core/testing';
import { XmSessionService } from '@xm-ngx/core';
import {
    AuthRefreshTokenService,
    XmAuthenticationRepository,
    XmAuthenticationStoreService
} from '@xm-ngx/core/auth';

import { XmAuthenticationService } from './xm-authentication.service';
import { XmAuthenticationConfig } from './xm-authentication-config.service';

describe('XmAuthenticationService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            {provide: XmAuthenticationRepository, useValue: {}},
            {provide: XmAuthenticationStoreService, useValue: {}},
            {provide: XmAuthenticationConfig, useValue: {}},
            {provide: AuthRefreshTokenService, useValue: {}},
            {provide: XmSessionService, useValue: null},
            XmAuthenticationService,
        ],
    }));

    it('should be created', () => {
        const service: XmAuthenticationService = TestBed.inject<XmAuthenticationService>(XmAuthenticationService);
        expect(service).toBeTruthy();
    });
});
