import { Dispatch } from 'redux';
import { defaultParsedConfig, defaultPayload } from '../types/AzAPI';
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

export const invalidateQuery = (query: string): QueryAction => ({
    payload: {
        query,
    },
    type: ACTIONS.INVALIDATE_QUERY,
})

export const requestQuery = (query: string): QueryAction => {
    global.console.log('requestQuery(',query,')');
    return ({
    payload: {
        query,
    },
    type: ACTIONS.REQUEST_QUERY,
})}

export const receiveQuery = (query: string, posts: any[]): QueryAction => {
    global.console.log('receiveQuery(',query,', ',posts,')');
    return ({
    payload: {
        query,
    },
    posts,
    receivedAt: Date.now(),
    type: ACTIONS.RECEIVE_QUERY,
})}

export const fetchQuery = (query: string) => (dispatch: Dispatch) => {
    const parsedQuery = `${defaultParsedConfig}&${defaultPayload(query)}`;
    dispatch(requestQuery(parsedQuery));
    dispatch(setQuery(query));
    return fetch(parsedQuery, {headers: {
        'api-key': process.env.API_KEY || process.env.REACT_APP_API_KEY || ''
    }})
    .then(res => {
        global.console.log('res',res);
        return res.json()}, err => global.console.log('an error occurred',err))
    .then(json => {
        global.console.log('json',json);
        return dispatch(receiveQuery(parsedQuery, json))})
}