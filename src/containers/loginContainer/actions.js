import { endpoints } from '../../../config/constants';
import { API_REQUEST } from '../../middleware/api'; 

export const actions = {
    LOGIN: 'AUTH/LOGIN',
    LOGIN_SUCCESS: 'AUTH/LOGIN_SUCCESS',
    LOGIN_FAILURE: 'AUTH/LOGIN_FAILURE',
    LOGIN_INPUT_USERNAME: 'AUTH/INPUT_USERNAME',
    LOGIN_INPUT_PASSWORD: 'AUTH/INPUT_PASSWORD'
};

const actionCreators = {
    // onLogin: () => ({type: actions.LOGIN}),
    onChangeUsername: ( username ) => ({
        type: actions.LOGIN_INPUT_USERNAME,
        content: { username }
    }),
    onChangePassword: ( password ) => ({
        type: actions.LOGIN_INPUT_PASSWORD,
        content: { password }
    }),
    loginRequest: loginRequest
};

function loginRequest(username, password) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userName: username,
            password: password
        })
    };
    return {
        type: API_REQUEST,
        [API_REQUEST]: {
            types: [actions.LOGIN, actions.LOGIN_SUCCESS, actions.LOGIN_FAILURE],
            endpoint: endpoints.login,
            options,
            responseMapping: ResponseMapping
        }
    };
}

// Map logging result to redux/auth.user
const ResponseMapping = {
    'data.access_token': 'accessToken',
    'data.expires_in': 'expiresIn',
    'data.refresh_token': 'refreshToken',
    'data.token_type': 'tokenType',
    'data.ref_id': 'refId',
    'data.user_name': 'username',
    firebaseToken: 'firebaseToken'
};

export default actionCreators;