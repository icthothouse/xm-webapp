import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Inject,
    Input,
    Optional,
    Output,
    Self,
    ViewEncapsulation,
} from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { XM_CONTROL_ERRORS_TRANSLATES } from '@xm-ngx/components/control-error';
import { NgFormAccessor } from '@xm-ngx/components/ng-accessor';
import { IControl } from '@xm-ngx/dynamic';
import { Primitive } from '@xm-ngx/shared/interfaces';
import { Translate } from '@xm-ngx/translation';
import { defaults } from 'lodash';

export interface XmTextControlOptions {
    title?: Translate;
    type?: string;
    placeholder?: Translate;
    pattern?: string;
    id?: string;
    name?: string;
    required?: boolean;
    disabled?: boolean;
    errors?: { [errorKey: string]: Translate };
    maxLength?: number;
    minLength?: number;
}

const XM_TEXT_CONTROL_OPTIONS_DEFAULT: XmTextControlOptions = {
    title: '',
    placeholder: '',
    type: 'text',
    pattern: '',
    id: null,
    name: 'text',
    required: true,
    disabled: false,
    maxLength: null,
    minLength: null,
};

@Component({
    selector: 'xm-text-control',
    template: `
        <mat-form-field>
            <mat-label>{{options.title | translate}}</mat-label>

            <input matInput
                   [formControl]="control"
                   [placeholder]="options.placeholder | translate"
                   [attr.name]="options.name"
                   [id]="options.id"
                   [required]="options.required"
                   [pattern]="options.pattern"
                   [attr.maxlength]="options.maxLength"
                   [attr.minlength]="options.minLength"
                   [attr.type]="options.type">

            <mat-error
                *xmControlErrors="control.errors; translates options?.errors; message as message">{{message}}</mat-error>

        </mat-form-field>
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default,
})
export class XmTextControl extends NgFormAccessor<Primitive> implements IControl<Primitive, XmTextControlOptions> {
    @Input() public control: FormControl = new FormControl();
    @Output() public valueChange: EventEmitter<Primitive> = new EventEmitter<Primitive>();

    constructor(@Optional() @Self() public ngControl: NgControl | null,
                @Inject(XM_CONTROL_ERRORS_TRANSLATES) private xmControlErrorsTranslates: { [errorKey: string]: Translate }) {
        super(ngControl);
    }

    private _options: XmTextControlOptions = {};

    public get options(): XmTextControlOptions {
        return this._options;
    }

    @Input()
    public set options(value: XmTextControlOptions) {
        this._options = defaults({}, value, {
            ...XM_TEXT_CONTROL_OPTIONS_DEFAULT,
            errors: this.xmControlErrorsTranslates,
        });
        this._options.placeholder = this._options.placeholder || this._options.title;

        if (this._options.disabled) {
            this.disabled = value.disabled;
        }
    }

}

