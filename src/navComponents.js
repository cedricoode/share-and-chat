import { Navigation } from 'react-native-navigation';

import MenuButton from './components/menuButtonComponent';
import SideMenu from './containers/sideMenuContainer';
import LogoutButton from './components/logoutButton';
import { components } from '../config/constants';

import store from '../store';

export default function registerComponents() {
    Navigation.registerComponent(components.menuButton, () => MenuButton);
    Navigation.registerComponent(components.sideMenu, () => SideMenu);
    Navigation.registerComponent(components.logoutButton, () => LogoutButton, store);
}