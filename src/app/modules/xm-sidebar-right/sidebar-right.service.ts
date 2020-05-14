import { ComponentType } from '@angular/cdk/overlay';
import { Injectable, Injector, TemplateRef } from '@angular/core';
import { Container } from './container';

export interface SidebarRightConfig<D> {
    width?: string;
    data: D;
    injector: Injector;
}

@Injectable({providedIn: 'root'})
export class SidebarRightService {

    private container: Container | null | undefined;

    public width: string = '300px';

    public setContainer(container: Container): void {
        this.container = container;
    }

    public removeContainer(): void {
        this.container = null;
    }

    public open<T = unknown, D = unknown>(
        typeRef: ComponentType<T> | TemplateRef<T>,
        config: SidebarRightConfig<D>): T | null {
        if (!this.container) {
            return null;
        }
        return this.container.create(typeRef, config);
    }

    public close<R>(): R {
        if (!this.container) {
            return null;
        }
        return this.container.remove(null);
    }
}
