import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { PerPageModule } from '@xm-ngx/components/xm-per-page';
import { DashboardDetailDialogComponent } from './dashboard-detail-dialog/dashboard-detail-dialog.component';
import { DashboardListCardComponent } from './dashboard-list-card/dashboard-list-card.component';
import { WidgetDetailDialogComponent } from './widget-detail-dialog/widget-detail-dialog.component';
import { WidgetListCardComponent } from './widget-list-card/widget-list-card.component';
import { LoaderModule } from '@xm-ngx/components/loader';
import { NoDataModule } from '@xm-ngx/components/no-data';
import { XmTranslationModule } from '@xm-ngx/translation';
import { NgJhipsterModule } from 'ng-jhipster';
import { AceEditorModule } from '../../../../src/app/shared/directives/ace-editor.directive';

@NgModule({
    imports: [
        LoaderModule,
        MatDialogModule,
        MatInputModule,
        FormsModule,
        XmTranslationModule,
        AceEditorModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        NgJhipsterModule,
        NoDataModule,
        NgbPaginationModule,
        PerPageModule,
        RouterModule,
    ],
    exports: [
        DashboardDetailDialogComponent,
        DashboardListCardComponent,
        WidgetDetailDialogComponent,
        WidgetListCardComponent,
    ],
    declarations: [
        DashboardDetailDialogComponent,
        DashboardListCardComponent,
        WidgetDetailDialogComponent,
        WidgetListCardComponent,
    ],
    providers: [],
})
export class DashboardMngModule {
}
