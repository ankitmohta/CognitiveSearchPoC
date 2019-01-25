import { pins } from '../../actions/pins';
import { ACTIONS, IInfoboxWithPushPin, PinsAction } from '../../types/pins';

describe('pins action creators', () => {
    it('should return a SET_PINS action',() => {
        const p: IInfoboxWithPushPin[] = [];
        const expected: PinsAction = {
            payload: {
                pins: p,
            },
            type: ACTIONS.SET_PINS,
        }
        const received: PinsAction = pins(p);
        expect(received).toEqual(expected);
    });
});