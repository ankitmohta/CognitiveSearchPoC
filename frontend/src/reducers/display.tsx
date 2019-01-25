import { defaultReduce, IReduce } from '.';
import {ACTIONS, DisplayAction } from '../types/display';

const reduce: IReduce<string, DisplayAction> = {
    [ACTIONS.SET_DISPLAY]: (state, action) => action.payload.display
}

export const display = (state: string = "Results", action: DisplayAction) => (reduce[action.type] || defaultReduce)(state, action);