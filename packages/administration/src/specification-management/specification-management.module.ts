import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { StatesManagementDialogModule } from '@xm-ngx/entity/states-management-dialog';
import { XmTranslationModule } from '@xm-ngx/translation';
import { AceEditorModule } from '../../../../src/app/shared/directives/ace-editor.directive';
import { SpecificationManagementComponent } from './specification-management.component';
import { EntitySpecManagementComponent } from './entity-spec-management/entity-spec-management.component';
import { ConfigVisualizerDialogComponent } from './config-visualizer-dialog/config-visualizer-dialog.component';

@NgModule({
    imports: [
        XmTranslationModule,
        RouterModule,
        CommonModule,
        AceEditorModule,
        MatButtonModule,
        MatIconModule,
        StatesManagementDialogModule,
    ],
    exports: [SpecificationManagementComponent],
    declarations: [SpecificationManagementComponent, ConfigVisualizerDialogComponent, EntitySpecManagementComponent],
    providers: [],
})
export class SpecificationManagementModule {
    public entry: Type<SpecificationManagementComponent> = SpecificationManagementComponent;
}
