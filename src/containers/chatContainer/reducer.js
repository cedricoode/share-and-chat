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
            let messages = state[roomId];
            if (typeof messages === 'undefined') {
                console.error('this is an unexpected behaviour');
                return state;
            } else {
                let newMessages = messages.map(msg => msg._id === messageId ?
                    ({...msg, state: 'sent'}) : ({...msg}));
                return {...state, [roomId]: newMessages};
            }
        }
        default: return state;
    }
}

export default messageReducer;