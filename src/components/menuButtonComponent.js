import React from 'react';
import { Image, TouchableOpacity } from 'react-native';


const MenuButton = () =>
<TouchableOpacity>
    <Image
        source={require('../../static/icon/icon-menu.png')}
        style={{height: 18, width:18}}/>
</TouchableOpacity>;

export default MenuButton;