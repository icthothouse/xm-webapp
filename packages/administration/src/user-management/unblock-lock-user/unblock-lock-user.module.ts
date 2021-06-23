import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { XmTranslationModule } from '@xm-ngx/translation';
import { UnblockLockUserComponent } from './unblock-lock-user.component';

@NgModule({
    imports: [
        MatButtonModule,
        MatIconModule,
        CommonModule,
        XmTranslationModule,
    ],
    exports: [UnblockLockUserComponent],
    declarations: [UnblockLockUserComponent],
})
export class UnblockLockUserModule {
    public entry: Type<UnblockLockUserComponent> = UnblockLockUserComponent;
}
