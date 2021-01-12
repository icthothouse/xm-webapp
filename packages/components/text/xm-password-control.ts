import { Component, Input, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ControlErrorModule } from '@xm-ngx/components/control-error';
import { NgFormAccessor } from '@xm-ngx/components/ng-accessor';
import { XmPasswordControlOptions } from '@xm-ngx/components/text/xm-password-control-options';
import { IControlFn } from '@xm-ngx/dynamic';
import { XmTranslationModule } from '@xm-ngx/translation';

@Component({
    selector: 'xm-password-control',
    template: `
        <mat-form-field>
            <mat-label>{{ options.title | translate}}</mat-label>

            <input [formControl]="control"
                   [id]="options.id"
                   [required]="options.required"
                   autocomplete="password"
                   attr.data-qa="password-input"
                   matInput
                   [type]="'password'"
                   #password
                   name="password"
                   type="password">

            <mat-icon class="cursor-pointer"
                      matSuffix
                      (click)="password.type = password.type === 'password' ? 'text' : 'password'">
                {{ password.type ? 'visibility' : 'visibility_off'}}</mat-icon>

            <mat-error *xmControlErrors="control?.errors; message as message">{{message}}</mat-error>
        </mat-form-field>
    `,
})
export class XmPasswordControl extends NgFormAccessor<string> {
    @Input() public options: XmPasswordControlOptions;
}

@NgModule({
    imports: [
        MatFormFieldModule,
        ControlErrorModule,
        MatInputModule,
        ReactiveFormsModule,
        XmTranslationModule,
        MatIconModule,
    ],
    exports: [XmPasswordControl],
    declarations: [XmPasswordControl],
})
export class XmPasswordControlModule {
    public entry: IControlFn<string, XmPasswordControlOptions> = XmPasswordControl;
}
