import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { XmPermissionModule } from '@xm-ngx/core/permission';
import { XmTranslationModule } from '@xm-ngx/translation';
import { UserLoginFormComponent } from './login/user-login-form.component';
import { XmUserLoginWidgetComponent } from './xm-user-login-widget.component';

@NgModule({
    declarations: [XmUserLoginWidgetComponent, UserLoginFormComponent],
    exports: [XmUserLoginWidgetComponent, UserLoginFormComponent],
    imports: [CommonModule, XmTranslationModule, MatCardModule, XmPermissionModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
})
export class XmUserLoginWidgetModule {
    public entry: Type<XmUserLoginWidgetComponent> = XmUserLoginWidgetComponent;
}
