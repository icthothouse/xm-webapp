import { TestBed } from '@angular/core/testing';
import { FormArray, FormBuilder } from '@angular/forms';
import { ValidatorProcessingService } from '@xm-ngx/components/validator-processing';

import { FormGroupLayoutFactoryService, FormGroupLayoutItem } from './form-group-layout-factory.service';

describe('FormGroupLayoutFactoryService', () => {
    let service: FormGroupLayoutFactoryService;

    beforeEach(() => {
        TestBed.configureTestingModule({ providers: [FormBuilder, ValidatorProcessingService] });
        service = TestBed.inject<FormGroupLayoutFactoryService>(FormGroupLayoutFactoryService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should create control', () => {
        const options: FormGroupLayoutItem = { name: '1', value: 1, validators: null, options: null };
        const control = service.createControl(options);
        expect(control.value).toBe(options.value);
    });

    it('should create fromGroup', () => {
        const option1: FormGroupLayoutItem = { name: '1', value: 1, validators: null, options: null };
        const option2: FormGroupLayoutItem = { name: '2', value: 2, validators: null, options: null };
        const options: FormGroupLayoutItem[] = [option1, option2];
        const group = service.createForm(options);
        expect(group.controls[option1.name].value).toBe(option1.value);
        expect(group.controls[option2.name].value).toBe(option2.value);
    });

    it('should create fromGroup with aliases', () => {
        const option1: FormGroupLayoutItem = { value: 1, validators: null, options: null };
        const option2: FormGroupLayoutItem = { value: 2, validators: null, options: null };
        const options: FormGroupLayoutItem[] = [option1, option2];
        const group = service.createFormWithFormArray(options);
        const aliases = group.get('aliases') as FormArray;
        expect(aliases.at(0).value).toBe(option1.value);
        expect(aliases.at(1).value).toBe(option2.value);
    });
});
