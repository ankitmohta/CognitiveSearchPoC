import { ACTIONS, IInfoboxWithPushPin, PinsAction } from '../types/pins';

/**
 * creates a pins action to dispatch
 * @param {IInfoboxWithPushPin[]} pins the pins to enter into the action's payload
 */
export const pins = (p: IInfoboxWithPushPin[]): PinsAction => ({
    payload: {
        pins: p
    },
    type: ACTIONS.SET_PINS,
})