import { actions } from './actions';
import { initialState } from '../../../config/constants';

const DefaultState = initialState.locations;
function locationReducer(state=DefaultState, action) { 
    switch(action.type) {
        case actions.LOCATION_SENDING: { 
            return {...state,
                sending : true
            }; 
        }
        case actions.LOCATION_SENT: {
          let { roomId, location: newLocation } = action.content;
            let locations = state[roomId];
            if(locations.length > 0){
                var index = locations.map(function(l){
                    return l.uid;
                }).indexOf(newLocation.uid); 
                if (index !== -1) { 
                   locations[index] = newLocation;  
                } 
            }else{
                locations.push(newLocation);
            } 
            return {...state,
                [roomId]:locations,
                sending : false
            }; 
        }
        case actions.LOCATION_SEND_FAILED:
            // TODO:
            return state;
        case actions.LOCATIONS_FETCHING: 
            return {
                ...state,
                fetching : true 
            };
        case actions.LOCATIONS_FETCHING_SUCCESS: 
            let locations  = action.content.locations;
            let roomId  = action.content.roomId; 
            return {
                ...state,
                fetching : false,
                [roomId]: locations
            };
        case actions.LOCATIONS_FETCHING_FAILED: 
            return {
                ...state,
                fetching : false 
            };
        default:
            return state;
    }
}

export default locationReducer;