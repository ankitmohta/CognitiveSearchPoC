import { setQuery } from '../../actions/query';
import { query } from '../../reducers/query';
import { QueryAction } from '../../types/query';

describe('query reducer', () => {
    it('should return default state', () => {
        const currentState: undefined = undefined;
        const expected: string = '';
        const action: QueryAction = {
            payload: {
                query: '',
            },
            type: 'DEFAULT_ACTION'
        };
        const received: string = query(currentState, action);
        expect(received).toEqual(expected);
    })
    it('should return given state', () => {
        const currentState: string = '';
        const expected: string = 'lorem+ipsum';
        const action: QueryAction = setQuery(expected);
        const received: string = query(currentState, action);
        expect(received).toEqual(expected);
    })
});