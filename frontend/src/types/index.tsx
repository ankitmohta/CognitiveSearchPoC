import { IDocument } from './documents';
import { IGraph } from './graph';
import { IInfoboxWithPushPin } from './pins';

export interface IState {
    display: string,
    documents: IDocument[],
    graph: IGraph,
    pins: IInfoboxWithPushPin[],
    query: string,
}

export interface IActionType<T> {
    [key: string]: T
}

export interface IAction<P, T> {
    payload: P,
    type: T,
}