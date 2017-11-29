
import React, { Component } from 'react';
import {
    View, Text,
    StyleSheet, ImageBackground, Image
} from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';

import LabeledTextInput from './labeledTextInputComponent';
import { colors } from '../../config/constants';

class LoginComponent extends Component {
    constructor() {
        super();
        this.passwordValidator = this.passwordValidator.bind(this);
    }

    passwordValidator(text) {
        if (!text) {
            console.warn('password is not valid');
        }
    }

    render() {
        const {
            onSubmit,
            onUsernameChange,
            onPasswordChange,
            submitError,
            loggingIn
         } = this.props;
        return (
            <ImageBackground style={styles.imgBackground}
                source={require('../../static/icon/bg.png')}>
                <View style={{ alignSelf: 'stretch', alignItems: 'center' }}>
                    <Image source={require('../../static/icon/logo.png')}
                        resizeMode='contain'
                        style={styles.logo} />
                    <Text style={styles.signIn}> Sign In</Text>
                    <View style={styles.inputContainer}>
                        <LabeledTextInput
                            label='Email'
                            placeholder='Company Name'
                            displayLabel={false}
                            onChange={onUsernameChange} />
                    </View>
                    <View style={styles.inputContainer}>
                        <LabeledTextInput
                            label='Password'
                            placeholder='Password'
                            displayLabel={false}
                            secureTextEntry={true}
                            onChange={onPasswordChange} />
                    </View>
                    {submitError ?
                        <Text style={styles.errorText}>
                            error
                        </Text>
                        : null
                    }

                    <Button title='Sign In'
                        containerViewStyle={styles.buttonContainerStyle}
                        borderRadius={100}
                        backgroundColor={colors.primary}
                        style={styles.buttonStyle}
                        loadingRight={true}
                        loading={!!loggingIn}
                        disabled={!!loggingIn}
                        disabledStyle={styles.buttonStyle}
                        onPress={() => onSubmit() || null} />
                </View>
            </ImageBackground>
        );
    }
}

LoginComponent.propTypes = {
    onSubmit: PropTypes.func,
    onUsernameChange: PropTypes.func,
    onPasswordChange: PropTypes.func,
    submitError: PropTypes.bool,
    loggingIn: PropTypes.bool
};

const styles = StyleSheet.create({
    imgBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorText: {
        color: 'red'
    },
    logo: {
        width: 180,
        height: 90
    },
    signIn: {
        marginTop: 48,
        marginBottom: 16,
        fontSize: 32
    },
    inputContainer: {
        alignSelf: 'stretch',
        alignItems: 'center',
        marginLeft: 48,
        marginRight: 48,
        marginTop: 8,
        paddingRight: 8,
        paddingLeft: 8,
        backgroundColor: colors.textOnPrimary,
        borderRadius: 8
    },
    buttonContainerStyle: {
        borderRadius: 100,
        alignSelf: 'stretch',
        marginTop: 16,
        marginRight: 48,
        marginLeft: 48
    },
    buttonStyle: {
        // width: '200%',
        // backgroundColor: colors.primary
    },
    buttonDisabledStyle: {
    }
});
export default LoginComponent;