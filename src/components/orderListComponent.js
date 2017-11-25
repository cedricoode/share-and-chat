import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Text, Image, RefreshControl } from 'react-native';
import { Card } from 'react-native-elements';
import PropTypes from 'prop-types';
import get from 'lodash/get';

const ListItemComponent =
    ({ id, startPlace, endPlace, startDateTime, endDateTime, isActive }) => (
        <Card title={id}
            titleStyle={{
                fontWeight: isActive ? 'bold' : 'normal',
                textAlign: 'left'
            }}>
            <View style={{ flexDirection: 'row' }}>
                <View>
                    <Image style={{ flex: 1, height: 16, width: 16 }} resizeMode='contain' source={require('../../static/icon/map.png')} />
                    <Image style={{ flex: 1, height: 16, width: 16 }} resizeMode='contain' source={require('../../static/icon/map.png')} />
                </View>
                <View style={{ marginLeft: 16 }}>
                    <View>
                        <Text style={{ fontSize: 16 }}>{startDateTime}</Text>
                        <Text>{startPlace}</Text>
                    </View>
                    <View style={{ marginTop: 8 }}>
                        <Text style={{ fontSize: 16 }}>{endDateTime}</Text>
                        <Text>{endPlace}</Text>
                    </View>
                </View>
            </View>
        </Card>
    );

ListItemComponent.propTypes = {
    id: PropTypes.string.isRequired,
    startPlace: PropTypes.string.isRequired,
    endPlace: PropTypes.string.isRequired,
    startDateTime: PropTypes.string.isRequired,
    endDateTime: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired
};

class OrderListComponent extends Component {
    constructor(props) {
        super(props);
        this._onRefresh = this._onRefresh.bind(this);
        this._onNavigatorEvent = this._onNavigatorEvent.bind(this);

        if (this.props.navigator) {
            this.props.navigator.addOnNavigatorEvent(this._onNavigatorEvent);
        }
    }
    componentDidMount() {
        this._onRefresh();
    }
    _onRefresh() {
        this.props.onRefresh();
    }
    /**
     * The navigator property is an injected dependency of this component,
     * we cannot garantee the existence of nav event handler.
     * To make the configuration clear, normally the relevant handler is injected
     * the same place where the navigator is defined, namely in src/App.js
     * @param {NavigatorEventType} event 
     */
    _onNavigatorEvent(event) {
        get(this.props, 'orderListNavProps.eventHandler', () =>{})(event);
    }
    render() {
        const { orders, refreshing } = this.props;
        return <View style={styles.container}>
            <FlatList
                refreshControl={<RefreshControl
                    onRefresh={this._onRefresh}
                    refreshing={refreshing||false} />}
                style={{ flex: 1 }}
                data={orders.map(item => ({ ...item, id: `Order N˚ ${item.id}` }))}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <ListItemComponent {...item} />}
            />
        </View>;
    }
}

OrderListComponent.propTypes = {
    orders: PropTypes.array,
    onRefresh: PropTypes.func,
    refreshing: PropTypes.bool,
    navigator: PropTypes.object,
    orderListNavProps: PropTypes.object,
};

const styles = StyleSheet.create({
    container: {
        flex: 1
        // backgroundColor: 'green'
    }
});

export default OrderListComponent;