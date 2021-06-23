import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { XmTranslationTestingModule } from '@xm-ngx/translation';
import { XmAlertConfigService } from './xm-alert-config.service';

import { XmAlertService } from './xm-alert.service';

describe('XmAlertService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            XmTranslationTestingModule,
            HttpClientTestingModule,
        ],
        providers: [XmAlertConfigService, XmAlertService],
    }));

    it('should be created', () => {
        const service: XmAlertService = TestBed.inject<XmAlertService>(XmAlertService);
        expect(service).toBeTruthy();
    });
});
