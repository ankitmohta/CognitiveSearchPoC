import { setDisplay } from '../../actions/display';
import { display } from '../../reducers/display';
import { DisplayAction } from '../../types/display';

describe('display reducer', () => {
    it('should return Results from default action',() => {
        const currentState: undefined = undefined;
        const expected: string = 'Results';
        const defaultAction: DisplayAction = {
            payload: {
                display: 'default',
            },
            type: 'DEFAULT_ACTION',
        }
        const received: string = display(currentState, defaultAction);
        expect(received).toBe(expected);
    });
    it('should return Results from Set Display Action', () => {
        const currentState: string = 'Maps';
        const expected: string = 'Results';
        const action: DisplayAction = setDisplay(expected);
        const received: string = display(currentState, action);
        expect(received).toBe(expected);
    })
});