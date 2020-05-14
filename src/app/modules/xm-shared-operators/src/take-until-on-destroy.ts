import { OnDestroy } from '@angular/core';
import { MonoTypeOperatorFunction, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface TakeUntilOnDestroyInstance extends OnDestroy {
    __takeUntilOnDestroy$?: Subject<void>;
}

/**
 * Emit an event when Angular calls the ngOnDestroy method
 * @example
 *   @Component({    ..., template: ``})
 *   export class AppComponent implements OnInit {
 *     ngOnInit() {
 *       this.observable$ = Rx.Observable.interval(1000);
 *       this.observable$.pipe(takeUntilOnDestroy(this)).subscribe();
 *     }
 *     ngOnDestroy(): void {
 *       takeUntilOnDestroyDestroy(this);
 *     }
 * }
 */
export function takeUntilOnDestroy<T>(instance: TakeUntilOnDestroyInstance): MonoTypeOperatorFunction<T> {
    if (!instance.__takeUntilOnDestroy$) {
        instance.__takeUntilOnDestroy$ = new Subject<void>();
    }

    return takeUntil(instance.__takeUntilOnDestroy$);
}

/**
 * Emit __takeUntilOnDestroy$ changes
 */
export function takeUntilOnDestroyDestroy(instance: TakeUntilOnDestroyInstance): void {
    if (instance.__takeUntilOnDestroy$) {
        instance.__takeUntilOnDestroy$.next();
        instance.__takeUntilOnDestroy$.complete();
    }
}
