import { actions } from './actions';

export function firebaseReducer(state={isLoggedIn:false}, action) {
    switch(action.type) {
        case actions.FIREBASE_LOGIN: 
            return {isLoggedIn: true};
        case actions.FIREBASE_LOGOUT:
            return {isLoggedIn: false};
        case actions.FIREBASE_NEW_CHAT_DATA:
            return state;
        default:
            return state;
    }
}

export function selectOrderReducer(state={}, action) {
    switch(action.type) {
        case actions.SELECTORDERID:
            return {...action.content};
        case actions.UNSELECTORDERID:
            return {orderId: null, messageRef: null};
        default:
            return state;
    }
}