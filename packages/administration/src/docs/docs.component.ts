import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';

import { AuthServerProvider } from '@xm-ngx/core/auth';
import SwaggerUI from 'swagger-ui';

interface SwaggerResource {
    location: string;
    name: string;
}

@Component({
    selector: 'xm-docs',
    templateUrl: './docs.component.html',
    styles: [
        `
            :host ::ng-deep #swaggerHolder .col-12 {
                padding-left: 0;
                padding-right: 0;
            }

            :host ::ng-deep #swaggerHolder .scheme-container {
                display: none;
            }
        `,
    ],
})
export class JhiDocsComponent implements AfterViewInit {

    public swaggerResources: SwaggerResource[];
    public currentResource: string;

    constructor(
        private http: HttpClient,
        private auth: AuthServerProvider,
    ) {
    }

    public ngAfterViewInit(): void {
        this.http
            .get<SwaggerResource[]>('/swagger-resources')
            .subscribe((data: SwaggerResource[]) => {
                this.swaggerResources = data;
                this.currentResource = this.swaggerResources[0].location;
                this.updateSwagger(this.currentResource);
            });
    }

    public updateSwagger(resource: string): void {
        const authToken = this.auth.getToken();
        SwaggerUI({
            // eslint-disable-next-line @typescript-eslint/camelcase
            dom_id: '#swaggerHolder',
            supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch'],
            url: `${window.location.protocol}//${window.location.host}${resource}`,
            docExpansion: 'none',
            apisSorter: 'alpha',
            showRequestHeaders: false,
            validatorUrl: null,
            configs: {
                preFetch: (req) => {
                    if (authToken) {
                        req.headers.Authorization = `Bearer ${authToken}`;
                    }
                    return req;
                },
            },
        });
    }

}
