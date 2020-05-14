import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { LoaderModule } from '@xm-ngx/components/loader';
import { NoDataModule } from '@xm-ngx/components/no-data';
import { XmTranslationModule } from '@xm-ngx/translation';
import { NgJhipsterModule } from 'ng-jhipster';
import { LogsComponent } from './logs.component';
import { LogsService } from './logs.service';
import { JhiHealthService } from '../health/health.service';

@NgModule({
    imports: [
        LoaderModule,
        XmTranslationModule,
        MatFormFieldModule,
        MatSelectModule,
        FormsModule,
        CommonModule,
        NoDataModule,
        MatInputModule,
        NgJhipsterModule,
        MatButtonModule,
    ],
    exports: [LogsComponent],
    declarations: [LogsComponent],
    providers: [LogsService, JhiHealthService],
})
export class LogsModule {
    public entry: Type<LogsComponent> = LogsComponent;
}
