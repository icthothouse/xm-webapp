import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { XmTranslationModule } from '@xm-ngx/translation';
import { FeedbackDialogComponent } from './feedback-dialog/feedback-dialog.component';
import { FeedbackComponent } from './feedback.component';

@NgModule({
    imports: [
        MatDialogModule,
        XmTranslationModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        CommonModule,
    ],
    exports: [FeedbackComponent],
    declarations: [FeedbackComponent, FeedbackDialogComponent],
    providers: [],
})
export class FeedbackModule {
    public entry: Type<FeedbackComponent> = FeedbackComponent;
}
