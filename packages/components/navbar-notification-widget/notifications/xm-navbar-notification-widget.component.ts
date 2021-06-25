import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { XmEventManager, XmSessionService } from '@xm-ngx/core';

import * as _ from 'lodash';
import { Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Principal } from '@xm-ngx/core/auth';
import { Notification, NotificationUiConfig } from '../shared/notification.model';

import { NotificationsService } from '../shared/notifications.service';
import { takeUntilOnDestroy, takeUntilOnDestroyDestroy } from '@xm-ngx/shared/operators';
import { XmUiConfigService } from '@xm-ngx/core/config';

const DEFAULT_PRIVILEGES = ['XMENTITY.SEARCH', 'XMENTITY.SEARCH.QUERY', 'XMENTITY.SEARCH.TEMPLATE'];
const DEF_NOTIFY_COUNT = 5;

@Component({
    selector: 'xm-navbar-notification-widget',
    templateUrl: './xm-navbar-notification-widget.component.html',
    styleUrls: ['./xm-navbar-notification-widget.component.scss'],
})
export class XmNavbarNotificationWidget implements OnInit, OnDestroy {

    public config: NotificationUiConfig;
    public isOpened: boolean;
    public showCount: number;
    public notifications: Notification[];
    public redirectUrl: string;
    public autoUpdateEnabled: boolean = null;
    public privileges: string[];
    public updateInterval: number;
    private entityListModifications: Subscription;
    private entityEntityStateChange: Subscription;
    public isSessionActive$: Observable<boolean> = this.xmSessionService.isActive();

    constructor(
        private xmConfigService: XmUiConfigService<{ notifications: NotificationUiConfig }>,
        private eventManager: XmEventManager,
        private router: Router,
        private sanitized: DomSanitizer,
        private eRef: ElementRef,
        private principal: Principal,
        private xmSessionService: XmSessionService,
        private notificationsService: NotificationsService) {
        this.isOpened = false;
        this.notifications = [];
        this.config = null;
    }

    public get notificationsCount(): number {
        return this.notificationsService.totalCount;
    }

    @HostListener('document:click', ['$event'])
    public clickout(event: any): void {
        if (!(this.eRef.nativeElement.contains(event.target))) {
            this.isOpened = false;
        }
    }

    public ngOnInit(): void {
        this.entityListModifications = this.eventManager.subscribe('xmEntityListModification',
            () => this.load());
        this.entityEntityStateChange = this.eventManager.subscribe('xmEntityDetailModification',
            () => this.load());
        this.isSessionActive$
            .pipe(takeUntilOnDestroy(this))
            .subscribe((res: boolean) => {
                if (res) {
                    this.load()
                }
            });
    }

    public ngOnDestroy(): void {
        this.eventManager.destroy(this.entityListModifications);
        this.eventManager.destroy(this.entityEntityStateChange);
        clearInterval(this.updateInterval);
        takeUntilOnDestroyDestroy(this);
    }

    public load(initAutoUpdate: boolean = false): void {
        this.xmConfigService.config$()
            .pipe(take(1))
            .subscribe((config) => {
            this.config = config.notifications;
            this.mapPrviliges(this.config);
            if (this.config) {
                this.getNotifications(this.config);
            }
            if (this.config && this.config.autoUpdate && !this.autoUpdateEnabled && initAutoUpdate) {
                this.autoUpdateEnabled = true;
                // TODO: should be redone with web sockets
                this.updateInterval = window.setInterval(() => {
                    if (this.principal.isAuthenticated()) {
                        this.getNotifications(this.config);
                    } else {
                        clearInterval(this.updateInterval);
                    }
                }, this.config.autoUpdate);
            }
        });
    }

    public getNotifications(config: NotificationUiConfig): void {
        this.notificationsService
            .getNotifications(config)
            .pipe(
                map((notifications: any) => {
                    notifications.forEach((notification) => {
                        if (config.showAsHtml) {
                            notification.label = this.sanitized.bypassSecurityTrustHtml(notification.label);
                        }
                    });
                    return notifications;
                }),
                takeUntilOnDestroy(this),
            )
            .subscribe((resp) => {
                this.notifications = resp;
                this.redirectUrl = config.redirectUrl;
                this.showCount = config.max ? config.max - 1 : DEF_NOTIFY_COUNT;
            });
    }

    public onRemoveItem(event: any, item: any): void {
        event.stopPropagation();
        if (this.config && this.config.changeStateName) {
            this.notificationsService
                .markRead(item.id, this.config)
                .pipe(takeUntilOnDestroy(this))
                .subscribe(() => {
                    this.notifications = this.notifications.filter((i) => i !== item);
                });
        }
    }

    public toggleNotifications(): void {
        this.isOpened = !this.isOpened;
    }

    public viewAll(url: any): void {
        this.router.navigate([url]);
        this.toggleNotifications();
    }

    public onNavigate(item: any, event: any): void {
        if (this.config.preventNavigation) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        if (item) {
            const typeKey = _.get(item, this.config.referenceTypeKeyPath);
            const id = _.get(item, this.config.referenceIdPath);
            if (!typeKey || !id) {
                console.warn('No entity found for notification ' + item.id);
                return;
            }

            this.router.navigate(['/application', typeKey, id]);
            this.toggleNotifications();
        }
    }

    private mapPrviliges(config: NotificationUiConfig): void {
        this.privileges = [];
        if (config && config.privileges && config.privileges.length > 0) {
            config.privileges.forEach((p) => this.privileges.push(p));
        } else {
            this.privileges = DEFAULT_PRIVILEGES;
        }
    }
}
