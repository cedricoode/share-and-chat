import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import registerScreens from './navScreens';
import registerComponents from './navComponents';
import {
    screens, colors, components,
    development, initialState } from '../config/constants';
import store, { persistor } from '../store';

registerScreens(store, Provider);
registerComponents(store, Provider);

// **************************
// *     Login App          *
// **************************
const LoginNavigatorStype = {
    navBarHidden: true,
    // orientation: 'portrait',
    drawUnderNavBar: true,
    navBarTranslucent: true,
    navBarTransparent: true,
    navBarNoBorder: true
};

function startLoginApp() {
    Navigation.startSingleScreenApp({
        screen: {
            screen: screens.login, // unique ID registered with Navigation.registerScreen
            // title: 'Welcome', // title of the screen as appears in the nav bar (optional)
            navigatorStyle: LoginNavigatorStype, // override the navigator style for the screen, see "Styling the navigator" below (optional)
            navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
        },
        
        passProps: {}, // simple serializable object that will pass as props to all top screens (optional)
        animationType: 'slide-down' // optional, add transition animation to root change: 'none', 'slide-down', 'fade'

    });
}

// **************************
// *     Order App          *
// **************************
const OrderNavigatorStyle = {
    statusBarColor: colors.primary,
    statusBarTextColorScheme: 'light',
    navigationBarColor: colors.primary,
    navBarBackgroundColor: colors.primary,
    navBarTextColor: colors.textOnPrimary,
    navBarButtonColor: colors.textOnPrimary,
    // tabBarButtonColor: 'red',
    // tabBarSelectedButtonColor: 'red',
    tabBarBackgroundColor: 'white'
};
function startOrderApp() {
    Navigation.startTabBasedApp({
        tabs: [
            {
                label: 'chat',
                screen: screens.chat, // this is a registered name for a screen
                icon: require('../static/icon/chat.png'),
                selectedIcon: require('../static/icon/chat.png'), // iOS only
                title: store.getState().selectedId,
                navigatorStyle: OrderNavigatorStyle
            },
            {
                label: 'map',
                screen: screens.map,
                icon: require('../static/icon/map.png'),
                selectedIcon: require('../static/icon/map.png'), // iOS only
                title: 'ProgramScreen'
            },
            {
                label: 'program',
                screen: screens.program,
                icon: require('../static/icon/programe.png'),
                selectedIcon: require('../static/icon/programe.png'), // iOS only
                title: 'ProgramScreen'
            },
        ]
    });
}

// **************************
// *     OrderList App      *
// **************************
const OrderListNavigatorStype = {
    statusBarColor: colors.primary,
    statusBarTextColorScheme: 'light',
    navigationBarColor: colors.primary,
    navBarBackgroundColor: colors.primary,
    navBarTextColor: colors.textOnPrimary,
    navBarButtonColor: colors.textOnPrimary,
    // tabBarButtonColor: 'red',
    // tabBarSelectedButtonColor: 'red',
    tabBarBackgroundColor: 'white'
};

function startOrderListApp() {
    Navigation.startSingleScreenApp({
        screen: {
            screen: screens.orderList,
            title: 'OrderList',
            navigatorStyle: OrderListNavigatorStype,
            navigatorButtons: {
                leftButtons: [
                    {
                        id: 'menu-btn',
                        component: components.menuButton
                    }
                ],
                rightButtons: [
                    {
                        id: 'logout-btn',
                        title: 'logout'
                    }
                ]
            },
        },
        passProps: {
            orderListNavProps: {
                eventHandler: (event)=>{
                    if (event.type === 'NavBarButtonPress') {
                        if (event.id === 'logout-btn') {
                            store.dispatch({type: 'RESET', state: initialState});
                            persistor.purge();
                        }
                    }
                    }
                }
            },
        drawer: { // optional, add this if you want a side menu drawer in your app
            left: { // optional, define if you want a drawer from the left
                screen: components.sideMenu, // unique ID registered with Navigation.registerScreen
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
        // Dispatch a init action to get onStoreUpdate run.
        store.dispatch({type: 'APP_INITIALIZED'});
        store.dispatch({type: 'DEVELOP', content: development.develop});
    }

    onStoreUpdate() {
        // const { loggedIn } = store.getState().auth;
        const loggedIn = store.getState().develop;

        if (this.app != loggedIn) {
            this.app = loggedIn;
            this.startApp(loggedIn);
        }
    }

    startApp(root) {
        switch (root) {
            case false:
                startLoginApp();
                break;
            case true:
                startOrderListApp();
                break;
            default:
                startOrderApp();
        }
    } 
}