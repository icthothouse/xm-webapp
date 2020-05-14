import { DashboardListCardComponent } from './dashboard-list-card/dashboard-list-card.component';
export { DashboardListCardComponent } from './dashboard-list-card/dashboard-list-card.component';
import { NgModule, Type } from '@angular/core';
import { DashboardMngModule } from './dashboard-mng.module';

@NgModule({
    imports: [DashboardMngModule],
    exports: [DashboardListCardComponent],
    declarations: [],
    providers: [],
})
export class DashboardListCardModule {
    public entry: Type<DashboardListCardComponent> = DashboardListCardComponent;
}
