export const actions = {
    MESSAGE_SENDING: 'CHAT/MESSAGE_SENDING',
    MESSAGE_SENT: 'CHAT/MESSAGE_SENT',
    MESSAGE_SEND_FAILED: 'CHAT/MESSAGE_SEND_FAILED'
};


export function sendingMessage(messages, roomId) {
    return {
        type: actions.MESSAGE_SENDING,
        content: {
            roomId,
            messages
        }
    };
}

const actionCreatorFactory = {
    sendMessage: (messages, messageQuery) => {
        return (dispatch, getState) => {
            const messageRef = messageQuery.ref;
            const { selectedId } = getState();
            const { orderId: roomId } = selectedId;
            dispatch(sendingMessage(messages, roomId));

            messages.forEach(msg => {
                delete msg.state;
                const pushRef = messageRef.push();
                return pushRef.set(msg).then(() =>
                    dispatch({
                        type: actions.MESSAGE_SENT,
                        content: {
                            roomId,
                            messageId: msg._id
                        }
                    }))
                    .catch(err => console.warn('no user signed in...', err));
            });
        };
    }
};

export default actionCreatorFactory;