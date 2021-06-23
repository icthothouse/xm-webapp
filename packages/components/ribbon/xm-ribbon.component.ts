import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { XmUiConfigService } from '@xm-ngx/core/config';
import { environment, IEnvironment } from '@xm-ngx/core/environment';
import { takeUntilOnDestroy, takeUntilOnDestroyDestroy } from '@xm-ngx/shared/operators';
import { combineLatest, Observable } from 'rxjs';
import { delay, filter, shareReplay, startWith } from 'rxjs/operators';
import { getServerEnvironment } from './get-current-env';


function changeFavicon(url: string): void {
    const link = document.querySelector<HTMLLinkElement>('link[rel*=\'icon\']') || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = url;
    document.getElementsByTagName('head')[0].appendChild(link);
}

@Component({
    selector: 'xm-ribbon',
    templateUrl: './xm-ribbon.component.html',
    styleUrls: ['./xm-ribbon.component.scss'],
})
export class XmRibbonComponent implements OnInit, OnDestroy {
    @Input() public environment: IEnvironment = environment;
    @Input() public config: {
        favicons: { url: string, server: string }[]
        hidden?: boolean
    };
    public serverEnv$: Observable<string> = getServerEnvironment().pipe(
        filter((r) => Boolean(r)),
        takeUntilOnDestroy(this),
        shareReplay(1));

    constructor(
        private uiConfigService: XmUiConfigService,
    ) {
    }

    public ngOnInit(): void {
        document.body.setAttribute('data-release', environment.release);

        combineLatest([
            this.serverEnv$.pipe(startWith(null)),
            this.uiConfigService.config$().pipe(startWith(null)),
        ]).pipe(
            takeUntilOnDestroy(this),
            delay(700),
        ).subscribe(([server]) => {
            if (this.config && this.config.favicons) {
                const favicon = this.config.favicons.find((i) => i.server === server);
                if (favicon) {
                    changeFavicon(favicon.url);
                }
            }
        });
    }

    public ngOnDestroy(): void {
        takeUntilOnDestroyDestroy(this);
    }
}
