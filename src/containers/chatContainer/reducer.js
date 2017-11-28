import { actions } from './actions';

import { actions as firebaseActions } from '../../../store/actions';

/** Add remote messages to local if it doesn't exist,
 * toggle state to sent, if it exists.
*/
function mergeRemoteMessage(localMsgs, remoteMsgs) {
    console.log('merging state');
    
    let result = [...localMsgs];
    remoteMsgs.forEach(rMsg => {
        let foundMsg = localMsgs.find(lMsg => (lMsg._id === rMsg._id));
        if (foundMsg) {
            // toggle state
            console.log('toggling state');
            result = result.map(msg => 
                (msg._id === foundMsg._id && msg.state !== 'sent')
                    ? ({...msg, state: 'sent'}) : ({...msg}));
        } else {
            // add to localMsg.
            console.log('adding msg');
            const insertionP = result.findIndex(
                msg => new Date(msg.createdAt) < new Date(rMsg.createdAt));
            if (insertionP === -1) {
                result = [...result, rMsg];
            } else {
                result.splice(insertionP, 0, rMsg);
            }
        }
    });
    return result;
}

function messageReducer(state={}, action) {
    switch(action.type) {
        case actions.MESSAGE_SENDING: {
            let { roomId, messages: newMessages } = action.content;
            let messages = state[roomId] || [];
            newMessages.forEach(m => m.state = 'sending');
            newMessages = [...newMessages, ...messages];
            return Object.assign({}, state, {[roomId]: newMessages});
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
        case firebaseActions.FIREBASE_NEW_CHAT_DATA: {
            let { roomId, messages: remoteMsgs } = action.content;
            let newMessages = [...(state[roomId] || [])];
            // remoteMsgs could be an object...
            if (!Array.isArray(remoteMsgs)) {
                remoteMsgs = [remoteMsgs];
            }
            newMessages = mergeRemoteMessage(newMessages, remoteMsgs);
            return {...state, [roomId]: newMessages};
        }
        default: return state;
    }
}

export default messageReducer;