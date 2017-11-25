import { connect } from 'react-redux';

import ChatComponent from '../../components/chatComponent';
import actionCreatorFactory from './actions';

// React
function mapStateToProps(state) {
    return {
        messages: state.messages[state.selectedId]
    };
}

function mapDispatchToProps(dispatch) {
    return {
        sendMessage: (messages) => {
            dispatch(actionCreatorFactory.sendMessage(messages));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatComponent);