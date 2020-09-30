import { Injectable, OnDestroy } from '@angular/core';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

export const EXPIRES_DATE_FIELD = 'authenticationTokenexpiresDate';
export const DEFAULT_TIMEOUT = Math.pow(2, 31) - 1;

@Injectable({
    providedIn: 'root',
})
export class AuthRefreshTokenService implements OnDestroy {

    private defaultTimeout: number = DEFAULT_TIMEOUT;
    private updateTokenTimer: any;

    constructor(
        private localStorage: LocalStorageService,
        private sessionStorage: SessionStorageService,
    ) {
    }

    public getExpirationTime(): number | null {
        return this.sessionStorage.retrieve(EXPIRES_DATE_FIELD);
    }

    public setExpirationTime(expirationTime: number): void {
        this.sessionStorage.store(EXPIRES_DATE_FIELD, expirationTime);
    }

    public start(expiresIn: number | null, callback: () => void): void {
        let expirationTime: number;
        if (expiresIn) {
            expirationTime = new Date().setSeconds(expiresIn);
            this.setExpirationTime(expirationTime);
        } else {
            expirationTime = this.getExpirationTime();
        }

        const currentDate = new Date().setSeconds(0);
        if (currentDate < expirationTime) {
            let timeoutTime = (expirationTime - currentDate) - (60 * 1000);
            timeoutTime = this.updateTimoutToMaxValue(timeoutTime);
            this.updateTokenTimer = setTimeout(callback, timeoutTime);
        } else {
            callback();
        }
    }

    public clear(): void {
        clearTimeout(this.updateTokenTimer);
        this.localStorage.clear(EXPIRES_DATE_FIELD);
        this.sessionStorage.clear(EXPIRES_DATE_FIELD);
    }

    public ngOnDestroy(): void {
        clearTimeout(this.updateTokenTimer);
    }

    private updateTimoutToMaxValue(timeout: number): number {
        if (timeout > this.defaultTimeout) {
            timeout = this.defaultTimeout;
        }
        return timeout;
    }
}
