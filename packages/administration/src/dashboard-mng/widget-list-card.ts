import { NgModule, Type } from '@angular/core';
import { DashboardMngModule } from './dashboard-mng.module';
import { WidgetListCardComponent } from './widget-list-card/widget-list-card.component';
export { WidgetListCardComponent } from './widget-list-card/widget-list-card.component';

@NgModule({
    imports: [DashboardMngModule],
    exports: [WidgetListCardComponent],
    declarations: [],
    providers: [],
})
export class WidgetListCardModule {
    public entry: Type<WidgetListCardComponent> = WidgetListCardComponent;
}
