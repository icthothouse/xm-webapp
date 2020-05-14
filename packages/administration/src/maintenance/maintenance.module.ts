import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { XmPermissionModule } from '@xm-ngx/core/permission';
import { MaintenanceComponent } from './maintenance.component';

@NgModule({
    imports: [
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        CommonModule,
        XmPermissionModule,
    ],
    exports: [MaintenanceComponent],
    declarations: [MaintenanceComponent],
    providers: [],
})
export class MaintenanceModule {
    public entry: Type<MaintenanceComponent> = MaintenanceComponent;
}
