import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
    XmEmailControlOptions,
    XmPasswordControlOptions,
    XmTextControlOptions,
    XmTextDynamicOptions,
    XmTextRangeControlOptions,
    XmTextViewOptions,
} from '@xm-ngx/components/text';

@Component({
    selector: 'xm-text-example',
    templateUrl: './xm-text-example.component.html',
})
export class XmTextExampleComponent {

    public emailControlOptions: XmEmailControlOptions = {
        id: 'email-id',
        dataQa: 'email-example-control',
        title: { en: 'Email control' },
    };

    public passwordControlOptions: XmPasswordControlOptions = {
        autocomplete: 'password',
        required: false,
        id: 'password-id',
        dataQa: 'password-example-control',
        title: { en: 'Password control' },
    };

    public textControlOptions: XmTextControlOptions = {
        id: 'unique-id',
        placeholder: { en: 'Placeholder...' },
        title: { en: 'Text Control' },
        dataQa: 'text-example-control',
        maxLength: 30,
    };

    /*
     TODO: research table row
      public textJoinValue: unknown = [
            'First',
            'Second',
        ];
      public textJoinOptions: XmTextJoinValueOptions = {
            joinSymbol: ', ',
            templates: [
                { title: { en: 'Text join {{value}}' }, condition: '' },
            ],
        };
    */

    public textRangeOptions: XmTextRangeControlOptions = {
        id: 'text-range-id',
        placeholder: { en: 'Write your text here...' },
        title: { en: 'Text range' },
        rows: 3,
        dataQa: 'text-range-example-control',
        maxLength: 350,
    };

    public textViewOptions: XmTextViewOptions = {
        title: { en: 'Text view' },
        emptyValue: 'Empty',
        dataQa: 'text-view',
        style: 'inline',
    };

    public textDynamicOptions: XmTextDynamicOptions = {
        title: { en: 'Text view' },
        textStyle: 'inline',
        options: null,
        selector: '@xm-ngx/components/text',
    };

    public ngModelValue: string = 'test';
    public formControl: FormControl = new FormControl('12345', Validators.pattern(/^\d+$/));
    public formGroup: FormGroup = new FormGroup({
        control: new FormControl('12345', Validators.pattern(/^\d+$/)),
    });
}
