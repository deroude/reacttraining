/*
 * (c)Mindit 2018
 * Last modified: Friday, 22nd June 2018 2:23:31 pm
 * Author: Valentin Raduti (valentin.raduti@mindit.io>)
 */
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