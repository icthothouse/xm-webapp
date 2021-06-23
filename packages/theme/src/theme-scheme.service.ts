import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ThemeSchemeType } from './theme-scheme.state';

@Injectable({ providedIn: 'root' })
/**
 * Returns an information about the browser theme scheme
 * @public
 */
export class ThemeSchemeService {

    public getBrowserTheme(): ThemeSchemeType {
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        return prefersDarkScheme.matches ? 'dark' : 'light';
    }

    public browserThemeChange$(): Observable<ThemeSchemeType> {
        return fromEvent<MediaQueryList>(window.matchMedia('(prefers-color-scheme: dark)'), 'change').pipe(
            map((e) => e.matches ? 'dark' : 'light'),
        );
    }

}
