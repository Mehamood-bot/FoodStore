import { trigger, state, style, animate, transition } from '@angular/animations';

export function visibility() {
    // visibility trigger there are two state shown and hidden
    return trigger('visibility', [
        state('shown', style({
            transform: 'scale(1.0)',
            opacity: 1
        })),
        state('hidden', style({
            transform: 'scale(0.5)',
            opacity: 0
        })),
        // transisition *=>* means hidden to shown or shown to hidden , trigger should happen
        transition('* => *', animate('0.5s ease-in-out'))
    ]);
}

export function flyInOut() {
    return trigger('flyInOut', [
        state('*', style({ opacity: 1, transform: 'translateX(0)' })),
        // transisition void=>* means void to enter , trigger should happen on enter only
        transition(':enter', [
            style({ transform: 'translateX(-100%)', opacity: 0 }),
            animate('500ms ease-in')
        ]),
        // transisition void=>* means void to leave , trigger should happen on leave only
        transition(':leave', [
            animate('500ms ease-out', style({ transform: 'translateX(100%)', opacity: 0 }))
        ])
    ]);
}


export function expand() {
    return trigger('expand', [
        state('*', style({ opacity: 1, transform: 'translateX(0)' })),
        transition(':enter', [
            style({ transform: 'translateY(-50%)', opacity: 0 }),
            animate('200ms ease-in', style({ opacity: 1, transform: 'translateX(0)' }))
        ])
    ]);
}
