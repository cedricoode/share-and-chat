import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import authReducer from '../src/containers/loginContainer/reducer';

const reducers = combineReducers({
    auth: authReducer
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;