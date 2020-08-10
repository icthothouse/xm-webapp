import { Component, OnDestroy, OnInit } from '@angular/core';
import { XmEventManager } from '@xm-ngx/core';
import { Principal } from '@xm-ngx/core/auth';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { XM_EVENT_LIST } from '../../xm.constants';
import { ProfileInfo } from './profile-info.model';
import { ProfileService } from './profile.service';

@Component({
    selector: 'xm-page-ribbon',
    template: `
        <div class="ribbon" *ngIf="ribbonEnv">
            <a href="">{{'global.ribbon.'+ribbonEnv|translate}}</a>
        </div>`,
    styleUrls: ['page-ribbon.css'],
    providers: [ProfileService],
})
export class PageRibbonComponent implements OnInit, OnDestroy {

    public profileInfo: ProfileInfo;
    public ribbonEnv: string;
    private eventAuthSubscriber: Subscription;

    constructor(
        private principal: Principal,
        private profileService: ProfileService,
        private eventManager: XmEventManager,
    ) {
        this.registerChangeAuth();
    }

    public ngOnInit(): void {
        this.principal.hasAnyAuthority(['ROLE_ADMIN'])
            .then((value) => {
                if (value) {
                    this.principal.getAuthenticationState().pipe(take(1)).subscribe((state) => {
                        if (state) {
                            this.principal.identity()
                                .then(() => {
                                    this.profileService.getProfileInfo().subscribe((profileInfo) => {
                                        this.profileInfo = profileInfo;
                                        this.ribbonEnv = profileInfo.ribbonEnv;
                                    });
                                });
                        }
                    });
                }
            })
            .catch((error) => console.info('PageRibbonComponent %o', error));
    }

    public ngOnDestroy(): void {
        if (this.ribbonEnv) {
            this.eventManager.destroy(this.eventAuthSubscriber);
        }
    }

    private registerChangeAuth(): void {
        if (this.ribbonEnv) {
            this.eventAuthSubscriber = this.eventManager
                .subscribe(XM_EVENT_LIST.XM_SUCCESS_AUTH, () => this.ngOnInit());
        }
    }
}
