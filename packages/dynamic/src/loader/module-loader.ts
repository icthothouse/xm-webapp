import { Compiler, Injectable, NgModuleFactory, NgModuleFactoryLoader, Optional } from '@angular/core';
import { XmDynamicNgModuleFactory } from '../interfaces';

@Injectable({ providedIn: 'root'})
export class ModuleLoader {

    constructor(
        @Optional() private compiler: Compiler,
        private loader: NgModuleFactoryLoader,
    ) {
    }

    public async loadModuleFactory<T>(
        moduleImport: Promise<XmDynamicNgModuleFactory<T>> | XmDynamicNgModuleFactory<T> | string,
    ): Promise<XmDynamicNgModuleFactory<T>> {
        let elementModuleOrFactory: XmDynamicNgModuleFactory<T>;
        if (typeof moduleImport === 'string') {
            elementModuleOrFactory = await this.loader.load(moduleImport);
        } else if (moduleImport instanceof Promise) {
            elementModuleOrFactory = await moduleImport;
        } else {
            elementModuleOrFactory = moduleImport;
        }

        let elModuleFactory: XmDynamicNgModuleFactory<T>;
        if (elementModuleOrFactory instanceof NgModuleFactory) {
            elModuleFactory = elementModuleOrFactory;
        } else {
            elModuleFactory = await this.compiler.compileModuleAsync(elementModuleOrFactory) as XmDynamicNgModuleFactory<T>;
            this.compiler.clearCacheFor(elementModuleOrFactory);
        }

        return elModuleFactory;
    }

}
