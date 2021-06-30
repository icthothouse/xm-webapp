import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit, Type } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ConditionModule } from '@xm-ngx/components/condition';
import { XmLoadingModule } from '@xm-ngx/components/loading';
import { XmPermissionModule } from '@xm-ngx/core/permission';
import { ThemeSchemeType, XmTheme, XmThemeStore } from '@xm-ngx/core/theme';
import { JavascriptCode } from '@xm-ngx/shared/interfaces';
import { Translate } from '@xm-ngx/translation';
import * as _ from 'lodash';
import { finalize } from 'rxjs/operators';

interface SwitchThemeOptionsTheme {
    theme: string,
    scheme: ThemeSchemeType,
    icon: string,
    color: string,
    tooltip: Translate
}

interface SwitchThemeOptions {
    themes: SwitchThemeOptionsTheme[];
    permission: string;
    condition: JavascriptCode;
}

export const XM_THEME_KEY = 'XM_SWITCH_THEME_KEY';

@Component({
    selector: 'switch-theme-widget',
    template: `
        <ng-container *xmCondition="config.condition; arguments {config: config}">
            <ng-container *xmPermission="config.permission">
                <button *ngIf="nextTheme"
                        (click)="changeTheme(nextTheme)"
                        [xm-loading]="loading"
                        [disabled]="loading"
                        [matTooltip]="nextTheme.tooltip"
                        mat-icon-button>
                    <mat-icon>{{nextTheme.icon}}</mat-icon>
                </button>
            </ng-container>
        </ng-container>
    `,
})
export class SwitchThemeWidget implements OnInit {
    public config: SwitchThemeOptions;
    public loading: boolean;
    public nextTheme: SwitchThemeOptionsTheme;

    constructor(private themeService: XmThemeStore) {
    }

    public ngOnInit(): void {
        const fromStore = this.getFromStore();
        const theme = fromStore ? fromStore.theme : this.themeService.getThemeName();
        const current = _.find(this.config?.themes, { theme });
        this.changeTheme(current);
        this.nextTheme = this.getNext(current);
    }

    public getNext(current: SwitchThemeOptionsTheme): SwitchThemeOptionsTheme | null {
        const idx = _.indexOf(this.config.themes, current);
        return this.config.themes[idx + 1] || this.config.themes[0] || null;
    }

    public changeTheme(theme: SwitchThemeOptionsTheme): void {
        if (this.loading || !this.config?.themes || !theme) {
            return;
        }
        const options: XmTheme = {
            themeColor: theme.color,
            themeStrategy: 'THEME',
            themeScheme: theme.scheme,
        };

        this.setToStore(theme);

        this.loading = true;
        this.themeService.set(theme.theme, options)
            .pipe(finalize(() => this.loading = false))
            .subscribe(() => this.nextTheme = this.getNext(theme));
    }

    public getFromStore(): XmTheme | null {
        const item = localStorage.getItem(XM_THEME_KEY);
        if (!item) {
            return null;
        }
        return JSON.parse(item) || null;
    }

    protected setToStore(theme: XmTheme): void {
        localStorage.setItem(XM_THEME_KEY, JSON.stringify(theme));
    }
}

@NgModule({
    declarations: [SwitchThemeWidget],
    exports: [SwitchThemeWidget],
    imports: [
        CommonModule,
        MatIconModule,
        XmLoadingModule,
        MatButtonModule,
        MatTooltipModule,
        XmPermissionModule,
        ConditionModule,
    ],
})
export class SwitchThemeWidgetModule {
    public entry: Type<SwitchThemeWidget> = SwitchThemeWidget;
}

