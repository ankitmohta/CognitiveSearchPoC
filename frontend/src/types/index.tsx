import { IDocument } from './documents';
import { IGraph } from './graph';
import { IInfoboxWithPushPin } from './pins';

export interface IReduce<S, A> {
    [key: string]: (state: S, action: A) => S
  }
  
export const defaultReduce = <S, A>(state: S, action: A): S => state;
  
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
    posts?: any,
    receivedAt?: number,
    type: T,
}