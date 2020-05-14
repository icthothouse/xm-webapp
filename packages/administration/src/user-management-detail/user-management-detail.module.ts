import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { LoaderModule } from '@xm-ngx/components/loader';
import { NoDataModule } from '@xm-ngx/components/no-data';
import { XmTranslationModule } from '@xm-ngx/translation';
import { UserMgmtDetailComponent } from './user-management-detail.component';

@NgModule({
    exports: [UserMgmtDetailComponent],
    declarations: [UserMgmtDetailComponent],
    imports: [
        CommonModule,
        LoaderModule,
        XmTranslationModule,
        NoDataModule,
    ],
})
export class UserManagementDetailModule {
    public entry: Type<UserMgmtDetailComponent> = UserMgmtDetailComponent;
}
