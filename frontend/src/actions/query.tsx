import { ACTIONS, QueryAction } from '../types/query';

/**
 * creates a query action to dispatch
 * @param {string} q the query to enter into the action's payload
 */
export const query = (q: string): QueryAction => ({
    payload: {
        query: q
    },
    type: ACTIONS.SET_QUERY,
})