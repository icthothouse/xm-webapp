import { Component, OnInit } from '@angular/core';
import { XmUser, XmUserService } from '@xm-ngx/core/user';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'xm-user-login-widget',
    templateUrl: './xm-user-login-widget.component.html',
})
export class XmUserLoginWidgetComponent implements OnInit {

    public user$: Observable<XmUser>;

    constructor(
        private userService: XmUserService,
    ) {
    }

    public ngOnInit(): void {
        this.user$ = this.userService.user$().pipe(map((user) => _.cloneDeep(user)));
    }
}
