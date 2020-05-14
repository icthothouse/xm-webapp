import { Inject, Injectable, LOCALE_ID, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { XmEventManager, XmUiConfigService, XmUserService } from '@xm-ngx/core';
import { takeUntilOnDestroy, takeUntilOnDestroyDestroy } from '@xm-ngx/shared/operators';
import { SessionStorageService } from 'ngx-webstorage';
import { BehaviorSubject, Observable } from 'rxjs';

import { getBrowserLocale } from './getBrowserLocale';
import { LANGUAGES } from './language.constants';
import { OnInitialize } from './title.service';

/** @description Translates as json
 * @example:
 *  {en: 'Hi', ru: 'хай'}
 */
export interface ITranslate {
    en?: string;
    ru?: string;
    uk?: string;

    [locale: string]: string;
}

/** @description Translate for a translate pipe.
 * @example:
 * {en: 'Hi', ru: 'хай'}
 * @example:
 * 'Hi'
 */
export type Translate = ITranslate | string;

export const EVENT_CHANGE_LOCALE = 'TRANSLATION.EVENT_CHANGE_LOCALE';
export const SESSION_LOCALE = 'currentLang';

export type Locale = string | 'en' | 'ru' | 'uk';

@Injectable({providedIn: 'root'})
export class LanguageService implements OnDestroy, OnInitialize {
    public locale$: Observable<Locale | null>;

    protected $locale: BehaviorSubject<Locale>;

    protected userLocale: string | undefined;
    protected configLocale: string | undefined;

    constructor(
        protected eventManager: XmEventManager,
        @Inject(LOCALE_ID) protected localeId: string,
        protected translate: TranslateService,
        protected userService: XmUserService,
        protected configService: XmUiConfigService<{ langs: string[] }>,
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

    /** @description Get languages list */
    public get languages(): Locale[] {
        return LANGUAGES;
    }

    public ngOnDestroy(): void {
        this.$locale.complete();
        takeUntilOnDestroyDestroy(this);
    }

    /** @description Set html lang
     *  @example <html lang="en">
     */
    public setLangHTMLAttr(locale: Locale): void {
        document.documentElement.setAttribute('lang', locale);
    }

    /** @description Get the user locale */
    public getUserLocale(): Locale | null {
        return this.userLocale;
    }

    /** @description Get a locale form the session Storage */
    public getSessionLocale(): Locale | null {
        return this.sessionStorage.retrieve(SESSION_LOCALE);
    }

    /** @description Get a locale form the xm-webapp configuration */
    public getConfigLocale(): Locale | null {
        return this.configLocale;
    }

    /** @description Get a locale form the browser */
    public getBrowserLocale(): Locale | null {
        return getBrowserLocale();
    }

    /** @description Get a default locale */
    public getDefaultLocale(): Locale {
        return this.localeId;
    }

    public init(): void {
        const locale = this.locale;
        this.translate.setDefaultLang(locale);
        this.update(locale);
    }

    protected update(locale: string): void {
        // TODO v2: rewrite below as listeners of the $locale
        this.translate.use(locale);
        this.sessionStorage.store(SESSION_LOCALE, locale);
        this.translate.getTranslation(locale).subscribe((res) => {
            LANGUAGES.forEach((lang) => this.sessionStorage.clear(lang));
            this.sessionStorage.store(locale, JSON.stringify(res));
        });
        this.setLangHTMLAttr(locale);

        this.$locale.next(locale);
        this.eventManager.broadcast({name: EVENT_CHANGE_LOCALE, content: locale});
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
