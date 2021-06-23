import { TestBed } from '@angular/core/testing';
import { StyleManagerService, ThemeColorService } from '@xm-ngx/core/theme';
import { XmApplicationConfigService } from '../../../src/app/shared/spec';

import { XmThemeStore } from './xm-theme-store.service';

describe('XmThemeStore', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            XmThemeStore,
            { provide: StyleManagerService, useValue: {} },
            { provide: ThemeColorService, useValue: {} },
            { provide: XmApplicationConfigService, useValue: {} },
        ],
    }));

    it('should be created', () => {
        const service: XmThemeStore = TestBed.inject<XmThemeStore>(XmThemeStore);
        expect(service).toBeTruthy();
    });
});
