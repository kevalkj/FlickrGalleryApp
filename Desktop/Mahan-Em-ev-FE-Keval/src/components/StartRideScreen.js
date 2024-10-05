import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import React, { useState, useRef } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const StartRideScreen = ({}) => {
  const rideDetails = {
    driver: {
      name: 'Samay Raina',
      avatarUri: require('../assets/Ellipse.png'),
      rating: 4.5,
    },
    vehicle: {
      licensePlate: 'MH 49 K 6601',
      model: 'Bajaj K10',
      imageUri: require('../assets/OBJECT.png'),
    },
  };

  const navigation = useNavigation();
  const { driver, vehicle } = rideDetails;

  const gotoChat = () => {
    navigation.navigate('ChatScreen'); 
  };

  const gotoCall = () => {
    navigation.navigate('CallScreen'); 
  };

  const gotoDetails = () => {
    navigation.navigate('DriverDetails')
  };

  const [isValid, setIsValid] = useState(true);
  const [OTP, setOTP] = useState('');
  const [t1, setT1] = useState('');
  const [t2, setT2] = useState('');
  const [t3, setT3] = useState('');
  const [t4, setT4] = useState('');

  const et1 = useRef();
  const et2 = useRef();
  const et3 = useRef();
  const et4 = useRef();

  const gotoTrackingScreen = () => {
    if (t1 && t2 && t3 && t4) {
      navigation.navigate('TrackingScreen');
    } else {
      setIsValid(false);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/basemap.png')} style={styles.map} />
      <TouchableOpacity style={styles.profileIconContainer} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        {/* <Ionicons name="person-circle" size={40} color="grey" /> */}
        <Image source={require('../assets/personIcon.png')}/>
      </TouchableOpacity>
      <View style={styles.detailsContainer}>
        <View style={styles.smallTopLine} />
        <View style={styles.vehicleDetailsContainer}>
          <View style={styles.vehicleTextContainer}>
            <Text style={styles.vehicleText}>{vehicle.licensePlate}</Text>
            <Text style={styles.modelText}>{vehicle.model}</Text>
          </View>
          <Image source={vehicle.imageUri} style={styles.vehicleImage} />
        </View>
        <View style={styles.driverDetails}>
          <Image source={driver.avatarUri} style={styles.avatar} />
          <View style={styles.driverInfo}>
            <Text style={styles.driverName}>{driver.name}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>{driver.rating}</Text>
              <Icon name="star" size={16} color="#FFD700" />
            </View>
            <TouchableOpacity><Text style={styles.viewDetails} onPress={gotoDetails}>View details</Text></TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.callButton} onPress={gotoCall}>
            {/* <Icon name="phone" size={24} color="#fff" /> */}
            <Image source={require('../assets/Vector.png')}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.messageButton} onPress={gotoChat}>
            {/* <Icon name="chat" size={24} color="#fff" /> */}
            <Image source={require('../assets/mector.png')}/>
          </TouchableOpacity>
        </View>
        <View style={styles.separatorLine} />
        <Text style={styles.enterPinText}>Please enter the PIN to start the ride</Text>
        <View style={styles.pinContainer}>
          <TextInput
            ref={et1}
            style={[styles.pinInput, !isValid ? { borderColor: '#EA0000' } : { borderColor: '#000' }]}
            keyboardType="numeric"
            maxLength={1}
            autoFocus={true}
            value={t1}
            cursorColor={'#000'}
            onChangeText={txt => {
              setT1(txt);
              if (txt.length >= 1) et2.current.focus();
            }}
          />
          <TextInput
            ref={et2}
            style={[styles.pinInput, !isValid ? { borderColor: '#EA0000' } : { borderColor: '#000' }]}
            keyboardType="numeric"
            maxLength={1}
            value={t2}
            cursorColor={'#000'}
            onChangeText={txt => {
              setT2(txt);
              if (txt.length >= 1) et3.current.focus();
              else if (txt.length < 1) et1.current.focus();
            }}
          />
          <TextInput
            ref={et3}
            style={[styles.pinInput, !isValid ? { borderColor: '#EA0000' } : { borderColor: '#000' }]}
            keyboardType="numeric"
            maxLength={1}
            value={t3}
            cursorColor={'#000'}
            onChangeText={txt => {
              setT3(txt);
              if (txt.length >= 1) et4.current.focus();
              else if (txt.length < 1) et2.current.focus();
            }}
          />
          <TextInput
            ref={et4}
            style={[styles.pinInput, !isValid ? { borderColor: '#EA0000' } : { borderColor: '#000' }]}
            keyboardType="numeric"
            maxLength={1}
            value={t4}
            cursorColor={'#000'}
            onChangeText={txt => {
              setT4(txt);
              setIsValid(true);
              if (txt.length >= 1) {
                setOTP(t1 + t2 + t3 + txt);
              } else if (txt.length < 1) {
                et3.current.focus();
              }
            }}
          />
        </View>
        {!isValid && <Text style={styles.invalidText}>Please enter a valid PIN</Text>}
        <TouchableOpacity style={styles.startButton} onPress={gotoTrackingScreen}>
          <Text style={styles.startButtonText}>Start Ride</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e0e0',
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  detailsContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    alignItems: 'center',
  },
  vehicleDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    backgroundColor: '#DFDFDF80',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#DFDFDF80',
    padding: 10,
    width: '100%',
  },
  vehicleTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  vehicleText: {
    flex: 1,
    fontSize: 16,
    fontFamily:'Inter',
    fontWeight:'700',
  },
  modelText: {
    flex: 1,
    fontSize: 12,
    fontFamily:'Inter',
    fontWeight:'500',
    color:'#808080',
  },
  profileIconContainer: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
    // backgroundColor:'lightgray',
    width: 40,
    height: 43,
    borderRadius: 100,
    borderWidth:0,
   },
 
  vehicleImage: {
    width: 81,
    height: 56,
    resizeMode: 'contain',
  },
  driverDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 25,
  },
  driverInfo: {
    flex: 1,
    marginLeft: 8,
  },
  driverName: {
    fontSize: 16,
    fontFamily:'Inter',
    fontWeight:'700',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    marginRight: 4,
  },
  viewDetails: {
    color: '#0F6DDC',
    fontSize: 12,
    fontFamily:'Inter',
    fontWeight:'400',
  },
  callButton: {
    width: 33,
    height: 33,
    borderRadius: 24,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  messageButton: {
    width: 33,
    height: 33,
    borderRadius: 24,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  enterPinText: {
    fontSize: 12,
    fontFamily: 'Inter',
    color: 'black',
    marginVertical: 20,
    fontWeight:'700',
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
  },
  pinInput: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#000',
    fontSize: 24,
    textAlign: 'center',
    width: '20%',
  },
  invalidText: {
    fontSize: 13,
    fontFamily: 'Inter',
    color: '#EA0000',
    marginVertical: 10,
  },
  startButton: {
    backgroundColor: '#F8C218',
    paddingTop: 16,
    paddingRight: 131,
    paddingBottom: 16,
    paddingLeft:131,
    borderRadius: 27.5,
    marginTop: 20,
    // width: '80%',
    alignItems: 'center',
  },
  startButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
    fontFamily: 'Inter',
  },
  smallTopLine: {
    width: 30,
    height: 5,
    backgroundColor: '#000',
    borderRadius: 80,
    alignSelf: 'center',
    marginVertical: 10,
    borderCurve: 5,
  },
  separatorLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#979797',
    borderRadius: 1,
    marginVertical: 10,
  },
});

export default StartRideScreen;
