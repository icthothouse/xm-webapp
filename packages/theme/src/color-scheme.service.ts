import { Injectable } from '@angular/core';

export type ColorSchemeType = 'normal' | 'dark light'

@Injectable({ providedIn: 'root' })
/**
 * Creates a meta tag for the color-scheme
 *
 * @public
 */
export class ColorSchemeService {
    public remove(): void {
        const existingLinkElement = getExistingColorSchemeElementByKey();
        if (existingLinkElement) {
            document.head.removeChild(existingLinkElement);
        }
    }

    public set(value: ColorSchemeType): void {
        getColorSchemeElementForKey().setAttribute('content', value);
    }
}

function getColorSchemeElementForKey(): HTMLMetaElement {
    return getExistingColorSchemeElementByKey() || createColorSchemeElementWithKey();
}

function getExistingColorSchemeElementByKey(): HTMLMetaElement {
    return document.head.querySelector('meta[name="color-scheme"]');
}

function createColorSchemeElementWithKey(): HTMLMetaElement {
    const el = document.createElement('meta');
    el.setAttribute('name', 'color-scheme');
    document.head.appendChild(el);
    return el;
}
