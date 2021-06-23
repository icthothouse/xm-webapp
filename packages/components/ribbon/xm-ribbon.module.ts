import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { XmRibbonComponent } from './xm-ribbon.component';

@NgModule({
    declarations: [XmRibbonComponent],
    exports: [XmRibbonComponent],
    imports: [CommonModule],
})
export class XmRibbonModule {
    public entry: Type<XmRibbonComponent> = XmRibbonComponent;
}
