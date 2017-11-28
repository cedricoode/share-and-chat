import {connect} from 'react-redux';
import {View, Text, StyleSheet, WebView} from 'react-native';
import ProgramComponent from '../../components/programComponent';
import { actionCreatorFactory } from './actions';

function mapStateToProps(state) {   
    let orderId = state.selectedId.orderId;
    return {html: state.programs[orderId]};
} 
function mapDispatchToProps(dispatch) {
    return {
        onLoad: () => {dispatch(actionCreatorFactory.programActionCreator());}  
    };
}
const ProgramContainer = connect(mapStateToProps,mapDispatchToProps)(ProgramComponent);
export default ProgramContainer;