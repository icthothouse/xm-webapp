import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[xm-loading]',
    host: {
        class: 'xm-loading',
        '[class.xm-loading-start]': 'xmLoadingPosition === "start"',
        '[class.xm-loading-center]': 'xmLoadingPosition === "center"',
        '[class.xm-loading-end]': 'xmLoadingPosition === "end"',
    },
})
export class LoadingDirective {
    @HostBinding('class.xm-loading-active')
    @Input('xm-loading') public active: boolean;
    @Input() public xmLoadingPosition: 'start' | 'center' | 'end' = 'center';
}
