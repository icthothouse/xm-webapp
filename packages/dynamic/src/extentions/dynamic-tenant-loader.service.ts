import { ComponentFactory, Injectable, Injector, NgModuleFactory, NgModuleRef, Type } from '@angular/core';

import { TenantModuleLoaderService } from './tenant-module-loader.service';
import { DynamicSearcher } from '../searcher/dynamic-searcher';
import { ModuleLoader } from '../loader/module-loader';
import { isComponentDef, isModuleDef } from '../loader/dynamic-loader.service';
import { XmDynamicNgModuleFactory } from '../interfaces/xm-dynamic-entry';

@Injectable({
    providedIn: 'root',
})
export class DynamicTenantLoaderService {

    constructor(
        private dynamicSearcher: DynamicSearcher,
        private moduleLoaderService: ModuleLoader,
        private tenantModuleLoaderService: TenantModuleLoaderService,
        private moduleRef: NgModuleRef<unknown>,
    ) {
    }

    public async load<T>(selector: string): Promise<Type<T> | null> {
        return (await this.loadAndResolve(selector)).componentType;
    }

    public async loadAndResolve<T>(
        selector: string,
        injector: Injector = this.moduleRef.injector,
    ): Promise<ComponentFactory<T> | null> {
        const moduleSelector = selector.split('/')[0];
        const moduleRef = await this.loadTenantModuleRef<T>(moduleSelector, injector);
        const componentSelector = selector.split('/')[1];
        return await this.getComponentFromInjector<T>(componentSelector, moduleRef);
    }

    /**
     * @param selector - e.g. ext-entity
     * @param injector - angular injector
     */
    public async loadTenantModuleRef<T>(
        selector: string,
        injector: Injector = this.moduleRef.injector,
    ): Promise<NgModuleRef<T> | null> {
        if (!selector || typeof selector !== 'string') {
            return null;
        }

        const moduleFactoryRef = await this.tenantModuleLoaderService.loadTenantModuleFactory<T>(selector);
        return moduleFactoryRef.create(injector);
    }

    /**
     * @param selector - e.g. my-example-widget
     * @param moduleRef - module container
     */
    public async getComponentFromInjector<T>(
        selector: string,
        moduleRef: NgModuleRef<T>,
    ): Promise<ComponentFactory<T> | null> {
        const moduleFac = await this.dynamicSearcher.search(selector, { injector: moduleRef.injector });

        if (moduleFac instanceof NgModuleFactory || isModuleDef(moduleFac)) {
            const moduleFactory = await this.moduleLoaderService.loadModuleFactory<T>(moduleFac as XmDynamicNgModuleFactory<T>);
            return this.getComponentFromModuleAndResolve(moduleFactory, moduleRef.injector);
        } else if (isComponentDef(moduleFac)) {
            return moduleRef.componentFactoryResolver.resolveComponentFactory(moduleFac as Type<T>);
        } else {
            return null;
        }
    }

    public getComponentFromModuleAndResolve<T>(
        moduleFactory: XmDynamicNgModuleFactory<T>,
        injector: Injector = this.moduleRef.injector,
    ): ComponentFactory<T> {
        const elementModuleRef = moduleFactory.create(injector);

        if (!elementModuleRef.instance.entry) {
            throw new Error(`ERROR: the "${moduleFactory.moduleType}" module expected to have `
                + 'a "entry" field!'
                + 'E.g. class MyModule{ entry = YourComponent; }');
        }

        return elementModuleRef.componentFactoryResolver.resolveComponentFactory(elementModuleRef.instance.entry);
    }

}
