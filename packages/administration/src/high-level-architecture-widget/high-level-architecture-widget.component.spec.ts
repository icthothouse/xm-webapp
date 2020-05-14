import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { XmSharedTestingModule } from '@xm-ngx/shared';

import { HighLevelArchitectureWidgetComponent } from './high-level-architecture-widget.component';

describe('HighLevelArchitectureWidgetComponent', () => {
    let component: HighLevelArchitectureWidgetComponent;
    let fixture: ComponentFixture<HighLevelArchitectureWidgetComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [XmSharedTestingModule, HttpClientTestingModule],
            declarations: [HighLevelArchitectureWidgetComponent],
            schemas: [NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HighLevelArchitectureWidgetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
