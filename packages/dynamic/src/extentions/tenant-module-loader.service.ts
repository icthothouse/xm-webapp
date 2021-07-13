import { Compiler, Inject, Injectable, NgModuleFactory, Optional } from '@angular/core';
import {
    XM_DYNAMIC_EXTENSIONS,
    XmDynamicExtensionConstructor,
    XmDynamicExtensionEntry
} from './xm-dynamic-extension.injectors';
import { ArgumentException } from '@xm-ngx/shared/exceptions';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class TenantModuleLoaderService {

    constructor(
        @Optional() private compiler: Compiler,
        @Inject(XM_DYNAMIC_EXTENSIONS) private dynamicExtensions: XmDynamicExtensionEntry[]
    ) {
    }

    public async loadTenantModuleFactory<T>(selector: string): Promise<NgModuleFactory<T>> {
        const entry = _.find(_.flatMap(this.dynamicExtensions), i => i.selector == selector) as XmDynamicExtensionEntry<T>;
        if (entry == null) {
            throw new ArgumentException(`ModuleLoader The "${selector}" is not defined!`);
        }
        const moduleCtor: XmDynamicExtensionConstructor<T> = await entry.loadChildren();
        const compiled = await this.compiler.compileModuleAsync(moduleCtor);
        this.compiler.clearCacheFor(moduleCtor);
        return compiled;
    }
}
