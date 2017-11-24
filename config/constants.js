import Config from 'react-native-config';

const Globals = {
    colors: {
        primary: '#03a9f4',
        primaryDark: '#007ac1',
        primaryLight: '#67daff',
        secondary: '#ffc107',
        secondaryDark: '#c79100',
        secondaryLight: '#fff350',
        textOnPrimary: '#fff350',
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
        password: Config.TEST_PASSWORD
    }
};

export default Globals;