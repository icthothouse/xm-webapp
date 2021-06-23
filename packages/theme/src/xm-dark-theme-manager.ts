import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { ThemeSchemeService } from './theme-scheme.service';
import { THEME_STRATEGY, XmTheme, XmThemeStore } from './xm-theme-store.service';
import { ColorSchemeService } from './color-scheme.service';

export interface DarkThemeManagerConfig {
    theme?: string,
    darkTheme?: string,
    themeColor?: string,
    themeStrategy?: THEME_STRATEGY,
}

@Injectable({
    providedIn: 'root',
})
/**
 * Manages light and dark themes
 * @beta
 */
export class XmDarkThemeManager implements OnDestroy {
    private subscription: Subscription;
    private lightTheme: XmTheme | null = null;
    private darkTheme: XmTheme | null = null;

    constructor(
        private themeSchemeService: ThemeSchemeService,
        private colorSchemeService: ColorSchemeService,
        private themeStore: XmThemeStore,
    ) {
        this.subscription = this.themeSchemeService.browserThemeChange$().subscribe((e) => {
            if (this.darkTheme && e === 'dark') {
                return this.themeStore.set(this.darkTheme.theme, this.darkTheme);
            } else {
                return this.themeStore.set(this.lightTheme.theme, this.lightTheme);
            }
        });
    }

    public set(config: DarkThemeManagerConfig): Observable<void> {
        this.lightTheme = {
            theme: config.theme,
            themeColor: config.themeColor,
            themeStrategy: config.themeStrategy,
            themeScheme: 'light',
        };

        if (config.darkTheme) {
            this.darkTheme = {
                theme: config.darkTheme,
                themeColor: config.themeColor,
                themeStrategy: config.themeStrategy,
                themeScheme: 'dark',
            };
        } else {
            this.darkTheme = null;
        }

        if (config.darkTheme) {
            this.colorSchemeService.set('dark light');
        } else {
            this.colorSchemeService.set('normal');
        }

        let theme = this.lightTheme;

        const themeScheme = this.themeSchemeService.getBrowserTheme();
        if (config.darkTheme && themeScheme === 'dark') {
            theme = this.darkTheme;
        }

        return this.themeStore.set(theme.theme, theme);
    }


    public ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }
}
