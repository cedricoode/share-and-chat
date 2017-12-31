import { actions } from './actions';
import { initialState } from '../../../config/constants';
import { actions as firebaseActions } from '../../../store/actions';

const DefaultState = initialState.locations;
function locationReducer(state = DefaultState, action) {
    switch (action.type) {
        case actions.LOCATION_SENDING: {
            return {
                ...state,
                sending: true
            };
        }
        case actions.LOCATION_SENT: {
            let { roomId, locations: newLocation } = action.content;
            let locations = state[roomId];
            locations = upsertLocation(locations || [], newLocation);
            return {
                ...state,
                [roomId]: locations,
                sending: false
            };
        }
        case actions.LOCATION_SEND_FAILED:
            // TODO:
            return state;
        case actions.LOCATIONS_FETCHING:
            return {
                ...state,
                fetching: true
            };
        case actions.LOCATIONS_FETCHING_SUCCESS: {
            let locations = action.content.locations;
            let roomId = action.content.roomId;
            return {
                ...state,
                fetching: false,
                [roomId]: locations
            };
        }
        case actions.LOCATIONS_FETCHING_FAILED:
            return {
                ...state,
                fetching: false
            };
        case firebaseActions.FIREBASE_NEW_LOCATION_DATA: {
            let { roomId, locations: newLocation } = action.content;
            let locations = state[roomId];
            locations = upsertLocation(locations || [], newLocation);
            return {
                ...state,
                [roomId]: locations,
            };
        }
        default:
            return state;
    }
}

function upsertLocation(locations, newLocation) {
    if (locations.length > 0) {
        var index = locations.map(function (l) {
            return l.uid;
        }).indexOf(newLocation.uid);
        if (index !== -1) {
            locations[index] = newLocation;
        }
    } else {
        locations.push(newLocation);
    }
    return [...locations];
}

export default locationReducer;