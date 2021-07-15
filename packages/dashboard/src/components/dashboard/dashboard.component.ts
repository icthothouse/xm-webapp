import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { environment } from '@xm-ngx/core/environment';
import { Spec, XmEntitySpecWrapperService } from '@xm-ngx/entity';
import { XmLogger, XmLoggerService } from '@xm-ngx/logger';
import { takeUntilOnDestroy, takeUntilOnDestroyDestroy } from '@xm-ngx/shared/operators';
import * as _ from 'lodash';
import { Page, PageService } from '../../stores/page/page.service';
import { Dashboard, DashboardLayoutLayout } from '../../models/dashboard.model';
import { DashboardWidget } from '../../models/dashboard-widget.model';
import { DashboardBase } from './dashboard-base';
import { PageTitleService } from './page-title.service';
import { sortByOrderIndex } from './sortByOrderIndex';

interface DashboardLayout {
    widget?: number | string | DashboardWidget;
    widgetName?: string;

    [key: string]: DashboardLayout | any;
}


@Component({
    selector: 'xm-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    providers: [PageTitleService],
})
export class DashboardComponent extends DashboardBase implements OnInit, OnDestroy {

    public dashboard: Dashboard = { isPublic: false };
    public showLoader: boolean;
    public spec: Spec;
    private logger: XmLogger;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private cdf: ChangeDetectorRef,
                private xmEntitySpecWrapperService: XmEntitySpecWrapperService,
                private pageService: PageService<Page<{ slug?: string }>>,
                loggerService: XmLoggerService,
                pageTitleService: PageTitleService,
    ) {
        super();
        this.logger = loggerService.create({ name: 'DashboardComponent' });
        pageTitleService.init();
    }

    public ngOnInit(): void {
        this.xmEntitySpecWrapperService.spec().then((spec) => this.spec = spec);

        this.route.params
            .pipe(takeUntilOnDestroy(this))
            .subscribe(() => {
                this.showLoader = true;
                this.dashboard = null;
                this.cdf.detectChanges();
                this.pageService.load(this.route.snapshot.data?.dashboard?.id || null);
            });

        this.pageService.active$()
            .pipe(takeUntilOnDestroy(this))
            .subscribe((page) => {
                if (!page) {
                    this.router.navigateByUrl(environment.notFoundUrl);
                    return;
                }
                this.loadDashboard(page);
            });
    }

    public ngOnDestroy(): void {
        takeUntilOnDestroyDestroy(this);
    }

    public loadDashboard(page: Page): void {
        this.logger.info(`Dashboard is loaded name="${page.name}" id="${page.id}".`);
        this.dashboard = _.cloneDeep(page);

        const widgets = sortByOrderIndex(this.dashboard.widgets || []);
        this.dashboard.widgets = this.getWidgetsComponent(widgets);

        if (this.dashboard.layout && this.dashboard.layout.layout) {
            this.findAndEnrichWidget(this.dashboard.layout.layout, widgets);
            this.dashboard.layout.grid = this.dashboard.layout.layout;
        } else {
            this.dashboard.layout = {};
            this.dashboard.layout.grid = widgets.map((w) => this.defaultGrid(w));
        }

        this.showLoader = false;
    }

    public isCustomElement(layout: { widget: unknown }): boolean {
        return Boolean(layout.widget);
    }

    public resolveCustomParams(layout: { widget: { module: string; selector: string; config: unknown } }): unknown {
        return {
            module: layout.widget.module,
            selector: layout.widget.selector,
            config: layout.widget.config,
            spec: this.spec,
        };
    }

    private findAndEnrichWidget(layout: DashboardLayout, widgets: DashboardWidget[]): void {
        Object.keys(layout).forEach((k) => {
            if (k === 'widget') {
                layout.widget = widgets.find((w) => w.id === layout[k]);
            }

            if (k === 'widgetName') {
                layout.widget = widgets.find((w) => w.name === layout[k]);
                if (!layout.widget) {
                    this.logger.error('The dashboard layout has a reference to the non-existing widget '
                        + `widgetName=${layout[k]}.`);
                }
            }

            if (layout[k] && typeof layout[k] === 'object') {
                this.findAndEnrichWidget(layout[k], widgets);
            }
        });
    }

    private defaultGrid(el: DashboardWidget): DashboardLayoutLayout {
        return {
            class: 'row mx-md-0',
            selector: null,
            content: [
                {
                    class: 'col-sm-12',
                    selector: null,
                    widget: el,
                },
            ],
        };
    }

}
