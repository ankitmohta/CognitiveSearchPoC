import { IAction, IActionType } from './';

export interface IPage {
    source: string,
    tags: string[],
}

export interface IDocument {
    title: string,
    pages: IPage[],
}

export const ACTIONS: IActionType<string> = {
    SET_DOCUMENTS: 'SET_DOCUMENTS'
}

export interface IPayload {
    documents: IDocument[],
}

export type DocumentsAction = IAction<IPayload, typeof ACTIONS.SET_DOCUMENTS>;
