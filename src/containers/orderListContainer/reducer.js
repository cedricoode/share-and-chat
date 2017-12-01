import { actions } from './actions';
import { initialState } from '../../../config/constants';
import { getHumanReadableErrorMsg } from '../../helpers/utils';

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
            return {...state, refreshing: true};
        case actions.NEWDATA:{
            const mergedData = mergeLists(
                state.data, action.content.response.data,
                'id',
                'startDateTime',
                -1);
            return {...state, data: mergedData, refreshing: false};
        }
        case actions.REFRESH_ERROR: {
            const msg = getHumanReadableErrorMsg(action.error);
            return {...state, refreshing: false, refresh_error: msg};
        }
        case actions.ORDERPAGE:
            return state;
        default:
            return state;
    }
}