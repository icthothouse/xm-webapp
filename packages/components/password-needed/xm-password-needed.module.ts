import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { XmSharedModule } from '@xm-ngx/shared';
import { LoaderModule } from '@xm-ngx/components/loader';
import { XmPasswordNeededComponent } from './xm-password-needed.component';
import { ModalCloseModule } from '@xm-ngx/components/modal-close';

@NgModule({
    declarations: [XmPasswordNeededComponent],
    exports: [XmPasswordNeededComponent],
  imports: [
    LoaderModule,
    CommonModule,
    XmSharedModule,
    ModalCloseModule,
  ],
})
export class XmPasswordNeededModule {
}
