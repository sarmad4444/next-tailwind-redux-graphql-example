import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {createWrapper} from 'next-redux-wrapper';
import AuthReducer from "./reducers";
import logger from 'redux-logger'

const reducers = combineReducers({auth: AuthReducer});

export const initStore = (initialState = {}) => {
  return createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(thunk, logger))
  )
};

export const wrapper = createWrapper(initStore, {debug: true});