import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

import { StyleSheet } from 'react-native';

class ChatContainer extends Component {
    constructor(props) {
        super(props);
        this._onSend = this._onSend.bind(this);
    }

    state = {
        messages: [{
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native'
            },
          }],
    }

    _onSend(messages = []) {
        this.setState((prev) => ({
            messages: GiftedChat.append(prev.messages, messages)
        }));
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={this._onSend}
                user={{ _id: 1 }}
                renderAvatar={() => null}
            />);
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'lightblue',
        flex: 1
    }
});

export default ChatContainer;