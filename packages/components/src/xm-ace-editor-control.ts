import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule, ViewEncapsulation } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ControlErrorModule } from '@xm-ngx/components/control-error/control-error.module';
import { NgControlAccessor } from '@xm-ngx/components/ng-control-accessor';
import { XmTranslationModule } from '@xm-ngx/translation';
import * as _ from 'lodash';
import { AceEditorModule } from '../../../src/app/shared/directives/ace-editor.directive';

interface IAceEditorControlOptions {
    id?: string;
    title?: string;
    name?: string;
    mode?: string | 'json';
    height?: string;
}

const DEFAULT_OPTIONS: IAceEditorControlOptions = {
    title: '',
    name: 'text',
    mode: 'json',
    height: '200px',
};

@Component({
    selector: 'xm-ace-editor-control',
    template: `
        <div class="form-group">
            <label class="control-label">{{ _options.title | translate }}</label>
            <div class="ace-editor-control w-100 border"
                 [ngClass]="{ 'border-danger': error}"
                 (textChanged)="change($event)"
                 [autoUpdateContent]="true"
                 [mode]="_options.mode"
                 [readOnly]="disabled"
                 [text]="_value"
                 [attr.id]="_options.id"
                 [attr.name]="_options.name"
                 [style.height]="_options.height"
                 xmAceEditor>
            </div>
            <mat-error *xmControlErrors="ngControl?.errors; message as message">{{message}}</mat-error>
        </div>
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default,
})
export class AceEditorControlComponent extends NgControlAccessor<string | object> {
    @Input() public disabled: boolean;

    public error: boolean = false;
    public _options: IAceEditorControlOptions = DEFAULT_OPTIONS;

    public get options(): IAceEditorControlOptions {
        return this._options;
    }

    @Input()
    public set options(value: IAceEditorControlOptions) {
        this._options = _.defaults({}, value, DEFAULT_OPTIONS);
    }

    public _value: string;

    public get value(): string | object {
        if (this._options.mode === 'json') {
            return JSON.parse(this._value);
        }

        return this._value;
    }

    @Input()
    public set value(value: string | object) {
        if (typeof value === 'object') {
            this._value = JSON.stringify(value, null, 2);
        } else {
            this._value = value;
        }
    }

    public change(v: any): void {
        if (this._options.mode === 'json') {
            try {
                v = JSON.parse(v);
                this.error = false;
            } catch (e) {
                this.error = true;
            }
        }
        this._onChange(v);
        this.valueChange.next(v);
    }

}

@NgModule({
    imports: [
        XmTranslationModule,
        AceEditorModule,
        CommonModule,
        MatFormFieldModule,
        ControlErrorModule,
    ],
    exports: [AceEditorControlComponent],
    declarations: [AceEditorControlComponent],
    providers: [],
})
export class AceEditorControlModule {
}
