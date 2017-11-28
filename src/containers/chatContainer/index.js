import { connect } from 'react-redux';

import ChatComponent from '../../components/chatComponent';
import actionCreatorFactory from './actions';

// Redux
function mapStateToProps(state) {
    const { orderId } = state.selectedId;
    return {
        messages: state.messages[orderId],
        user: state.auth.user,
        orderId
    };
}

function mapDispatchToProps(dispatch) {
    return {
        sendMessage: (messages) => {
            dispatch(actionCreatorFactory.sendMessage(messages));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatComponent);