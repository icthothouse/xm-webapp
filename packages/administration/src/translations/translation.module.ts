import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { XmTranslationModule } from '@xm-ngx/translation';
import { TranslationComponent } from './translation.component';
import { TranslationService } from './translation.service';

@NgModule({
    imports: [
        MatButtonModule,
        XmTranslationModule,
        CommonModule,
    ],
    exports: [TranslationComponent],
    declarations: [TranslationComponent],
    providers: [TranslationService],
})
export class TranslationModule {
    public entry: Type<TranslationComponent> = TranslationComponent;
}
