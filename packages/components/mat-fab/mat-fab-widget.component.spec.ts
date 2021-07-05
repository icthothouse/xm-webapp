import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MatFabWidget } from './mat-fab-widget.component';
import { XmTranslationTestingModule } from '@xm-ngx/translation';

describe('MatFabWidget', () => {
    let component: MatFabWidget;
    let fixture: ComponentFixture<MatFabWidget>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [XmTranslationTestingModule, HttpClientTestingModule, RouterTestingModule],
            declarations: [MatFabWidget],
            schemas: [NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MatFabWidget);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
