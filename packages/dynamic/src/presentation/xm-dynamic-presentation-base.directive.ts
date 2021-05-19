import { Directive, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { XmDynamic, XmDynamicConstructor, XmDynamicEntryModule } from '../interfaces';
import { XmDynamicBase } from './xm-dynamic-base';


/** Determines input(control) value. */
interface IValue<V> {
    /** Input value. */
    value: V;
}

/** Determines input(control) options. */
interface IOptions<O> {
    /** Input options. */
    options: O;
}

/**
 * Determines inputs for the dynamic components.
 *
 * @public
 */
export interface XmDynamicPresentation<V = unknown, O = unknown> extends XmDynamic, IValue<V>, IOptions<O> {
    /** {@inheritDoc IValue} */
    value: V;
    /** {@inheritDoc IOptions.value} */
    options: O;
}

export interface XmDynamicPresentationConstructor<V = unknown, O = unknown> extends XmDynamicConstructor<XmDynamicPresentation<V, O>> {
    new(...args: any): XmDynamicPresentation<V, O>;
}

export interface XmDynamicPresentationEntryModule extends XmDynamicEntryModule<XmDynamicPresentation> {
    entry: XmDynamicPresentationConstructor;
}

@Directive()
export class XmDynamicPresentationBase<V, O> extends XmDynamicBase<XmDynamicPresentation<V, O>> implements XmDynamicPresentation<V, O>, OnChanges, OnInit {
    /** Component value */
    public value: V;
    /** Component options */
    public options: O;
    /** Component ref */
    public selector: string;
    /** Instance of created object */
    public instance: XmDynamicPresentation<V, O>;
    /** Component css class */
    public class: string;
    /** Component css style */
    public style: string;

    public async ngOnChanges(changes: SimpleChanges): Promise<void> {
        if (changes.value) {
            this.updateValue();
        }
        if (changes.options) {
            this.updateOptions();
        }
       await super.ngOnChanges(changes);
    }

    protected async createComponent(): Promise<void> {
        await this.createInstance();
        this.updateValue();
        this.updateOptions();
    }

    protected updateValue(): void {
        if (!this.instance) {
            return;
        }
        this.instance.value = this.value;
    }

    protected updateOptions(): void {
        if (!this.instance) {
            return;
        }
        this.instance.options = this.options;
    }

    protected async createInstance(): Promise<void> {
        const c = await this.createComponentRef();
        this.instance = c.instance;

        const el = c.location.nativeElement as HTMLElement;
        this.updateStyles(el);
    }

    protected updateStyles(el: HTMLElement): void {
        if (this.class) {
            this.renderer.setAttribute(el, 'class', this.class);
        }
        if (this.style) {
            this.renderer.setAttribute(el, 'style', this.style);
        }
    }
}
