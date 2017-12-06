import { connect } from 'react-redux';

import ChatComponent from '../../components/chatComponent';
import actionCreatorFactory from './actions';
import { firebaseNewChatData } from '../../../store/actions';

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
        sendMessage: (messages, messageQuery) => {
            dispatch(actionCreatorFactory.sendMessage(messages, messageQuery));
        },
        saveRemoteMessage: (roomId, messages) => {
            dispatch(firebaseNewChatData(roomId, messages));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatComponent);