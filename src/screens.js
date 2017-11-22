import ProgramScreen from './containers/programContainer';
import ChatScreen from './containers/chatContainer';
import MapScreen from './containers/mapContainer';
import { Navigation } from 'react-native-navigation';

// Register all apps' screens
export function registerScreens() {
    Navigation.registerComponent('tuding.ChatScreen', () => ChatScreen);
    Navigation.registerComponent('tuding.ProgramScreen', () => ProgramScreen);
    Navigation.registerComponent('tuding.MapScreen', () => MapScreen);
}
