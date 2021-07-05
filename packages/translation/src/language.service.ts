import { Injectable, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { XmEventManager } from '@xm-ngx/core';
import { XmUiConfigService } from '@xm-ngx/core/config';
import { XmUserService } from '@xm-ngx/core/user';
import { OnInitialize } from '@xm-ngx/shared/interfaces';
import { takeUntilOnDestroy, takeUntilOnDestroyDestroy } from '@xm-ngx/shared/operators';
import { SessionStorageService } from 'ngx-webstorage';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';
import * as moment from 'moment';

import { getBrowserLocale } from './getBrowserLocale';
import { LANGUAGES } from './language.constants';

/**
 * Translates as json
 *
 * @example
 * ```
 *  {en: 'Hi', ru: 'хай'}
 * ```
 */
export interface ITranslate {
    en?: string;
    ru?: string;
    uk?: string;

    [locale: string]: string;
}

/**
 * Translate for a translate pipe.
 *
 * @example
 * ```
 * {en: 'Hi', ru: 'хай'}
 * ```
 *
 * @example
 * ```
 * 'Hi'
 * ```
 */
export type Translate = ITranslate | string;

export const EVENT_CHANGE_LOCALE = 'TRANSLATION.EVENT_CHANGE_LOCALE';
export const SESSION_LOCALE = 'currentLang';

export type Locale = string | 'en' | 'ru' | 'uk';

@Injectable({ providedIn: 'root' })
export class LanguageService implements OnDestroy, OnInitialize {
    public locale$: Observable<Locale | null>;

    protected $locale: BehaviorSubject<Locale>;

    protected userLocale: string | undefined;
    protected configLocale: string | undefined;

    constructor(
        protected eventManager: XmEventManager,
        protected translate: TranslateService,
        protected userService: XmUserService,
        protected configService: XmUiConfigService<{ langs: Locale[] }>,
        protected sessionStorage: SessionStorageService,
    ) {
        this.$locale = new BehaviorSubject<Locale | null>(null);
        this.locale$ = this.$locale.asObservable();
        this.onUserLocale();
        this.onConfigLocale();
    }

    public get locale(): Locale {
        return this.$locale.getValue()
            || this.getUserLocale()
            || this.getSessionLocale()
            // TODO: if BrowserLocale isn't supported by our app when return null
            || this.getBrowserLocale()
            || this.getConfigLocale()
            || this.getDefaultLocale();
    }

    public set locale(value: Locale) {
        this.update(value);
        console.info('TRANSLATION Locale changed:', value);
    }

    /** Get default languages list */
    public get languages(): Locale[] {
        return LANGUAGES;
    }

    /** Get languages list from config or default */
    public languages$(): Observable<Locale[]> {
        return this.configService.config$().pipe(
            map((c) => c?.langs ? c.langs : this.languages),
        );
    }

    public ngOnDestroy(): void {
        this.$locale.complete();
        takeUntilOnDestroyDestroy(this);
    }

    /**
     * Set html lang
     * @example
     * ```
     * <html lang="en">
     * ```
     */
    public setLangHTMLAttr(locale: Locale): void {
        document.documentElement.setAttribute('lang', locale);
    }

    /** Get the user locale */
    public getUserLocale(): Locale | null {
        return this.userLocale;
    }

    /** Get a locale form the session Storage */
    public getSessionLocale(): Locale | null {
        return this.sessionStorage.retrieve(SESSION_LOCALE);
    }

    /** Get a locale form the xm-webapp configuration */
    public getConfigLocale(): Locale | null {
        return this.configLocale;
    }

    /** Get a locale form the browser */
    public getBrowserLocale(): Locale | null {
        return getBrowserLocale();
    }

    /** Get a default locale */
    public getDefaultLocale(): Locale {
        return 'en';
    }

    public init(): void {
        (
            this.getSessionLocale()
                ? of(this.locale)
                : this.configService.config$()
                    .pipe(
                        filter((c) => Boolean(c)),
                        first(),
                        map(c => c && c.langs && c.langs[0] ? c.langs[0] : null)
                    )
        ).subscribe(locale => {
            moment.locale(locale);
            this.translate.setDefaultLang(locale);
            this.update(locale);
        });
    }

    protected update(locale: string): void {
        // TODO: v2: rewrite below as listeners of the $locale
        this.translate.use(locale);
        this.sessionStorage.store(SESSION_LOCALE, locale);
        this.translate.getTranslation(locale).subscribe((res) => {
            LANGUAGES.forEach((lang) => this.sessionStorage.clear(lang));
            this.sessionStorage.store(locale, JSON.stringify(res));
        });
        this.setLangHTMLAttr(locale);

        this.$locale.next(locale);
        this.eventManager.broadcast({ name: EVENT_CHANGE_LOCALE, content: locale });
    }

    protected onUserLocale(): void {
        this.userService.user$()
            .pipe(takeUntilOnDestroy(this))
            .subscribe((u) => this.userLocale = u && u.langKey ? u.langKey : null);
    }

    protected onConfigLocale(): void {
        this.configService.config$()
            .pipe(takeUntilOnDestroy(this))
            .subscribe((c) => this.configLocale = c && c.langs && c.langs[0] ? c.langs[0] : null);
    }
}
