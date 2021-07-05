import { Component } from '@angular/core';
import { UserWidgetBase } from '@xm-ngx/components/sidebar-user';

@Component({
    selector: 'xm-navbar-user-widget',
    templateUrl: './navbar-user-widget.component.html',
    styleUrls: ['./navbar-user-widget.component.scss']
})
export class NavbarUserWidgetComponent extends UserWidgetBase {
}
