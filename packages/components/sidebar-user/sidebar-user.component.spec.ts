import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { XmUserService } from '@xm-ngx/core/user';
import { DashboardWrapperService } from '@xm-ngx/dashboard';
import { MockDashboardStore } from '../../../src/app/xm-dashboard/shared/testing/mock-dashboard-store';
import { MockUserService } from '@xm-ngx/core/user/testing';

import { SidebarUserComponent } from './sidebar-user.component';
import { XmTranslationTestingModule } from '@xm-ngx/translation';

describe('SidebarUserComponent', () => {
    let component: SidebarUserComponent;
    let fixture: ComponentFixture<SidebarUserComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            imports: [XmTranslationTestingModule, HttpClientTestingModule, RouterTestingModule, NoopAnimationsModule],
            declarations: [SidebarUserComponent],
            providers: [
                { provide: DashboardWrapperService, useClass: MockDashboardStore },
                { provide: XmUserService, useClass: MockUserService },
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SidebarUserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
