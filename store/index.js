import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import apiMiddleware from '../src/middleware/api';
import { persistStore,
    persistCombineReducers,
    persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import reduxReset from 'redux-reset';

import { firebaseReducer, selectOrderReducer } from './reducer';
import authReducer from '../src/containers/loginContainer/reducer';
import orderListReducer from '../src/containers/orderListContainer/reducer';
import messageReducer from '../src/containers/chatContainer/reducer';
import programReducer from '../src/containers/programContainer/reducer'; 
import { refreshTokenStateReducer } from '../src/middleware/api';
import { initialState } from '../config/constants';

// 1. appInitialized should be blacklisted, since its lifespan is from starting app
// to quiting app.
// 2. selectedId should be blacklisted, since we always want user to be on
// orderList page when open application.
const persistConfig = {
    key: 'stateRoot',
    storage,
    blacklist: ['appInitialized', 'selectedId', 'firebaseAuth', 'refreshTokenState']
};

const authPersistConfig = {
    key: 'auth',
    storage,
    blacklist: ['loggingIn', 'password', 'username', 'error']
};

const reducer = persistCombineReducers(persistConfig, {
    firebaseAuth: firebaseReducer,
    auth: persistReducer(authPersistConfig, authReducer),
    orders: orderListReducer,
    messages: messageReducer,
    programs : programReducer,
    selectedId: selectOrderReducer, 
    appInitialized: (state=false, action) =>
        action.type === 'APP_INITIALIZED' ? true: state,
    refreshTokenState: refreshTokenStateReducer
});

const logger = createLogger({
    timestamp: true,
    diff: true
});

export function configureStore() {
    const enhanceCreateStore = compose(
        applyMiddleware(thunkMiddleware, apiMiddleware, logger),
        reduxReset()
    )(createStore);
    let store = enhanceCreateStore(
        reducer,
        initialState,
        window !== undefined && 
            window.__REDUX_DEVTOOLS_EXTENSION__ &&
                window.__REDUX_DEVTOOLS_EXTENSION__()
        );
    let persistor = persistStore(store);
    return { persistor, store };
}

export const { persistor, store } = configureStore();

export default store;