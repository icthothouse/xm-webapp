import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { I18nNamePipe } from '@xm-ngx/components/language';
import { takeUntilOnDestroy, takeUntilOnDestroyDestroy } from '@xm-ngx/shared/operators';
import { TitleService, Translate } from '@xm-ngx/translation';
import { filter } from 'rxjs/operators';
import { Principal } from '../../shared/auth';
import { Page, PageService } from '../page/page.service';


@Injectable()
export class PageTitleService implements OnDestroy {

    constructor(private titleService: TitleService,
                private i18nNamePipe: I18nNamePipe,
                private principal: Principal,
                private route: ActivatedRoute,
                public pageService: PageService) {
    }

    public init(): void {
        this.pageService.active$().pipe(
            filter(Boolean),
            takeUntilOnDestroy(this),
        ).subscribe((p) => this.updateTitle(p));
    }

    public updateTitle(page: Page): void {
        const title = this.processDashboardName(page);
        // Support navbar
        this.route.snapshot.data.pageSubSubTitle =  title;
        this.titleService.set(title);
    }

    public ngOnDestroy(): void {
        takeUntilOnDestroyDestroy(this);
    }

    private processDashboardName(dashboard: Page<{ name?: Translate; menu?: { name?: Translate } }>): string {
        const config = dashboard && dashboard.config ? dashboard.config : {};
        const dashboardName = config.name ? this.i18nNamePipe.transform(config.name, this.principal) : null;
        const dashboardMenuLabel = (config.menu && config.menu.name)
            ? this.i18nNamePipe.transform(config.menu.name, this.principal)
            : dashboard.name;
        return dashboardName || dashboardMenuLabel;
    }
}
