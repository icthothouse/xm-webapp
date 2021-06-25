import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule, Type } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
    selector: 'xm-loading-bar',
    template: `
        <ng-container *ngIf="visible">
            <mat-progress-bar mode="indeterminate"></mat-progress-bar>
        </ng-container>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * Wrapper for Angular material progress bar with indeterminate mode.
 * @public
 */
export class LoadingBarComponent {
    /**
     * Show or hide loading bar
     */
    @Input() public visible: boolean;
}

@NgModule({
    imports: [
        MatProgressBarModule,
        CommonModule
    ],
    declarations: [LoadingBarComponent],
    exports: [LoadingBarComponent]
})
export class LoadingBarModule {
    public entry: Type<LoadingBarComponent> = LoadingBarComponent;
}
