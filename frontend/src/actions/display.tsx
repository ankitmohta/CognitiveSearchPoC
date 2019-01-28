import { ACTIONS, DisplayAction } from '../types/display';

/**
 * creates a setDisplay action to dispatch
 * @param {string} display the display to enter into the action's payload
 */
export const setDisplay = (display: string): DisplayAction => ({
    payload: {
        display
    },
    type: ACTIONS.SET_DISPLAY,
})