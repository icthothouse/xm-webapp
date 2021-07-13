import { Directive, EmbeddedViewRef, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { ReplaySubject, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PermissionCheckStrategy, XmPermissionService } from './xm-permission.service';

export interface PermissionContext {
    $implicit: string[];
    permissions: string[];
    allow: boolean;
}

function permissionContextFactory(): PermissionContext {
    return {
        $implicit: null,
        permissions: null,
        allow: null,
    };
}

/**
 *
 * @example
 * ```
 * <div *xmPermission="undefined"> Show template </div>
 * <div *xmPermission="null"> Show template </div>
 * <div *xmPermission="''"> Show template </div>
 * <div *xmPermission="[]"> Show template </div>
 * <div *xmPermission=""> Show template </div>
 *
 * <div *xmPermission="true"> Show template </div>
 * <div *xmPermission="false"> Hide template </div>
 *
 * <div *xmPermission="'RIGHT_PERMISSION'" Show template </div>
 * <div *xmPermission="['RIGHT_PERMISSION']" Show template </div>
 * <div *xmPermission="['WRONG_PERMISSION']" Hide template </div>
 * <div *xmPermission="['RIGHT_PERMISSION', 'WRONG_PERMISSION']" Hide template </div>
 *
 *  <ng-template #permittedRef> Show template </ng-template>
 *  <ng-template #noPermittedRef> Hide template </ng-template>
 *
 *  <!-- Result: Hide template -->
 *  <ng-template [xmPermission]="['WRONG_PERMISSION']"
 *               [xmPermissionThen]="permittedRef"
 *               [xmPermissionElse]="noPermittedRef">Remove xmPermissionThen to show</ng-template>
 *
 *  <!-- Result: Shows template -->
 *  <div *xmPermission="['RIGHT_PERMISSION']; else noPermittedRef"> Shows template </div>
 * ```
 */
@Directive({
    selector: '[xmPermission]',
})
export class PermissionDirective implements OnInit, OnDestroy {

    @Input() public strategy: PermissionCheckStrategy = PermissionCheckStrategy.ALL;
    private context: PermissionContext | null = permissionContextFactory();
    private thenTemplateRef: TemplateRef<PermissionContext> | null = null;
    private elseTemplateRef: TemplateRef<PermissionContext> | null = null;
    private thenViewRef: EmbeddedViewRef<PermissionContext> | null = null;
    private elseViewRef: EmbeddedViewRef<PermissionContext> | null = null;
    private subscription: Subscription;
    private update$: ReplaySubject<void> = new ReplaySubject(1);

    constructor(
        private viewContainer: ViewContainerRef,
        private permissionService: XmPermissionService,
        templateRef: TemplateRef<PermissionContext>,
    ) {
        this.thenTemplateRef = templateRef;
    }

    @Input()
    public set xmPermission(value: string | boolean | string[]) {
        if (!value || value === true || value.length === 0) {
            // Show by default
            this.context.$implicit = [];
            this.context.allow = value !== false;
            this.updateView();
            return;
        }

        this.context.$implicit = this.context.permissions = Array.isArray(value) ? value : [value];
        this.validatePermissions();
    }

    @Input()
    set xmPermissionThen(templateRef: TemplateRef<PermissionContext> | null) {
        if (!templateRef || !(templateRef instanceof TemplateRef)) {
            throw new Error('Must be a TemplateRef');
        }
        this.thenTemplateRef = templateRef;
        this.thenViewRef = null;
        this.validatePermissions();
    }

    @Input()
    set xmPermissionElse(templateRef: TemplateRef<PermissionContext> | null) {
        if (!templateRef || !(templateRef instanceof TemplateRef)) {
            throw new Error('Must be a TemplateRef');
        }
        this.elseTemplateRef = templateRef;
        this.elseViewRef = null;
        this.validatePermissions();
    }

    public ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }

    public ngOnInit(): void {
        this.subscription = this.update$.pipe(
            switchMap(() => this.permissionService.hasPrivilegesBy(this.context.$implicit, this.strategy)),
        ).subscribe((allow: boolean) => {
            this.context.allow = allow;
            this.updateView();
        });
    }

    private validatePermissions(): void {
        this.update$.next();
    }

    private updateView(): void {
        if (this.context.$implicit && this.context.allow) {
            if (!this.thenViewRef) {
                this.viewContainer.clear();
                this.elseViewRef = null;
                if (this.thenTemplateRef) {
                    this.thenViewRef = this.viewContainer.createEmbeddedView(this.thenTemplateRef, this.context);
                }
            }
        } else {
            if (!this.elseViewRef) {
                this.viewContainer.clear();
                this.thenViewRef = null;
                if (this.elseTemplateRef) {
                    this.elseViewRef = this.viewContainer.createEmbeddedView(this.elseTemplateRef, this.context);
                }
            }
        }
    }

}
