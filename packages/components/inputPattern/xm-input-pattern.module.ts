import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { XmInputPatternDirective } from './xm-input-pattern.directive';

@NgModule({
    declarations: [XmInputPatternDirective],
    exports: [XmInputPatternDirective],
    imports: [
        CommonModule,
    ],
})
export class XmInputPatternModule {
}
