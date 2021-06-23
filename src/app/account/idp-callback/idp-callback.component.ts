import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoginService } from '@xm-ngx/core/auth';
import { XmUIConfig, XmUiConfigService } from '@xm-ngx/core/config';
import { takeUntilOnDestroy, takeUntilOnDestroyDestroy } from '@xm-ngx/shared/operators';
import { combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';
import { TERMS_ERROR } from '../../xm.constants';

const TERMS_PROP = 'privacyAndTermsEnabled';

interface IErrorTerm {
    error?: {
        oneTimeToken?: string, error?: string
    }
}

@Component({
  selector: 'xm-idp-callback',
  templateUrl: './idp-callback.component.html',
})
export class IdpCallbackComponent implements OnDestroy {

    protected isTermsShown: boolean;

    constructor(
        private loginService: LoginService,
        private router: Router,
        private activeRouter: ActivatedRoute,
        protected xmUiConfigService: XmUiConfigService,
    ) {
        combineLatest(
            this.activeRouter.queryParams,
            this.xmUiConfigService.config$(),
        ).pipe(
            takeUntilOnDestroy(this),
            take(1),
        ).subscribe(([params, config]) => {
            if (activeRouter.snapshot.data.callbackAuth && params && config?.idp?.enabled) {
                this.loginService.loginWithIdpCallback(params).then(() => {
                    this.isTermsShown = false;
                    this.loginService.loginSuccess();
                }).catch((err) => {
                    this.handleErrorException(err, config, params);
                });
            } else {
                this.router.navigate(['']);
            }
        });
    }

    public ngOnDestroy(): void {
        takeUntilOnDestroyDestroy(this);
    }

    private handleErrorException(err: IErrorTerm, config: XmUIConfig, params: Params) {
        this.isTermsShown = true;
        const errObj = err && err.error || null;
        const termsErr = errObj && errObj.error === TERMS_ERROR;
        const termsToken = errObj && errObj.oneTimeToken || null;
        const termsConfig = this.extractTermConfig(config, TERMS_PROP);
        if (termsErr && termsToken && !this.isTermsShown && termsConfig[TERMS_PROP]) {
            this.loginService.showTermsDialog(termsToken, termsConfig).then((r) => {
                if (r === 'accept') {
                    this.loginService.loginWithIdpCallback(params);
                } else {
                    this.isTermsShown = false;
                }
            });
        }
    }

    private extractTermConfig(config: XmUIConfig, key: string) {
        let result = null;
        if(config instanceof Array) {
            for(let i = 0; i < config.length; i++) {
                result = this.extractTermConfig(config[i], key);
                if (result) {
                    break;
                }
            }
        } else {
            for(const prop in config) {
                if(prop == key) {
                    if(config[prop] == 1) {
                        return config;
                    }
                }
                if(config[prop] instanceof Object || config[prop] instanceof Array) {
                    result = this.extractTermConfig(config[prop], key);
                    if (result) {
                        break;
                    }
                }
            }
        }
        return result;
    }
}
