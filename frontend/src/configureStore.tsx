import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleWare from 'redux-thunk';
import rootReducer from './reducers';

const DEVTOOLS = '__REDUX_DEVTOOLS_EXTENSION__';
const enhancer = window[DEVTOOLS] ? window[DEVTOOLS]() : (f: any) => f;

/**
 * creates the store from the rootReducer, middleware, and redux devtools
 */
export default () => (createStore(rootReducer,
  compose(
    applyMiddleware(thunkMiddleWare),
    enhancer
  ))
);