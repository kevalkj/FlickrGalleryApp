import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useEffect} from 'react';

const DriverIdentifierScreen = ({navigation}) => {
  const rideDetails = {
    driver: {
      name: 'Samay Raina',
      avatarUri: require('../assets/Ellipse.png'),
    },
    vehicle: {
      licensePlate: 'MH 49 K 6601',
      model: 'Bajaj K10',
      imageUri: require('../assets/OBJECT.png'),
    },
    startLocation: 'Your current location',
    dropLocation: 'McDonald, Bardi Nagar',
    totalPay: 110.5,
    arrivalTime: '05:12 min',
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.log('Navigating');
      //navigation.navigate('StartRideScreen');
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, []);

  const goToCall = () => {
    navigation.navigate('CallScreen');
  };

  const goToChat = () => {
    navigation.navigate('ChatScreen');
  };

  const goToDetails = () => {
    navigation.navigate('DriverDetails');
  };

  const {driver, vehicle, startLocation, dropLocation, totalPay, arrivalTime} =
    rideDetails;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/basemap.png')}
        style={styles.map}
      />
      <TouchableOpacity
        style={styles.profileIconContainer}
        onPress={() => {
          console.log('ChooseLocation');
          navigation.openDrawer();
        }}>
        {/* <Ionicons name="person-circle" size={40} color="grey" /> */}
        <Image source={require('../assets/personIcon.png')} />
      </TouchableOpacity>
      <View style={styles.detailsContainer}>
        <View style={styles.arrivalContainer}>
          <Text style={styles.arrivalText}>The driver will arrive in</Text>
          <Text style={styles.arrivalTime}>{arrivalTime}</Text>
        </View>
        <View style={styles.curveContainer}>
          <View style={styles.curve} />
        </View>
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
            <TouchableOpacity>
              <Text style={styles.viewDetails} onPress={goToDetails}>
                View details
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.callButton} onPress={goToCall}>
            {/* <Icon name="phone" size={24} color="#fff" /> */}
            <Image source={require('../assets/Vector.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.messageButton} onPress={goToChat}>
            {/* <Icon name="chat" size={24} color="#fff" /> */}
            <Image source={require('../assets/mector.png')} />
          </TouchableOpacity>
        </View>
        <View style={styles.separatorLine} />
        <View style={styles.locationDetails}>
          <View style={styles.locationRow}>
            <View style={styles.outerCircle}>
              <View style={styles.innerCircle} />
            </View>
            <View>
              <Text style={styles.locationLabel}>Start Location</Text>
              <Text style={styles.locationText}>{startLocation}</Text>
            </View>
          </View>
          <View style={styles.dottedLineContainer}>
            <View style={styles.dottedLine} />
          </View>
          <View style={styles.locationRow}>
            <View style={[styles.outerCircle, {borderColor: 'blue'}]}>
              <View style={[styles.innerCircle, {backgroundColor: 'blue'}]} />
            </View>
            <View>
              <Text style={styles.locationLabel}>Drop Location</Text>
              <Text style={styles.locationText}>{dropLocation}</Text>
            </View>
          </View>
        </View>
        <View style={styles.separatorLine} />
        <View style={styles.totalPayContainer}>
          <Text style={styles.totalPay1}>Total pay:</Text>
          <Text style={styles.totalPay}> ₹ {totalPay.toFixed(2)}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => {
              navigation.goBack();
            }}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.shareButton}
            // onPress={() => {
            //   navigation.goBack();
            // }}
          >
            <Text style={styles.shareButtonText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    paddingEnd: 0,
    marginEnd: 0,
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  detailsContainer: {
    padding: 15,
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 0,
  },
  arrivalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#000',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    alignItems: 'center',
    zIndex: 1,
    marginRight: -13,
    marginLeft: -14,
  },
  vehicleTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  curveContainer: {
    backgroundColor: '#000',
    height: 20,
    marginTop: 0,
    marginRight: -13,
    marginLeft: -14,
  },
  curve: {
    height: 28,
    backgroundColor: 'white',
    borderTopLeftRadius: 500,
    borderTopRightRadius: 500,
  },
  arrivalText: {
    color: '#9F9F9F',
    fontSize: 12,
    fontFamily: 'Inter',
    fontWeight: '400',
  },
  arrivalTime: {
    color: '#9F9F9F',
    fontSize: 12,
    fontFamily: 'Inter',
    fontWeight: '400',
  },
  vehicleDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    paddingRight: 21,
    paddingBottom: 15,
    paddingLeft: 21,
    marginVertical: 16,
    backgroundColor: '#DFDFDF80',
    borderRadius: 5,
  },
  vehicleText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '700',
    // marginLeft: 15,
  },
  modelText: {
    flex: 1,
    fontSize: 12,
    fontFamily: 'Inter',
    fontWeight: '500',
    color: '#808080',
    // marginLeft: 15,
  },
  vehicleImage: {
    width: 81,
    height: 56,
    resizeMode: 'contain',
    // marginRight: ,
  },
  totalPayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 8,
    marginRight: 190,
  },
  driverDetails: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontFamily: 'Inter',
    fontWeight: '700',
    color: '#121323',
  },
  viewDetails: {
    color: '#0F6DDC',
    fontSize: 12,
    fontFamily: 'Inter',
    fontWeight: '400',
  },
  callButton: {
    width: 33,
    height: 33,
    borderRadius: 30,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  messageButton: {
    width: 33,
    height: 33,
    borderRadius: 30,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationDetails: {
    marginVertical: 16,
  },
  locationLabel: {
    color: '#808080',
    fontSize: 12,
    fontFamily: 'Inter',
    fontWeight: '400',
  },
  locationText: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#121323',
  },
  totalPay: {
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'Inter',
    margin: 1,
    color: '#121323',
  },
  totalPay1: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Inter',
    margin: 1,
    color: '#979797',
  },
  cancelButton: {
    backgroundColor: 'white',
    paddingVertical: 12,
    borderRadius: 25,
    margin: 16,
    borderColor: '#F8C218',
    borderWidth: 2,
    width: 150,
    right: 10,
  },
  cancelButtonText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#F8C218',
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  shareButton: {
    backgroundColor: '#F8C218',
    paddingVertical: 12,
    borderRadius: 25,
    margin: 16,
    borderColor: '#F8C218',
    borderWidth: 2,
    width: 150,
    right: 20,
  },
  shareButtonText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#000',
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  outerCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  innerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#000',
  },
  dottedLineContainer: {
    alignItems: 'start',
    justifyContent: 'center',
    height: 20,
    marginLeft: 9,
  },
  dottedLine: {
    width: 1,
    height: 46,
    borderStyle: 'dotted',
    borderWidth: 1,
    borderColor: 'gray',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  profileIconContainer: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
    // backgroundColor:'gray',
    width: 40,
    height: 43,
    borderRadius: 100,
    borderWidth: 0,
  },
  smallTopLine: {
    width: 30,
    height: 5,
    backgroundColor: '#000',
    borderRadius: 80,
    alignSelf: 'center',
    marginVertical: 0,
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

export default DriverIdentifierScreen;
