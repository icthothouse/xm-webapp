import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { DashboardStore } from '@xm-ngx/dashboard';
import { XmTranslationTestingModule } from '@xm-ngx/translation';
import { of } from 'rxjs';

import { ConditionDashboardDialogComponent } from './condition-dashboard-dialog.component';

describe('ConditionDashboardDialogComponent', () => {
    let component: ConditionDashboardDialogComponent;
    let fixture: ComponentFixture<ConditionDashboardDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            imports: [XmTranslationTestingModule],
            declarations: [ConditionDashboardDialogComponent],
            providers: [
                { provide: MatDialogRef, useValue: {} },
                { provide: DashboardStore, useValue: { dashboards$: () => of() } },
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ConditionDashboardDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
