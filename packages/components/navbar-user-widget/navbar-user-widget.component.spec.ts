import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { XmTranslationTestingModule } from '@xm-ngx/translation';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { NavbarUserWidgetComponent } from './navbar-user-widget.component';
import { DashboardStore } from '@xm-ngx/dashboard';
import { MockDashboardStore } from '@xm-ngx/dashboards/testing';
import { XmUserService } from '@xm-ngx/core/user';
import { MockUserService } from '@xm-ngx/core/user/testing';
import { MatMenuModule } from '@angular/material/menu';


describe('NavbarUserWidgetComponent', () => {
    let component: NavbarUserWidgetComponent;
    let fixture: ComponentFixture<NavbarUserWidgetComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            imports: [
                MatMenuModule,
                XmTranslationTestingModule,
                HttpClientTestingModule,
                RouterTestingModule,
                NoopAnimationsModule,
            ],
            declarations: [NavbarUserWidgetComponent],
            providers: [
                { provide: DashboardStore, useClass: MockDashboardStore },
                { provide: XmUserService, useClass: MockUserService },
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavbarUserWidgetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
