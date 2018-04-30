import { combineReducers } from 'redux';
import { authentication } from './authenticationReducer.js';
import { admin } from './admin.reducer.js';
import { user } from './users.reducer.js';

const rootReducer = combineReducers({
    authentication,
    admin,
    user
});

export default rootReducer;