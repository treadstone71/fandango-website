import { combineReducers } from 'redux';
import { authentication } from './authenticationReducer.js';
import { admin } from './admin.reducer.js';

const rootReducer = combineReducers({
    authentication,
    admin
});

export default rootReducer;