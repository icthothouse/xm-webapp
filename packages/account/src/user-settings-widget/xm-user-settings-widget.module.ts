import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageModule } from '@xm-ngx/components/language';
import { XmPermissionModule } from '@xm-ngx/core/permission';
import { XmUserSettingsWidgetComponent } from './xm-user-settings-widget.component';

@NgModule({
    declarations: [XmUserSettingsWidgetComponent],
    exports: [XmUserSettingsWidgetComponent],
    imports: [CommonModule, MatCardModule, TranslateModule, MatFormFieldModule, MatInputModule, FormsModule, XmPermissionModule, MatSelectModule, MatButtonModule, LanguageModule],
})
export class XmUserSettingsWidgetModule {
    public entry: Type<XmUserSettingsWidgetComponent> = XmUserSettingsWidgetComponent;
}
