import Config from 'react-native-config';
import ObjectMapper from 'object-mapper';

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
    orderList: `${Config.API_ROOT}/Orders/List`,
    orderProgram: `${Config.API_ROOT_M}/orderprogram/programData`
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
    sideMenu: 'com.tuding.sidemenu'
};
const components = {
    menuButton: 'com.tuding.components.menubutton', 
    logoutButton: 'com.tuding.components.logoutbutton'
}; 
const _ENV_FIREBASE_CONFIG_MAPPING = {
    FB_API_KEY: 'apiKey',
    FB_AUTH_DOMAIN: 'authDomain',
    FB_DATABASE_URL: 'databaseURL', 
    FB_PROJECT_ID: 'projectId',
    FB_STORAGE_BUCKET: 'storageBucket',
    FB_MESSAGING_SENDER_ID: 'messagingSenderId',
};
const firebaseConfig = ObjectMapper(Config, _ENV_FIREBASE_CONFIG_MAPPING);

const initialState = {
    auth: {
        loggedIn: false,
        username: development.username,
        password: development.password
    },
    orders: {
        data: [],
        refreshing: false
    },
    messages: {}
};

const misc = {
    orderPrefix: 'Order N˚'
};
export {
    colors, endpoints, development, screens,
    components, initialState, firebaseConfig, misc
};