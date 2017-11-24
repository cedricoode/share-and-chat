import { Navigation } from 'react-native-navigation';

import MenuButton from './components/menuButtonComponent';
import SideMenu from './containers/sideMenuContainer';

import { components } from '../config/constants';

export default function registerComponents() {
    Navigation.registerComponent(components.menuButton, () => MenuButton);
    Navigation.registerComponent(components.sideMenu, () => SideMenu);
}