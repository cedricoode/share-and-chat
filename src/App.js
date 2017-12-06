import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import firebase from 'react-native-firebase';
import get from 'lodash/get';
import { Platform } from 'react-native';

import registerScreens from './navScreens';
import registerComponents from './navComponents';
import {
    screens, colors,
    components, misc, initialState } from '../config/constants';
import { persistor, store } from '../store';
import {
    actionCreatorFactory,
    firebaseLogin,
    firebaseLogout } from '../store/actions';
 
// **************************
// * React Native Navigation*
// **************************
registerScreens(store, Provider);
registerComponents(store, Provider);

// **************************
// *     Firebase          *
// **************************
firebase.auth().onIdTokenChanged(async (user) => {
    if (user) { // if user is not null, this is mightbe triggered by token refreshed.
        try {
            console.log('onidtokenchanged, user signed in');
            const firebaseToken = await user.getIdToken();
            store.dispatch(firebaseLogin(firebaseToken));
        } catch(err) {
            console.error('refresh firebase Token error');
        }
    } else {
        store.dispatch(firebaseLogout());
    }
});

function logout() {
    firebase.auth().signOut();
    store.dispatch({type: 'RESET', state: {
        ...initialState,
        appInitialized: true,
        _persist: store.getState()._persist
    }});
    persistor.purge();
}

const navEventHandler = (event,_navigator)=>{
    if (event.type === 'NavBarButtonPress' || event.type == 'DeepLink') {
        if (event.id === 'logout-btn') {
            logout();
        } else if (event.id === 'back' || event.id === 'backPress') {
            store.dispatch(actionCreatorFactory.unselectOrderIdCreator());
        }else if ( event.link == 'menu-btn') {
            _navigator.toggleDrawer({
                side: 'left', // the side of the drawer since you can have two, 'left' / 'right'
                animated: true, // does the toggle have transition animation or does it happen immediately (optional)
                to: 'open' // optional, 'open' = open the drawer, 'closed' = close it, missing = the opposite of current state
              });
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
        animationType: 'fade' // optional, add transition animation to root change: 'none', 'slide-down', 'fade'

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
    firebase.auth().signInWithCustomToken(
        get(store.getState(), 'auth.user.firebaseToken', ''))
        .then(() => console.log('firebase loggedIn'))
        .catch(err => console.error('firebase login error, ', err));
    Navigation.startTabBasedApp({
        tabs: [
            {
                label: 'chat',
                screen: screens.chat, // this is a registered name for a screen
                icon: require('../static/icon/chat.png'),
                selectedIcon: require('../static/icon/chat.png'), // iOS only
                title: `${misc.orderPrefix} ${store.getState().selectedId.orderId}`,
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
                            id: 'back'
                        }
                    ]
                },
                overrideBackPress: true
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
                            id: 'back'
                        }
                    ]
                },
                overrideBackPress: true                
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
                            id: 'back'
                        }
                    ]
                },
                overrideBackPress: true                
            },
        ],
        tabsStyle: OrderTabBarStyle,
        passProps: {
            chatNavProps: {
                eventHandler: navEventHandler
            },
            mapNavProps: {
                eventHandler: navEventHandler
            },
            programNavProps: {
                eventHandler: navEventHandler
            }
        },
        animationType: 'fade'
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
    tabBarBackgroundColor: 'white',
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
                        id: Platform.OS === 'ios' ? 'menu-btn' : 'sideMenu', 
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
        animationType: 'fade',
        drawer: { // optional, add this if you want a side menu drawer in your app
            left: { // optional, define if you want a drawer from the left
                screen: screens.sideMenu, // unique ID registered with Navigation.registerScreen
                passProps: {logout}, // simple serializable object that will pass as props to all top screens (optional)
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
        this._unsubscribeStore = store.subscribe(this.handleStoreChange);
        this.handlePersistorChange();
    }

    handlePersistorChange = () => {
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            this.bootstrapped = true;
            store.dispatch({type: 'APP_INITIALIZED'});
            this._unsubscribePersistor && this._unsubscribePersistor();
        }
    }

    handleStoreChange = () => {
        // only when app is rehydrated to dispatch an APP_INITIALIXED event
        const { auth, selectedId } = store.getState();
        if (this.bootstrapped) {
            const { loggedIn } = auth;
            const app = loggedIn ? (selectedId.orderId || 'orderList') : 'login';
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