import { IAction, IActionType } from './';

export const ACTIONS: IActionType<string> = {
    SET_DISPLAY: 'SET_DISPLAY'
}

export interface IPayload {
    display: string,
}

export type DisplayAction = IAction<IPayload, typeof ACTIONS.SET_DISPLAY>;