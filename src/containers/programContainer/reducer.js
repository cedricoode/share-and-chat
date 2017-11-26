import { actions } from './actions'; 

export default function programReducer(state={}, action) {   
    switch(action.type) { 
        case actions.LOADHTML:
        return {...state , url: action.content.url};   
        default:
            return state;
    }
}