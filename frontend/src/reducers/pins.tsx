import { defaultReduce, IReduce } from '.';
import { ACTIONS, IInfoboxWithPushPin, PinsAction } from '../types/pins';
import { pins as PINS } from '../util/pins';

const reduce: IReduce<IInfoboxWithPushPin[], PinsAction> = {
    [ACTIONS.SET_PINS]: (state, action) => action.payload.pins
}

export const pins = (state: IInfoboxWithPushPin[] = PINS, action: PinsAction) => (reduce[action.type] || defaultReduce)(state, action);