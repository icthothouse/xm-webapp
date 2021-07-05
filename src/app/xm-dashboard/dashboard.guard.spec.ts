import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { XmLoggerService } from '@xm-ngx/logger';
import { MockXmLogger } from '@xm-ngx/logger/testing';

import { DashboardGuard } from './dashboard.guard';
import { DashboardStore } from './shared/dashboard-store.service';
import { DefaultDashboardService } from './shared/default-dashboard.service';

describe('DashboardGuard', () => {
    let guard: DashboardGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                DashboardGuard,
                { provide: XmLoggerService, useClass: MockXmLogger },
                { provide: DashboardStore, useValue: {} },
                { provide: DefaultDashboardService, useValue: {} },
            ],
            imports: [RouterTestingModule],
        });
        guard = TestBed.inject<DashboardGuard>(DashboardGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });
});
