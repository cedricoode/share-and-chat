import MapComponent from '../../components/mapComponent';
import { connect } from 'react-redux';
import actionCreatorFactory from './actions';
import { firebaseNewLocationData } from '../../../store/actions';

function mapStateToProps(state) {
    const { orderId } = state.selectedId;
    return {
        locations: state.locations[orderId],
        user: state.auth.user,
        orderId
    };
}

function mapDispatchToProps(dispatch) {
    return {
        sendLocation: (position, locationQuery) => {
            dispatch(actionCreatorFactory.sendLocation(position, locationQuery));
        },
        saveRemoteLocation: (roomId, position) => {
            dispatch(firebaseNewLocationData(roomId, position));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapComponent);