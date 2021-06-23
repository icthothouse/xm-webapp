import { Injectable } from '@angular/core';
import { Translate, XmTranslateService } from '@xm-ngx/translation';
import * as _ from 'lodash';
import { from, Observable } from 'rxjs';
import { SweetAlertOptions, SweetAlertResult, SweetAlertType } from 'sweetalert2';
import swal from 'sweetalert2/dist/sweetalert2';
import { XmAlertConfigService } from './xm-alert-config.service';

export interface XmAlertOptions extends Partial<SweetAlertOptions> {
    type?: string | SweetAlertType | any;
    text?: Translate | any;
    textOptions?: {
        value?: string;
        [value: string]: string | object;
    };

    titleOptions?: object;
}

export type XmAlertResult = SweetAlertResult;

@Injectable({
    providedIn: 'root',
})
export class XmAlertService {

    constructor(protected config: XmAlertConfigService,
                protected xmTranslateService: XmTranslateService,
    ) {
    }

    public open(settings: XmAlertOptions): Observable<XmAlertResult> {

        const DEFAULT: XmAlertOptions = {
            width: this.config.width,
            buttonsStyling: this.config.buttonsStyling,
            reverseButtons: this.config.reverseButtons,
            showCloseButton: this.config.showCloseButton,
            confirmButtonClass: this.config.confirmButtonClass,
            cancelButtonClass: this.config.cancelButtonClass,
            confirmButtonText: this.config.yesLabel,
            cancelButtonText: this.config.cancelLabel,
        };
        settings = _.merge(DEFAULT, settings);

        if (settings.title) {
            const opts = settings.titleOptions || {};

            settings.title = this.xmTranslateService.translate(settings.title, opts);
        }

        if (settings.text) {
            const opts = settings.textOptions || {};
            _.defaults(opts, { value: '' });

            settings.text = this.xmTranslateService.translate(settings.text, opts);
        }

        if (settings.confirmButtonText) {
            settings.confirmButtonText = this.xmTranslateService.translate(settings.confirmButtonText);
        }
        if (settings.cancelButtonText) {
            settings.cancelButtonText = this.xmTranslateService.translate(settings.cancelButtonText);
        }

        return from(swal(settings));
    }

    public yesNo(settings: XmAlertOptions): Observable<XmAlertResult> {
        return this.open(_.merge({
            showCancelButton: true,
            confirmButtonText: this.config.yesLabel,
            cancelButtonText: this.config.noLabel,
        }, settings));
    }

    public yesCancel(settings: XmAlertOptions): Observable<XmAlertResult> {
        return this.open(_.merge({
            showCancelButton: true,
            confirmButtonText: this.config.yesLabel,
            cancelButtonText: this.config.cancelLabel,
        }, settings));
    }

    public delete(options?: XmAlertOptions): Observable<XmAlertResult> {
        return this.yesCancel(_.merge({
            title: this.config.deleteLabel,
            text: this.config.deleteMessage,
            confirmButtonText: this.config.deleteLabel,
        }, options));
    }
}
