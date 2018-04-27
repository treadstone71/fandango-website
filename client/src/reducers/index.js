import { combineReducers } from 'redux';
import { authentication } from './authenticationReducer.js';

const rootReducer = combineReducers({
    authentication
});

export default rootReducer;