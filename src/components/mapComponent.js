import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  PermissionsAndroid,
  Image,
  TouchableHighlight,
  Platform,
  Dimensions
} from 'react-native';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import MapView from 'react-native-maps';
import firebase from 'react-native-firebase';
let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height; 
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
class MapComponent extends Component {
  constructor(props) {
    super(props);
    this._onNavigatorEvent = this._onNavigatorEvent.bind(this);
    this._requestLocation = this._requestLocation.bind(this);
    this._onGeoSuccess = this._onGeoSuccess.bind(this);
    this._onGeoError = this._onGeoError.bind(this);
    this._onNewRemoteLocation = this._onNewRemoteLocation.bind(this);
    this.state = {markers: [], region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta:LONGITUDE_DELTA}};
  }

  componentWillMount() {
    if (this.props.navigator) {
      this._unsubscribe =
        this.props.navigator.addOnNavigatorEvent(this._onNavigatorEvent);
      this.props.navigator.toggleNavBar({ to: 'hidden', animated: true });
    }

    // Subscribe to firebase location db.
    const { orderId } = this.props;
    const locationRef = firebase.database().ref(`locations/${orderId}`);
    let locationQuery = locationRef.orderByChild('createdAt');
    locationQuery = locationQuery.startAt(
        (this.props.locations && this.props.locations[0]
            || {createdAt: new Date('1992-01-01')})
            .createdAt);
    locationQuery.on('child_added', this._onNewRemoteLocation);
    this.setState({...this.state, locationQuery});

    // Checkpermission. TODO: platform check. TODO: android api check.
    if(Platform.OS === 'android' ){
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        .then(hasPermission => {
          if (hasPermission) {
            console.log('has permission');
          } else {
            // Check for permissions.
            PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              {
                title: 'To Share Your Location',
                message: 'In order to share your location with others, \
                      you need to grant this permission..'
              }
            );
          }
        });
    }
    this.watchId = navigator.geolocation.watchPosition(this._onGeoSuccess, this._onGeoError, {
      enableHighAccuracy: true,
      maximumAge: 10 * 60 * 1000
    });
  }

  componentWillUnmount() {
    if (this.props.navigator) {
      this.props.navigator.toggleNavBar({ to: 'show', animated: true });
    }
    this._unsubscribe && this._unsubscribe();
    navigator.geolocation.clearWatch(this.watchId);

    // Clear firebase listener
    this.state.locationQuery &&
    this.state.locationQuery.off('child_added', this._onNewRemoteLocation);
    delete this.state.locationQuery;
    this.setState({...this.state});
  }

  _onNewRemoteLocation(snapshot) {
    this.props.saveRemoteLocation(this.props.orderId, snapshot.val());
  }

  /**
   * The navigator property is an injected dependency of this component,
   * we cannot garantee the existence of nav event handler.
   * To make the configuration clear, normally the relevant handler is injected
   * the same place where the navigator is defined, namely in src/App.js
   * @param {NavigatorEventType} event 
   */
  _onNavigatorEvent(event) {
    get(this.props,
      'chatNavProps.eventHandler',
      () => { })(event || { id: 'back', type: 'NavBarButtonPress' });
  }

  _onGeoSuccess(position) {
    // TODO: update firebase.
    this.props.sendLocation({
      ...position,
      uid: this.props.user.refId,
      id: String(new Date().getTime())
    }, this.state.locationQuery);
    this.setState({
      markers: [{...position.coords}],
      region: {...position.coords, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA}});
    console.log('get current position: ', position);
  }

  _onGeoError(err) {
    console.error('get position error', err);
  }

  _requestLocation() {
    navigator.geolocation.getCurrentPosition(this._onGeoSuccess, this._onGeoError, {
      maximumAge: 10 * 60 * 1000,
      enableHighAccuracy: true,
      useSignificantChanges: true,
      timeout: 20000
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={this.state.region}
        >
          {
            this.state.markers.map(marker => (
              <MapView.Marker
                coordinate={marker}
                title='ME'
                style={styles.mapIcon}
                description='This is my location'
                key={marker.latitude}
                image={require('../../static/icon/bus.png')}
              />
            ))
          }
        </MapView>
        <TouchableHighlight
          underlayColor='rgba(0,0,0,0)'
          onPress={this._requestLocation}
          style={styles.iconContainer}>
          <Image
            resizeMode='contain'
            style={styles.mapIcon}
            source={require('../../static/icon/leader.png')} />
        </TouchableHighlight>
      </View>
    );
  }
}

MapComponent.propTypes = {
  navigator: PropTypes.object,
  mapNavProps: PropTypes.object,
  orderId: PropTypes.string,
  locations: PropTypes.object,
  saveRemoteLocation: PropTypes.func,
  sendLocation: PropTypes.func,
  user: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  iconContainer: {
    alignSelf: 'flex-end'
  },
  mapIcon: {
    width: 48,
    height: 48
  }
});

export default MapComponent;

