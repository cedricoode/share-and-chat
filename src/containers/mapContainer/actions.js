export const actions = {
    LOCATION_SENDING: 'CHAT/LOCATION_SENDING',
    LOCATION_SENT: 'CHAT/LOCATION_SENT',
    LOCATION_SEND_FAILED: 'CHAT/LOCATION_SEND_FAILED'
};


export function sendingLocation(locations, roomId) {
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
            const { orderId: roomId } = selectedId;
            dispatch(sendingLocation(location, roomId));
            const pushRef = locationRef.push();
            pushRef.set(location).then(() =>
                dispatch({
                    type: actions.LOCATION_SENT,
                    content: {
                        roomId,
                        locationId: location._id
                    }
                })).catch(err => console.warn('no user signed in...', err));
        };
    }
};

export default actionCreatorFactory;