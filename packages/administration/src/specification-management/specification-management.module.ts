import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

import { EntitySpecYamlService } from '@xm-ngx/administration/specification-management/entity-spec-editor/entity-spec-yaml.service';
import { AceEditorModule, XmAceEditorControlModule } from '@xm-ngx/components/ace-editor';
import { MultiLanguageModuleModule } from '@xm-ngx/components/multilanguage/xm-multi-language.module';
import { StatesManagementDialogModule } from '@xm-ngx/entity/states-management-dialog';
import { XmTranslationModule } from '@xm-ngx/translation';

import { ConfigVisualizerDialogComponent } from './config-visualizer-dialog/config-visualizer-dialog.component';
import { EntitySpecEditorComponent } from './entity-spec-editor/entity-spec-editor.component';
import { StatesEditorComponent } from './entity-spec-editor/states-editor/states-editor.component';
import { EntitySpecManagementComponent } from './entity-spec-management/entity-spec-management.component';
import { PrivateUiMngComponent } from './private-ui-mng/private-ui-mng.component';
import { SpecificationManagementComponent } from './specification-management.component';
import { TenantMngComponent } from './tenant-mng/tenant-mng.component';
import { TimelineMngComponent } from './timeline-mng/timeline-mng.component';
import { UaaLoginMngComponent } from './uaa-login-mng/uaa-login-mng.component';
import { UaaMngComponent } from './uaa-mng/uaa-mng.component';
import { UiMngComponent } from './ui-mng/ui-mng.component';

@NgModule({
    imports: [
        XmTranslationModule,
        RouterModule,
        CommonModule,
        MatButtonModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatTooltipModule,
        MatFormFieldModule,
        MatExpansionModule,
        MatMenuModule,
        MatSelectModule,
        MatCheckboxModule,
        MatDividerModule,
        MatListModule,
        StatesManagementDialogModule,
        MultiLanguageModuleModule,
        MatCardModule,
        XmAceEditorControlModule,
        AceEditorModule,
    ],
    exports: [SpecificationManagementComponent],
    declarations: [
        SpecificationManagementComponent,
        ConfigVisualizerDialogComponent,
        EntitySpecManagementComponent,
        EntitySpecEditorComponent,
        StatesEditorComponent,
        TimelineMngComponent,
        UaaMngComponent,
        UiMngComponent,
        PrivateUiMngComponent,
        TenantMngComponent,
        UaaLoginMngComponent,
    ],
    providers: [EntitySpecYamlService],
})
export class SpecificationManagementModule {
    public entry: Type<SpecificationManagementComponent> = SpecificationManagementComponent;
}
