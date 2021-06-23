import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { XmPermissionModule } from '@xm-ngx/core/permission';
import { XmTranslationModule } from '@xm-ngx/translation';
import { XmUserSecuritySettingsComponent } from './xm-user-security-settings.component';

@NgModule({
    declarations: [XmUserSecuritySettingsComponent],
    exports: [XmUserSecuritySettingsComponent],
    imports: [CommonModule, MatCardModule, XmTranslationModule, XmPermissionModule, MatCheckboxModule, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
})
export class XmUserSecuritySettingsModule {
    public entry: Type<XmUserSecuritySettingsComponent> = XmUserSecuritySettingsComponent;
}
