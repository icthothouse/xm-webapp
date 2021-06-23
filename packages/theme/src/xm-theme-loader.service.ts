import { APP_INITIALIZER, Injectable, Provider, StaticProvider } from '@angular/core';
import { MaintenanceService } from '@xm-ngx/components/maintenance';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { XmPublicUiConfigService } from '../../core/src/xm-public-ui-config.service';
import { DarkThemeManagerConfig, XmDarkThemeManager } from './xm-dark-theme-manager';

export function themeInitializer(
    config: XmPublicUiConfigService,
    themeService: XmDarkThemeManager,
    maintenanceService: MaintenanceService,
): () => Promise<void> {
    return (): Promise<void> => new XmThemeLoader(config, themeService, maintenanceService).loadThemeFromConfig();
}

export const THEME_PROVIDER_FACTORY: StaticProvider = {
    provide: APP_INITIALIZER,
    useFactory: themeInitializer,
    deps: [XmPublicUiConfigService, XmDarkThemeManager, MaintenanceService],
    multi: true,
};

export function themeInitializerFactory(): Provider[] {
    return [THEME_PROVIDER_FACTORY];
}

export type XmThemeConfig = DarkThemeManagerConfig;

@Injectable()
/**
 * Applies a theme from configs
 * @beta
 */
export class XmThemeLoader {
    constructor(
        private configService: XmPublicUiConfigService<XmThemeConfig>,
        private themeManager: XmDarkThemeManager,
        private maintenanceService: MaintenanceService,
    ) {
    }

    public loadThemeFromConfig(): Promise<void> {
        return this.configService.config$().pipe(
            switchMap((c) => this.loadTheme(c)),
            take(1),
            catchError((err) => {
                this.maintenanceService.setMaintenanceProgress(true);
                return throwError(err);
            }),
        ).toPromise();
    }

    private loadTheme(rawOptions: XmThemeConfig): Observable<void> {
        const options: DarkThemeManagerConfig = {
            theme: rawOptions.theme,
            darkTheme: rawOptions.darkTheme,
            themeColor: rawOptions.themeColor,
            themeStrategy: rawOptions.themeStrategy,
        };
        return this.themeManager.set(options);
    }
}
