import React from 'react';
import {View, WebView} from 'react-native';
import PropTypes from 'prop-types';
const ProgramComponent = ({url}) => ( 
        <WebView source={{uri : url}} style={{
            flex: 1
        }}/> 
); 
ProgramComponent.propTypes = {
    url: PropTypes.string.isRequired
};
export default ProgramComponent;