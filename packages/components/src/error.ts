import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { XmSharedModule } from '@xm-ngx/shared';

@Component({
    selector: 'xm-error',
    template: `
        <div>
            <div class="row">
                <div class="col-md-4">
                    <span class="hipster img-fluid img-rounded"></span>
                </div>
                <div class="col-md-8">
                    <h1 jhiTranslate="error.title">Error Page!</h1>

                    <div [hidden]="!errorMessage">
                        <div class="alert alert-danger">{{errorMessage}}
                        </div>
                    </div>
                    <div [hidden]="!error403" class="alert alert-danger" jhiTranslate="error.403">You are not authorized
                        to access the
                        page.
                    </div>
                </div>
            </div>
        </div>
    `,
})
export class ErrorComponent implements OnInit {
    public errorMessage: string;
    public error403: boolean;

    constructor(private route: ActivatedRoute) {
    }

    public ngOnInit(): void {
        this.route.data.subscribe((routeData) => {
            if (routeData.error403) {
                this.error403 = routeData.error403;
            }
            if (routeData.errorMessage) {
                this.errorMessage = routeData.errorMessage;
            }
        });
    }
}

@NgModule({
    imports: [
        XmSharedModule,
        RouterModule.forChild([{path: '', component: ErrorComponent}]),
    ],
    exports: [ErrorComponent],
    entryComponents: [ErrorComponent],
    declarations: [ErrorComponent],
    providers: [],
})
export class ErrorModule {
}


