import { actions }  from './actions';

function reducer(state={username: 'default', password: 'password'}, action) {
    switch(action.type) {
        case actions.LOGIN: 
            return state;
        case actions.LOGIN_INPUT_PASSWORD:
            return {...state, password: action.content.password};
        case actions.LOGIN_INPUT_USERNAME:
            return {...state, username: action.content.username};
        case actions.LOGIN_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                user: {
                    ...action.content.data,
                    firebaseToken: action.content.firebaseToken
                }
            };
        case actions.LOGIN_FAILURE:
            return {...state, loggedIn: false};
        default:
            return state;
    }
}

export default reducer;