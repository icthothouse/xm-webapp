import { Directive, Input, NgModule, Self } from '@angular/core';
import { XmCodeContainerComponent } from './xm-code-container.component';

@Directive({ selector: '[xmCodeContainerJson]' })
export class XmCodeContainerJsonDirective {
    constructor(@Self() private xmCodeContainerComponent: XmCodeContainerComponent) {
    }

    private _isFormatted: boolean = true;

    public get isFormatted(): boolean {
        return this._isFormatted;
    }

    @Input()
    public set isFormatted(value: boolean | undefined) {
        this._isFormatted = value !== false;
        this.update();
    }

    private _xmCodeContainerJson: object;

    public get xmCodeContainerJson(): object {
        return this._xmCodeContainerJson;
    }

    @Input()
    public set xmCodeContainerJson(value: object) {
        this._xmCodeContainerJson = value;
        this.update();
    }

    private update(): void {
        if (this._xmCodeContainerJson) {
            const space = this.isFormatted ? 2 : 0;
            this.xmCodeContainerComponent.copyValue = JSON.stringify(this._xmCodeContainerJson, null, space);
        }
    }
}


@NgModule({
    imports: [],
    exports: [XmCodeContainerJsonDirective],
    declarations: [XmCodeContainerJsonDirective],
})
export class XmCodeContainerJsonModule {
}
