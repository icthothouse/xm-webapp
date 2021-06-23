import { NgModuleFactoryLoader } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { DynamicTenantLoaderService } from './dynamic-tenant-loader.service';
import { DynamicSearcher } from '../searcher/dynamic-searcher';

describe('DynamicTenantLoaderService', () => {
    let service: DynamicTenantLoaderService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: DynamicSearcher, useValue: null },
                { provide: NgModuleFactoryLoader, useValue: null },
                DynamicTenantLoaderService,
            ],
        });
        service = TestBed.inject<DynamicTenantLoaderService>(DynamicTenantLoaderService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
