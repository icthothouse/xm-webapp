import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';

import { NotificationsComponent } from './notifications/notifications.component';
import { NotificationsService } from './shared/notifications.service';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        NotificationsComponent,
    ],
    exports: [
        NotificationsComponent,
    ],
    providers: [
        NotificationsService,
    ],
})
export class XmNotificationsModule {
    public entry: Type<NotificationsComponent> = NotificationsComponent;
}
