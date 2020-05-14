import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { XmAlertService } from '@xm-ngx/alert';

import { AccountService, User, UserService } from '../../../../src/app/shared';
import { JhiLanguageHelper } from '@xm-ngx/components/language';
import { UserLogin } from '../../../../src/app/shared/user/login/user-login.model';
import { UserLoginService } from '../../../../src/app/shared/user/login/user-login.service';

@Component({
    selector: 'xm-user-mgmt-detail',
    templateUrl: './user-management-detail.component.html',
    providers: [],
})
export class UserMgmtDetailComponent implements OnInit, OnDestroy {

    public user: User;
    public showLoader: boolean;
    public userEmail: string;
    private routeData: any;
    private subscription: any;
    private routeDataSubscription: any;

    constructor(
        private jhiLanguageHelper: JhiLanguageHelper,
        private alertService: XmAlertService,
        private userService: UserService,
        private userLoginService: UserLoginService,
        private pwsResetService: AccountService,
        private route: ActivatedRoute,
        private location: Location,
    ) {
        this.routeDataSubscription = this.route.data.subscribe((data) => {
            this.routeData = data;
        });
    }

    public ngOnInit(): void {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params.userKey);
        });
    }

    public load(userKey: string): void {
        this.showLoader = true;
        this.userService
            .find(userKey)
            .subscribe((user) => {
                    this.user = user;
                    this.userEmail = this.getEmail();
                    this.routeData.pageSubSubTitle = user.userKey;
                    this.jhiLanguageHelper.updateTitle();
                },
                (err) => console.info(err),
                () => this.showLoader = false);
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
        this.routeDataSubscription.unsubscribe();
    }

    public getLogin(login: UserLogin): string {
        return this.userLoginService.getLogin(login);
    }

    public onBack(): void {
        this.location.back();
    }

    public initPasswordReset(): void {
        this.alertService.open({
            title: `Initiate password reset for ${this.userEmail}?`,
            showCancelButton: true,
            buttonsStyling: false,
            confirmButtonClass: 'btn mat-button btn-primary',
            cancelButtonClass: 'btn mat-button',
            confirmButtonText: 'Yes, reset!',
        }).subscribe((result) => result.value
            ? this.pwsResetService.resetPassword(this.userEmail).subscribe()
            : console.info('Cancel'));
    }

    public pwdResetDisabled(): boolean {
        return !this.user.activated;
    }

    private getEmail(): string {
        let email = '';
        if (this.user.logins) {
            this.user.logins.forEach((item: UserLogin) => {
                if (item.typeKey === 'LOGIN.EMAIL') {
                    email = item.login;
                }
            });
        }
        return email;
    }

}
