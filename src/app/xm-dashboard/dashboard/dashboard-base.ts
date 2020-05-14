import { Widget } from '@xm-ngx/dynamic';
import { getWidgetComponent, getWidgetsComponent } from './widgets-path_backward-compatibility';

export class DashboardBase {

    /** @deprecated Back compatibility */
    protected getWidgetComponent(widget: Widget = {}): Widget {
        return getWidgetComponent(widget);
    }

    /** @deprecated Back compatibility */
    protected getWidgetsComponent(widgets: Widget[]): Widget[] {
        return getWidgetsComponent(widgets);
    }
}
