import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { LoaderModule } from '@xm-ngx/components/loader';
import { NoDataModule } from '@xm-ngx/components/no-data';
import { XmTranslationModule } from '@xm-ngx/translation';
import { JhiHealthModalComponent } from './health-modal.component';
import { JhiHealthCheckComponent } from './health.component';
import { JhiHealthService } from './health.service';

@NgModule({
    imports: [
        MatFormFieldModule,
        MatSelectModule,
        FormsModule,
        LoaderModule,
        MatIconModule,
        MatButtonModule,
        XmTranslationModule,
        NoDataModule,
        MatDialogModule,
        CommonModule,
    ],
    exports: [JhiHealthCheckComponent],
    declarations: [JhiHealthCheckComponent, JhiHealthModalComponent],
    providers: [JhiHealthService],
})
export class HealthModule {
    public entry: Type<JhiHealthCheckComponent> = JhiHealthCheckComponent;
}
