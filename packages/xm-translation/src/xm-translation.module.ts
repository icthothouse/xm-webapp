import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { LOCALE_ID, ModuleWithProviders, NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { JhiLanguageService } from 'ng-jhipster';

import { JhiLanguageHelper } from './language.helper';
import { ModulesLanguageHelper } from './modules-language.helper';
import { XmJhiLanguageService } from './jhiLanguage.service';
import { LanguageService } from './language.service';
import { TranslateDirective } from './translate.directive';
import { TranslatePipe } from './translate.pipe';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http, './i18n/', '.json');
}

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [TranslatePipe, TranslateDirective],
    providers: [
        TranslatePipe,
        JhiLanguageHelper,
        {provide: JhiLanguageService, useClass: XmJhiLanguageService, deps: [LanguageService]},
        ModulesLanguageHelper,
    ],
    exports: [TranslatePipe, TranslateDirective],
})
export class XmTranslationModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: XmTranslationModule,
            providers: [
                {provide: JhiLanguageService, useClass: XmJhiLanguageService, deps: [LanguageService]},
                Title,
                {provide: LOCALE_ID, useValue: 'en'},
                LanguageService,
            ],
        };
    }

    public static forChild(): ModuleWithProviders {
        return {
            ngModule: XmTranslationModule,
            providers: [],
        };
    }

}
