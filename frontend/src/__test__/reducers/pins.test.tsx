import { setPins } from '../../actions/pins';
import { pins } from '../../reducers/pins';
import { IInfoboxWithPushPin, PinsAction } from '../../types/pins';
import { pins as defaultState } from '../../util/pins';

describe('pins reducer', () => {
    it('should return default state', () => {
        const currentState: undefined = undefined;
        const expected: IInfoboxWithPushPin[] = defaultState;
        const action: PinsAction = {
            payload: {
                pins: defaultState
            },
            type: 'DEFAULT_ACTION'
        };
        const received: IInfoboxWithPushPin[] = pins(currentState, action);
        expect(received).toEqual(expected);
    })
    it('should return given state', () => {
        const currentState: IInfoboxWithPushPin[] = [];
        const expected: IInfoboxWithPushPin[] = defaultState;
        const action: PinsAction = setPins(expected);
        const received: IInfoboxWithPushPin[] = pins(currentState, action);
        expect(received).toEqual(expected);
    })
});