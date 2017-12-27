import { endpoints } from '../../../config/constants';
import { API_REQUEST } from '../../middleware/api';

export const actions = {
    REFRESH: 'ORDERLIST/REFRESH',
    NEWDATA: 'ORDERLIST/NEWDATA',
    REFRESH_ERROR: 'ORDERLIST/REFRESH_ERROR',
    ORDERPAGE: 'ORDERLIST/ORDERPAGE'
};


export function orderListRequest(user) {
    const options = {
        method: 'GET',
        headers: {
            Authorization: `${user && user.tokenType} ${user && user.accessToken}`,
        }
    }; 
    return {
        type: API_REQUEST,
        [API_REQUEST]: {
            types: [actions.REFRESH, actions.NEWDATA, actions.REFRESH_ERROR],
            endpoint: `${endpoints.orderList}?page=0&size=20`,
            options
        }
    };
}
