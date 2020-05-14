import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

export const expand: AnimationTriggerMetadata = trigger('expand', [
    state('collapsed', style({height: '0px', minHeight: '0'})),
    state('expanded', style({height: '*'})),
    transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
]);
