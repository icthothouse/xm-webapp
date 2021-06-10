import { Component } from '@angular/core';
import { UserWidgetBase } from './user-widget.base';

@Component({
    selector: 'xm-navbar-user-widget',
    templateUrl: './navbar-user-widget.component.html',
    styleUrls: ['./navbar-user-widget.component.scss']
})
export class NavbarUserWidgetComponent extends UserWidgetBase {
}
