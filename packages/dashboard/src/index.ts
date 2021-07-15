export { DashboardComponent } from './components/dashboard/dashboard.component';
export { DashboardBase } from './components/dashboard/dashboard-base';
export { getOrderIndex, sortByOrderIndex, swapByOrderIndex } from './components/dashboard/sortByOrderIndex';
export { getWidgetsComponent, getWidgetComponent } from './components/dashboard/widgets-path_backward-compatibility';

export { DashboardGuard } from './guards/dashboard.guard';
export { PendingChangesGuard } from './guards/pending-changes.guard';
export { XmDashboardDynamicRouteResolverGuard } from './dynamic-route/xm-dashboard-dynamic-route-resolver-guard.service';

export {
    Dashboard,
    DashboardConfig,
    DashboardLayout,
    DashboardLayoutLayout,
    DashboardWithWidgets
} from './models/dashboard.model';
export { DashboardWidget } from './models/dashboard-widget.model';

export { DashboardService } from './repositories/dashboard.service';
export { WidgetService } from './repositories/widget.service';

export { DefaultDashboardService } from './services/default-dashboard.service';

export { PageService, Page } from './stores/page/page.service';
export { PageLocationService } from './stores/page-location/page-location.service';
export { PageChangesStore, PageChangesStoreType } from './stores/page-changes-store';
export { DashboardStore } from './stores/dashboard-store.service';
export { DashboardWrapperService } from './stores/dashboard-wrapper.service';

export { XmDashboardModule } from './xm-dashboard.module';
