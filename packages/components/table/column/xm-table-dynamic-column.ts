import { CDK_TABLE } from '@angular/cdk/table';
import {
    Component,
    ComponentFactoryResolver,
    Inject,
    Injector,
    Input,
    NgModule,
    Renderer2,
    ViewContainerRef,
} from '@angular/core';
import { TableColumnsManager } from '@xm-ngx/components/table/column/table-columns-manager';
import { DynamicLoader } from '@xm-ngx/dynamic';
import * as _ from 'lodash';
import { XmDynamicBase } from '../../../dynamic/src/presentation/xm-dynamic-base';
import { XmTableColumnDynamicCellsModule } from './xm-table-column-dynamic-cells';

interface XmTableDynamicColumnOptions {
    selector: string;
}

export interface XmDynamicColumn<T extends XmTableDynamicColumnOptions = XmTableDynamicColumnOptions> {
    column: T;
}

export const XmTableDynamicColumnOptions: XmTableDynamicColumnOptions = {
    selector: '@xm-ngx/components/table-column-dynamic-cells',
};

@Component({
    selector: 'xm-table-dynamic-column',
    template: '',
})
/**
 * @beta
 */
export class XmTableDynamicColumnComponent extends XmDynamicBase<XmDynamicColumn> implements XmDynamicColumn {
    constructor(public viewContainerRef: ViewContainerRef,
                public injector: Injector,
                protected renderer: Renderer2,
                protected loaderService: DynamicLoader,
                protected cfr: ComponentFactoryResolver,
                @Inject(CDK_TABLE) protected columnsManager: TableColumnsManager) {
        super(viewContainerRef, injector, renderer, loaderService, cfr);
    }

    private _column: XmTableDynamicColumnOptions;

    public get column(): XmTableDynamicColumnOptions {
        return this._column;
    }

    @Input()
    public set column(value: XmTableDynamicColumnOptions) {
        this._column = _.defaultsDeep(value, XmTableDynamicColumnOptions);
        this.selector = value.selector;
    }

    protected async createComponent(): Promise<void> {
        await this.createInstance();
        this.updateColumn();
    }

    private updateColumn(): void {
        if (!this.instance) {
            return;
        }
        this.instance.column = this.column;
    }
}

@NgModule({
    imports: [
        XmTableColumnDynamicCellsModule,
    ],
    exports: [XmTableDynamicColumnComponent],
    declarations: [XmTableDynamicColumnComponent],
})
export class XmTableDynamicColumnModule {
}
