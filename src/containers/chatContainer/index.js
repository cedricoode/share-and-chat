import React from 'react';

import { View, StyleSheet, Text } from 'react-native';

const ChatContainer = () => (
    <View style={styles.container}>
            <Text>this is a message nice  dfsdf</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'lightblue',
        flex: 1
    }
});

export default ChatContainer;