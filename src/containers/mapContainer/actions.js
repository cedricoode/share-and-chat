import firebase from 'react-native-firebase';

export const actions = {
    LOCATION_SENDING: 'CHAT/LOCATION_SENDING',
    LOCATION_SENT: 'CHAT/LOCATION_SENT',
    LOCATION_SEND_FAILED: 'CHAT/LOCATION_SEND_FAILED'
};


export function sendingLocation(location, roomId) {
    return {
        type: actions.LOCATION_SENDING,
        content: {
            roomId,
            location
        }
    };
}

const actionCreatorFactory = {
    sendLocation: (location, locationQuery) => {
        return (dispatch, getState) => {
            const locationRef = locationQuery.ref;
            const { selectedId } = getState();
            const { orderId : roomId } = selectedId;
            dispatch(sendingLocation(location, roomId));
             var query = locationRef.child('/' + location.uid); 
             query.set(location).then(() =>
                dispatch({
                    type: actions.LOCATION_SENT,
                    content: {
                        roomId,
                        uid: location.uid
                    }
                })).catch(err => console.warn('no user signed in...', err)); 
        };
    }
};

export default actionCreatorFactory;