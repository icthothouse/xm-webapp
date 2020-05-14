import {
    ChangeDetectorRef,
    Inject,
    Injectable,
    LOCALE_ID,
    OnDestroy,
    Optional,
    Pipe,
    PipeTransform,
} from '@angular/core';
import { TranslatePipe as NgxTranslate, TranslateService } from '@ngx-translate/core';

import { ITranslate, Translate } from './language.service';

export interface ITrKeyTranslates {
    trKey: string;
}

@Injectable()
@Pipe({
    name: 'translate',
    pure: false,
})
export class TranslatePipe extends NgxTranslate implements PipeTransform, OnDestroy {

    constructor(protected translateService: TranslateService,
                @Inject(LOCALE_ID) protected localeId: string,
                @Optional() cdr: ChangeDetectorRef) {
        super(translateService, cdr);
    }

    /**
     * @params {(string | object)} value
     * @description translate
     * @example
     *  // returns Hi
     *  {{ {en: 'Hi', ru: 'хай'} | translate }}
     * @example
     *  // returns Accept
     *  {{ 'global.common.accept' | translate }}
     */
    public transform(value: Translate | ITranslate, ...args: any[]): string | any {
        if (typeof value === 'object' && value !== null) {
            return this.processMap(value, args);
        } else {
            return super.transform(value as string, ...args);
        }
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    private processMap(map: ITranslate | ITrKeyTranslates, ...args: any[]): string | any {
        return map.trKey
            ? super.transform(map.trKey, ...args)
            : (map[this.translateService.currentLang] || map[this.localeId]);
    }
}
