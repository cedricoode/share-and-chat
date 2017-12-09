import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import MapView from 'react-native-maps';

class MapComponent extends Component { 
    constructor(props) {
        super(props);
        this._onNavigatorEvent = this._onNavigatorEvent.bind(this);
    }

    componentWillMount() {
        if (this.props.navigator) {
            this._unsubscribe =
                this.props.navigator.addOnNavigatorEvent(this._onNavigatorEvent);
        }
    }

    componentWillUnmount() {
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
            () =>{})(event || {id: 'back', type: 'NavBarButtonPress'});
    }

    render() {
        const { region } = this.props;
        console.log(region); 
        return (
          <View style ={styles.container}>
            <MapView
              style={styles.map}
              region={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}
            >
            </MapView>
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
      height: 400,
      width: 400,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
  });

export default MapComponent;

 