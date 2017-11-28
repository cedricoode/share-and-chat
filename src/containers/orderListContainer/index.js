import { connect } from 'react-redux';

import OrderListComponent from '../../components/orderListComponent';
import { actionCreatorFactory } from './actions';
import { actionCreatorFactory as selectOrderFactory } from '../../../store/actions';

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
            dispatch(selectOrderFactory.selectOrderIdCreator(orderId));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderListComponent);