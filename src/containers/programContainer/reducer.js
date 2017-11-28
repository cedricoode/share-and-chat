import { actions } from './actions'; 

export default function programReducer(state={ programs :{}}, action) { 
    
    switch(action.type) { 
        case actions.LOADHTML: 
        return {...state,[action.content.id]:action.content.html} 
        default:
            return state;
    }
}
