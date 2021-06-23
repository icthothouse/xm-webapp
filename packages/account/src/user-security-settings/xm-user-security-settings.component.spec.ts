import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountService, Principal } from '@xm-ngx/core/auth';
import { MockPrincipalService } from '../../../../src/app/shared/auth/testing/mock-principal.service';

import { XmUserSecuritySettingsComponent } from './xm-user-security-settings.component';

describe('XmUserSecuritySettingsComponent', () => {
    let component: XmUserSecuritySettingsComponent;
    let fixture: ComponentFixture<XmUserSecuritySettingsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: Principal, useClass: MockPrincipalService },
                { provide: AccountService, useValue: null },
            ],
            declarations: [XmUserSecuritySettingsComponent],
            schemas: [NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(XmUserSecuritySettingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
