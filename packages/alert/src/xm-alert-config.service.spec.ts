import { TestBed } from '@angular/core/testing';
import { XmTranslationTestingModule } from '@xm-ngx/translation';

import { XmAlertConfigService } from './xm-alert-config.service';

describe('XmAlertConfigService', () => {
    beforeEach(() => TestBed.configureTestingModule({ imports: [XmTranslationTestingModule] }));

    it('should be created', () => {
        const service: XmAlertConfigService = TestBed.inject<XmAlertConfigService>(XmAlertConfigService);
        expect(service).toBeTruthy();
    });
});
