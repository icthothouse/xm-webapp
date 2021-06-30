import { Component, Input } from '@angular/core';
import { NgFormAccessor } from '@xm-ngx/components/ng-accessor';
import * as _ from 'lodash';
import { XmPasswordControlOptions } from './xm-password-control-options';

export const XM_PASSWORD_OPTIONS_DEFAULT: XmPasswordControlOptions = {
    id: 'password',
    required: false,
    title: 'Password',
    dataQa: 'password-input',
    autocomplete: 'password'
};

@Component({
    selector: 'xm-password-control',
    template: `
        <mat-form-field>
            <mat-label>{{ options.title | translate}}</mat-label>

            <input [formControl]="control"
                   [id]="options.id"
                   [required]="options.required"
                   [autocomplete]="options.autocomplete"
                   [attr.data-qa]="options.dataQa"
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
    private _options: XmPasswordControlOptions = _.clone(XM_PASSWORD_OPTIONS_DEFAULT);

    public get options(): XmPasswordControlOptions {
        return this._options;
    }

    @Input()
    public set options(value: XmPasswordControlOptions) {
        this._options = _.defaultsDeep(value, XM_PASSWORD_OPTIONS_DEFAULT);
    }
}

