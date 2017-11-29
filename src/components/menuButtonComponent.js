import React from 'react';
import { Image, TouchableOpacity } from 'react-native'; 
import { Navigation } from 'react-native-navigation';

const MenuButton = () => 
<TouchableOpacity   onPress={() => Navigation.handleDeepLink({ link:'menu-btn'}) }>
    <Image
        source={require('../../static/icon/icon-menu.png')}
        style={{height: 18, width:18}} 
        /> 
</TouchableOpacity>;

export default MenuButton;