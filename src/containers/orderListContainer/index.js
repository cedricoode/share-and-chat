import { connect } from 'react-redux';

import OrderListComponent from '../../components/orderListComponent';

function mapStateToProps(state) {
    return {
        orders: state.orders
    };
}

export default connect(mapStateToProps)(OrderListComponent);