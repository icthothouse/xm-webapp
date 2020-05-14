import { NgModule, Type } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { LoaderModule } from '@xm-ngx/components/loader';
import { NoDataModule } from '@xm-ngx/components/no-data';
import { PerPageModule } from '@xm-ngx/components/xm-per-page';
import { XmPermissionModule } from '@xm-ngx/core/permission';
import { XmTranslationModule } from '@xm-ngx/translation';
import { NgJhipsterModule } from 'ng-jhipster';
import { ClientMgmtDeleteDialogComponent } from './client-management-delete-dialog.component';
import { ClientMgmtDialogComponent } from './client-management-dialog.component';
import { ClientMgmtComponent } from './client-management.component';

@NgModule({
    imports: [
        MatFormFieldModule,
        FormsModule,
        MatButtonModule,
        MatInputModule,
        XmTranslationModule,
        LoaderModule,
        NgbPaginationModule,
        NoDataModule,
        NgJhipsterModule,
        PerPageModule,
        MatIconModule,
        MatDialogModule,
        MatSelectModule,
        MatChipsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        XmPermissionModule,
    ],
    exports: [ClientMgmtComponent],
    declarations: [ClientMgmtComponent, ClientMgmtDeleteDialogComponent, ClientMgmtDialogComponent],
    providers: [],
})
export class ClientManagementModule {
    public entry: Type<ClientMgmtComponent> = ClientMgmtComponent;
}
