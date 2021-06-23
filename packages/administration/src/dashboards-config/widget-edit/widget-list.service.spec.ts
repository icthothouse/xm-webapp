import { ApplicationRef, Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TranslationService } from '@xm-ngx/administration/translations/services/translation.service';
import { DynamicTenantLoaderService } from '@xm-ngx/dynamic';
import { of } from 'rxjs';

import { WidgetListService } from './widget-list.service';

describe('WidgetListService', () => {
    let service: WidgetListService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                WidgetListService,
                { provide: TranslationService, useValue: { loadConfig: () => of(null) } },
                { provide: DynamicTenantLoaderService, useValue: null },
                { provide: Injector, useValue: null },
                { provide: ApplicationRef, useValue: null },
            ],
            imports: [],
        });
        service = TestBed.inject<WidgetListService>(WidgetListService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
