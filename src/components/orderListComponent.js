import React, { Component } from 'react';
import {
    View, FlatList, StyleSheet, TouchableOpacity,
    Text, Image, RefreshControl } from 'react-native';
import { Card } from 'react-native-elements';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import { misc } from '../../config/constants';

const ListItemComponent =
    ({ id, startPlace, endPlace, startDateTime,
        endDateTime, isActive, handleClick, orderPrefix }) => (
        <TouchableOpacity onPress={()=>handleClick(id)}>
            <Card title={`${orderPrefix} ${id}`}
                titleStyle={{
                    fontWeight: isActive ? 'bold' : 'normal',
                    textAlign: 'left'
                }}>
                
                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <Image
                                style={listItemStyles.listItemImage}
                                resizeMode='contain'
                                source={require('../../static/icon/map.png')}/>
                            <Image
                                style={listItemStyles.listItemImage}
                                resizeMode='contain'
                                source={require('../../static/icon/map.png')}/>
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
        </TouchableOpacity>
);

const listItemStyles = StyleSheet.create({
    listItemImage: {flex: 1, height: 16, width: 16}
});


ListItemComponent.propTypes = {
    id: PropTypes.string.isRequired,
    startPlace: PropTypes.string.isRequired,
    endPlace: PropTypes.string.isRequired,
    startDateTime: PropTypes.string.isRequired,
    endDateTime: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    handleClick: PropTypes.func.isRequired,
    orderPrefix: PropTypes.string
};

class OrderListComponent extends Component {
    constructor(props) {
        super(props);
        this._onRefresh = this._onRefresh.bind(this);
        this._onNavigatorEvent = this._onNavigatorEvent.bind(this);
        this._handleItemClick = this._handleItemClick.bind(this);

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
        get(this.props, 'orderListNavProps.eventHandler',
            () =>console.log('no event handler'))(event);
    }
    _handleItemClick(id) {
        this.props.onItemClick(id);
    }
    render() {
        const { orders, refreshing } = this.props;
        return <View style={styles.container}>
            <FlatList
                refreshControl={<RefreshControl
                    onRefresh={this._onRefresh}
                    refreshing={refreshing||false} />}
                style={{ flex: 1 }}
                data={orders.map(item =>
                    ({...item, orderPrefix: misc.orderPrefix}))}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <ListItemComponent {...item}
                    handleClick={this._handleItemClick} />}
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
    onItemClick: PropTypes.func
};

const styles = StyleSheet.create({
    container: {
        flex: 1
        // backgroundColor: 'green'
    }
});

export default OrderListComponent;