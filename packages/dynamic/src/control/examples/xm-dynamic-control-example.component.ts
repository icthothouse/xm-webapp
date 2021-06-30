import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'xm-dynamic-control-example',
    templateUrl: './xm-dynamic-control-example.component.html',
})
export class XmDynamicControlExampleComponent<T> {

    public ngValue: T = null;
    public ngModelValue: T = null;
    public formControl: FormControl = new FormControl(null);
    public formGroup: FormGroup = new FormGroup({
        control: new FormControl(null),
    });

    public selector: string = '@xm-ngx/components/text-control';

    public options: unknown = {
        'title': {
            'en': 'Name',
            'ru': 'Наименование',
            'uk': 'Найменування'
        },
        'required': false
    };

    public onApply(selector: string, options: unknown): void {
        this.selector = selector;
        this.options = options;
        this.ngValue = null;
        this.ngModelValue = null;
        this.formControl.reset();
        this.formGroup.reset();
    }
}
