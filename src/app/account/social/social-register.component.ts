import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'xm-social-register',
    templateUrl: './social-register.component.html',
})
export class SocialRegisterComponent implements OnInit {
    public success: boolean;
    public error: boolean;
    public provider: string;
    public providerLabel: string;
    public modalRef: MatDialogRef<any>;

    constructor(
        private route: ActivatedRoute,
    ) {
    }

    public ngOnInit(): void {
        this.route.queryParams.subscribe((queryParams) => {
            this.success = queryParams.success.toLowerCase().includes('true');
        });
        this.route.params.subscribe((params) => {
            this.provider = params['provider?{success:boolean}'];
        });
        this.error = !this.success;
        this.providerLabel = this.provider.charAt(0).toUpperCase() + this.provider.slice(1);
    }

    public login(): void {
        throw new Error('Not implemented');
    }

}
