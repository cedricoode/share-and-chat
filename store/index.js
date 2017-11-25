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
    develop: (state = null, action) => {
        if (action.type === 'DEVELOP') {
            return action.content;
        } else {
            return state;
        }
    },
    programHTML :(state=null) => state
    
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