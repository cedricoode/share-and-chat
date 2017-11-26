import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { GiftedChat, Send } from 'react-native-gifted-chat';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import firebase from 'react-native-firebase';

import Bubble from './Bubble';

class ChatComponent extends Component {
    constructor(props) {
        super(props);
        this._onSend = this._onSend.bind(this);
        this._onNavigatorEvent = this._onNavigatorEvent.bind(this);
        if (this.props.navigator) {
            this.props.navigator.addOnNavigatorEvent(this._onNavigatorEvent);
        }
    }

    componentWillMount() {
        this.unSubscribeAuthChange = firebase.auth().onAuthStateChanged((fbUser) => {
            console.log('auth change listener: ', fbUser);
        });
        console.log('firebase token is: ', this.props.user.firebaseToken);
        firebase.auth().createUserWithEmailAndPassword('testuser@gmail.com', 'password')
        //     .then()
        // firebase.auth().signInWithCustomToken(this.props.user.firebaseToken)
            .then(user => {
                console.log('user is: ', user);
            })
            .catch(err => console.log('user sign in error: ', err));
    }

    componentWillUnmount() {
        this.unSubscribeAuthChange && this.unSubscribeAuthChange();
    }

    _onSend(messages) {
        this.props.sendMessage(messages);
    }

    /**
     * The navigator property is an injected dependency of this component,
     * we cannot garantee the existence of nav event handler.
     * To make the configuration clear, normally the relevant handler is injected
     * the same place where the navigator is defined, namely in src/App.js
     * @param {NavigatorEventType} event 
     */
    _onNavigatorEvent(event) {
        get(this.props, 'chatNavProps.eventHandler', () =>{})(event);
    }

    render() {
        return (
            <GiftedChat
                messages={this.props.messages}
                onSend={this._onSend}
                user={{ _id: 1, name:'Cedric' }}
                renderSend={(props) => {
                    return <Send {...props}>
                        <View style={{height: 44, justifyContent: 'center'}}>
                            <Image source={require('../../static/icon/send.png')}
                                resizeMode='contain'
                                style={{height: props.composerHeight - 8}}/>
                        </View>
                    </Send>;
                }}
                renderBubble={(props) => {
                    console.log('renderd');
                    return <Bubble {...props}/>;
                }}
                // renderAvatar={null}
                renderAvatarOnTop={true}
            />);
    }
}

ChatComponent.propTypes = {
    sendMessage: PropTypes.func.isRequired,
    messages: PropTypes.array,
    user: PropTypes.object.isRequired,
    navigator: PropTypes.object,
    chatNavProps: PropTypes.object
};

export default ChatComponent;