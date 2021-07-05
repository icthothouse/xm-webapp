import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XmLinkButtonComponent } from './xm-link-button.component';
import { XmTranslationTestingModule } from '@xm-ngx/translation';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatFabWidget } from '@xm-ngx/components/mat-fab/mat-fab-widget.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('XmLinkButtonComponent', () => {
    let component: XmLinkButtonComponent;
    let fixture: ComponentFixture<XmLinkButtonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [XmTranslationTestingModule, HttpClientTestingModule, RouterTestingModule],
            declarations: [MatFabWidget],
            schemas: [NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(XmLinkButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
