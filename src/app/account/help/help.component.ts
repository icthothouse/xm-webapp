import { Component, OnInit } from '@angular/core';
import { JhiLanguageService } from 'ng-jhipster';
import { finalize, map } from 'rxjs/operators';

import { XmConfigService } from '../../shared';
import { Translate } from '@xm-ngx/translation';
import { IHelpNavLink } from '@xm-ngx/components/navbar';

export interface IHelpConfig {
    title?: string | Translate;
    content: string | unknown;
    navLink: IHelpNavLink;
}

@Component({
    selector: 'xm-help',
    templateUrl: './help.component.html',
    styleUrls: ['./help.component.scss'],
})
export class HelpComponent implements OnInit {

    public config: IHelpConfig | null;
    public lang: string;
    public showLoader: boolean = true;

    constructor(
        private xmConfigService: XmConfigService,
        private languageService: JhiLanguageService,
    ) {
        this.languageService.getCurrent().then((lang) => {
            this.lang = lang;
        });
    }

    public ngOnInit(): void {
        this.xmConfigService
            .getUiConfig()
            .pipe(
                map((res) => res?.helpConfig || {}),
                finalize(() => this.showLoader = false),
            ).subscribe((c) => this.config = c || null);
    }

}
