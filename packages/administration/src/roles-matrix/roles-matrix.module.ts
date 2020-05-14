import { NgModule, Type } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { LoaderModule } from '@xm-ngx/components/loader';
import { PerPageModule } from '@xm-ngx/components/xm-per-page';
import { XmPermissionModule } from '@xm-ngx/core/permission';
import { XmTranslationModule } from '@xm-ngx/translation';
import { NgJhipsterModule } from 'ng-jhipster';
import { RolesMatrixComponent } from './roles-matrix.component';

@NgModule({
    imports: [
        LoaderModule,
        MatFormFieldModule,
        MatSelectModule,
        FormsModule,
        XmTranslationModule,
        MatInputModule,
        NgJhipsterModule,
        MatSlideToggleModule,
        MatCheckboxModule,
        MatIconModule,
        NgbPaginationModule,
        PerPageModule,
        MatTooltipModule,
        XmPermissionModule,
    ],
    exports: [RolesMatrixComponent],
    declarations: [RolesMatrixComponent],
    providers: [],
})
export class RolesMatrixModule {
    public entry: Type<RolesMatrixComponent> = RolesMatrixComponent;
}
