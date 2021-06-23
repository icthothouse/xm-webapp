import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
    ExtendedDynamicComponents,
    WidgetListService,
} from '@xm-ngx/administration/dashboards-config/widget-edit/widget-list.service';
import { NgModelWrapper } from '@xm-ngx/components/ng-accessor';
import { XmTextControlOptions } from '@xm-ngx/components/text';
import { XmDynamicControl } from '@xm-ngx/dynamic';
import { trim } from 'lodash';
import { combineLatest, Observable } from 'rxjs';
import { map, shareReplay, startWith } from 'rxjs/operators';

@Component({
    selector: 'xm-selector-text-control',
    templateUrl: './selector-text-control.component.html',
    providers: [
        WidgetListService,
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectorTextControlComponent),
            multi: true,
        },
    ],
})
export class SelectorTextControlComponent
    extends NgModelWrapper<string>
    implements XmDynamicControl<string, XmTextControlOptions>, OnInit {
    @Input() public options: XmTextControlOptions;
    public control: FormControl = new FormControl(this.value);
    public filteredOptions: Observable<ExtendedDynamicComponents[]>;

    constructor(private widgetListService: WidgetListService) {
        super();
    }

    public ngOnInit(): void {
        this.widgetListService.load();
        const widgets$ = this.widgetListService.widgets$.pipe(shareReplay(1));
        this.filteredOptions = combineLatest(
            this.control.valueChanges.pipe(startWith('')),
            widgets$,
        ).pipe(
            map(([value, arr]) => this.filter(value, arr)),
        );
    }

    public writeValue(obj: string): void {
        super.writeValue(obj);
        if (obj && this.value !== this.control.value) {
            this.control.patchValue(this.value);
        }
    }

    private filter(value: string, arr: ExtendedDynamicComponents[]): ExtendedDynamicComponents[] {
        const filterValue = trim(value).toLowerCase();
        return arr.filter(option => option.globalSelector?.toLowerCase().includes(filterValue));
    }
}
