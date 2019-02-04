import { IAction, IActionType } from './';

export const ACTIONS: IActionType<string> = {
    INVALIDATE_QUERY: 'INVALIDATE_QUERY',
    RECEIVE_QUERY: 'RECEIVE_QUERY',
    REQUEST_QUERY: 'REQUEST_QUERY',
    SET_QUERY: 'SET_QUERY',
}

export interface IPayload {
    query: string,
}

export type QueryAction = IAction<IPayload, typeof ACTIONS.SET_QUERY>;