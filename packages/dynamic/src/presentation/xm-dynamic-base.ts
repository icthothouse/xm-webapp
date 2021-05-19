import {
    ComponentFactoryResolver,
    ComponentRef,
    Directive,
    Injector,
    OnChanges,
    OnInit,
    Renderer2,
    SimpleChanges,
    ViewContainerRef,
} from '@angular/core';
import { DynamicLoader } from '../loader/dynamic-loader';


@Directive()
export abstract class XmDynamicBase<T> implements OnChanges, OnInit {
    /** Component ref */
    public selector: string;
    /** Instance of created object */
    public instance: T;

    constructor(public viewContainerRef: ViewContainerRef,
                public injector: Injector,
                protected renderer: Renderer2,
                protected loaderService: DynamicLoader,
                protected cfr: ComponentFactoryResolver) {
    }

    public async ngOnChanges(changes: SimpleChanges): Promise<void> {
        if (changes.selector && !changes.selector.firstChange) {
            await this.createComponent();
        }
    }

    public async ngOnInit(): Promise<void> {
        await this.createComponent();
    }

    protected async createComponent(): Promise<void> {
        await this.createInstance();
    }

    protected createInjector(): Injector {
        return this.injector;
    }

    protected async createInstance(): Promise<void> {
        const c = await this.createComponentRef();
        this.instance = c.instance;
    }

    protected async createComponentRef(): Promise<ComponentRef<T>> {
        if (!this.selector) {
            return null;
        }

        const cfr = await this.loaderService.loadAndResolve<T>(this.selector, { injector: this.injector });

        this.viewContainerRef.clear();
        return this.viewContainerRef.createComponent(cfr, 0, this.createInjector());
    }
}
