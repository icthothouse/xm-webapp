import { InjectionToken } from '@angular/core';

export interface XmDynamicExtensionConstructor<T> {
    new(...args: any[]): T;
}

export interface XmDynamicExtensionEntry<T = unknown> {
    selector: string;
    loadChildren: () => Promise<XmDynamicExtensionConstructor<T>>;
}

export const XM_DYNAMIC_EXTENSIONS = new InjectionToken<XmDynamicExtensionEntry[]>('XM_DYNAMIC_EXTENSION-ENTRIES');
