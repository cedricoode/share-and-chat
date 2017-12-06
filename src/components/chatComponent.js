import React, { Component } from 'react';
import { Image, View, ActivityIndicator } from 'react-native';
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
        this._onNewRemoteMsg = this._onNewRemoteMsg.bind(this);
    }

    componentWillMount() {
        if (this.props.navigator) {
            this._unsubscribe =
                this.props.navigator.addOnNavigatorEvent(this._onNavigatorEvent);
        }
    }

    componentWillUnmount() {
        this._unsubscribe && this._unsubscribe();
        this.state.messageQuery &&
            this.state.messageQuery.off('child_added', this._onNewRemoteMsg);
        delete this.state.messageQuery;
        this.setState({...this.state});
    }

    shouldComponentUpdate(nextProps) {
        return !!nextProps.orderId;
    }

    componentDidMount() {
        const { orderId } = this.props;
        const messageRef = firebase.database().ref(`messages/${orderId}`);
        let messageQuery = messageRef.orderByChild('createdAt');
        messageQuery = messageQuery.startAt(
            (this.props.messages && this.props.messages[0]
                || {createdAt: new Date('1992-01-01')})
                .createdAt);
        messageQuery.on('child_added', this._onNewRemoteMsg);
        this.setState({...this.state, messageQuery});
    }

    _onNewRemoteMsg(snapshot) {
        this.props.saveRemoteMessage(this.props.orderId, snapshot.val());
    }

    _onSend(messages) {
        this.props.sendMessage(messages, this.state.messageQuery);
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
        const { username, refId} = this.props.user || {};
        return (
            <GiftedChat
                messages={this.props.messages}
                onSend={this._onSend}
                user={{ _id: refId, name: username }}
                renderLoading={() => <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator animating={true} />
                    </View>}
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
    chatNavProps: PropTypes.object,
    orderId: PropTypes.string.isRequired,
    saveRemoteMessage: PropTypes.func.isRequired
};

export default ChatComponent;