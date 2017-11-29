import ProgramScreen from './containers/programContainer';
import ChatScreen from './containers/chatContainer';
import MapScreen from './containers/mapContainer';
import LoginContainer from './containers/loginContainer';
import SideMenuContainer from './containers/sideMenuContainer'; 
import OrderList from './containers/orderListContainer';
import { screens } from '../config/constants';

import { Navigation } from 'react-native-navigation';

// Register all apps' screens
export default function registerScreens(store, provider) {
    Navigation.registerComponent(
        screens.orderList, () => OrderList, store, provider);
    Navigation.registerComponent(
        screens.login, () => LoginContainer, store, provider);
    Navigation.registerComponent(
        screens.chat, () => ChatScreen, store, provider);
    Navigation.registerComponent(
        screens.program, () => ProgramScreen, store, provider);
    Navigation.registerComponent(
        screens.map, () => MapScreen, store, provider);
  Navigation.registerComponent(
            screens.sideMenu, () => SideMenuContainer, store, provider);
        
}
