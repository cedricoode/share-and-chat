import ObjectMapper from 'object-mapper';
import { endpoints } from '../../config/constants';

export const actions = {
    AUTH_REFRESH_TOKEN: 'AUTH/REFRESH_TOKEN',
    AUTH_REFRESH_TOKEN_SUCCESS: 'AUTH/REFRESH_TOKEN_SUCCESS',
    AUTH_REFRESH_TOKEN_FAILURE: 'AUTH/REFRESH_TOKEN_FAILURE',
};

export const API_REQUEST = 'API_REQUEST';

/**
 * Transform the type of this action if this action is with API_REQUEST attribute
 * by adding new attributes to the action or replace it.
 * @param {Object} action 
 * @param {Object} attr 
 */
function transformActionWith(action, attr) {
    const rslt = {...action, ...attr};
    delete rslt[API_REQUEST];
    return rslt;
}

export function refreshTokenStateReducer(state=false, action) {
    switch (action.type) {
        case actions.AUTH_REFRESH_TOKEN:
            return true;
        case actions.AUTH_REFRESH_TOKEN_FAILURE:
            // TODO: logout...
            return false;
        case actions.AUTH_REFRESH_TOKEN_SUCCESS:
            return false;
        default: return state;
    }
}

const refreshTokenMapping = {
    'data.result.access_token': 'accessToken',
    'data.result.refresh_token': 'refreshToken',
    'data.result.token_type': 'tokenType',
    'data.result.ref_id': 'refId',
    'data.result.user_name': 'username',
    'data.result.expiresIn': 'expiresIn'
};
/** 
 * Attempt to refresh auth token of this user, since this call might be executed
 * multiple times, we will only allow one call to be executed at a time. This 
 * function attempts to address this use case.
 */
function refreshToken(response, action, store) {
    // if Store still holds refresh token state, then ignore
    if (store.getState().refreshTokenState) {
        return;
    }
    // if response is a not allowed error, and not from a refreshToken action.
    // try to refresh it.
    if (response.status === 401 &&
        action[API_REQUEST].endpoint !== endpoints.refreshToken) {
            const { username, refreshToken: token } = store.getState().auth;
            store.dispatch({type: API_REQUEST, [API_REQUEST]: {
                endpoint: endpoints.refreshToken,
                types: [actions.AUTH_REFRESH_TOKEN,
                    actions.AUTH_REFRESH_TOKEN_SUCCESS,
                    actions.AUTH_REFRESH_TOKEN_FAILURE],
                options: {
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        userName: username,
                        grantType: 'refresh_token',
                        refreshToken: token})
                },
                responseMapping: refreshTokenMapping
            }});
    }
}

/**
 * Perform an API request.
 * @param {string} endpoint 
 * @param {object} options 
 * @param {object|null} responseMapping 
 */
function callApi(endpoint, options, responseMapping) {
    return fetch(endpoint, options)  
        .then(response => { 
            if (!response.ok) {
                return Promise.reject(response);
            } 
            return response.json().then(data => {
                if (endpoint === endpoints.login ||
                    endpoint === endpoints.refreshToken) {
                    if (data.code !== "999"){
                    let error = new Error(data.message);
                    error.code = data.code;
                    return Promise.reject(error);
                }}
                return responseMapping ? ObjectMapper(data, responseMapping) : data;
            });
        });
}

export default store => next => action => {
    const apiRequest = action[API_REQUEST];
    // This is a normal action
    if (typeof apiRequest === 'undefined') {
        return next(action);
    }

    const { endpoint, types, options, responseMapping } = apiRequest;
    
    if (!Array.isArray(types) || types.length != 3 ||
        !types.every(t => typeof t === 'string')) {
        throw new Error('api middleware requires passing 3 types');
    }

    const [ requestType, successType, failureType ] = types;
    // Dispatch a Requesting Action.
    next(transformActionWith(action, {type: requestType}));

    return callApi(endpoint, options, responseMapping)
        .then(data => {
            next(transformActionWith(
                action, {content: {response: data}, type: successType}));
            return data;
        })
        .catch(error => {next(transformActionWith(
            action, {error: error || 'Caught unknown error', type: failureType}));
            return error;
        })
        .then(response => refreshToken(response, action, store, next))
        .catch(err => console.warn('unhandled rejection...', err));
};