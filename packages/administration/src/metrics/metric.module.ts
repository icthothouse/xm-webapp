import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { LoaderModule } from '@xm-ngx/components/loader';
import { NoDataModule } from '@xm-ngx/components/no-data';
import { XmTranslationModule } from '@xm-ngx/translation';
import { NgJhipsterModule } from 'ng-jhipster';
import { JhiMetricsMonitoringModalComponent } from './metrics-modal.component';
import { JhiMetricsMonitoringComponent } from './metrics.component';
import { JhiMetricsService } from './metrics.service';

@NgModule({
    imports: [
        XmTranslationModule,
        MatFormFieldModule,
        FormsModule,
        MatSelectModule,
        NoDataModule,
        LoaderModule,
        NgbProgressbarModule,
        CommonModule,
        MatButtonModule,
        MatDialogModule,
        NgJhipsterModule,
        MatIconModule,
    ],
    exports: [JhiMetricsMonitoringComponent],
    declarations: [JhiMetricsMonitoringComponent, JhiMetricsMonitoringModalComponent],
    providers: [JhiMetricsService],
})
export class MetricModule {
    public entry: Type<JhiMetricsMonitoringComponent> = JhiMetricsMonitoringComponent;
}
