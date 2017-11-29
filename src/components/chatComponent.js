import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { GiftedChat, Send } from 'react-native-gifted-chat';
import PropTypes from 'prop-types';
import get from 'lodash/get';

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
        const { userName, refId} = this.props.user;
        return (
            <GiftedChat
                messages={this.props.messages}
                onSend={this._onSend}
                user={{ _id: refId, name: userName }}
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
    chatNavProps: PropTypes.object,
    orderId: PropTypes.string.isRequired
};

export default ChatComponent;