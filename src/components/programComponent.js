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
        const {html} = this.props;  
        return    <WebView source={{html : html}} style={{
            flex: 1
        }}/> 
    }
};   

ProgramComponent.propTypes = {
    html: PropTypes.string,
    onLoad: PropTypes.func
};
export default ProgramComponent;