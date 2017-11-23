import { Navigation } from 'react-native-navigation';

import { registerScreens } from './screens';

import store from '../store';
import { Provider } from 'react-redux';

registerScreens(store, Provider);

const navigatorStyle = {
    statusBarColor: 'black',
    statusBarTextColorScheme: 'light',
    navigationBarColor: 'black',
    navBarBackgroundColor: '#0a0a0a',
    navBarTextColor: 'white',
    navBarButtonColor: 'white',
    // tabBarButtonColor: 'red',
    // tabBarSelectedButtonColor: 'red',
    tabBarBackgroundColor: 'white'
};

const LoginNavigatorStype = {
    navBarHidden: true,
    // orientation: 'portrait',
    drawUnderNavBar: true,
    navBarTranslucent: true,
    navBarTransparent: true,
    navBarNoBorder: true
};

export function goToOrderScreen() {
    Navigation.startTabBasedApp({
        tabs: [
            {
                label: 'chat',
                screen: 'tuding.ChatScreen', // this is a registered name for a screen
                icon: require('../static/icon/chat.png'),
                selectedIcon: require('../static/icon/chat.png'), // iOS only
                title: 'ChatScreen',
                navigatorStyle
            },
            {
                label: 'map',
                screen: 'tuding.MapScreen',
                icon: require('../static/icon/map.png'),
                selectedIcon: require('../static/icon/map.png'), // iOS only
                title: 'ProgramScreen'
            },
            {
                label: 'program',
                screen: 'tuding.ProgramScreen',
                icon: require('../static/icon/programe.png'),
                selectedIcon: require('../static/icon/programe.png'), // iOS only
                title: 'ProgramScreen'
            },
        ]
    });
}


function startLoginApp() {
    Navigation.startSingleScreenApp({
        screen: {
            screen: 'tuding.LoginScreen', // unique ID registered with Navigation.registerScreen
            // title: 'Welcome', // title of the screen as appears in the nav bar (optional)
            navigatorStyle: LoginNavigatorStype, // override the navigator style for the screen, see "Styling the navigator" below (optional)
            navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
        },
        
        passProps: {}, // simple serializable object that will pass as props to all top screens (optional)
        animationType: 'slide-down' // optional, add transition animation to root change: 'none', 'slide-down', 'fade'

    });
}

function startOrderListApp() {
    Navigation.startSingleScreenApp({
        screen: {
            screen: 'tuding.OrderList',
            title: 'OrderList',
            navigatorStyle,
            navigatorButtons: {},
        },
        drawer: { // optional, add this if you want a side menu drawer in your app
            left: { // optional, define if you want a drawer from the left
                screen: 'tuding.SideMenu', // unique ID registered with Navigation.registerScreen
                passProps: {}, // simple serializable object that will pass as props to all top screens (optional)
                disableOpenGesture: true // can the drawer be opened with a swipe instead of button (optional, Android only)
            },
            // right: { // optional, define if you want a drawer from the right
            //     screen: 'example.SecondSideMenu', // unique ID registered with Navigation.registerScreen
            //     passProps: {}, // simple serializable object that will pass as props to all top screens (optional)
            //   disableOpenGesture: false // can the drawer be opened with a swipe instead of button (optional, Android only)
            // },
            // style: { // ( iOS only )
            //     drawerShadow: true, // optional, add this if you want a side menu drawer shadow
            //     contentOverlayColor: 'rgba(0,0,0,0.25)', // optional, add this if you want a overlay color when drawer is open
            //     leftDrawerWidth: 50, // optional, add this if you want a define left drawer width (50=percent)
            //     rightDrawerWidth: 50 // optional, add this if you want a define right drawer width (50=percent)
            // },
            // type: 'MMDrawer', // optional, iOS only, types: 'TheSideBar', 'MMDrawer' default: 'MMDrawer'
            // animationType: 'door', //optional, iOS only, for MMDrawer: 'door', 'parallax', 'slide', 'slide-and-scale'
            // for TheSideBar: 'airbnb', 'facebook', 'luvocracy','wunder-list'
            disableOpenGesture: true // optional, can the drawer, both right and left, be opened with a swipe instead of button
        }
    });
}


export default class App {
    constructor() {
        store.subscribe(this.onStoreUpdate.bind(this));
        store.dispatch({type: 'APP_INITIALIZED'});
        // app initialized;
    }

    onStoreUpdate() {
        const { develop } = store.getState().auth;
        this.startApp(develop);
        // if (loggedIn) {
        //     this.startApp('loggedIn');
        // } else {
        //     this.startApp('login');
        // }
    }

    startApp(root) {
        switch (root) {
            case 'login':
                startLoginApp();
                break;
            case 'loggedIn':
                startOrderListApp();
                break;
            default:
                goToOrderScreen();
        }
    } 
}