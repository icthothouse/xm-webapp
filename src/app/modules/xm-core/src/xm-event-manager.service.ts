import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Observer, Subject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

type EventManagerKey = string;

interface EventManagerAction<T = any> {
    name: EventManagerKey;
    payload?: T;

    // Backward compatibility
    [key: string]: any;
}

@Injectable({
    providedIn: 'root',
})
export class XmEventManagerService implements OnDestroy {

    public readonly observable: Observable<EventManagerAction>;

    /** @deprecated use 'observable' instead */
    public observer: Observer<EventManagerAction>;

    protected dispatcher: Subject<EventManagerAction> = new Subject<EventManagerAction>();

    constructor() {
        this.observer = this.dispatcher;
        this.observable = this.dispatcher.asObservable();
    }

    /**
     * Method to broadcast the event to observer
     */
    public broadcast<T>(event: EventManagerAction<T>): void {
        this.dispatcher.next(event);
    }

    /**
     * @deprecated use observable instead
     * Method to subscribe to an event with callback
     */
    public subscribe(eventName: EventManagerKey, callback: (i: EventManagerAction) => void): Subscription {
        return this.observable.pipe(filter(i => i.name === eventName)).subscribe(callback);
    }

    /**
     * Method to get stream by event name
     */
    public listenTo<T>(eventName: EventManagerKey): Observable<EventManagerAction<T>> {
        return this.observable.pipe(filter(i => i.name === eventName));
    }

    /**
     * @deprecated use subscriber.unsubscribe(); instead
     * Method to unsubscribe the subscription
     */
    public destroy(subscriber: Subscription): void {
        subscriber.unsubscribe();
    }

    public ngOnDestroy(): void {
        this.dispatcher.complete();
    }

}
