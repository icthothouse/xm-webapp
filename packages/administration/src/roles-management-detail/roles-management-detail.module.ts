import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { LoaderModule } from '@xm-ngx/components/loader';
import { NoDataModule } from '@xm-ngx/components/no-data';
import { XmTranslationModule } from '@xm-ngx/translation';
import { NgJhipsterModule } from 'ng-jhipster';
import { PerPageModule, WordAutocompleteModule } from '../../../../src/app/shared';
import { RoleConditionDialogComponent } from './roles-management-condition-dialog.component';
import { RoleMgmtDetailComponent } from './roles-management-detail.component';

@NgModule({
    declarations: [RoleMgmtDetailComponent, RoleConditionDialogComponent],
    exports: [RoleMgmtDetailComponent],
    imports: [
        CommonModule,
        XmTranslationModule,
        MatFormFieldModule,
        FormsModule,
        WordAutocompleteModule,
        MatInputModule,
        MatDialogModule,
        MatButtonModule,
        LoaderModule,
        MatSelectModule,
        MatCheckboxModule,
        MatIconModule,
        NgbPaginationModule,
        NoDataModule,
        PerPageModule,
        NgJhipsterModule,
        MatTooltipModule,
        MatSlideToggleModule,
    ],
})
export class RolesManagementDetailModule {
    public entry: Type<RoleMgmtDetailComponent> = RoleMgmtDetailComponent;
}
