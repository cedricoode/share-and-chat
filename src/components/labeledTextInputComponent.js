import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const LabeledTextInput = ({label, placeholder, displayLabel, secureTextEntry, onChange}) => (
    <View style={styles.container}>
        {displayLabel? (
            <View style={styles.label}>
                <Text selectable={false}>
                    {label}
                </Text>
            </View>)
            : null
        }
        <TextInput
            onChangeText={onChange? ((text) => onChange(text)) : null}
            style={styles.inputField}
            autoCorrect={false}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            caretHidden={true}            
        />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    label: {
        flex: 1,
        alignSelf: 'center',
        alignItems: 'center',
    },
    inputField: {
        flex: 4,
    }
});

LabeledTextInput.propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    displayLabel: PropTypes.bool,
    secureTextEntry: PropTypes.bool,
    onChange: PropTypes.func
};

LabeledTextInput.defaultProps = {
    label: 'Label',
    displayLabel: true
};

export default LabeledTextInput;