import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { XmEventManager } from '@xm-ngx/core';
import { Widget } from '@xm-ngx/dynamic';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Account, AuthServerProvider, Principal } from '../shared';
import { XmConfigService } from '../shared/spec/config.service';
import { DashboardBase } from '../xm-dashboard/dashboard/dashboard-base';
import { DEFAULT_AUTH_TOKEN, DEFAULT_CONTENT_TYPE, XM_EVENT_LIST } from '../xm.constants';

@Component({
    selector: 'xm-home',
    styleUrls: ['./home.component.scss'],
    templateUrl: './home.component.html',
})
export class HomeComponent extends DashboardBase implements OnInit, OnDestroy {

    public account: Account;
    public modalRef: MatDialogRef<any>;
    public defaultWidget: Widget;
    public defaultLayout: any;
    public signWidget: Widget;
    private eventAuthSubscriber: Subscription;

    constructor(private principal: Principal,
                private eventManager: XmEventManager,
                private xmConfigService: XmConfigService,
                private http: HttpClient,
                private authServerProvider: AuthServerProvider) {
        super();
    }

    public ngOnInit(): void {
        this.signWidget = this.getWidgetComponent({selector: 'ext-common/xm-widget-sign-in-up'});

        this.principal.getAuthenticationState().subscribe((state) => {
            if (state) {
                this.principal.identity().then((account) => {
                    this.account = account;
                });
            }
        });

        this.registerAuthenticationSuccess();

        this.getAccessToken().subscribe(() => {
            this.xmConfigService.getUiConfig().subscribe((result) => {
                if (result) {
                    if (result.defaultLayout) {
                        this.defaultLayout = result.defaultLayout.map((row) => {
                            row.content = row.content.map((el) => {
                                el.widget = this.getWidgetComponent(el.widget);
                                return el;
                            });
                            return row;
                        });
                    } else {
                        this.defaultWidget = this.getWidgetComponent(result.defaultWidget);
                    }
                } else {
                    this.defaultWidget = this.getWidgetComponent();
                }
            }, (err) => {
                console.warn(err);
                this.defaultWidget = this.getWidgetComponent();
            });
        });
    }

    public ngOnDestroy(): void {
        this.eventManager.destroy(this.eventAuthSubscriber);
    }

    public registerAuthenticationSuccess(): void {
        this.eventAuthSubscriber = this.eventManager.subscribe(XM_EVENT_LIST.XM_SUCCESS_AUTH, () => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    public isAuthenticated(): boolean {
        return this.principal.isAuthenticated();
    }

    private getAccessToken(): Observable<void> {
        const data = new HttpParams().set('grant_type', 'client_credentials');
        const headers = {
            'Content-Type': DEFAULT_CONTENT_TYPE,
            Authorization: DEFAULT_AUTH_TOKEN,
        };
        return this.http.post<any>('uaa/oauth/token', data, {headers, observe: 'response'})
            .pipe(map((resp) => {
                this.authServerProvider.loginWithToken(resp.body.access_token, false);
            }));
    }

}
