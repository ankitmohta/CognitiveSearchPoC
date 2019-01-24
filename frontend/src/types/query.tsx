import { IAction, IActionType } from './';

export const ACTIONS: IActionType<string> = {
    SET_QUERY: 'SET_QUERY'
}

export interface IPayload {
    query: string,
}

export type QueryAction = IAction<IPayload, typeof ACTIONS.SET_QUERY>;