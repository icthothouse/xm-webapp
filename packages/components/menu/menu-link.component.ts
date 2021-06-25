import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { MenuItem } from './menu-models';

@Component({
    selector: 'xm-menu-link, [xm-menu-link]',
    template: `
        <a [routerLink]="item.url"
           (click)="submitEvent.next()"
           (keyup.enter)="submitEvent.next()"
           class="menu-link"
           routerLinkActive="active">
            <mat-icon class="menu-icon">{{item.icon}}</mat-icon>
            <span class="xm-menu-item-text" [title]="item.title | translate">{{item.title | translate}}</span>
            <ng-content></ng-content>
        </a>
    `,
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.None,
})
export class MenuLinkComponent {

    @Input() public item: MenuItem;
    @Input() public disabled: boolean;
    @Output() public submitEvent: EventEmitter<void> = new EventEmitter<void>();
}
