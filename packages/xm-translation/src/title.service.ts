import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';

import { LanguageService, Translate } from './language.service';

export interface IRouteDate {
    pageTitle?: Translate;
}

export interface OnInitialize {
    init(): void;
}

export const DEFAULT_TITLE = 'Title';

@Injectable({providedIn: 'root'})
export class TitleService implements OnInitialize {

    protected subscriptions: Subscription[] = [];

    constructor(protected translateService: TranslateService,
                protected route: ActivatedRoute,
                protected router: Router,
                protected title: Title,
                @Inject(LOCALE_ID) protected localeId: string,
                protected languageService: LanguageService) {
    }

    public init(): void {
        this.subscriptions.push(
            this.translateService.get(this.localeId).subscribe(this.update.bind(this)),
            this.router.events.pipe(
                filter((e) => e instanceof NavigationEnd),
                map(() => this.getCurrentActiveRoute()),
                filter(route => route.outlet === 'primary'),
                distinctUntilChanged(),
            ).subscribe(this.update.bind(this)),
        );
    }

    public update(): void {
        this.set(this.get());
    }

    public set(title: string): void {
        if (title === undefined || title === null) {
            return;
        }

        this.title.setTitle(this.translateService.instant(title));
    }

    public get(): string {
        return this.getTitleFormRoute(this.router.routerState.snapshot.root)
            || this.route.snapshot.data.pageTitle
            || this.route.root.snapshot.data.pageTitle
            || DEFAULT_TITLE;
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((i) => i.unsubscribe());
    }

    protected getTitleFormRoute(route: ActivatedRouteSnapshot): string | null {
        if (!route) {
            return null;
        }

        return route.data.pageTitle
            || this.getTitleFormRoute(route.firstChild);
    }

    private getCurrentActiveRoute(): ActivatedRoute {
        let route = this.router.routerState.root;
        while (route.firstChild) {
            route = route.firstChild;
        }
        return route;
    }

}
