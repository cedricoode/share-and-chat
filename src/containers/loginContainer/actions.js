import ObjectMapper from 'object-mapper';

import logger from '../../helpers/logger';
import { endpoints } from '../../../config/constants';

const actions = {
    LOGIN: 'AUTH/LOGIN',
    LOGIN_SUCCESS: 'AUTH/LOGIN_SUCCESS',
    LOGIN_FAILURE: 'AUTH/LOGIN_FAILURE',
    LOGIN_INPUT_USERNAME: 'AUTH/INPUT_USERNAME',
    LOGIN_INPUT_PASSWORD: 'AUTH/INPUT_PASSWORD'
};

const actionCreators = {
    onLogin: () => ({type: actions.LOGIN}),
    onChangeUsername: ( username ) => ({
        type: actions.LOGIN_INPUT_USERNAME,
        content: { username }
    }),
    onChangePassword: ( password ) => ({
        type: actions.LOGIN_INPUT_PASSWORD,
        content: { password }
    })
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
    return fetch(endpoints.login, options).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('response error, status code: ' + response.status);
        }
    });
    
}

// Map logging result to redux/auth.user
const ResponseMapper = {
    'data.access_token': 'accessToken',
    'data.expires_in': 'expiresIn',
    'data.refresh_token': 'refreshToken',
    'data.token_type': 'tokenType',
    'data.ref_id': 'refId',
    'data.user_name': 'userName',
    firebaseToken: 'firebaseToken'
};

const actionCreatorFactory = {
    loginCreator: () => {
        logger.log('loginCtn', 'actions', 'loginCreaton called!');
        return (dispatch, getState) => {
            const state = getState();
            const { username, password } = state.auth;
            loginRequest(username, password)
                .then(rslt => {
                    const user = ObjectMapper(rslt, ResponseMapper);
                    dispatch({
                        type: actions.LOGIN_SUCCESS,
                        content: { user }
                    });})
                .catch(error => dispatch({
                    type: actions.LOGIN_FAILURE,
                    content: { error }
                }));
        };
    }
};

export { actions, actionCreatorFactory };
export default actionCreators;