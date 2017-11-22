import { Navigation } from 'react-native-navigation';

import { registerScreens } from './screens';

registerScreens();

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


Navigation.startTabBasedApp({
    tabs: [
        {
            label: 'chat',
            screen: 'tuding.ChatScreen', // this is a registered name for a screen
            icon: require('../static/icon/chat-noir.png'),
            selectedIcon: require('../static/icon/chat-bleu.png'), // iOS only
            title: 'ChatScreen',
            navigatorStyle
        },
        {
            label: 'map',
            screen: 'tuding.MapScreen',
            icon: require('../static/icon/map-noir.png'),
            selectedIcon: require('../static/icon/map-bleu.png'), // iOS only
            title: 'ProgramScreen'
        },
        {
            label: 'program',
            screen: 'tuding.ProgramScreen',
            icon: require('../static/icon/programe-noir.png'),
            selectedIcon: require('../static/icon/programe-bleu.png'), // iOS only
            title: 'ProgramScreen'
        },
    ]
});
