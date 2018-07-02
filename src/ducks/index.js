import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk';

import nav from './navigation';
import progress from './progress';


export default (initialState) =>
    createStore(combineReducers(
        {
            nav,
            progress
        }
    ), initialState, applyMiddleware(thunk));