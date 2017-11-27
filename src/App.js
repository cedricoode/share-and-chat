import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import firebase from 'react-native-firebase';
import get from 'lodash/get';

import registerScreens from './navScreens';
import registerComponents from './navComponents';
import {
    screens, colors,
    components, misc, initialState } from '../config/constants';
import { persistor, store } from '../store';

// **************************
// * React Native Navigation*
// **************************
registerScreens(store, Provider);
registerComponents(store, Provider);

// **************************
// *     Firebase          *
// **************************
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch({ type: 'FIREBASE/LOGIN' });
    } else {
        store.dispatch({ type: 'FIREBASE/LOGOUT' });
    }
});

const navEventHandler = (event)=>{
    if (event.type === 'NavBarButtonPress') {
        if (event.id === 'logout-btn') {
            firebase.auth().signOut();
            store.dispatch({type: 'RESET', state: {
                ...initialState,
                appInitialized: true,
                _persist: store.getState()._persist
            }});

            persistor.purge();
        } else if (event.id === 'back-btn') {
            store.dispatch({type: 'SELECTORDER', content: null});
        }
    }
};

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
    navigationBarColor: '#f4f4f4',
    navBarBackgroundColor: '#f4f4f4',
    navBarTextColor: 'black',
    navBarButtonColor: 'black',
    tabBarButtonColor: 'black',
    tabBarSelectedButtonColor: colors.primary,
    tabBarBackgroundColor: 'white'
};

const OrderTabBarStyle = {
    tabBarHidden: false, // make the tab bar hidden
    tabBarButtonColor: 'black', // change the color of the tab icons and text (also unselected)
    tabBarSelectedButtonColor: colors.primary, // change the color of the selected tab icon and text (only selected)
    // tabBarBackgroundColor: '#551A8B' // change the background color of the tab bar
    // tabBarTranslucent: false // change the translucent of the tab bar to false
    // tabBarTextFontFamily: 'Avenir-Medium' //change the tab font family
    // tabBarLabelColor: '#ffb700', // iOS only. change the color of tab text
    // tabBarSelectedLabelColor: 'red', // iOS only. change the color of the selected tab text
    // forceTitlesDisplay: true // Android only. If true - Show all bottom tab labels. If false - only the selected tab's label is visible.
    // tabBarHideShadow: true // iOS only. Remove default tab bar top shadow (hairline)
};

function startOrderApp() {
    Navigation.startTabBasedApp({
        tabs: [
            {
                label: 'chat',
                screen: screens.chat, // this is a registered name for a screen
                icon: require('../static/icon/chat.png'),
                selectedIcon: require('../static/icon/chat.png'), // iOS only
                title: `${misc.orderPrefix} ${store.getState().selectedId}`,
                navigatorStyle: OrderNavigatorStyle,
                navigatorButtons: {
                    rightButtons: [
                        {
                            title: 'logout',
                            id: 'logout-btn'
                        }
                    ],
                    leftButtons: [
                        {
                            title: 'back',
                            id: 'back-btn'
                        }
                    ]
                }
            },
            {
                label: 'map',
                screen: screens.map,
                icon: require('../static/icon/map.png'),
                selectedIcon: require('../static/icon/map.png'), // iOS only
                title: 'ProgramScreen',
                navigatorStyle: OrderNavigatorStyle,
                navigatorButtons: {
                    rightButtons: [
                        {
                            title: 'logout',
                            id: 'logout-btn'
                        }
                    ],
                    leftButtons: [
                        {
                            title: 'back',
                            id: 'back-btn'
                        }
                    ]
                }
            },
            {
                label: 'program',
                screen: screens.program,
                icon: require('../static/icon/programe.png'),
                selectedIcon: require('../static/icon/programe.png'), // iOS only
                title: 'ProgramScreen',
                navigatorStyle: OrderNavigatorStyle,
                navigatorButtons: {
                    rightButtons: [
                        {
                            title: 'logout',
                            id: 'logout-btn'
                        }
                    ],
                    leftButtons: [
                        {
                            title: 'back',
                            id: 'back-btn'
                        }
                    ]
                }               
            },
        ],
        tabsStyle: OrderTabBarStyle,
        passProps: {
            chatNavProps: {
                eventHandler: navEventHandler
            }
        },
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
                eventHandler: navEventHandler
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
        // State of syncing disk data.
        this.bootstrapped = false;
        this.appInitialized = false;
        this._unsubscribePersistor =
            persistor.subscribe(this.handlePersistorChange);
        this.handlePersistorChange();

        this._unsubscribeStore = store.subscribe(this.handleStoreChange);
    }

    handlePersistorChange = () => {
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            this.bootstrapped = true;
            // Firebase login.
            const firebaseToken =
                get(store.getState(), 'auth.user.firebaseToken', null);
            if (firebaseToken) {
                firebase.auth().signInWithCustomToken(firebaseToken)
                    .catch(err => console.error(err));
            }
            store.dispatch({type: 'APP_INITIALIZED'});
            this._unsubscribePersistor && this._unsubscribePersistor();
        }
    }

    handleStoreChange = () => {
        // only when app is rehydrated to dispatch an APP_INITIALIXED event
        const { firebaseAuth, selectedId } = store.getState();
        if (this.bootstrapped) {
            const { isLoggedIn } = firebaseAuth;
            const app = isLoggedIn ? (selectedId || 'orderList') : 'login';
            if (this.app != app) {
                this.app = app;
                this.startApp(app);
            }
        }
    }

    startApp(app) {
        if (app === 'login') {
            startLoginApp();
        } else if (app === 'orderList') {
            startOrderListApp();
        } else {
            startOrderApp();
        }
    } 
}