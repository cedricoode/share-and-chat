export const actions = {
    LOCATION_SENDING: 'MAP/LOCATION_SENDING',
    LOCATION_SENT: 'MAP/LOCATION_SENT',
    LOCATION_SEND_FAILED: 'MAP/LOCATION_SEND_FAILED',
    LOCATIONS_FETCHING: 'MAP/LOCATIONS_FETCHING',
    LOCATIONS_FETCHING_SUCCESS: 'MAP/LOCATIONS_FETCHING_SUCCESS',
    LOCATIONS_FETCHING_FAILED: 'MAP/LOCATIONS_FETCHING_FAILED',
};
export function sendingLocation() {
    return {
        type: actions.LOCATION_SENDING,
        content: {
            sending: true
        }
    };
}
export function fetchingAllLocations() {
    return {
        type: actions.LOCATIONS_FETCHING,
        content: {
            fetching: true
        }
    };
}
export function fetchingAllLocationsSuccess(roomId, locations) {
    return {
        type: actions.LOCATIONS_FETCHING_SUCCESS,
        content: {
            roomId,
            fetching: false,
            locations: locations
        }
    };
}
export function fetchingAllLocationsFailed(error) {
    return {
        type: actions.LOCATIONS_FETCHING_FAILED,
        content: {
            fetching: false,
            error: error
        }
    };
}
const actionCreatorFactory = {
    sendLocation: (location, locationQuery) => {
        return (dispatch, getState) => {
            const locationRef = locationQuery.ref;
            const { selectedId } = getState();
            const { orderId: roomId } = selectedId;
            dispatch(sendingLocation());
            var query = locationRef.child('/' + location.uid);
            query.set(location).then(() => {
                dispatch({
                    type: actions.LOCATION_SENT,
                    content: {
                        roomId: roomId,
                        locations: location
                    }
                });
                // actionCreatorFactory.fetchLocations(locationQuery);  
            }
            ).catch(err => console.warn('no user signed in...', err));
        };
    },
    fetchLocations: (locationQuery) => {
        return (dispatch, getState) => {
            dispatch(fetchingAllLocations());
            const locationRef = locationQuery.ref;
            const { selectedId } = getState();
            const { orderId: roomId } = selectedId;
            let promises = [];
            locationRef.once('value', function (snapshot) {
                let locations = [];
                snapshot.forEach(function (childSnapshot) {
                    let childData = childSnapshot.val();
                    let promise = locations.push(childData);
                    promises.push(promise);
                });
                Promise.all(promises)
                    .then(function () {
                        dispatch(fetchingAllLocationsSuccess(roomId, locations));
                    })
                    .catch(function (err) {
                        console.warn('fetching locations error -' + err);
                        dispatch(fetchingAllLocationsFailed(err));
                    });
            });
        };
    },
};

export default actionCreatorFactory;