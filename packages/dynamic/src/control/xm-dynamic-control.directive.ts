import {
    ComponentFactoryResolver,
    Directive,
    EventEmitter,
    forwardRef,
    Injector,
    Input,
    OnChanges,
    OnInit,
    Output,
    Renderer2,
    SimpleChanges,
    ViewContainerRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { XmDynamicConstructor, XmDynamicEntryModule } from '../interfaces';
import { DynamicLoader } from '../loader/dynamic-loader';
import { XmDynamicPresentation } from '../presentation/xm-dynamic-presentation-base.directive';
import { XmDynamicPresentationDirective } from '../presentation/xm-dynamic-presentation.directive';

export interface XmDynamicControl<V = unknown, O = unknown> extends XmDynamicPresentation<V, O>, ControlValueAccessor {
    valueChange: EventEmitter<V>;
    disabled: boolean;
}

export interface XmDynamicControlConstructor<V = unknown, O = unknown> extends XmDynamicConstructor<XmDynamicControl<V, O>> {
    new(...args: any): XmDynamicControl<V, O>;
}

export interface XmDynamicControlEntryModule<V = unknown, O = unknown> extends XmDynamicEntryModule<XmDynamicControl<V, O>> {
    entry: XmDynamicControlConstructor<V, O>;
}


/**
 * DynamicControlComponent creates component from configs
 * @example
 * ```
 * <ng-template xmDynamicControl
 *              [selector]="'@xm-ngx/components/xm-bool-control'"
 *              [value]="false"></ng-template>
 * <ng-template xmDynamicControl
 *              [selector]="'@xm-ngx/components/xm-bool-control'"
 *              [disabled]="true"
 *              [formControl]="model"></ng-template>
 * ```
 */
@Directive({
    selector: '[xmDynamicControl]',
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => XmDynamicControlDirective), multi: true }],
})
export class XmDynamicControlDirective<V, O>
    extends XmDynamicPresentationDirective<V, O>
    implements ControlValueAccessor, XmDynamicControl<V, O>, OnInit, OnChanges {

    /** Component value */
    @Input() public value: V;

    /** Component value */
    @Input() public disabled: boolean;

    /** Component options */
    @Input() public options: O;

    /** Component ref */
    @Input() public selector: string;

    /** Component value changes */
    @Output() public valueChange: EventEmitter<V> = new EventEmitter<V>();

    /** Returns instance of created object */
    public instance: XmDynamicControl<V, O>;

    constructor(
        viewContainerRef: ViewContainerRef,
        injector: Injector,
        renderer: Renderer2,
        loaderService: DynamicLoader,
        cfr: ComponentFactoryResolver,
    ) {
        super(viewContainerRef, injector, renderer, loaderService, cfr);
    }

    public ngOnInit(): void {
        this.createComponent().then();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.value) {
            this.updateValue();
        }
        if (changes.disabled) {
            this.updateDisable();
        }
        if (changes.options) {
            this.updateOptions();
        }
        if (changes.selector && !changes.selector.firstChange) {
            this.createComponent().then();
        }
    }

    public registerOnChange(fn: (v: V) => void): void {
        this._onChange = fn;
        this.updateRegisterOnChange();
    }

    public registerOnTouched(fn: (v: V) => void): void {
        this._onTouched = fn;
        this.updateRegisterOnTouched();
    }

    public writeValue(obj: V): void {
        this.value = obj;
        this.updateValue();
    }

    public setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this.updateDisable();
    }

    protected _onChange: (v: V) => void = () => undefined;

    protected _onTouched: (v: V) => void = () => undefined;

    protected async createComponent(): Promise<void> {
        await this.createInstance();
        this.updateValue();
        this.updateRegisterOnChange();
        this.updateRegisterOnTouched();
        this.updateOptions();
        this.updateDisable();
    }

    protected updateDisable(): void {
        if (!this.instance || typeof this.instance.setDisabledState !== 'function') {
            return;
        }
        this.instance.setDisabledState(this.disabled);
    }

    protected updateValue(): void {
        if (!this.instance) {
            return;
        }
        this.instance.value = this.value;
        this._onChange(this.value);
        this.valueChange.next(this.value);
    }

    protected updateRegisterOnChange(): void {
        if (!this.instance || typeof this.instance.registerOnChange !== 'function') {
            return;
        }
        this.instance.registerOnChange((args) => {
            this.value = args;
            this.updateValue();
        });
    }

    protected updateRegisterOnTouched(): void {
        if (!this.instance || typeof this.instance.registerOnTouched !== 'function') {
            return;
        }
        this.instance.registerOnTouched((args) => this._onTouched(args));
    }

}
