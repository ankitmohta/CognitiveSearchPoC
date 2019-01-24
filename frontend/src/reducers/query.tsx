import { defaultReduce, IReduce } from '.';
import {ACTIONS, QueryAction } from '../types/query';

const reduce: IReduce<string, QueryAction> = {
    [ACTIONS.SET_QUERY]: (state, action) => {
        return action.payload.query}
}

export const query = (state: string = '', action: QueryAction) => (reduce[action.type] || defaultReduce)(state, action);    