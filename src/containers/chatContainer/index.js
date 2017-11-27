import { connect } from 'react-redux';

import ChatComponent from '../../components/chatComponent';
import actionCreatorFactory from './actions';

// Redux
function mapStateToProps(state) {
    return {
        messages: state.messages[state.selectedId],
        user: state.auth.user,
        orderId: state.selectedId
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