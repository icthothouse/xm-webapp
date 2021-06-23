import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { XmUser } from '@xm-ngx/core/user';
import { takeUntilOnDestroyDestroy } from '@xm-ngx/shared/operators';
import { LanguageService, Locale, TitleService } from '@xm-ngx/translation';
import * as _ from 'lodash';
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService, Principal } from '../../../../src/app/shared/auth';

@Component({
    selector: 'xm-user-settings-widget',
    templateUrl: './xm-user-settings-widget.component.html',
})
export class XmUserSettingsWidgetComponent implements OnInit {
    public languages$: Observable<Locale[]> = this.languageService.languages$();

    @Input() public config: {hideDates: boolean}
    public timeZoneOffset: string;
    public settingsAccount: XmUser;
    public error: string;
    public success: string;
    public clock$: Observable<Date> = interval(1000).pipe(map(() => new Date()));

    constructor(
        private accountService: AccountService,
        private translateService: TranslateService,
        private titleService: TitleService,
        private principal: Principal,
        private languageService: LanguageService,
    ) {
    }

    public ngOnInit(): void {
        this.principal.identity().then((account: XmUser) => {
            if (!account){
                return;
            }
            this.settingsAccount = account;
            this.timeZoneOffset = account.timeZoneOffset || '';

            if (!account.langKey) {
                account.langKey = this.languageService.languages[0];
            }
        });
    }

    public ngOnDestroy(): void {
        takeUntilOnDestroyDestroy(this);
    }

    public save(): void {
        this.accountService.save(this.settingsAccount).subscribe(() => {
            this.error = null;
            this.success = 'OK';
            this.principal.identity(true).then((account) => {
                this.settingsAccount = _.cloneDeep(account);
                this.languageService.locale = this.settingsAccount.langKey;
                this.translateService.getTranslation(this.settingsAccount.langKey).subscribe(() => {
                    this.titleService.update();
                });
            });
        }, () => {
            this.success = null;
            this.error = 'ERROR';
        });
    }


}
