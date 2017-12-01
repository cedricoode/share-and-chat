import { actions }  from './actions';
import { actions as refrehActions } from '../../middleware/api';
import { initialState } from '../../../config/constants';
import { getHumanReadableErrorMsg } from '../../helpers/utils';

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
                user: action.content.response
            };
        case actions.LOGIN_FAILURE: {
            const msg = getHumanReadableErrorMsg(action.error);
            return {...state,
                loggedIn: false,
                loggingIn: false,
                error: msg};
        }
        case refrehActions.AUTH_REFRESH_TOKEN_SUCCESS: {
            return {...state, ...action.content.response};
        }
        default:
            return state;
    }
}

export default reducer;