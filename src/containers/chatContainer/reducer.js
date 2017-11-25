import { actions } from './actions';

function messageReducer(state={}, action) {
    switch(action.type) {
        case actions.MESSAGE_SENDING: {
            const { roomId, messages } = action.content;
            let room = state[roomId] || [];
            messages.forEach(m => m.state = 'sending');
            room = [...messages, ...room];
            return Object.assign({}, state, {[roomId]: room});
        }
        case actions.MESSAGE_SEND_FAILED:
            //TODO:
            return state;
        case actions.MESSAGE_SENT: {
            const { roomId, messageId } = action.content;
            let room = state[roomId];
            if (typeof room === 'undefined') {
                console.error('this is an unexpected behaviour');
                return state;
            } else {
                let message = room.find(item => item._id === messageId)||{};
                message.state = 'sent';
                return Object.assign({}, state);
            }
        }
        default: return state;
    }
}

export default messageReducer;