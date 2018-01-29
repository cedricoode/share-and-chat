import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { colors } from '../../config/constants';
import { Linking } from 'react-native';
import { store } from '../../store';

import {
  View,
  Alert,
  ScrollView,
  Text,
  Image,
  Button,
  Dimensions,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
export const menuItems = [
  {
    thumb: require('../../static/icon/sign-out.png'),
    index: 1,
    label: 'Sign out',
  },
  {
    thumb: require('../../static/icon/chang-password.png'),
    index: 2,
    label: 'Change password'
  },
  {
    thumb: require('../../static/icon/contact.png'),
    index: 3,
    label: 'Contact'
  }
];
export const contactList = [
  {
    index: 1,
    label: '+33 967 23 39 59',
  },
  {
    index: 2,
    label: '+33 7 69 69 02 20'
  },
  {
    index: 3,
    label: 'contact@tuding.fr'
  }
];
class SideMenuComponent extends Component {
  constructor(props) {
    debugger
    super(props); 
  }
  _onMenuItemClick(index) {
    if (index == 1)
      Linking.openURL('https://home.tudingbus.com/');
    else if (index === 0) {
      this.props.logout();
    }
  }
  _onContactItemClick(index) {
    if (index == 0) {
      Linking.openURL('tel:33967233959');
    } else if (index == 1) {
      Linking.openURL('tel:33769690220');
    } else {
      Linking.openURL('mailto:mailto@deniseleeyohn.com');
    }
  }
  render() {
    return (
      <View style={styles.drawer}   >
        <View style={styles.header} key={0}>
          <View style={styles.headerContent} key={0}>
            <Image source={require('../../static/icon/driver-blanc.png')} style={styles.headerIcon} />
            <View style={styles.headerInfo} key={1}>
              <Text style={styles.headerEmail} key={1} > 
                {store.getState().auth.username}
                 </Text>
            </View>
          </View>
        </View>
        <View style={styles.content} key={1}>
          <View  >
            {menuItems.map((item, idx) => (
              <TouchableOpacity onPress={() => this._onMenuItemClick(idx)}
                key={idx}
                style={styles.listItem}
              >
                <Image source={item.thumb} style={styles.listItemImage} />
                <Text style={styles.listItemTitle}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.contactList} >
          <View>
            {contactList.map((item, idx) => (
              <TouchableOpacity onPress={() => this._onContactItemClick(idx)}
                key={idx}
                style={styles.contactItem}
              >
                <Text style={styles.contactItemTitle}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    );
  }
}

SideMenuComponent.propTypes = {
  logout: PropTypes.func.isRequired,
  username:PropTypes.string.isRequired 
 };

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
    backgroundColor: colors.primary
  },
  header: {
    height: 100,
    padding: 16,
    backgroundColor: colors.primary
  },
  content: {
    padding: 16,
    backgroundColor: colors.primary
  },
  headerInfo: {
    height: 45,
    width: 250,
    marginTop: 20,
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
  },
  headerContent: {
    width: 30,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  headerIcon: {
    marginTop: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20
  },
  headerEmail: {
    color: '#fff',
    fontSize: 16,
    marginTop: 20,
    marginLeft: 5,
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: 40,
    marginBottom: 10,
  },

  listItemTitle: {
    fontSize: 18,
    flexShrink: 1,
    color: '#fff'
  },
  listItemImage: {
    width: 20,
    height: 25,
    marginRight: 30,
  },
  contactList: {
    height: 90,
    width: 200,
    marginLeft: 60,
    borderLeftColor: '#fff',
    borderLeftWidth: 1,
    paddingLeft: 20
  },
  contactItem: {
    width: 200,
    height: 30
  },
  contactItemTitle: {
    color: '#fff',
    fontSize: 15,
  }
});

export default SideMenuComponent;