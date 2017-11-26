import React ,{Component} from 'react';
import {View, WebView} from 'react-native';
import PropTypes from 'prop-types';


class ProgramComponent extends Component {
    constructor(props) {
        super(props);  
    }
    componentDidMount() {
         this.props.onLoad();
    }
    render() {
        const { url } = this.props;
        return    <WebView source={{uri : url}} style={{
            flex: 1
        }}/> 
    }
};   

ProgramComponent.propTypes = {
    url: PropTypes.string.isRequired,
    onLoad: PropTypes.func
};
export default ProgramComponent;