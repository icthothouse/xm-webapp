import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { XmTranslationTestingModule } from '@xm-ngx/translation';
import { of } from 'rxjs';
import { XmConfigService } from '../../../../../src/app/shared';

import { EntitySpecManagementComponent } from './entity-spec-management.component';

describe('TenantSpecMngComponent', () => {
    let component: EntitySpecManagementComponent;
    let fixture: ComponentFixture<EntitySpecManagementComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: MatDialog, useValue: null },
                { provide: XmConfigService, useValue: { getConfig: () => of(null) } },
            ],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [XmTranslationTestingModule],
            declarations: [EntitySpecManagementComponent],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EntitySpecManagementComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
