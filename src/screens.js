import ProgramScreen from './containers/programContainer';
import ChatScreen from './containers/chatContainer';
import MapScreen from './containers/mapContainer';
import LoginContainer from './containers/loginContainer';
import SideMenu from './containers/sideMenuContainer';

import { Navigation } from 'react-native-navigation';

// Register all apps' screens
export function registerScreens(store, provider) {
    Navigation.registerComponent(
        'tuding.ChatScreen', () => ChatScreen, store, provider);
    Navigation.registerComponent(
        'tuding.ProgramScreen', () => ProgramScreen, store, provider);
    Navigation.registerComponent(
        'tuding.MapScreen', () => MapScreen, store, provider);
    Navigation.registerComponent(
        'tuding.LoginScreen', () => LoginContainer, store, provider);
    Navigation.registerComponent(
        'tuding.SideMenu', () => SideMenu, store, provider);
}
