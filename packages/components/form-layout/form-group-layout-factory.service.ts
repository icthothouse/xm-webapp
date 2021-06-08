import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { XmDynamicPresentation } from '@xm-ngx/dynamic';
import {
    ValidatorProcessingOption,
    ValidatorProcessingService,
} from '@xm-ngx/components/validator-processing';
import { fromPairs } from 'lodash/fp';


export interface FormGroupLayoutItem extends XmDynamicPresentation<unknown, unknown> {
    /** Uniq name for filters */
    name?: string;
    /** Default value */
    value: unknown;
    /** Control validators */
    validators?: ValidatorProcessingOption[];
    disabled?: boolean;
}

@Injectable({
    providedIn: 'root',
})
export class FormGroupLayoutFactoryService {

    constructor(
        private validatorProcessingService: ValidatorProcessingService,
        private formBuilder: FormBuilder,
    ) {
    }

    public createControl(option: FormGroupLayoutItem): FormControl {
        const syncValidators = this.validatorProcessingService.validatorsFactory(option.validators);
        const control = new FormControl(option.value || '', syncValidators);
        if (option.disabled) {
            control.disable();
        }
        return control;
    }

    public createForm(options: FormGroupLayoutItem[]): FormGroup {
        const controls = options.map((option) => [option.name, this.createControl(option)]);
        return this.formBuilder.group(fromPairs(controls));
    }

    public createFormWithFormArray(options: FormGroupLayoutItem[]): FormGroup {
        return this.formBuilder.group({ aliases: this.createFormArray(options) });
    }

    private createFormArray(options: FormGroupLayoutItem[]): FormArray {
        const controls = options.map((layoutItem) => this.createControl(layoutItem));
        return this.formBuilder.array(controls);
    }
}
