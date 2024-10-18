import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomDrawer = ({navigation}) => {
  const removeData = () => {
    console.log('logout called');
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };
  const onLogout = () => {
    Alert.alert('Alert', 'Are you sure?', [
      {text: 'Cancel', onPress: () => {}, style: 'cancel'},
      {text: 'OK', onPress: removeData},
    ]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{alignItems: 'center', marginVertical: 50}}>
        <View style={styles.userContainer}>
          <FontAwesome5 name="user-alt" size={52} color={'#979393'} />
        </View>
        <Text style={styles.userName}>Username</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('MyProfile')}>
        <Feather name="user" size={22} color={'#212121'} style={styles.icon} />
        <Text style={styles.menuText}>My Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('MyRides')}>
        <Image
          style={styles.helpIcon}
          source={require('../assets/sendIcon.png')}
        />
        <Text style={styles.menuText}>My Rides</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('Wallet')}>
        <Ionicons
          name="wallet-outline"
          size={22}
          color={'#212121'}
          style={styles.icon}
        />
        <Text style={styles.menuText}>Wallet</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('PinScreen')}>
        <MaterialCommunityIcons
          name="lock-outline"
          size={22}
          color={'#212121'}
          style={styles.icon}
        />
        <Text style={styles.menuText}>PIN</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('SOSContacts')}>
        <MaterialCommunityIcons
          name="alert-circle-outline"
          size={22}
          color={'#212121'}
          style={styles.icon}
        />
        <Text style={styles.menuText}>SOS</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{...styles.menuItem, marginTop: '7%'}}
        onPress={() => navigation.navigate('About')}>
        <Feather
          name="check-square"
          size={22}
          color={'#212121'}
          style={styles.icon}
        />
        <Text style={styles.menuText}>About us</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{...styles.menuItem}}
        onPress={() => navigation.navigate('Help')}>
        <Image style={styles.helpIcon} source={require('../assets/help.png')} />
        <Text style={styles.menuText}>Help & Support</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{...styles.menuItem, marginTop: '7%'}}
        onPress={() => onLogout()}>
        <MaterialIcons
          name="logout"
          size={22}
          color={'red'}
          style={{...styles.icon, transform: [{rotate: '180deg'}]}}
        />
        <Text style={{...styles.menuText, color: 'red'}}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    marginBottom: 15,
  },
  icon: {
    marginRight: 15,
  },
  menuText: {
    color: '#212121',
    fontSize: 18,
    fontWeight: '600',
  },
  helpIcon: {
    height: 20,
    width: 20,
    marginRight: 15,
  },
  userContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    height: 100,
    width: 100,
    borderWidth: 1,
    borderColor: '#c1bdbd',
    marginBottom: 10,
  },
  userName: {color: '#212121', fontWeight: 'bold', fontSize: 25},
});

export default CustomDrawer;
