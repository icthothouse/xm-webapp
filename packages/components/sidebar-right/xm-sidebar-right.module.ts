import { CommonModule } from '@angular/common';
import {
    Component,
    ComponentFactoryResolver,
    Directive,
    HostBinding,
    NgModule,
    OnDestroy,
    OnInit,
    TemplateRef,
    Type,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import * as _ from 'lodash';
import { Container } from './container';
import { SidebarRightConfig, SidebarRightService } from './sidebar-right.service';

@Directive({ selector: '[xmContainerOutlet]' })
export class ContainerOutletDirective {
    constructor(public viewContainerRef: ViewContainerRef) {
    }
}

@Component({
    selector: 'xm-sidebar-right',
    styleUrls: ['./xm-sidebar-right.component.scss'],
    host: {
        class: 'xm-sidebar-right',
    },
    template: '<ng-container xmContainerOutlet></ng-container>',
})
export class XmSidebarRight implements OnInit, OnDestroy {

    @ViewChild(ContainerOutletDirective, { static: true }) public xmContainerOutlet: ContainerOutletDirective;

    @HostBinding('style.width') public width: string;

    constructor(private sidebarRightService: SidebarRightService) {
    }

    public ngOnInit(): void {
        this.sidebarRightService.setContainer(this as Container);
    }

    public ngOnDestroy(): void {
        this.sidebarRightService.removeContainer();
    }

    public create<T, D>(templateRef: TemplateRef<D> | Type<T>, config: SidebarRightConfig<D>): T | null {
        const viewContainerRef = this.xmContainerOutlet.viewContainerRef;
        if (viewContainerRef.length > 0) {
            viewContainerRef.clear();
        }

        if (templateRef instanceof TemplateRef) {
            viewContainerRef.createEmbeddedView(templateRef);
            this.openStyles(config.width || this.sidebarRightService.width);
            return null;
        } else {
            return this.loadComponent(templateRef, config);
        }
    }

    public remove(): void {
        this.xmContainerOutlet.viewContainerRef.clear();
        this.closeStyles();
    }

    private loadComponent<T, D>(templateRef: Type<T>, config: SidebarRightConfig<D>): T {
        const viewContainerRef = this.xmContainerOutlet.viewContainerRef;
        const componentFactoryResolver = config.injector.get(ComponentFactoryResolver);
        const cfr = componentFactoryResolver.resolveComponentFactory(templateRef);
        const c = viewContainerRef.createComponent<T>(cfr, null, config.injector);
        _.assign(c.instance, config.data);

        this.openStyles(config.width || '300px');
        return c.instance;
    }

    private openStyles(width: string): void {
        const main: HTMLElement = document.getElementById('main');
        main.style.marginRight = width;
        this.width = width;
    }

    private closeStyles(): void {
        const main: HTMLElement = document.getElementById('main');
        main.style.marginRight = '0';
        delete this.width;
    }
}

@NgModule({
    declarations: [XmSidebarRight, ContainerOutletDirective],
    exports: [XmSidebarRight],
    imports: [CommonModule],
})
export class XmSidebarRightModule {
}
