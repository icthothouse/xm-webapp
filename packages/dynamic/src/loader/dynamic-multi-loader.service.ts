import { ComponentFactory, Injectable, Injector, Type } from '@angular/core';
import { DynamicTenantLoaderService } from '../extentions/dynamic-tenant-loader.service';
import { DynamicLoader } from './dynamic-loader';
import { DynamicLoaderService } from './dynamic-loader.service';

@Injectable({
    providedIn: 'root',
})
export class DynamicMultiLoaderService implements DynamicLoader {

    constructor(
        private dynamicLoaderService: DynamicLoaderService,
        private dynamicTenantLoaderService: DynamicTenantLoaderService,
    ) {
    }

    public async load<T>(
        selector: string,
        options?: { injector?: Injector },
    ): Promise<Type<T> | null> {
        return (await this.loadAndResolve(selector, options)).componentType;
    }

    public async loadAndResolve<T>(
        selector: string,
        options?: { injector?: Injector },
    ): Promise<ComponentFactory<T> | null> {
        return await this.dynamicLoaderService.loadAndResolve(selector, options?.injector)
            || await this.dynamicTenantLoaderService.loadAndResolve(selector, options?.injector);
    }
}
