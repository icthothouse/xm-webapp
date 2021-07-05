import { Directive, EventEmitter, Input, NgModule, OnChanges, OnDestroy, Output } from '@angular/core';
import { Subject, Subscription, timer } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';

@Directive({
    selector: '[counter]',
    exportAs: 'counter',
})
export class CounterDirective implements OnChanges, OnDestroy {

    @Input() public counter: number;
    @Input() public interval: number;
    public count: number;
    @Output() public valueChange: EventEmitter<number> = new EventEmitter<number>();
    @Output() public finish: EventEmitter<number> = new EventEmitter<number>();
    private counterSource$: Subject<{ count: number, interval: number }> = new Subject<{ count: number, interval: number }>();
    private subscription: Subscription = Subscription.EMPTY;

    constructor() {
        this.subscription = this.counterSource$.pipe(
            switchMap(({interval, count}) =>
                timer(0, interval).pipe(
                    take(count),
                    tap(() => {
                        this.count = --count;
                        this.valueChange.emit(this.count);
                        if (this.count === 0) {
                            this.finish.emit();
                        }
                    }),
                ),
            ),
        ).subscribe();
    }

    public ngOnChanges(): void {
        this.counterSource$.next({count: this.counter, interval: this.interval});
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}

@NgModule({
    exports: [CounterDirective],
    declarations: [CounterDirective],
})

export class CounterDirectiveModule {
}
