import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Text, Image, RefreshControl } from 'react-native';
import { Card } from 'react-native-elements';
import PropTypes from 'prop-types';

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
    constructor() {
        super();
        this._onRefresh = this._onRefresh.bind(this);
    }
    componentDidMount() {
        this._onRefresh();
    }
    _onRefresh() {
        this.props.onRefresh();
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
    refreshing: PropTypes.bool
};

const styles = StyleSheet.create({
    container: {
        flex: 1
        // backgroundColor: 'green'
    }
});

export default OrderListComponent;