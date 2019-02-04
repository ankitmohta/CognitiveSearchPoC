import { defaultReduce, IReduce } from '../types';
import { ACTIONS, QueryAction } from '../types/query';

interface IQueries {
    isFetching: boolean,
    didInvalidate: boolean,
    items: any[],
    lastUpdated?: number,
}

const reduce: IReduce<string, QueryAction> = {
    [ACTIONS.SET_QUERY]: (state, action) => action.payload.query
}

const queriesReduce: IReduce<IQueries, QueryAction> = {
    [ACTIONS.INVALIDATE_QUERY]: (state, action) => {
        global.console.log('invalidate_query -- action', action)
        return ({...state, didInvalidate: true})},
    [ACTIONS.REQUEST_QUERY]: (state, action) => {
        global.console.log('request_query -- action', action)
        return ({...state, isFetching: true, didInvalidate: false})},
    [ACTIONS.RECEIVE_QUERY]: (state, action) => {
        global.console.log('receive_query -- action',action);
        return ({...state, isFetching: false, didInvalidate: false, items: action.posts, lastUpdated: action.receivedAt})}
}

export const query = (state: string = '', action: QueryAction) => (reduce[action.type] || defaultReduce)(state, action);
export const queries = (
    state: IQueries = {isFetching: false, didInvalidate: false, items: []},
    action: QueryAction) => (queriesReduce[action.type] || defaultReduce)(state, action);