import MapComponent from '../../components/mapComponent';
import { connect } from 'react-redux';
import actionCreatorFactory, { locationChanged } from './actions';
import { firebaseNewLocationData } from '../../../store/actions';

function mapStateToProps(state) {
    const { orderId } = state.selectedId; 
    return {
        locations: state.locations[orderId],
        hasPermission: state.locations.hasPermission,
        user: state.auth.user,
        orderId 
    };
}

function mapDispatchToProps(dispatch) {
    return {
        sendLocation: (position, locationQuery) => {
            dispatch(actionCreatorFactory.sendLocation(position, locationQuery));
        },
        upsertRemoteLocation: (roomId, position) => {
            dispatch(firebaseNewLocationData(roomId, position));
        },
        fetchLocationList: (locationQuery) => {
            dispatch(actionCreatorFactory.fetchLocations(locationQuery));
        },
        toggleLocationPermission(hasPermission) {
            dispatch(locationChanged(hasPermission));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapComponent);