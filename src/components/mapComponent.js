import React, { Component } from 'react';
import { View, Text, StyleSheet, BackHandler } from 'react-native';
import get from 'lodash/get';
import PropTypes from 'prop-types';


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
        console.log('are you there??');
        if (event && event.id === 'willAppear') {
            BackHandler.addEventListener(
                'hardwareBackPress', this._onNavigatorEvent);
        } else if (event && event.id === 'willDisappear') {
            BackHandler.removeEventListener(
                'hardwareBackPress', this._onNavigatorEvent);
        }
        get(this.props, 'chatNavProps.eventHandler', () =>{})(event || {id: 'back', type: 'NavBarButtonPress'});
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>a very cute little map</Text>
        </View>);
    }
}

MapComponent.propTypes = {
    navigator: PropTypes.object,
    mapNavProps: PropTypes.object
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'powderblue',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default MapComponent;