
import React, { Component } from 'react';
import { View, Button, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import PropTypes from 'prop-types';

import LabeledTextInput from './labeledTextInputComponent';

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
            submitError
         } = this.props;
        return (
            <ImageBackground style={styles.imgBackground}
                source={require('../../static/icon/bg.png')}>
                <View>
                    <Image source={require('../../static/icon/logo.png')}
                        resizeMode='contain'
                        style={styles.logo}/>
                    <View style={styles.inputContainer}>
                        <View>
                            <LabeledTextInput
                                label='Email'
                                placeholder='Company Name'
                                displayLabel={false}
                                onChange={onUsernameChange}/>
                        </View>
                        <View>
                            <LabeledTextInput 
                                label='Password'
                                placeholder='Password'
                                displayLabel={false}
                                secureTextEntry={true}
                                onChange={onPasswordChange}/>
                        </View>
                    </View>
                    {submitError?
                        <Text style={styles.errorText}>
                            error
                        </Text>
                        : null
                    }

                    <Button title='Sign In' onPress={() => 
                        onSubmit()||null}/>
                </View>
            </ImageBackground>
        );
    }
}

LoginComponent.propTypes = {
    onSubmit: PropTypes.func,
    onUsernameChange: PropTypes.func,
    onPasswordChange: PropTypes.func,
    submitError: PropTypes.bool
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
    inputContainer: {
    }
});
export default LoginComponent;