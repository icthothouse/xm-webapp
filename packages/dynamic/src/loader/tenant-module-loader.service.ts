import { Injectable } from '@angular/core';
import { ModuleLoader } from './module-loader';
import { XmDynamicNgModuleFactory } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class TenantModuleLoaderService {

    constructor(
        private moduleLoader: ModuleLoader,
    ) {
    }

    public loadTenantModuleFactory<T>(selector: string): Promise<XmDynamicNgModuleFactory<T>> {
        const modulePath = this.resolveTenantModulePath(selector);
        return this.moduleLoader.loadModuleFactory(modulePath);
    }

    public resolveTenantModulePath(module: string): string {
        const commons: string[] = ['ext-common', 'ext-common-csp', 'ext-common-entity'];
        const rootClass = module.split('-').map((e) => e[0].toUpperCase() + e.slice(1)).join('');
        const extName = module.split('ext-').reverse()[0];
        const extRootClass = `${rootClass.replace('Ext', '')}WebappExtModule`;
        let modulePath: string;
        if (commons.includes(module)) {
            modulePath = `src/app/ext-commons/${module}/${module}.module#${rootClass}Module`;
        } else {
            modulePath = `src/app/ext/${extName}-webapp-ext/module/${extName}-webapp-ext.module#${extRootClass}`;
        }
        return modulePath;
    }

}
