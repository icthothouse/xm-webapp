import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { XM_DYNAMIC_EXTENSIONS, XmDynamicExtensionEntry } from './xm-dynamic-extension.injectors';

export function dynamicExtensionModuleInitializer(components: XmDynamicExtensionEntry[]): Provider {
    return [{ provide: XM_DYNAMIC_EXTENSIONS, multi: true, useValue: components }];
}

@NgModule()
export class XmDynamicExtensionModule {
    public static forRoot(components: XmDynamicExtensionEntry[]): ModuleWithProviders<XmDynamicExtensionModule> {
        return {
            ngModule: XmDynamicExtensionModule,
            providers: [
                dynamicExtensionModuleInitializer(components),
            ],
        };
    }

    public static forChild(components: XmDynamicExtensionEntry[]): ModuleWithProviders<XmDynamicExtensionModule> {
        return {
            ngModule: XmDynamicExtensionModule,
            providers: [dynamicExtensionModuleInitializer(components)],
        };
    }
}
