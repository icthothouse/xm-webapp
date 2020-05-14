import { Injectable } from '@angular/core';
import { takeUntilOnDestroy, takeUntilOnDestroyDestroy } from '@xm-ngx/shared/operators';
import { create as createHeatmap, DataPoint, HeatmapConfiguration } from 'heatmap.js';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';

@Injectable()
export class HeatmapService {

    private heatmap: any;
    private heatmapContainer: any;
    private defaultConfig: any = {
        gradient: {
            0.15: '#6ad180',
            0.25: '#7cd573',
            0.35: '#90d865',
            0.45: '#a4da57',
            0.55: '#badc48',
            0.65: '#c9cf35',
            0.75: '#d6c226',
            0.8: '#e2b41c',
            0.85: '#e2961d',
            0.9: '#dd7826',
            0.95: '#d25c30',
            1: '#c24039',
        },
        radius: 33,
        backgroundColor: 'inherit',
    };
    private visibility$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private dataPoints: Subject<DataPoint> = new Subject<DataPoint>();
    private subscription: Subscription;

    public ngOnDestroy(): void {
        takeUntilOnDestroyDestroy(this);
    }

    public $visibility(): Observable<boolean> {
        return this.visibility$.asObservable();
    }

    public initialize(container: Element, route: string): void {
        this.heatmapContainer = container;
        const heatmapConfig: HeatmapConfiguration = {
            container: this.heatmapContainer,
            ...this.defaultConfig,
        };
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        const heatmapCanvasEl = container.getElementsByClassName('heatmap-canvas')[0];
        if (heatmapCanvasEl) {
            heatmapCanvasEl.parentNode.removeChild(heatmapCanvasEl);
        }
        this.heatmap = createHeatmap(heatmapConfig);
        this.overrideColorizeFunction(this.heatmap);
        const data = JSON.parse(localStorage.getItem(`heatmap-${route}`));
        if (data && data.data) {
            this.heatmap.setData(data);
            this.heatmap.removeData();
            this.heatmap.repaint();
        }
        this.subscription = this.dataPoints
            .pipe(
                takeUntilOnDestroy(this),
            )
            .subscribe(val => {
                if (this.heatmap) {
                    this.heatmap.addData(val);
                    localStorage.setItem(`heatmap-${route}`, JSON.stringify(this.heatmap.getData()));
                    this.heatmap.repaint();
                }
            });
    }

    public add(val: any): void {
        this.dataPoints.next(val);
    }

    public toggleVisibility(): void {
        this.visibility$.next(!this.visibility$.value);
        this.heatmap.repaint();
    }

    private overrideColorizeFunction(heatmap: any): void {
        heatmap._renderer._colorize = () => {
            const that = heatmap._renderer;
            let x = that._renderBoundaries[0];
            let y = that._renderBoundaries[1];
            let width = that._renderBoundaries[2] - x;
            let height = that._renderBoundaries[3] - y;
            const maxWidth = that._width;
            const maxHeight = that._height;
            const opacity = that._opacity;
            const maxOpacity = that._maxOpacity;
            const minOpacity = that._minOpacity;
            const useGradientOpacity = that._useGradientOpacity;

            if (x < 0) {
                x = 0;
            }
            if (y < 0) {
                y = 0;
            }
            if (x + width > maxWidth) {
                width = maxWidth - x;
            }
            if (y + height > maxHeight) {
                height = maxHeight - y;
            }

            const img = that.shadowCtx.getImageData(x, y, width, height);
            const imgData = img.data;
            const len = imgData.length;
            const palette = that._palette;

            for (let i = 3; i < len; i += 4) {
                const alpha = imgData[i];
                const offset = alpha * 4;

                if (!offset) {
                    continue;
                }

                let finalAlpha;
                if (opacity > 0) {
                    finalAlpha = opacity;
                } else {
                    if (alpha < maxOpacity) {
                        if (alpha < minOpacity) {
                            finalAlpha = minOpacity;
                        } else {
                            finalAlpha = alpha;
                        }
                    } else {
                        finalAlpha = maxOpacity;
                    }
                }

                imgData[i - 3] = palette[offset];
                imgData[i - 2] = palette[offset + 1];
                imgData[i - 1] = palette[offset + 2];
                imgData[i] = useGradientOpacity ? palette[offset + 3] : finalAlpha;

            }

            that.ctx.putImageData(img, x, y);

            that._renderBoundaries = [1000, 1000, 0, 0];

        };
    }
}
