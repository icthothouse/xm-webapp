import { Injectable } from '@angular/core';
import { XmAuthenticationService } from '../../../../packages/core/auth';
import { AuthServerProvider } from './auth-jwt.service';
import { Principal } from './principal.service';
import { StateStorageService } from './state-storage.service';

@Injectable()
export class LoginService {

    constructor(private principal: Principal,
                private authenticationService: XmAuthenticationService,
                private authServerProvider: AuthServerProvider,
                private stateStorageService: StateStorageService) {
    }

    public login(credentials: any, callback?: any): Promise<unknown> {
        const cb = callback || (() => undefined);

        return new Promise((resolve, reject) => {
            this.authServerProvider.login(credentials).subscribe((data) => {
                if (this.stateStorageService.getDestinationState()
                    && this.stateStorageService.getDestinationState().destination) {
                    const state = this.stateStorageService.getDestinationState().destination;
                    if (state.name && state.name === 'otpConfirmation') {
                        resolve(state.name);
                    } else {
                        this.getUserIdentity(resolve, data);
                    }
                } else {
                    this.getUserIdentity(resolve, data);
                }

                return cb();
            }, (err) => {
                console.info('service-error %o', err);
                this.authenticationService.logout();
                reject(err);
                return cb(err);
            });
        });
    }

    public loginWithToken(jwt: string, rememberMe: boolean): Promise<unknown> {
        return this.authServerProvider.loginWithToken(jwt, rememberMe);
    }

    /** @deprecated use XmAuthenticationService.logout() $*/
    public logout(): void {
        this.authenticationService.logout();
    }


    private getUserIdentity(next: any, data: any): void {
        this.principal.identity(true, true).then((account) => {
            if (next) {
                next(data);
            }
        });
    }
}
