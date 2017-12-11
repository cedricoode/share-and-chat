import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  PermissionsAndroid,
  Image,
  TouchableHighlight
} from 'react-native';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import MapView from 'react-native-maps';

class MapComponent extends Component {
  constructor(props) {
    super(props);
    this._onNavigatorEvent = this._onNavigatorEvent.bind(this);
    this._requestLocation = this._requestLocation.bind(this);
    this._onGeoSuccess = this._onGeoSuccess.bind(this);
    this._onGeoError = this._onGeoError.bind(this);
    this.state = {markers: [], region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121}};
  }

  componentWillMount() {
    if (this.props.navigator) {
      this._unsubscribe =
        this.props.navigator.addOnNavigatorEvent(this._onNavigatorEvent);
      this.props.navigator.toggleNavBar({ to: 'hidden', animated: true });
    }

    // Checkpermission. TODO: platform check. TODO: android api check.
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

  componentWillUnmount() {
    if (this.props.navigator) {
      this.props.navigator.toggleNavBar({ to: 'show', animated: true });
    }
    this._unsubscribe && this._unsubscribe();
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
    this.setState({markers: [{...position.coords}], region: {...position.coords, latitudeDelta: 0.09, longitudeDelta: 0.09}});
    console.log('get current position: ', position);
  }

  _onGeoError(err) {
    console.error('get position error', err);
  }

  _requestLocation() {
    navigator.geolocation.getCurrentPosition(this._onGeoSuccess, this._onGeoError, {
      timeout: 10000,
      enableHighAccuracy: true,
      useSignificantChanges: true
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
                description='This is my location'
                key={marker.latitude}
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
  mapNavProps: PropTypes.object
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

