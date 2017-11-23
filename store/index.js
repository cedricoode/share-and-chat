import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';

import authReducer from '../src/containers/loginContainer/reducer';

const reducers = combineReducers({
    auth: authReducer
});

const InitialState = {
    auth: {
        loggedIn: false,
        develop: 'login'
    }
};

const store = createStore(
    reducers,
    InitialState,
    applyMiddleware(thunkMiddleware, logger)
);

export default store;