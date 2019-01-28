import { ACTIONS, QueryAction } from '../types/query';

/**
 * creates a query action to dispatch
 * @param {string} query the query to enter into the action's payload
 */
export const setQuery = (query: string): QueryAction => ({
    payload: {
        query,
    },
    type: ACTIONS.SET_QUERY,
})