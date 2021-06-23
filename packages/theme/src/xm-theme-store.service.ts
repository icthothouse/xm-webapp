import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { XmApplicationConfigService } from '../../../src/app/shared/spec';
import { StyleManagerService } from './style-manager.service';
import { ThemeColorService } from './theme-color.service';
import { ThemeSchemeState, ThemeSchemeType } from './theme-scheme.state';

export type THEME_STRATEGY = 'THEME' | 'TENANT_ONLY';

export interface XmTheme {
    theme?: string,
    themeColor?: string,
    themeScheme?: ThemeSchemeType,
    themeStrategy?: THEME_STRATEGY
}

@Injectable({
    providedIn: 'root',
})
/**
 * Stores an active theme.
 * @beta
 */
export class XmThemeStore {
    private activeTheme: BehaviorSubject<XmTheme | null> = new BehaviorSubject<XmTheme | null>(null);

    constructor(
        private styleManager: StyleManagerService,
        private themeColorService: ThemeColorService,
        private applicationConfigService: XmApplicationConfigService,
    ) {
    }

    public getThemeName(): string | null {
        return this.activeTheme.getValue()?.theme || null;
    }

    public activeTheme$(): Observable<XmTheme | null> {
        return this.activeTheme.asObservable();
    }

    public activeThemeSchemeChange$(): Observable<ThemeSchemeState> {
        return this.activeTheme$().pipe(
            map((theme) => {
                if (!theme) {
                    return {
                        scheme: 'light',
                        isDark: false,
                    };
                }

                return ({ scheme: theme.themeScheme, isDark: theme.themeScheme === 'dark' });
            }),
        );
    }

    public set(theme: string | null, options?: XmTheme): Observable<void> {
        if (!theme) {
            this.styleManager.remove('theme');
            this.themeColorService.remove();
            this.applicationConfigServiceBC();
            this.activeTheme.next(null);
            return of(undefined);
        }

        this.activeTheme.next({ theme, ...options });

        if (options?.themeColor) {
            this.themeColorService.set(options.themeColor);
        }

        if (options?.themeStrategy === 'TENANT_ONLY') {
            return this.styleManager.setAsync('theme', `assets/css/${theme}.css`)
                .pipe(finalize(() => this.applicationConfigServiceBC()));
        } else {
            return this.styleManager.setAsync('theme', this.getUrl(theme))
                .pipe(finalize(() => this.applicationConfigServiceBC()));
        }
    }

    public getUrl(theme: string): string {
        return `/assets/themes/${theme}.css`;
    }

    /**
     * Backward compatibility
     */
    private applicationConfigServiceBC(): void {
        this.applicationConfigService.setResolved(true);
    }
}
