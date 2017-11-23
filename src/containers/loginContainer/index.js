import { connect } from 'react-redux';
import LoginComponent from '../../components/loginComponent';
import actionCreators, { actionCreatorFactory } from './actions';
import logger from '../../helpers/logger';

import { goToOrderScreen } from '../../App';

// Redux
function mapStateToProps(state) {
    return {
        username: state.auth.username,
        password: state.auth.password
    };
}
function mapDispatchToProps(dispatch, ownProps) {
    logger.log('loginCtn', 'ctn', JSON.stringify(ownProps));
    return {
        onUsernameChange: (username) => {
            logger.log('loginCtn', 'container', username);
            dispatch(actionCreators.onChangeUsername(username));
        },
        onPasswordChange: (password) => {
            dispatch(actionCreators.onChangePassword(password));
        },
        onSubmit: (username, password) => {
            dispatch(actionCreators.onLogin());
            dispatch(actionCreatorFactory.loginCreator(username, password));
            goToOrderScreen();            
        }
    };
}

const LoginContainer = 
    connect(mapStateToProps, mapDispatchToProps)(LoginComponent);

export default LoginContainer;