import { endpoints } from '../../../config/constants';

export const actions = {
    REFRESH: 'ORDERLIST/REFRESH',
    NEWDATA: 'ORDERLIST/NEWDATA',
    REFRESH_ERROR: 'ORDERLIST/REFRESH_ERROR',
    ORDERPAGE: 'ORDERLIST/ORDERPAGE'
};


function orderListRequest(user) {
    const options = {
        method: 'GET',
        headers: {
            Authorization: `${user.tokenType} ${user.accessToken}`,
        }
    };
    return fetch(`${endpoints.orderList}?page=0&size=20`, options).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            console.log('response: ', response);
            throw new Error('response error, status code: ' + response.status);            
        }
    });
}

export function gotoOrderPage(orderId) {
    return {
        type: 'DEVELOP',
        content: orderId
    };
}

export const actionCreatorFactory = {
    orderListActionCreator: () => {
        return (dispatch, getState) => {
            dispatch({type: actions.REFRESH, content: true});
            const { user } = getState().auth;
            orderListRequest(user).then(({data}) => {
                dispatch({type: actions.NEWDATA, content: {data}});
            }).catch(error => {dispatch({type: actions.REFRESH_ERROR, content: {error}}); console.log(error);});
        };
    }
};
