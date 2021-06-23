import { Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { SidebarRightService } from '@xm-ngx/components/sidebar-right';
import { XmToasterService } from '@xm-ngx/toaster';

import { DashboardEditorService } from './dashboard-editor.service';

describe('DashboardEditorService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            { provide: SidebarRightService, useValue: null },
            { provide: Router, useValue: null },
            { provide: ActivatedRoute, useValue: null },
            { provide: XmToasterService, useValue: null },
            { provide: Injector, useValue: null },
            DashboardEditorService
        ],
    }));

    it('should be created', () => {
        const service: DashboardEditorService = TestBed.inject<DashboardEditorService>(DashboardEditorService);
        expect(service).toBeTruthy();
    });
});
