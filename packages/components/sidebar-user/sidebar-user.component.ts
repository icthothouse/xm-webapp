import { ChangeDetectionStrategy, Component } from '@angular/core';
import { matExpansionAnimations } from '@angular/material/expansion';
import * as _ from 'lodash';
import { MenuItem } from '../menu/menu-models';
import { UserWidgetBase } from './user-widget.base';


@Component({
    selector: 'xm-sidebar-user',
    templateUrl: './sidebar-user.component.html',
    styleUrls: ['./sidebar-user.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
    animations: [
        matExpansionAnimations.bodyExpansion,
        matExpansionAnimations.indicatorRotate,
    ],
})
export class SidebarUserComponent extends UserWidgetBase {
    public active: boolean = false;

    public getState(): string {
        return this.active ? 'expanded' : 'collapsed';
    }

    public toggle(): void {
        this.active = !this.active;
    }

    public selectActive(menu: MenuItem[]): void {
        _.forEach(menu, (menu) => {
            if (this.router.isActive(menu.url.join('/'), false)) {
                this.active = true;
                return false;
            }
            return true;
        });
    }
}

