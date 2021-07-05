import { Inject, Injectable, Injector } from '@angular/core';
import {
    DynamicTenantLoaderService,
    XM_DYNAMIC_ENTRIES,
    XM_DYNAMIC_EXTENSIONS,
    XmDynamicEntry,
    XmDynamicExtensionEntry
} from '@xm-ngx/dynamic';
import * as _ from 'lodash';
import { from, Observable, Subject } from 'rxjs';

export interface ExtendedDynamicComponents extends XmDynamicEntry {
    globalSelector: string;
}

function provideFullSelector(components: XmDynamicEntry[], prefix?: string): ExtendedDynamicComponents[] {
    const append = prefix ? `${prefix}/` : '';
    return components.map((i) => {
        const globalSelector = `${append}${i.selector}`;
        return { ...i, globalSelector };
    });
}

@Injectable()
export class WidgetListService {

    public widgets: Subject<ExtendedDynamicComponents[]> = new Subject<ExtendedDynamicComponents[]>();
    public widgets$: Observable<ExtendedDynamicComponents[]> = this.widgets.asObservable();

    constructor(
        @Inject(XM_DYNAMIC_EXTENSIONS) private dynamicExtensions: XmDynamicExtensionEntry[],
        @Inject(XM_DYNAMIC_ENTRIES) private dynamicEntries: XmDynamicEntry[],
        private loader: DynamicTenantLoaderService,
        private injector: Injector,
    ) {
    }

    public load(): void {
        const globalWithGlobalSelector = provideFullSelector(_.flatMap(this.dynamicEntries));
        const moduleSelectors = _.flatMap(this.dynamicExtensions).map(i => i.selector);
        const moduleLoaders = moduleSelectors.map((ext) => this.loader.loadTenantModuleRef(ext, this.injector));
        from(Promise.all(moduleLoaders)).subscribe((modules) => {
            const components = modules.map(i => _.flatMap(i.injector.get(XM_DYNAMIC_ENTRIES, [])));
            const componentsWithGlobalSelector = components.map((i, ix) => provideFullSelector(i, moduleSelectors[ix]));
            const allComponents = _.uniq(_.flatMap([...componentsWithGlobalSelector, globalWithGlobalSelector]));
            this.widgets.next(allComponents);
        });
    }
}
