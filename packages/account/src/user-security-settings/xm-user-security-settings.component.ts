import { Component, OnInit } from '@angular/core';
import { XmUser } from '@xm-ngx/core/user';
import * as _ from 'lodash';
import { AccountService, Principal } from '../../../../src/app/shared/auth';

@Component({
    selector: 'xm-user-security-settings',
    templateUrl: './xm-user-security-settings.component.html',
})
export class XmUserSecuritySettingsComponent implements OnInit {

    public tfaEnabled: boolean;
    public settingsAccount: XmUser;
    public securityChanged: boolean;
    public autoLogoutEnabled: boolean;
    public autoLogoutTime: number;

    constructor(
        private accountService: AccountService,
        private principal: Principal,
    ) {
    }

    public ngOnInit(): void {
        this.principal.identity().then((account) => {
            if (!account) {
                return;
            }

            this.settingsAccount = _.cloneDeep(account);
            this.tfaEnabled = this.settingsAccount.tfaEnabled;
            this.autoLogoutTime = this.settingsAccount.autoLogoutTime;
            this.autoLogoutEnabled = this.settingsAccount.autoLogoutEnabled;
            this.securityChanged = false;
        });
    }

    public updateSecuritySettings(): void {
        // LOGIN.EMAIL
        if (this.tfaEnabled) {
            this.accountService.enableTFA('email', this.findEmail(this.settingsAccount)).subscribe(() => {
                this.securityChanged = true;
                this.updatePrincipalIdentityBC();
            });
        } else {
            this.accountService.disableTFA().subscribe(() => {
                this.securityChanged = true;
                this.updatePrincipalIdentityBC();
            });
        }
    }

    private findEmail(account: XmUser): string {
        if (account && account.logins) {
            for (const entry of account.logins) {
                if (entry.typeKey === 'LOGIN.EMAIL') {
                    return entry.login;
                }
            }
        }
        return '';
    }

    /**
     * Backward compatibility
     */
    private updatePrincipalIdentityBC(): void {
        this.principal.identity(true).then((account) => {
            this.settingsAccount = _.cloneDeep(account);
        });
    }

}
