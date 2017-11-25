import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import reduxReset from 'redux-reset';

import authReducer from '../src/containers/loginContainer/reducer';
import orderListReducer from '../src/containers/orderListContainer/reducer';
import { initialState } from '../config/constants';

const persistConfig = {
    key: 'stateRoot',
    storage
};

const reducer = persistCombineReducers(persistConfig, {
    auth: authReducer,
    orders: orderListReducer,
    develop: (state=null, action) =>
        action.type === 'DEVELOP' ? action.content : state,
    selectedId: (state=null, action) =>
        action.type === 'SELECTORDER' ? action.content : state,
    programHTML :(state=null, action) =>
        action.type === 'SELECTORDER' ? 'https://www.google.com' : 'https://www.youtube.com'
    
});

const logger = createLogger({
    timestamp: true,
    diff: true
});

function configureStore() {
    const enhanceCreateStore = compose(
        applyMiddleware(thunkMiddleware, logger),
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