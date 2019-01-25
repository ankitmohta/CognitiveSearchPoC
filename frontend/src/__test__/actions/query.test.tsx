import { query } from '../../actions/query';
import { ACTIONS, QueryAction } from '../../types/query';

describe('query action creators', () => {
    it('should return a SET_QUERY action',() => {
        const q: string = '';
        const expected: QueryAction = {
            payload: {
                query: q,
            },
            type: ACTIONS.SET_QUERY,
        }
        const received: QueryAction = query(q);
        expect(received).toEqual(expected);
    });
});