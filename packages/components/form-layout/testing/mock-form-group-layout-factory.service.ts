import { FormArray, FormControl, FormGroup } from '@angular/forms';

export class MockFormGroupLayoutFactoryService {
    public createControl(): FormControl {
        return new FormControl();
    }

    public createForm(): FormGroup {
        return new FormGroup({});
    }

    public createFormWithFormArray(): FormGroup {
        return new FormGroup({aliases: new FormArray([])});
    }
}
