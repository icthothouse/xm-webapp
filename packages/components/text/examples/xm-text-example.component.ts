import { Component } from '@angular/core';
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
    styleUrls: ['./xm-text-example.component.scss'],
})
export class XmTextExampleComponent {

    public emailControlOptions: XmEmailControlOptions = {
        id: 'email-id',
        title: { en: 'Email control' },
    };

    public passwordControlOptions: XmPasswordControlOptions = {
        id: 'password-id',
        title: { en: 'Password control' },
    };

    public textControlOptions: XmTextControlOptions = {
        id: 'unique-id',
        placeholder: { en: 'Placeholder...' },
        title: { en: 'Text Control' },
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
    };

    public textViewOptions: XmTextViewOptions = {
        title: { en: 'Text view' },
        emptyValue: 'Empty',
        style: 'inline',
    };

    public textDynamicOptions: XmTextDynamicOptions = {
        title: { en: 'Text view' },
        textStyle: 'inline',
        options: null,
        selector: '@xm-ngx/components/text',
    };
}
