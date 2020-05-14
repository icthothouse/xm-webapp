import { NgModule } from '@angular/core';
import { XmSharedModule } from '@xm-ngx/shared';
import { DynamicWidgetLayoutComponent } from './dynamic/dynamic-widget-layout.component';
import { DynamicWidgetDirective } from './dynamic/dynamic-widget.directive';

@NgModule({
    imports: [XmSharedModule],
    exports: [DynamicWidgetDirective, DynamicWidgetLayoutComponent],
    declarations: [DynamicWidgetDirective, DynamicWidgetLayoutComponent],
    providers: [],
})
export class XmDynamicModule {
}
