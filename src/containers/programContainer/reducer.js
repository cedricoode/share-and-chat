import { actions } from './actions'; 

export default function programReducer(state={url: 'https://www.tudingbus.com/'}, action) {   
    switch(action.type) { 
        case actions.LOADHTML:
        return {...state , url: action.content.url};   
        default:
            return state;
    }
}