import {PermissionsAndroid, ScrollView} from 'react-native';
import {Image, StyleSheet, View, Text} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import YellowOutlineButton from '../components/YellowOutlineButton';
import CustomButton from '../components/CustomButton';
const icon = require('../assets/LocationAccess.png');

import {useEffect} from 'react';

async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Access Required',
        message: 'This app needs to access your location.',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Location permission granted');
    } else {
      console.log('Location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}
function LocationAccess({navigation}) {
  useEffect(() => {
    if (Platform.OS === 'android') {
      requestLocationPermission();
    }

    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);
  function gotoHomepaage() {
    console.log('ksdkckdc');
    if (Platform.OS === 'android') {
      requestLocationPermission();
    }

    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
    navigation.navigate('Drawer');
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.innerContainer}>
          <Image source={icon} />
          <Text style={styles.heading}>Enable Location Access</Text>
          <Text style={styles.text}>
            To ensure a seamless and effective experience, allow us to access
            your location
          </Text>
        </View>
        <View style={{marginTop: 180}}>
          <CustomButton
            title={'Allow location Access'}
            onPress={gotoHomepaage}
          />
          <View style={styles.btn}>
            <YellowOutlineButton
              title={'Maybe  Later'}
              onPress={gotoHomepaage}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
export default LocationAccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 25,
    marginTop: 200,
  },
  btn: {
    marginHorizontal: 15,
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#121323',
    marginBottom: 10,
    marginTop: 20,
  },
  text: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Inter',
    color: '#808080',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
