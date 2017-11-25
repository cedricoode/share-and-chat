import Config from 'react-native-config';

const colors = {
    primary: '#00a2ae',
    primaryDark: '#007ac1',
    primaryLight: '#67daff',
    secondary: '#ffc107',
    secondaryDark: '#c79100',
    secondaryLight: '#fff350',
    textOnPrimary: '#fafafa',
    textOnSecondary: '#fff350'
};
const endpoints = {
    login: `${Config.API_ROOT}/Token/PostAuth`,
    // firebaseToken: `${Config.API_ROOT}/Token/GetFirebaseToken`,
    refreshToken: `${Config.API_ROOT}/Token/PostAuth`,
    orderList: `${Config.API_ROOT}/Orders/List`
};
const development = {
    username: Config.TEST_USER,
    password: Config.TEST_PASSWORD,
    develop: true //'login'//login, loggedIn, other
};
const screens = {
    login: 'com.tuding.login',
    orderList: 'com.tuding.orderlist',
    order: 'com.tuding.order',
    chat: 'com.tuding.chat',
    map: 'com.tuding.map',
    program: 'com.tuding.program',
};
const components = {
    menuButton: 'com.tuding.components.menubutton',
    sideMenu: 'com.tuding.components.sidemenu',
    logoutButton: 'com.tuding.components.logoutbutton'
};


const initialState = {
    auth: {
        loggedIn: false,
        username: development.username,
        password: development.password
    },
    orders: {
        data: [
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
                "isActive": false
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
                "isActive": false
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
                "isActive": false
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
                "isActive": false
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
                "isActive": false
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
                "isActive": false
            }
        ],
        refreshing: false
    },
    messages: {
        'Order N˚ TD3061-31': [{
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native'
            },
          }]
    }
};

export { colors, endpoints, development, screens, components, initialState };