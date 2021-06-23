import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ConditionDashboardDialogComponent } from '@xm-ngx/administration/roles-management-detail/condition-dashboard-dialog/condition-dashboard-dialog.component';
import { XmTextControlModule, XmTextViewModule } from '@xm-ngx/components/text';
import { XmTranslationModule } from '@xm-ngx/translation';

@NgModule({
    declarations: [ConditionDashboardDialogComponent],
    exports: [ConditionDashboardDialogComponent],
    imports: [
        CommonModule,
        XmTextViewModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        XmTranslationModule,
        MatCheckboxModule,
        MatDialogModule,
        XmTextControlModule,
        ReactiveFormsModule,
        MatSlideToggleModule,
        MatIconModule,
    ],
})
export class ConditionDashboardDialogModule {
    public entry: Type<ConditionDashboardDialogComponent> = ConditionDashboardDialogComponent;
}
