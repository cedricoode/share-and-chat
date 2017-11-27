const actions = {
    'FIREBASE_LOGIN': 'FIREBASE/LOGIN',
    'FIREBASE_LOGOUT': 'FIREBASE/LOGOUT'
};

export function firebaseReducer(state={isLoggedIn:false}, action) {
    switch(action.type) {
        case actions.FIREBASE_LOGIN: 
            return {isLoggedIn: true};
        case actions.FIREBASE_LOGOUT:
            return {isLoggedIn: false};
        default:
            return state;
    }
}