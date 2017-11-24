import {connect} from 'react-redux';
import {View, Text, StyleSheet, WebView} from 'react-native';
import ProgramComponent from '../../components/programComponent';

function mapStateToProps(state) { 
    return {url: state.programHTML};
} 
const ProgramContainer = connect(mapStateToProps)(ProgramComponent);
export default ProgramContainer;