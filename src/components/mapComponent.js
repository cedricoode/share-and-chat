import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  PermissionsAndroid,
  Image,
  TouchableHighlight,
  Platform,
  Dimensions,
  Alert
} from 'react-native';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import MapView from 'react-native-maps';
import firebase from 'react-native-firebase';
let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height; 
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const GEO_OPTIONS = {
  maximumAge:  60000,
  enableHighAccuracy: true,
  timeout: 20000
}; 
const timeout = 3000;
let animationTimeout;
class MapComponent extends Component {
  constructor(props) {
    super(props);
    this._onNavigatorEvent = this._onNavigatorEvent.bind(this);
    this._requestLocation = this._requestLocation.bind(this);
    this._onGeoSuccess = this._onGeoSuccess.bind(this);
    this._onGeoError = this._onGeoError.bind(this);
    this._getMarkers = this._getMarkers.bind(this); 
    this._focusMap = this._focusMap.bind(this); 
    this._displayAllMakers = this._displayAllMakers.bind(this); 
  //  this._onNewRemoteLocation = this._onNewRemoteLocation.bind(this);
    let locationList = props.locations;
    this.state = {locations: locationList, region: {
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
    /**locationQuery = locationQuery.startAt(
         (this.props.locations && this.props.locations[0]
            || {createdAt: new Date('1992-01-01')})
            .createdAt); **/ 
  //  locationQuery.on('child_added', this._onNewRemoteLocation);
    this.setState({...this.state, locationQuery});  
    this.props.fetchLocationList(locationQuery);
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
    this.watchId = navigator.geolocation.watchPosition(this._onGeoSuccess, this._onGeoError, GEO_OPTIONS);
  }

  componentWillUnmount() {
    if (this.props.navigator) {
      this.props.navigator.toggleNavBar({ to: 'show', animated: true });
    }
    this._unsubscribe && this._unsubscribe();
    navigator.geolocation.clearWatch(this.watchId); 
    // Clear firebase listener
   // this.state.locationQuery && this.state.locationQuery.off('child_added', this._onNewRemoteLocation);
   if(this.state.locationQuery)
     delete this.state.locationQuery;
    this.setState({...this.state});
    // clear animationTimeout
    if (animationTimeout) {
      clearTimeout(animationTimeout);
    }
  }
 
  componentDidMount() {  
    animationTimeout = setTimeout(() => {
      this._displayAllMakers(); 
    }, timeout);
  }
  _focusMap(markers, animated) { 
    this.map.fitToSuppliedMarkers(markers, animated);
  }
  _displayAllMakers(){
    let markers = [];
    markers = this._getMarkers(); 
    this._focusMap(markers, true); 
  }

/** 
  _onNewRemoteLocation(snapshot) {
    this.props.saveRemoteLocation(this.props.orderId, snapshot.val());
  }**/

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
    let role =  this.props.user.role;
    position.coords.role =  role; 
    let uid = this.props.user.refId;
    let newLocation = {
      ...position,
      uid: uid,
      username: this.props.user.username,
      role: role,
      id: String(new Date().getTime())
    };
    //add or udpate  location on firebase
    this.props.sendLocation(newLocation, this.state.locationQuery);  
     //update region 
    this.setState({ 
      region: {...position.coords, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA}}); 
    let currentMarker = [uid]
    this._focusMap(currentMarker, true);
  } 
  _onGeoError(err) {
    console.error('get position error', err);
    Alert.alert(
      'Error',
      'Get position error',
      [ 
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: true }
    )
  }

  _requestLocation() {
    navigator.geolocation.getCurrentPosition(this._onGeoSuccess, this._onGeoError, GEO_OPTIONS);  
  }
  _getMarkers(){
    let markers = [];
		for (let i = 0; i < this.props.locations.length; i++) { 
			markers.push(this.props.locations[i].uid);
    };
    return markers;
  }
  
  render() { 
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={this.state.region}
          ref={ref => { this.map = ref; }}
        >
          { 
             ( this.state.locations && this.state.locations.length && this.state.locations.length>0) && this.props.locations.map((location,index) => ( 
                <MapView.Marker
                  coordinate={ location.coords}
                  title={ location.username}
                  description='This is my location'
                  key={index}
                  identifier = {location.uid}
                  style={styles.mapIcon}
                  image={this.displayMarker(location.coords)}
                />
              )) 
          }
        </MapView>
        <TouchableHighlight
          underlayColor='rgba(0,0,0,0)'
          onPress={this._requestLocation}
          style={styles.currentPositionIcon}>
          <Image
            resizeMode='contain'
            style={styles.mapIcon}
            source={require('../../static/icon/currentlocation.png')} />
        </TouchableHighlight>
         <TouchableHighlight
          underlayColor='rgba(0,0,0,0)'
          onPress={this._displayAllMakers}
          style={styles.allPositionIcon}>
          <Image
            resizeMode='contain'
            style={styles.mapIcon}
            source={require('../../static/icon/location-map.png')} />
        </TouchableHighlight>
      </View>
    );
  }
  displayMarker(marker) {  
      let role =  marker.role;
      if(role){
        switch(role){
          case 'DRIVER':
          return require('../../static/icon/driver.png');
          break; 
          case 'GUIDE':
          return require('../../static/icon/guide.png');
          break; 
          case 'GROUP-LEADER':
          return require('../../static/icon/leader.png');
          break;
          default:
          return require('../../static/icon/driver.png');
          break; 
        } 
       } 
  } 
}

MapComponent.propTypes = {
  navigator: PropTypes.object,
  mapNavProps: PropTypes.object,
  orderId: PropTypes.string,
  locations: PropTypes.array,
  saveRemoteLocation: PropTypes.func,
  sendLocation: PropTypes.func,
  fetchLocationList: PropTypes.func,
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
  currentPositionIcon: {
    alignSelf: 'flex-end',
    marginRight:5
  },
  allPositionIcon: {
    marginTop: 20,
    marginRight:5,
    alignSelf: 'flex-end'
  },
  mapIcon: {
    width: 48,
    height: 48
  }
});

export default MapComponent;

