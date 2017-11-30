import { actions } from './actions';
import { initialState } from '../../../config/constants';

/**
 * According to a key, merge two lists together.
 * @param {Array} obj1 
 * @param {Array} obj2 
 * @param {string} key, key that identify an item in an array
 * @param {string} sortKey, key to sort with.
 * @param {number} order, order to sort with, 1: increasing, -1: decreasing
 */
function mergeLists(obj1, obj2, key, sortKey, order=1) {
    let obj = {};
    obj1.forEach(item => obj[item[key]] = item);
    obj2.forEach(item => obj[item[key]] = item);
    let rtn = Object.values(obj);
    rtn.sort((a, b) => {
        if (a[sortKey] < b[sortKey]) return -1*order;
        else if (a[sortKey] == b[sortKey]) return 0*order;
        else return 1*order;
    });
    return rtn;
}

const DefaultState = initialState.orders;
export default function orderlistReducer(state=DefaultState, action) {
    switch(action.type) {
        case actions.REFRESH:
            return {...state, refreshing: action.content};
        case actions.NEWDATA:{
            // merge data
            const mergedData = mergeLists(
                state.data, action.content.data,
                'id',
                'startDateTime',
                -1);
            return {...state, data: mergedData, refreshing: false};
        }
        case actions.REFRESH_ERROR:
            //TODO: log error;
            return {...state, refreshing: false, refresh_error: action.content.error};
        case actions.ORDERPAGE:
            return { ...state };
        default:
            return state;
    }
}