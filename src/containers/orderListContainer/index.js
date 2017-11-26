import { connect } from 'react-redux';

import OrderListComponent from '../../components/orderListComponent';
import { actionCreatorFactory, gotoOrderPage } from './actions';

// React

// Redux
function mapStateToProps(state) {
    return {
        orders: state.orders.data,
        refreshing: state.orders.refreshing
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onRefresh: () => {dispatch(actionCreatorFactory.orderListActionCreator());},
        onItemClick: (orderId) => {
            dispatch({type: 'SELECTORDER', content: orderId});
            dispatch(gotoOrderPage(orderId));}
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderListComponent);