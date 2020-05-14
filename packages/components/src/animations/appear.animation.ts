import { animate, AnimationTriggerMetadata, style, transition, trigger } from '@angular/animations';

export const appear: AnimationTriggerMetadata = trigger('appear', [
    transition(':enter', [
        style({opacity: 0}),
        animate('300ms ease-out', style({opacity: 1})),
    ]),
]);

export const appearUp: AnimationTriggerMetadata = trigger('appearUp', [
    transition(':enter', [
        style({opacity: 0, transform: 'translateY(1rem)'}),
        animate('300ms ease-out', style({opacity: 1, transform: 'translateY(0)'})),
    ]),
]);
