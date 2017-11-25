import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const LogoutButton = ({store}) => <TouchableOpacity onPress={()=>{console.log('pressed');store.dispatch({type: 'RESET'});}}>Logout</TouchableOpacity>;

LogoutButton.propTypes = {
    store: PropTypes.object
};

export default LogoutButton;