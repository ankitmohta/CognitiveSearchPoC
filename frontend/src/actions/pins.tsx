import { ACTIONS, IInfoboxWithPushPin, PinsAction } from '../types/pins';

/**
 * creates a pins action to dispatch
 * @param {IInfoboxWithPushPin[]} pins the pins to enter into the action's payload
 */
export const setPins = (pins: IInfoboxWithPushPin[]): PinsAction => ({
    payload: {
        pins,
    },
    type: ACTIONS.SET_PINS,
})