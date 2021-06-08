import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import {
    ValidatorProcessingOption as VPO,
    ValidatorProcessingService,
} from '../validator-processing.service';

@Component({
    selector: 'xm-validator-processing-example',
    styleUrls: ['./xm-validator-processing-example.component.scss'],
    templateUrl: 'xm-validator-processing-example.component.html',
})
export class XmValidatorProcessingExampleComponent {

    public languageRequiredConfig: VPO = { type: 'languageRequired', params: ['en', 'ru'] };
    public languageRequiredControl: AbstractControl = new FormControl([{ languageKey: 'en', name: 'En name' }]);
    public languageRequiredValidator: ValidatorFn = this.vps.validatorFactory(this.languageRequiredConfig);

    public minArrayLengthConfig: VPO = { type: 'minArrayLength', params: 5 };
    public minArrayLengthControl: AbstractControl = new FormControl([1, 2]);
    public minArrayLengthValidator: ValidatorFn = this.vps.validatorFactory(this.minArrayLengthConfig);

    public patternConfig: VPO = { type: 'pattern', params: 'd+' };
    public patternControl: AbstractControl = new FormControl('text');
    public patternValidator: ValidatorFn = this.vps.validatorFactory(this.patternConfig);

    public requiredConfig: VPO = { type: 'required' };
    public requiredValidator: ValidatorFn = this.vps.validatorFactory(this.requiredConfig);
    public requiredControl: AbstractControl = new FormControl('', this.requiredValidator);

    public emailConfig: VPO = { type: 'email' };
    public emailControl: AbstractControl = new FormControl('@$@#$@email.com');
    public emailValidator: ValidatorFn = this.vps.validatorFactory(this.emailConfig);

    public minLengthConfig: VPO = { type: 'minLength', params: 5 };
    public minLengthControl: AbstractControl = new FormControl('12');
    public minLengthValidator: ValidatorFn = this.vps.validatorFactory(this.minLengthConfig);

    public maxConfig: VPO = { type: 'max', params: 5 };
    public maxControl: AbstractControl = new FormControl(6);
    public maxValidator: ValidatorFn = this.vps.validatorFactory(this.maxConfig);

    public minConfig: VPO = { type: 'min', params: 2 };
    public minControl: AbstractControl = new FormControl(1);
    public minValidator: ValidatorFn = this.vps.validatorFactory(this.minConfig);

    public maxLengthConfig: VPO = { type: 'maxLength', params: 2 };
    public maxLengthControl: AbstractControl = new FormControl('1234');
    public maxLengthValidator: ValidatorFn = this.vps.validatorFactory(this.maxLengthConfig);

    public minDateConfig: VPO = { type: 'minDate', params: { type: 'TOMORROW' } };
    public minDateControl: AbstractControl = new FormControl(new Date());
    public minDateValidator: ValidatorFn = this.vps.validatorFactory(this.minDateConfig);

    constructor(private vps: ValidatorProcessingService) {
        const fg = new FormArray([
            this.languageRequiredControl,
            this.minArrayLengthControl,
            this.patternControl,
            this.requiredControl,
            this.emailControl,
            this.minLengthControl,
            this.maxControl,
            this.minControl,
            this.maxLengthControl,
            this.minDateControl,
        ]);
        fg.updateValueAndValidity();
    }
}

