import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { XmDynamicPresentation } from '@xm-ngx/dynamic';
import { Translate } from '@xm-ngx/translation';
import { keyBy, mapValues } from 'lodash';

type Titles = { [value: string]: Translate } | Translate[];

export type XmEnumValue = boolean | string | number;

export interface XmEnumOptionsItem {
    title: Translate;
    value: XmEnumValue;
}

export interface XmEnumOptions {
    /** @deprecated use {@link items} instead */
    titles?: Titles;
    items: XmEnumOptionsItem[];
}

@Component({
    selector: 'xm-enum',
    template: `
        {{(titles[value + ''] || value) | translate}}
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default,
})
export class XmEnumComponent implements XmDynamicPresentation<XmEnumValue, XmEnumOptions> {
    @Input() public value: XmEnumValue;

    public titles: Titles = {};
    private _options: XmEnumOptions = { items: [] };

    public get options(): XmEnumOptions {
        return this._options;
    }

    @Input()
    public set options(options: XmEnumOptions) {
        if (options?.titles) {
            this.titles = options?.titles;
            console.warn('"titles" is deprecated use "items" instead!');
        } else if (options.items) {
            this.titles = mapValues(keyBy(options.items, 'value'), 'title');
        }
        this._options = options;
    }
}

