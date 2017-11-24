import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';

import authReducer from '../src/containers/loginContainer/reducer';
import Globals from '../config/constants';

const persistConfig = {
    key: 'stateRoot',
    storage
};

const reducer = persistCombineReducers(persistConfig, {
    auth: authReducer
});

const logger = createLogger({
    timestamp: true,
    diff: true
});

const InitialState = {
    auth: {
        loggedIn: false,
        username: Globals.development.username,
        password: Globals.development.password,
        develop: 'login'//login, loggedIn, other
    }
};

function configureStore() {
    let store = createStore(
        reducer,
        InitialState,
        applyMiddleware(thunkMiddleware, logger));
    let persistor = persistStore(store);
    return {persistor, store};
}

const { _, store } = configureStore();

export default store;