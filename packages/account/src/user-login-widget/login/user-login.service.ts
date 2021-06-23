import { Injectable, OnDestroy } from '@angular/core';
import { XmEventManager } from '@xm-ngx/core';
import { JhiLanguageService } from 'ng-jhipster';
import { Subscription } from 'rxjs';

import { XM_EVENT_LIST } from '../../../../../src/app/xm.constants';
import { Principal } from '@xm-ngx/core/auth';
import { XmConfigService } from '../../../../../src/app/shared/spec/config.service';
import { UserLogin } from './user-login.model';

@Injectable()
export class UserLoginService implements OnDestroy {

    private promise: Promise<any>;
    private allLogins: any = {};
    private eventManagerSubscription: Subscription;
    constructor(
        private jhiLanguageService: JhiLanguageService,
        private specService: XmConfigService,
        private eventManager: XmEventManager,
        private principal: Principal,
    ) {
        this.getAllLogins().then((logins) => this.allLogins = logins);
        this.registerChangeAuth();
    }

    public ngOnDestroy(): void {
        this.eventManagerSubscription.unsubscribe();
    }

    public getAllLogins(): Promise<any> {
        if (this.promise) {
            return this.promise;
        }
        return this.promise = new Promise((resolve) => {
            this.specService.getLoginsSpec().toPromise().then(
                (result) => {
                    resolve(result.logins.reduce((map, obj) => {
                        map[obj.key] = obj;
                        return map;
                    }, {}));
                },
                () => this.promise = null,
            );
        });
    }

    public getLogin(login: UserLogin): string {
        if (!this.allLogins.hasOwnProperty(login.typeKey)) {
            return '';
        }
        return this.getName(login.typeKey) + ': ' + login.login;
    }

    public getName(typeKey: string): (string | number | 'MM/DD/YYYY HH:mm') | { name: 'English' } | any {
        const type = this.allLogins[typeKey];
        const name = type.name;
        const langKey = this.principal.getLangKey();
        if (name) {
            if (name[this.jhiLanguageService.currentLang]) {
                return name[this.jhiLanguageService.currentLang];
            } else if (name[langKey]) {
                return name[langKey];
            } else if (name.en) {
                return name.en;
            }
        }
        return type.key;
    }

    private registerChangeAuth(): void {
        this.eventManagerSubscription = this.eventManager.subscribe(XM_EVENT_LIST.XM_SUCCESS_AUTH, () => {
            this.allLogins = {};
            this.promise = null;
            this.getAllLogins().then((logins) => this.allLogins = logins);
        });
    }
}
