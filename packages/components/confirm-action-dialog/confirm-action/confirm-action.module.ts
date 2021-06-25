import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoadingBarModule } from '@xm-ngx/components/loading-bar';
import { XmTranslationModule } from '@xm-ngx/translation';
import { ConfirmActionComponent } from './confirm-action.component';

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        XmTranslationModule,
        LoadingBarModule,
    ],
    declarations: [ConfirmActionComponent,],
    exports: [ConfirmActionComponent,],
})
export class ConfirmActionModule {
    public entry: Type<ConfirmActionComponent> = ConfirmActionComponent;
}
