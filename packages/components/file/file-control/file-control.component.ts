import { Component, Input } from '@angular/core';
import { NgFormAccessor } from '@xm-ngx/components/ng-accessor';
import { XmTextTitleOptions } from '@xm-ngx/components/text';
import { DataQa } from '@xm-ngx/shared/interfaces';
import * as _ from 'lodash';
import { clone, defaults } from 'lodash';

export interface XmFileControlOptions extends XmTextTitleOptions, DataQa {
    multiple: boolean,
    accept: string,
    required: boolean,
}

const XM_FILE_CONTROL_OPTIONS_DEFAULT: XmFileControlOptions = {
    title: '',
    dataQa: 'file-control',
    multiple: false,
    accept: '*',
    required: false
};
/**
 * For required you need to use validators
 * @example
 * ```json
 * "validators": [
 *  {
 *    "type": "required"
 *  }
 * ],
 * ```
 */
@Component({
    selector: 'xm-file-control',
    template: `
        <mat-form-field>
            <mat-label>{{options.title | translate}}</mat-label>

            <input #input
                   (change)="change($event.target.files)"
                   [required]="options.required"
                   hidden
                   type="file"/>

            <input #input
                   matInput
                   type="text"
                   [readonly]="true"
                   [value]="fileNames"
                   [required]="options.required"
                   [attr.data-qa]="options.dataQa"
                   (click)="input.click()"
                   [attr.multiple]="options.multiple? '' : null"
                   [attr.accept]="options.accept">

            <mat-error *xmControlErrors="control?.errors; message as message">{{message}}</mat-error>

            <button (click)="input.click()"
                    color="primary"
                    matSuffix
                    mat-button>{{'ext-entity.image-widget.change-image' | translate}}</button>

            <mat-icon matSuffix>attach_file</mat-icon>

        </mat-form-field>
    `,
})
export class FileControlComponent extends NgFormAccessor<File[]> {
    private _options: XmFileControlOptions = clone(XM_FILE_CONTROL_OPTIONS_DEFAULT);

    public get options(): XmFileControlOptions {
        return this._options;
    }

    @Input()
    public set options(value: XmFileControlOptions) {
        this._options = defaults(value, XM_FILE_CONTROL_OPTIONS_DEFAULT);
    }

    public get fileNames() {
        return this.value ? _.map(this.value, (i => i.name)).join('') : '';
    }
}
