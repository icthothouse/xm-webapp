import { NgModule, Type } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { LoaderModule } from '@xm-ngx/components/loader';
import { NoDataModule } from '@xm-ngx/components/no-data';
import { PerPageModule } from '@xm-ngx/components/xm-per-page';
import { XmTranslationModule } from '@xm-ngx/translation';
import { NgJhipsterModule } from 'ng-jhipster';
import { AuditsComponent } from './audits.component';
import { AuditsService } from './audits.service';

@NgModule({
    imports: [
        NgbPaginationModule,
        NgJhipsterModule,
        MatDatepickerModule,
        LoaderModule,
        MatFormFieldModule,
        FormsModule,
        XmTranslationModule,
        MatInputModule,
        PerPageModule,
        NoDataModule,
    ],
    exports: [AuditsComponent],
    declarations: [AuditsComponent],
    providers: [AuditsService],
})
export class AuditsModule {
    public entry: Type<AuditsComponent> = AuditsComponent;
}
