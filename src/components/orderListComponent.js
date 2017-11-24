import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';

const TestData = {
    "data": [
        {
            "id": "TD3061-31",
            "atomyOrderQuotationId": 31,
            "atomyOrderId": 24,
            "orderId": 3061,
            "orderQuotationId": 8,
            "startPlace": "18 Rue de Rivoli, 75004 Paris, France",
            "startDateTime": "2018-01-30T08:01:09",
            "endPlace": "11 Rue de Reims, 75013 Paris, France",
            "endDateTime": "2018-02-01T08:02:43",
            "isActive": true
        },
        {
            "id": "TD3068-36",
            "atomyOrderQuotationId": 36,
            "atomyOrderId": 26,
            "orderId": 3068,
            "orderQuotationId": 12,
            "startPlace": "Rome, Metropolitan City of Rome, Italy",
            "startDateTime": "2017-12-14T07:00:00",
            "endPlace": "Paris, France",
            "endDateTime": "2017-12-16T07:12:55",
            "isActive": true
        },
        {
            "id": "TD3072-38",
            "atomyOrderQuotationId": 38,
            "atomyOrderId": 20,
            "orderId": 3072,
            "orderQuotationId": 16,
            "startPlace": "Paris, France",
            "startDateTime": "2017-11-30T10:28:55",
            "endPlace": "58 Avenue Foch, 75116 Paris, France",
            "endDateTime": "2017-11-30T20:11:54",
            "isActive": true
        },
        {
            "id": "TD3066-40",
            "atomyOrderQuotationId": 40,
            "atomyOrderId": 19,
            "orderId": 3066,
            "orderQuotationId": 14,
            "startPlace": "11 Rue de Reims, 75013 Paris, France",
            "startDateTime": "2017-11-29T09:11:44",
            "endPlace": "58 Avenue Foch, 75116 Paris, France",
            "endDateTime": "2017-11-29T09:11:41",
            "isActive": true
        },
        {
            "id": "TD3067-39",
            "atomyOrderQuotationId": 39,
            "atomyOrderId": 15,
            "orderId": 3067,
            "orderQuotationId": 15,
            "startPlace": "Rome, Metropolitan City of Rome, Italy",
            "startDateTime": "2017-11-22T12:11:00",
            "endPlace": "Paris, France",
            "endDateTime": "2017-11-24T12:11:00",
            "isActive": true
        },
        {
            "id": "TD3128-41",
            "atomyOrderQuotationId": 41,
            "atomyOrderId": 27,
            "orderId": 3128,
            "orderQuotationId": 17,
            "startPlace": "58 Avenue Foch, 75116 Paris, France",
            "startDateTime": "2017-11-22T08:34:56",
            "endPlace": "11 Rue de Rivoli, 75004 Paris, France",
            "endDateTime": "2017-11-22T19:34:56",
            "isActive": true
        },
        {
            "id": "TD3128-43",
            "atomyOrderQuotationId": 43,
            "atomyOrderId": 28,
            "orderId": 3128,
            "orderQuotationId": 17,
            "startPlace": "58 Avenue Foch, 75116 Paris, France",
            "startDateTime": "2017-11-22T08:34:56",
            "endPlace": "11 Rue de Rivoli, 75004 Paris, France",
            "endDateTime": "2017-11-22T19:34:56",
            "isActive": true
        }
    ],
    "status": "OK",
    "message": null
};

const OrderListComponent = () => (
    <View style={styles.container}>
        <FlatList
            style={{flex: 1}}
            extraData={this.state}
            data={TestData.data}
            keyExtractor={(item) => item.id}
            renderItem={(item) => <View style={{height: 54}}><Text id={item.id}>{item.id}</Text></View>}
        />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1
        // backgroundColor: 'green'
    }
});

export default OrderListComponent;