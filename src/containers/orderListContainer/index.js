import { connect } from 'react-redux';
import OrderListComponent from '../../components/orderListComponent';
import { orderListRequest } from './actions';
import { actionCreatorFactory as selectOrderFactory } from '../../../store/actions';

// Redux
function mapStateToProps(state) {
    return {
        orders: state.orders.data,
        refreshing: state.orders.refreshing,
        user: state.auth.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onRefresh: (user) => 
            dispatch(orderListRequest(user|| {})),
        onItemClick: (orderId) => {
            dispatch(selectOrderFactory.selectOrderIdCreator(orderId));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderListComponent);