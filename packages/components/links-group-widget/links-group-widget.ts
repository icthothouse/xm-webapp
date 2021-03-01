import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, Type } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { IfDashboardSlugModule } from '@xm-ngx/components/if-dashboard-slug';
import { XmPermissionModule } from '@xm-ngx/core/permission';
import { IWidget } from '@xm-ngx/dynamic';
import { DataQa } from '@xm-ngx/shared/interfaces';
import { Translate, XmTranslationModule } from '@xm-ngx/translation';


export interface LinksGroupWidgetConfigItem extends DataQa {
    permittedByDashboardSlug: string;
    privileges: string | string[];
    title: Translate;
    routerLink: string[] | string;
}

export interface LinksGroupWidgetConfig {
    list: LinksGroupWidgetConfigItem[];
}

@Component({
    selector: 'xm-links-group-widget',
    template: `
        <div *ngIf="config?.list" class="mb-3">
            <nav [backgroundColor]="'accent'"
                 mat-tab-nav-bar
                 class="rounded"
                 role="group">
                <ng-container *ngFor="let item of config.list">
                    <ng-container *xmIfDashboardSlug="item.permittedByDashboardSlug">
                        <a [routerLink]="item.routerLink"
                           *xmPermission="item.privileges"
                           routerLinkActive="active"
                           [attr.data-qa]="item.dataQa || 'link-button'"
                           mat-tab-link
                           #rla="routerLinkActive"
                           [active]="rla.isActive"
                           type="button">
                            {{item.title | translate}}
                        </a>
                    </ng-container>
                </ng-container>
            </nav>
        </div>
    `,
    styleUrls: ['./links-group-widget.component.scss'],
})
export class LinksGroupWidget {
    @Input()
    public config: LinksGroupWidgetConfig;
}

@NgModule({
    declarations: [LinksGroupWidget],
    entryComponents: [LinksGroupWidget],
    exports: [LinksGroupWidget],
    imports: [
        CommonModule,
        RouterModule,
        XmPermissionModule,
        XmTranslationModule,
        MatButtonModule,
        MatTabsModule,
        IfDashboardSlugModule,
    ],
})
export class LinksGroupWidgetModule {
    public entry: Type<IWidget> = LinksGroupWidget;
}
