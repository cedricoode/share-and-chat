import { connect } from 'react-redux';

import OrderListComponent from '../../components/orderListComponent';
import { actionCreatorFactory } from './actions';

// React

// Redux
function mapStateToProps(state) {
    return {
        orders: state.orders.data,
        refreshing: state.orders.refresh
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onRefresh: () => {dispatch(actionCreatorFactory.orderListActionCreator());},
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderListComponent);