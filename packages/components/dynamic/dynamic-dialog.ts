import { ComponentFactoryResolver, Injectable, Injector, ViewContainerRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DynamicLoader, XmDynamicPresentation } from '@xm-ngx/dynamic';


@Injectable()
export class DynamicDialog {
    constructor(
        private loaderService: DynamicLoader,
        private matDialog: MatDialog,
        private injector: Injector,
        private viewContainerRef: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver,
    ) {
    }

    public async createAsync<T extends XmDynamicPresentation, R>(selector: string, value: unknown, options: unknown): Promise<MatDialogRef<T, R>> {
        const matDialogRef = await this.getDialogRef<T, R>(selector);
        matDialogRef.componentInstance.value = value;
        matDialogRef.componentInstance.options = options;
        return matDialogRef;
    }

    protected async getDialogRef<T, R>(selector: string): Promise<MatDialogRef<T, R>> {
        const cfr = await this.loaderService.loadAndResolve(selector, { injector: this.injector });
        return this.matDialog.open(cfr.componentType, {
            viewContainerRef: this.viewContainerRef,
            componentFactoryResolver: this.componentFactoryResolver
        });
    }
}
