import { Component, Inject, NgModule, Type } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActionDecision, LoadingDialogConfig } from './confirm-action/confirm-action.component';
import { ConfirmActionModule } from './confirm-action/confirm-action.module';

const DEFAULT_CONFIG = {
    title: 'xm-entity.function-list-card.change-state.title'
};

@Component({
    selector: 'xm-mat-dialog-test',
    template: `
        <xm-confirm-action [config]="config"
                           [loading]="loading"
                           (decisionEvent)="onPush($event)"></xm-confirm-action>
    `,
})
export class ConfirmActionDialogComponent {
    public config: LoadingDialogConfig = {
        title: 'xm-entity.function-list-card.change-state.title'
    };
    public loading;

    constructor(private matDialogRef: MatDialogRef<ConfirmActionDialogComponent, boolean>,
                @Inject(MAT_DIALOG_DATA) public data: {config: LoadingDialogConfig},) {
        this.initConfig();
    }

    public onPush(event: ActionDecision): void {
        this.loading = true;
        if (event === ActionDecision.APPROVE) {
            this.closeDialog(true);
            return;
        }
        this.closeDialog(false);
    }

    public closeDialog(data: boolean): void {
        this.matDialogRef.close(data);
    }

    private initConfig() {
        this.config = this.data.config || DEFAULT_CONFIG;

    }
}

@NgModule({
        declarations: [ConfirmActionDialogComponent],
        imports: [ConfirmActionModule],
        exports: [ConfirmActionDialogComponent]
    }
)
export class ConfirmActionDialogModule {
    public entry: Type<ConfirmActionDialogComponent> = ConfirmActionDialogComponent;
}
