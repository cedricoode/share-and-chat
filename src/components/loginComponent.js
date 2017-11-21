
import React, { Component } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
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
            <View style={styles.container}>
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
                {submitError?
                    <Text style={styles.errorText}>
                        error
                    </Text>
                    : null
                }

                <Button title='Sign In' onPress={() => 
                    onSubmit()||null}/>
            </View>
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
    container: {
        // flex: 1,
        // justifyContent: 'center',
    },
    errorText: {
        color: 'red'
    }
});
export default LoginComponent;