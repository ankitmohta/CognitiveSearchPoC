import { combineReducers } from 'redux';
import { display } from './display';
import { documents } from './documents';
import { graph } from './graph';
import { pins } from './pins';
import { query } from './query';

export interface IReduce<S, A> {
    [key: string]: (state: S, action: A) => S
  }
  
export const defaultReduce = <S, A>(state: S, action: A): S => state;
  
export default combineReducers({
    display,
    documents,
    graph,
    pins,
    query,
})