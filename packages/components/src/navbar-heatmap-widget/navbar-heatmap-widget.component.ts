import { Component, NgModule, Type } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeatmapService } from './heatmap.service';

@Component({
    selector: 'xm-navbar-dashboard-edit-widget',
    template: `
        <button mat-icon-button
                class="heatmap-icon"
                (click)="toggleHeatmap()">
            <mat-icon>whatshot</mat-icon>
        </button>
    `,
    providers: [],
})
export class NavbarHeatmapWidgetComponent {

    constructor(
        private heatmapService: HeatmapService,
    ) {
    }

    public toggleHeatmap(): void {
        this.heatmapService.toggleVisibility();
    }

}

@NgModule({
    exports: [NavbarHeatmapWidgetComponent],
    declarations: [NavbarHeatmapWidgetComponent],
    providers: [],
    imports: [MatIconModule, MatButtonModule],
})
export class NavbarHeatmapWidgetModule {
    public entry: Type<NavbarHeatmapWidgetComponent> = NavbarHeatmapWidgetComponent;
}
