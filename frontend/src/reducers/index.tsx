import { combineReducers } from 'redux';
import { display } from './display';
import { documents } from './documents';
import { graph } from './graph';
import { pins } from './pins';
import { queries, query } from './query';

export default combineReducers({
    display,
    documents,
    graph,
    pins,
    queries,
    query,
})