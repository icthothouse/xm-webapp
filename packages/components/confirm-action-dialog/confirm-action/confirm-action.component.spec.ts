import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { XmTranslationTestingModule } from '@xm-ngx/translation';

import { ConfirmActionComponent } from './confirm-action.component';

describe('ConfirmActionComponent', () => {
    let component: ConfirmActionComponent;
    let fixture: ComponentFixture<ConfirmActionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [XmTranslationTestingModule],
            schemas:[NO_ERRORS_SCHEMA],
            declarations: [ConfirmActionComponent],
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ConfirmActionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
