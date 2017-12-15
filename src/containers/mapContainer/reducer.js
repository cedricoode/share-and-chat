import { actions } from './actions';
import { initialState } from '../../../config/constants';

const DefaultState = initialState.locations;
function locationReducer(state=DefaultState, action) {
    switch(action.type) {
        case actions.LOCATION_SENDING: {
            let { roomId, location: newLocation } = action.content;
            let locations = state[roomId];
            newLocation.state = 'sending';
            return {...state,
                [roomId]: {
                    ...locations,
                    [newLocation.uid]: newLocation
                }};
        }
        case actions.LOCATION_SENT: {
            const { roomId, uid } = action.content;
            let location = state[roomId][uid];
            if (location) location = {...location, state: 'sent'};
            return {...state, [roomId]: {...state[roomId], [uid]: location}};
        }
        case actions.LOCATION_SEND_FAILED:
            // TODO:
            return state;
        default:
            return state;
    }
}

export default locationReducer;