import { actions }  from './actions';
import { initialState } from '../../../config/constants';

const DefaultState = initialState.auth;
function reducer(state=DefaultState, action) {
    switch(action.type) {
        case actions.LOGIN:
            return {...state, loggingIn: true};
        case actions.LOGIN_INPUT_PASSWORD:
            return {...state, password: action.content.password};
        case actions.LOGIN_INPUT_USERNAME:
            return {...state, username: action.content.username};
        case actions.LOGIN_SUCCESS:
            return {
                ...state,
                loggingIn: false,
                loggedIn: true,
                user: action.content.user
            };
        case actions.LOGIN_FAILURE:
            return {...state,
                loggedIn: false,
                loggingIn: false,
                error: action.content.error};
        default:
            return state;
    }
}

export default reducer;