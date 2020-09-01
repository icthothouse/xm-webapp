import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IId } from '@xm-ngx/components/entity-collection';
import { IComponent } from '@xm-ngx/dynamic';
import { transformByMap } from '@xm-ngx/shared/operators/transform-by-map';
import { clone, get } from 'lodash';

export interface LinkOptions {
    /** list of fields which will be transformed to queryParams */
    queryParamsFromEntityFields?: { [key: string]: string };
    /** string is field path or regular url */
    routerLink: string[];
    valueField: string;
}

export const LINK_DEFAULT_OPTIONS: LinkOptions = {
    queryParamsFromEntityFields: { 'id': 'id' },
    routerLink: [],
    valueField: 'id',
};

@Component({
    selector: 'xm-link',
    template: `
        <a [queryParams]="queryParams"
           [routerLink]="options?.routerLink">
            <span>{{fieldValue}}</span>
        </a>
    `,
    encapsulation: ViewEncapsulation.None,
})
export class LinkComponent implements IComponent<IId, LinkOptions> {
    @Input() public value: IId;
    @Input() public options: LinkOptions = clone(LINK_DEFAULT_OPTIONS);

    public fieldValue: unknown;
    public queryParams: { [key: string]: unknown };

    public update(): void {
        if (!this.value) {
            return;
        }

        this.fieldValue = get(this.value, this.options?.valueField || LINK_DEFAULT_OPTIONS.valueField, '');
        this.queryParams = transformByMap(this.value, this.options?.queryParamsFromEntityFields || LINK_DEFAULT_OPTIONS.queryParamsFromEntityFields);
    }

    public ngOnChanges(): void {
        this.update();
    }

    public ngOnInit(): void {
        this.update();
    }
}

@NgModule({
    declarations: [LinkComponent],
    exports: [LinkComponent],
    imports: [
        CommonModule,
        RouterModule,
    ],
})
export class LinkModule {
}
