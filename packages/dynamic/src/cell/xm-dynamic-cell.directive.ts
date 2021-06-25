/* eslint-disable @angular-eslint/no-conflicting-lifecycle */
import {
    Directive,
    DoCheck,
    InjectionToken,
    Injector,
    Input,
    NgModule,
    OnChanges,
    OnInit,
    SimpleChanges,
} from '@angular/core';
import { getValue } from '@xm-ngx/shared/operators';
import { XmDynamicPresentationBase } from '../presentation/xm-dynamic-presentation-base.directive';

export const XM_DYNAMIC_TABLE_ROW = new InjectionToken<string>('XM_DYNAMIC_TABLE_ROW');
export const XM_DYNAMIC_TABLE_CELL = new InjectionToken<string>('XM_DYNAMIC_TABLE_CELL');

/**
 * XmDynamicCellDirective cell configuration
 * @beta
 */
export interface XmDynamicCell<O = unknown> {
    field: string;
    selector: string;
    options: O;
    class: string;
    style: string;
}

/**
 * XmDynamicCellDirective creates a component from the DynamicLoader
 *
 * @example
 * ```
 * <xm-dynamic-cell [row]="{c: true}"
 *                  [cell]="{field: 'c', selector='@xm-ngx/components/xm-bool-view'}"></xm-dynamic-cell>
 * ```
 * @beta
 */
@Directive({
    selector: 'xm-dynamic-cell, [xmDynamicCell]',
})
export class XmDynamicCellDirective<V, O extends XmDynamicCell<O>>
    extends XmDynamicPresentationBase<V, O>
    implements OnInit, OnChanges, DoCheck {

    /** Component row value */
    @Input() public row: unknown;

    private _cell: O;

    public get cell(): O {
        return this._cell;
    }

    /** Cell options */
    @Input()
    public set cell(value: O) {
        this._cell = value;
        this.selector = value?.selector;
        this.options = value?.options;
        this.class = value?.class;
        this.style = value?.style;
    }

    /** @deprecated use {@link cell} instead */
    public get column(): O {
        return this.cell;
    }

    /** @deprecated use {@link cell} instead */
    @Input()
    public set column(value: O) {
        this.cell = value;
    }

    @Input()
    public getCellValue(): V | null {
        return getValue(this.row, this._cell.field);
    }

    public ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);
        if (changes.row) {
            this.value = this.getCellValue();
            this.updateValue();
        }
        if (changes.column) {
            this.updateOptions();
            this.value = this.getCellValue();
            this.updateValue();
        }
    }

    public createInjector(): Injector {
        return Injector.create({
            providers: [
                { provide: XM_DYNAMIC_TABLE_ROW, useValue: this.row },
                { provide: XM_DYNAMIC_TABLE_CELL, useValue: this._cell },
            ],
            parent: this.injector,
        });
    }

    public ngDoCheck(): void {
        const newValue = this.getCellValue();

        if (this.value !== newValue) {
            this.value = newValue;
            this.updateValue();
        }
    }

}

@NgModule({
    exports: [XmDynamicCellDirective],
    declarations: [XmDynamicCellDirective],
})
export class XmDynamicCellModule {
}
