import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { XmTranslationModule } from '@xm-ngx/translation';
import { JhiDocsComponent } from './docs.component';

@NgModule({
    imports: [
        MatFormFieldModule,
        MatSelectModule,
        FormsModule,
        XmTranslationModule,
        CommonModule,
    ],
    exports: [JhiDocsComponent],
    declarations: [JhiDocsComponent],
    providers: [],
})
export class DocsModule {
    public entry: Type<JhiDocsComponent> = JhiDocsComponent;
}
