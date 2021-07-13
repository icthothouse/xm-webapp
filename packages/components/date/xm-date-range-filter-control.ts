import { Component, EventEmitter, Input, NgModule, OnInit, Optional, Output, Self } from '@angular/core';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { NgControlAccessor } from '@xm-ngx/components/ng-accessor';
import { XmDynamicControl, XmDynamicControlConstructor, XmDynamicEntryModule } from '@xm-ngx/dynamic';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { XmTranslationModule } from '@xm-ngx/translation';
import { ControlErrorModule } from '@xm-ngx/components/control-error';
import { OwlDateTimeModule } from 'ng-pick-datetime';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { XmDateModule } from '@xm-ngx/components/date/xm-date.component';

const dateInitValues = {
    '7DaysAgo': 7,
    '14daysAgo': 14,
    monthAgo: 30,
};

type DateInitValues = keyof typeof dateInitValues;

export interface IDateOptions {
    title?: string;
    min?: DateValue;
    max?: DateValue;
    start?: DateValue;
    end?: DateValue;
    format?: string;
    timezone?: string;
    locale?: string;
    initValue?: DateInitValues;
    required?: boolean;
    useUtc?: boolean;
}

type DateValue = string[] | Date[];

@Component({
    selector: 'xm-date-range-filter-control',
    template: `
        <mat-form-field class="xm-custom-input-icon">
            <div class="to-display" *ngIf="value && value.length > 0">
                <xm-date [value]="value[0]" [options]="options"></xm-date>
                ~
                <xm-date [value]="value[1]" [options]="options"></xm-date>
            </div>

            <input #dateControl='ngModel'
                   [(ngModel)]="value"
                   [min]="options?.min"
                   [max]="options?.max"
                   [selectMode]="'range'"
                   (ngModelChange)="change($event)"
                   [owlDateTimeTrigger]="dt1"
                   [owlDateTime]="dt1"
                   [disabled]="disabled"
                   [placeholder]="options.title | translate"
                   [required]="options?.required"
                   class="abs"
                   matInput>
            <mat-error *ngIf="dateControl.invalid">{{'common-webapp-ext.validation.required' | translate}}</mat-error>
            <button mat-button *ngIf="value" matSuffix mat-icon-button (click)="change(null)">
                <mat-icon>close</mat-icon>
            </button>

            <mat-icon [owlDateTimeTrigger]="dt1" class="icon">date_range</mat-icon>

            <owl-date-time #dt1 [startAt]="options?.start" [pickerType]="'calendar'"></owl-date-time>
        </mat-form-field>
    `,
    styleUrls: ['./date.control.scss'],
})
export class DateRangeFilterControlComponent extends NgControlAccessor<DateValue>
    implements XmDynamicControl<DateValue, IDateOptions>, OnInit {

    @Output() public valueChange: EventEmitter<DateValue> = new EventEmitter<DateValue>();
    @Input() public options: IDateOptions;

    constructor(@Optional() @Self() public ngControl: NgControl) {
        super(ngControl);
    }

    public ngOnInit(): void {
        this.setDateRange();
    }


    public change(v: DateValue): void {
        this.value = v;
        this._onChange(v);
        this.valueChange.emit(v);
    }

    private setDateRange(): void {
        const {initValue} = this.options;

        if (!initValue) {
            return;
        }

        if (!dateInitValues[initValue]) {
            console.warn(`Wrong 'initValue', it can be only one of ${Object.keys(dateInitValues)}`);
            return;
        }

        const now = new Date();
        const pastDate = now.getDate() - dateInitValues[initValue];
        this.value = [new Date(now.setDate(pastDate)), new Date()];
        this.change(this.value);
    }
}

@NgModule({
    imports: [
        MatFormFieldModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatInputModule,
        XmTranslationModule,
        ControlErrorModule,
        FormsModule,
        OwlDateTimeModule,
        MatIconModule,
        MatButtonModule,
        CommonModule,
        XmDateModule,
    ],
    exports: [DateRangeFilterControlComponent],
    declarations: [DateRangeFilterControlComponent],
})
export class XmDateRangeFilterControlModule implements XmDynamicEntryModule<XmDynamicControl<DateValue>> {
    public entry: XmDynamicControlConstructor<DateValue> = DateRangeFilterControlComponent;
}
