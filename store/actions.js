// import firebase from 'react-native-firebase';

export const actions = {
    FIREBASE_LOGIN: 'FIREBASE/LOGIN',
    FIREBASE_LOGOUT: 'FIREBASE/LOGOUT',
    FIREBASE_NEW_CHAT_DATA: 'FIREBASE/NEW_CHAT_DATA',
    FIREBASE_NEW_LOCATION_DATA: 'FIREBASE/NEW_LOCATION_DATA',
    SELECTORDERID: 'ROOT/SELECTORDERID',
    UNSELECTORDERID: 'ROOT/UNSELECTORDERID' 
};

export function firebaseNewChatData(roomId, messages) {
    return {
        type: actions.FIREBASE_NEW_CHAT_DATA,
        content: {
            roomId,
            messages
        }
    };
}

export function firebaseNewLocationData(roomId, locations) {
    return {
        type: actions.FIREBASE_NEW_LOCATION_DATA,
        content: {
            roomId,
            locations
        }
    };
}
 
export function firebaseLogin(firebaseToken) {
    return {
        type: actions.FIREBASE_LOGIN,
        content: firebaseToken
    };
}

export function firebaseLogout() {
    return {
        type: actions.FIREBASE_LOGOUT
    };
}
export function toggleSideMenu(){
    this.props.navigator.toggleDrawer({
        side: "left",
        animated: true,
        to: "open"
     });
}

export const actionCreatorFactory = {
    selectOrderIdCreator: (orderId) => {
        return (dispatch) => {
            const messageRef = {};
            dispatch({
                type: actions.SELECTORDERID,
                content: { orderId, messageRef }
            });
        };
    },
    unselectOrderIdCreator: () => {
        return (dispatch) => {
            dispatch({type: actions.UNSELECTORDERID, content: null});
        };
    }
};

export default actionCreatorFactory;