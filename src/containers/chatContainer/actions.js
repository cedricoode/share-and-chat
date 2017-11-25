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
    sendMessage: (messages) => {
        return (dispatch, getState) => {
            // NetworkRequest
            const { selectedId: roomId } = getState();
            dispatch(sendingMessage(messages, roomId));
            setTimeout(() => {
                messages.forEach((message) => {
                    dispatch({
                        type: actions.MESSAGE_SENT,
                        content: {
                            roomId,
                            messageId: message._id
                        }
                    });
                });
            }, 2000);
        };
    }
};

export default actionCreatorFactory;