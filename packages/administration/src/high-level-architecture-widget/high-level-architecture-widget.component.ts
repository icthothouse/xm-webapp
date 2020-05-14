import { CommonModule } from '@angular/common';
import { Component, ElementRef, NgModule, OnInit, Type, ViewChild } from '@angular/core';
import { XmSharedModule } from '@xm-ngx/shared';
import { Translate } from '@xm-ngx/translation';
import * as nomnoml from 'nomnoml';

interface ProjectSelectionChange {
    isUserInput: boolean;
    source?: { value: { components: { name: Translate }[] } };
}

declare let skanaar: any;

@Component({
    selector: 'xm-high-level-architecture-widget',
    templateUrl: './high-level-architecture-widget.component.html',
    styleUrls: ['./high-level-architecture-widget.component.scss'],
})
export class HighLevelArchitectureWidgetComponent implements OnInit {

    public config: {
        projects: unknown[];
        components: unknown[];
    };

    private zoomLevel: number = -12;
    private offset: { x: number; y: number } = {x: 0, y: 0};
    private source: any;
    private mouseDownPoint: { x: number; y: number };

    @ViewChild('canvas', {static: false}) private canvas: ElementRef;
    @ViewChild('downloadLink', {static: false}) private downloadLink: ElementRef;
    @ViewChild('canvasHolder', {static: false}) private canvasHolder: ElementRef;

    public ngOnInit(): void {
        this.source = this.toNomnoml(this.config.components);
        setTimeout(() => this.resetViewport(), 0);
    }

    public onProjectSelectionChange(event: ProjectSelectionChange): void {
        if (event.isUserInput) {
            let components = JSON.parse(JSON.stringify(this.config.components));
            if (event.source.value && event.source.value.components) {
                components = components.filter((c) => event.source.value.components.includes(c.name));
                components.forEach((c) => {
                    c.links = c.links ? c.links
                        .filter((l) => event.source.value.components.includes(l.name)) : null;
                    c.lepLinks = c.lepLinks ? c.lepLinks
                        .filter((l) => event.source.value.components.includes(l.name)) : null;
                });
            }
            this.source = this.toNomnoml(components);

            setTimeout(() => this.resetViewport(), 0);
        }
    }

    public magnifyViewport(diff: number): void {
        this.zoomLevel = Math.min(10, this.zoomLevel + diff);
        this.sourceChanged();
    }

    public resetViewport(): void {
        this.zoomLevel = -10;
        this.offset = {x: 0, y: 0};
        this.sourceChanged();
    }

    public doDownloadPng(name: string): void {
        this.downloadLink.nativeElement.href = this.canvas.nativeElement.toDataURL('image/png');
        this.downloadLink.nativeElement.download = `${name}.png`;
        this.downloadLink.nativeElement.click();
    }

    public mouseDown(event: MouseEvent): void {
        this.mouseDownPoint = skanaar.vector.diff({x: event.pageX, y: event.pageY}, this.offset);
    }

    public mouseUp(): void {
        this.mouseDownPoint = null;
    }

    public mouseMove(event: MouseEvent): void {
        if (this.mouseDownPoint) {
            this.offset = skanaar.vector.diff({x: event.pageX, y: event.pageY}, this.mouseDownPoint);
            this.sourceChanged();
        }
    }

    private sourceChanged(): void {
        const canvasElement = document.getElementById('canvas');
        const superSampling = window.devicePixelRatio || 1;
        const scale = superSampling * Math.exp(this.zoomLevel / 10);
        nomnoml.draw(canvasElement, this.source, scale);
        this.positionCanvas(canvasElement, superSampling, this.offset);
    }

    private positionCanvas(rect: any, superSampling: number, offset: { x: number; y: number }): void {
        const canvasElement = this.canvas.nativeElement;
        const canvasHolder = this.canvasHolder.nativeElement;
        const w = rect.width / superSampling;
        const h = rect.height / superSampling;
        canvasElement.style.top = `${(canvasHolder.offsetHeight - h) / 2 + offset.y}px`;
        canvasElement.style.left = `${(canvasHolder.offsetWidth - w) / 2 + offset.x}px`;
        canvasElement.style.width = `${w}px`;
        canvasElement.style.height = `${h}px`;
    }

    private toNomnoml(components: any[]): string {
        let content = '';
        components.forEach((c) => {
            content += `[${this.typeToString(c.type)}${c.name}|\n`;
            if (c.subcomponents) {
                const first = c.subcomponents[0];
                c.subcomponents.forEach((s) => {
                    if (first === s) {
                        content += `    [${this.typeToString(s.type)}${s.name}]\n`;
                    } else {
                        content += `    [${this.typeToString(first.type)}${first.name}]`
                            + `->[${this.typeToString(s.type)}${s.name}]\n`;
                    }
                });
            }
            content += ']\n';

            if (c.links) {
                c.links.forEach((l) => {
                    content += `[${this.typeToString(c.type)}${c.name}]->[${this.typeToString(l.type)}${l.name}]\n`;
                });
            }

            if (c.lepLinks) {
                c.lepLinks.forEach((l) => {
                    content += `[${this.typeToString(c.type)}${c.name}]-->[${this.typeToString(l.type)}${l.name}]\n`;
                });
            }
        });

        content += '#direction: right\n';
        content += '#ranker: longest-path\n';
        content += '#fill: #f3f3f3; #f3f3f3\n';
        content += '#stroke: #e60000\n';
        return content;
    }

    private typeToString(type: string): string {
        return type ? `<${type}> ` : '';
    }

}

@NgModule({
    imports: [CommonModule, XmSharedModule],
    exports: [HighLevelArchitectureWidgetComponent],
    declarations: [HighLevelArchitectureWidgetComponent],
    entryComponents: [HighLevelArchitectureWidgetComponent],
    providers: [],
})
export class HighLevelArchitectureWidgetModule {
    public entry: Type<HighLevelArchitectureWidgetComponent> = HighLevelArchitectureWidgetComponent;
}
