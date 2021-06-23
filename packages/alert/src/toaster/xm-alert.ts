import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';

declare const $: any;

/**
 * Alerts can be used to provide feedback messages.
 */
@Component({
    selector: 'xm-alert',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: '',
})
export class XmAlertComponent implements OnInit {

    @Input() public dismissible: boolean;
    @Input() public type: string;
    @Input() public message: string;

    constructor(config: NgbAlertConfig) {
        this.dismissible = config.dismissible;
        this.type = config.type;
    }

    public ngOnInit(): void {
        if (this.message) {
            $.notify(
                {
                    icon: 'add',
                    message: this.message,
                },
                {
                    type: this.type,
                    timer: 5000,
                    z_index: 2000,
                    placement: {
                        from: 'top',
                        align: 'right',
                    },
                });
        }
    }
}
