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
console.log(endpoints);
const development = {
    username: Config.TEST_USER,
    password: Config.TEST_PASSWORD,
    develop: true
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

export { colors, endpoints, development, screens, components };