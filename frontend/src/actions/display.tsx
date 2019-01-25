import { ACTIONS, DisplayAction } from '../types/display';

/**
 * creates a display action to dispatch
 * @param {string} d the display to enter into the action's payload
 */
export const display = (d: string): DisplayAction => ({
    payload: {
        display: d
    },
    type: ACTIONS.SET_DISPLAY,
})