import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountService, Principal } from '@xm-ngx/core/auth';
import { LanguageService, TitleService, XmTranslationTestingModule } from '@xm-ngx/translation';
import { MockPrincipalService } from '../../../../src/app/shared/auth/testing/mock-principal.service';
import { MockLanguageService } from '../../../translation/src/testing/xm-translation-testing.module';

import { XmUserSettingsWidgetComponent } from './xm-user-settings-widget.component';

describe('XmUserSettingsWidgetComponent', () => {
    let component: XmUserSettingsWidgetComponent;
    let fixture: ComponentFixture<XmUserSettingsWidgetComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [XmTranslationTestingModule],
            providers: [
                { provide: Principal, useClass: MockPrincipalService },
                { provide: LanguageService, useClass: MockLanguageService },
                { provide: TitleService, useValue: null },
                { provide: AccountService, useValue: null },
            ],
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [XmUserSettingsWidgetComponent],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(XmUserSettingsWidgetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
