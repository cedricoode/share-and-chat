import React, {Component} from 'react'; 
import PropTypes from 'prop-types';
import { colors } from '../../config/constants';
import {
    View,
    ScrollView,
    Text,
    Image,
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
      super(props); 
    } 
    render() {
      return(
        <ScrollView style={styles.drawer}>
          <View style={styles.header} key={0}>
            <View style={styles.headerContent} key={0}>
              <Image source={require('../../static/icon/driver-blanc.png')}  style={styles.headerIcon} /> 
              <View style={styles.headerInfo} key={1}> 
                <Text style={styles.headerEmail} key={1}>
                    pablodarde@gmail.com
                </Text>
               </View>
            </View>
           
          </View>
          <View style={styles.content} key={1}>
            <View>
              {menuItems.map((item, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.listItem}
                >
                  <Image  source={item.thumb } style={styles.listItemImage} />
                  <Text style={styles.listItemTitle}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.contactList} >
            <View>
              {contactList.map((item, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.contactItem} 
                >
                  <Text style={styles.contactItemTitle}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      );
    }
  }
  
  SideMenuComponent.propTypes = {
   
  }
  
  const styles = StyleSheet.create({
    drawer: {
      flex: 1,
      backgroundColor: colors.primary
    },
    header: {
      height: 100,
      flex: 1,
      padding: 16,
      backgroundColor: colors.primary
    },
    content: {
      flex: 3,
      padding: 16,
      backgroundColor: colors.primary
    },
    headerInfo: {
      height: 45 ,
      width: 300,
      marginTop: 20,
      borderBottomColor: '#fff',
      borderBottomWidth: 1,
    },
    headerContent: {
      width: 30,
      height:30 ,  
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
        width:200,
        marginLeft : 60, 
        borderLeftColor: '#fff',
        borderLeftWidth: 1, 
        paddingLeft :20
      },
      contactItem: { 
        width: 300,
        height: 30 
      },
      contactItemTitle: {
        color: '#fff',
        fontSize: 15,
      }  
  });
  
  export default SideMenuComponent;