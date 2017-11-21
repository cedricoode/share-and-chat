import logger from '../../helpers/logger';

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

const actionCreatorFactory = {
    loginCreator: () => {
        logger.log('loginCtn', 'actions', 'loginCreaton called!');
        return (dispatch, getState) => {
            const state = getState();
            logger.log('loginCtn', 'loginCreator',
                `login username(${state.auth.username})
                password(${state.auth.password})`);

            let formData = new FormData();
            formData.append('name', state.auth.username);
            formData.append('password', state.auth.password);
            let options = {
                method: 'POST',
                headers: {}
            };
            options.headers['Content-Type'] = 'multipart/form-data';
            options.body = formData;
            fetch('http://192.168.0.12:8080/login', options)
                .then(response => {
                    if (response.ok) {
                        return response.text();
                    } else {
                        throw new Error('response error, status code: ' + response.status);
                    }
                }).then(() => {
                    logger.log('loginCtn', 'login', 'login success');                    
                    dispatch({
                        type: actions.LOGIN_SUCCESS
                    });
                }).catch(err => {
                    logger.log('loginCtn', 'login', err);
                    dispatch({
                        type: actions.LOGIN_FAILURE,
                        content: {
                            reason: err
                        }
                    });
                });
        };
    }
};

export { actions, actionCreatorFactory };
export default actionCreators;