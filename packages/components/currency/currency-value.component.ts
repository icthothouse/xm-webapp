import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule, ViewEncapsulation } from '@angular/core';
import {
    XmDynamicPresentation,
    XmDynamicPresentationConstructor,
    XmDynamicPresentationEntryModule,
} from '@xm-ngx/dynamic';
import * as _ from 'lodash';

export interface ICurrencyOptions {
    currencyCode?: string;
    display?: ('code' | 'symbol' | 'symbol-narrow') | boolean;
    digitsInfo?: string;
    locale?: string;
}

export const CURRENCY_DEFAULT: ICurrencyOptions = {
    display: false,
};

@Component({
    selector: 'xm-currency-value',
    template: '{{ value | currency:_options.currencyCode:_options.display:_options.digitsInfo:_options.locale }}',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default,
})
export class CurrencyValueComponent implements XmDynamicPresentation<string, ICurrencyOptions> {

    @Input() public value: string;
    public _options: ICurrencyOptions;

    public get options(): ICurrencyOptions {
        return this._options;
    }

    @Input()
    public set options(value: ICurrencyOptions) {
        this._options = _.defaults({}, value, CURRENCY_DEFAULT);
    }

}

@NgModule({
    exports: [CurrencyValueComponent],
    declarations: [CurrencyValueComponent],
    imports: [CommonModule],
})
export class XmCurrencyValueModule implements XmDynamicPresentationEntryModule {
    public entry: XmDynamicPresentationConstructor = CurrencyValueComponent;
}
