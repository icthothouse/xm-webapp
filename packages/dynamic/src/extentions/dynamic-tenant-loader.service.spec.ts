import { NgModuleRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { DynamicTenantLoaderService } from './dynamic-tenant-loader.service';
import { DynamicSearcher } from '../searcher/dynamic-searcher';
import { ModuleLoader } from '@xm-ngx/dynamic/src/loader/module-loader';
import { TenantModuleLoaderService } from '@xm-ngx/dynamic';

describe('DynamicTenantLoaderService', () => {
    let service: DynamicTenantLoaderService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: DynamicSearcher, useValue: null },
                { provide: ModuleLoader, useValue: null },
                { provide: TenantModuleLoaderService, useValue: null },
                { provide: NgModuleRef, useValue: null },
                DynamicTenantLoaderService
            ],
        });
        service = TestBed.inject<DynamicTenantLoaderService>(DynamicTenantLoaderService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
