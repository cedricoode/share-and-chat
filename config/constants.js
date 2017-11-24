import Config from 'react-native-config';

const Globals = {
    colors: {
        primary: '#00a2ae',
        primaryDark: '#007ac1',
        primaryLight: '#67daff',
        secondary: '#ffc107',
        secondaryDark: '#c79100',
        secondaryLight: '#fff350',
        textOnPrimary: '#fafafa',
        textOnSecondary: '#fff350'
    },
    endpoints: {
        login: `${Config.API_ROOT}/Token/PostAuth`,
        firebaseToken: `${Config.API_ROOT}/Token/GetFirebaseToken`,
        refreshToken: `${Config.API_ROOT}/Token/PostAuth`,
        orderList: `${Config.API_ROOT}/Orders/List`
    },
    development: {
        username: Config.TEST_USER,
        password: Config.TEST_PASSWORD,
        develop: 'other'
    }
};

export default Globals;