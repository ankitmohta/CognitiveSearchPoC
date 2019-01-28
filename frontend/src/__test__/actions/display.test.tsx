import { setDisplay } from '../../actions/display';
import { ACTIONS, DisplayAction } from '../../types/display';

describe('display action creators', () => {
    it('should return a SET_DISPLAY action',() => {
        const d: string = 'Maps';
        const expected: DisplayAction = {
            payload: {
                display: d,
            },
            type: ACTIONS.SET_DISPLAY,
        }
        const received: DisplayAction = setDisplay(d);
        expect(received).toEqual(expected);
    });
});