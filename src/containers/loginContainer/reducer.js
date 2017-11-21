import { actions }  from './actions';

import logger from '../../helpers/logger';

function reducer(state={username: 'default', password: 'password'}, action) {
    switch(action.type) {
        case actions.LOGIN: 
            logger.log('loginCtn', 'reducer', action);
            return state;
        case actions.LOGIN_INPUT_PASSWORD:
            logger.log('loginCtn', 'reducer pass', action.content);
            return {...state, password: action.content.password};
        case actions.LOGIN_INPUT_USERNAME:
            logger.log('loginCtn', 'reducer username', action.content);        
            return {...state, username: action.content.username};
        default:
            return state;
    }
}

export default reducer;