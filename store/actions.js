import firebase from 'react-native-firebase';

export const actions = {
    FIREBASE_LOGIN: 'FIREBASE/LOGIN',
    FIREBASE_LOGOUT: 'FIREBASE/LOGOUT',
    FIREBASE_NEW_CHAT_DATA: 'FIREBASE/NEW_CHAT_DATA',
    SELECTORDERID: 'ROOT/SELECTORDERID',
    UNSELECTORDERID: 'ROOT/UNSELECTORDERID'
};

function _new_data_listener(dispatch, snapshot) {
    dispatch({
        type: actions.FIREBASE_NEW_CHAT_DATA,
        content: {
            roomId: snapshot.ref.parent.key,
            messages: snapshot.val()
        }
    });
}

export function firebaseLogin() {
    return {
        type: actions.FIREBASE_LOGIN
    };
}

export function firebaseLogout() {
    return {
        type: actions.FIREBASE_LOGOUT
    };
}

export const actionCreatorFactory = {
    selectOrderIdCreator: (orderId) => {
        return (dispatch) => {
            const messageRef = firebase.database().ref(`/messages/${orderId}`);
            // TODO: investigate whether on could be called multiple times
            // with the same listener
            messageRef.on('child_added', (newData) => _new_data_listener(dispatch, newData));
            dispatch({
                type: actions.SELECTORDERID,
                content: { orderId, messageRef }
            });
        };
    },
    unselectOrderIdCreator: () => {
        return (dispatch, getState) => {
            const { messageRef } = getState().selectedId;
            messageRef.off('child_added', _new_data_listener);
            dispatch({type: actions.UNSELECTORDERID, content: null});
        };
    }
};

export default actionCreatorFactory;