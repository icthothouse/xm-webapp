import { Component, Input, OnInit } from '@angular/core';
import { SpecificationManagementComponent } from '@xm-ngx/administration/specification-management';
import { XmConfigService } from '../../../../../src/app/shared';

@Component({
    selector: 'xm-uaa-mng',
    templateUrl: './uaa-mng.component.html',
    styleUrls: ['./uaa-mng.component.scss'],
})
export class UaaMngComponent implements OnInit {
    @Input() public disabled: boolean;

    public uaaSpecificationIn: string;
    public uaaSpecificationOut: string;
    public uaaValidation: any;
    public isUaaSpecValid: boolean;

    public aceEditorOptions: any = {
        highlightActiveLine: true,
        maxLines: 50,
    };

    constructor(
        private service: XmConfigService,
    ) {
    }

    public ngOnInit(): void {
        this.service.getConfig('/uaa/uaa.yml').subscribe((result) => {
            this.uaaSpecificationIn = result;
            this.uaaSpecificationOut = result;
        });
    }

    public onUaaSpecificationChange(textChanged: string): void {
        this.isUaaSpecValid = false;
        this.uaaValidation = null;
        this.uaaSpecificationOut = textChanged;
    }

    public validateUaaSpecification(): void {
        this.service.validateUaaSpec(this.uaaSpecificationOut).subscribe((result) => {
            this.uaaValidation = result;
            this.isUaaSpecValid = !!this.uaaValidation.valid;
            SpecificationManagementComponent.renderValidationMessage(this.uaaValidation);
        });
    }

    public updateUaaSpecification(): void {
        this.service.updateUaaSpec(this.uaaSpecificationOut).subscribe(() => {
            this.isUaaSpecValid = false;
            window.location.reload();
        });
    }
}
