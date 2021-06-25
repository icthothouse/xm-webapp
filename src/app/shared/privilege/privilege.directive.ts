import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Principal } from '../auth/principal.service';

/**
 * Conditionally includes an HTML element if current user has any
 * of the authorities passed as the `expression`.
 *
 * @example
 * ```
 *     <some-element *permitted="'RATING.UPDATE'">...</some-element>
 *
 *     <some-element *permitted="['RATING.UPDATE', 'TENANT.LOGIN.GET_LIST']">...</some-element>
 * ```
 */

@Directive({
    selector: '[permitted]',
})
export class PermitDirective implements OnDestroy {

    public privileges: string[];
    private privilegeSubscription: Subscription;

    constructor(
        private principal: Principal,
        private templateRef: TemplateRef<any>,
        private viewContainerRef: ViewContainerRef,
    ) {
    }

    @Input()
    set permitted(value: string) {
        this.privileges = typeof value === 'string' ? [value] : value;
        this.updateView();
        // Get notified each time authentication state changes.
        this.privilegeSubscription = this.principal.getAuthenticationState().subscribe(() => this.updateView());
    }

    public ngOnDestroy(): void {
        this.privilegeSubscription.unsubscribe();
    }

    private updateView(): void {
        this.principal.hasPrivileges(this.privileges).then((result) => {
            this.viewContainerRef.clear();
            if (result) {
                this.viewContainerRef.createEmbeddedView(this.templateRef);
            }
        });
    }

}
