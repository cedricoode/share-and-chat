import { connect } from 'react-redux';
import LoginComponent from '../../components/loginComponent';
import actionCreators, { actionCreatorFactory } from './actions';

// Redux
function mapStateToProps(state) {
    return {
        username: state.auth.username,
        password: state.auth.password,
        loggingIn: state.auth.loggingIn,
        submitError: state.auth.error
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onUsernameChange: (username) => {
            dispatch(actionCreators.onChangeUsername(username));
        },
        onPasswordChange: (password) => {
            dispatch(actionCreators.onChangePassword(password));
        },
        onSubmit: (username, password) => {
            dispatch(actionCreators.onLogin());
            dispatch(actionCreatorFactory.loginCreator(username, password));
        }
    };
}

const LoginContainer = 
    connect(mapStateToProps, mapDispatchToProps)(LoginComponent);

export default LoginContainer;