/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  StatusBar
} from 'react-native';
import { Provider } from 'react-redux';
// Application import
import store from './store';
import LoginContainer from './src/containers/loginContainer';
import Globals from './config/constants';


export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={store} >
        <View style={styles.container}>
          <StatusBar backgroundColor={Globals.colors.primary}/>
          <LoginContainer/>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
