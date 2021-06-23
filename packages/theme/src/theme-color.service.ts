import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
/**
 * Creates a 'theme-color' meta tag
 * @public
 */
export class ThemeColorService {
    public remove(): void {
        const existingLinkElement = getExistingThemeColorElementByKey();
        if (existingLinkElement) {
            document.head.removeChild(existingLinkElement);
        }
    }

    public set(color: string): void {
        getThemeColorElementForKey().setAttribute('content', color);
    }
}

function getThemeColorElementForKey(): HTMLMetaElement {
    return getExistingThemeColorElementByKey() || createThemeColorElementWithKey();
}

function getExistingThemeColorElementByKey(): HTMLMetaElement {
    return document.head.querySelector('meta[name="theme-color"]');
}

function createThemeColorElementWithKey(): HTMLMetaElement {
    const el = document.createElement('meta');
    el.setAttribute('name', 'theme-color');
    document.head.appendChild(el);
    return el;
}

