import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { XmDynamicPresentation } from '@xm-ngx/dynamic';
import { ITranslate, Locale, Translate } from '@xm-ngx/translation';
import { propEq } from 'lodash/fp';
import { XmUiConfigService } from '@xm-ngx/core/config';
import { take } from 'rxjs/operators';

export type MultiLanguageDataModel = { languageKey: string; name: string }[]

export interface LanguageOptions {
    type: string;
}

export interface MultiLanguageOptions {
    title?: Translate | ITranslate;
    feedback?: string;
    language?: LanguageOptions;
}

@Component({
    selector: 'xm-multi-language-control',
    template: `
        <mat-label *ngIf="options.title">
            <span class="pr-2">{{ options.title | translate }}</span>
            <mat-icon *ngIf="options.feedback" [matTooltip]="options.feedback | translate">help</mat-icon>
        </mat-label>

        <mat-button-toggle-group [(ngModel)]="selectedLng">
            <mat-button-toggle *ngFor="let k of languages" [value]="k">{{k}}</mat-button-toggle>
        </mat-button-toggle-group>

        <ng-container [ngSwitch]="options.language?.type">
            <ng-container *ngSwitchCase="'wysiwyg'">
                <angular-editor
                    *ngIf="!selectedLng || disabled;else wysiwigEditor"
                    [config]="disabledWysiwygConfig"
                    [ngModel]="getValue()"></angular-editor>

                <ng-template #wysiwigEditor>
                    <angular-editor
                        [config]="wysiwygConfig"
                        [ngModel]="getValue()"
                        (ngModelChange)="setValue($event)"></angular-editor>
                </ng-template>
            </ng-container>

            <ng-container *ngSwitchCase="'textarea'">
                <mat-form-field>
                    <textarea
                        matInput
                        type="text"
                        [disabled]="!selectedLng || disabled"
                        [attr.name]="name"
                        [readonly]="readonly"
                        [ngModel]="getValue()"
                        (ngModelChange)="setValue($event)"></textarea>
                </mat-form-field>
            </ng-container>

            <ng-container *ngSwitchDefault>
                <mat-form-field>
                    <input
                        matInput
                        type="text"
                        [disabled]="!selectedLng || disabled"
                        [ngModel]="getValue()"
                        [attr.name]="name"
                        [readonly]="readonly"
                        (ngModelChange)="setValue($event)"/>
                </mat-form-field>
            </ng-container>
        </ng-container>
    `,
    host: {
        class: 'xm-multi-language-control',
    },
    styles: ['mat-button-toggle-group{margin-bottom: 10px;} mat-label{display:block}'],
    changeDetection: ChangeDetectionStrategy.Default,
})
export class MultiLanguageComponent implements XmDynamicPresentation<MultiLanguageDataModel, MultiLanguageOptions> {

    @Input() public value: MultiLanguageDataModel = [];
    @Input() public disabled: boolean;
    @Input() public readonly: boolean;
    @Input() public name: string | null = null;

    public disabledWysiwygConfig: AngularEditorConfig = {
        editable: false,
        showToolbar: false,
    };
    public wysiwygConfig: AngularEditorConfig = {
        editable: true,
        showToolbar: true,
        defaultParagraphSeparator: 'p',
        toolbarHiddenButtons: [
            ['fontName'],
            [
                'backgroundColor',
                'insertImage',
                'insertVideo',
            ],
        ],
    };
    @Input() public control?: FormControl;
    @Input() public options: MultiLanguageOptions;

    @Output() public valueChange: EventEmitter<MultiLanguageDataModel> = new EventEmitter<MultiLanguageDataModel>();
    public selectedLng: string;
    public languages: string[] = [];

    constructor(private xmConfigService: XmUiConfigService<{ langs: Locale[] }>) {
    }

    public ngOnInit(): void {
        this.xmConfigService.config$().pipe(take(1)).subscribe(config => {
            this.languages = config.langs;
            this.selectedLng = this.languages[0];
        });
    }

    public getValue(): string {
        if (this.value) {
            const lngValue = this.value.find(propEq('languageKey', this.selectedLng));
            if (lngValue) {
                return lngValue.name;
            }
        }
        return '';
    }

    public setValue(value: string): void {
        const lngValue = { languageKey: this.selectedLng, name: value };
        const index = (this.value || []).findIndex(propEq('languageKey', this.selectedLng));
        if (index > -1) {
            this.value.splice(index, 1, lngValue);
        } else {
            this.value = [...(this.value || []), lngValue];
        }
        this.valueChange.emit(this.value);
        if (this.control) {
            this.control.setValue(this.value);
            this.control.markAsTouched();
            this.control.markAsDirty();
        }
    }
}
