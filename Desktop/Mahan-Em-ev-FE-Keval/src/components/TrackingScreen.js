import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TrackingScreen = ({ navigation }) => {
  const rideDetails = {
    driver: {
      name: 'Samay Raina',
      avatarUri: require('../assets/Ellipse.png'),
      rating: 4.5,
    },
    vehicle: {
      licensePlate: 'MH 49 K 6601',
      model: 'Bajaj K10',
    },
    more: {totalPay: 110.5,
    dropoffTime: '10:15'
    },
  };

  const { driver, vehicle, more } = rideDetails;
  const [sliderValue] = useState(new Animated.Value(0));

  useEffect(() => {
    // Simulate vehicle movement with GPS data here
    Animated.loop(
      Animated.sequence([
        Animated.timing(sliderValue, {
          toValue: 1,
          duration: 5000,
          useNativeDriver: false,
        }),
        Animated.timing(sliderValue, {
          toValue: 0,
          duration: 0,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [sliderValue]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.log('Navigating');
      navigation.navigate('FeedBack');
    }, 5000);

    return () => clearTimeout(timeoutId); 
  }, []);

  const gotoDetails = () => {
    navigation.navigate('DriverDetails')
  };

  const gotoEmergency = () => {
    navigation.navigate('EmergencyScreen')
  };

  const sliderInterpolation = sliderValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/basemap.png')} style={styles.map} />
      <TouchableOpacity style={styles.profileIconContainer} onPress={() => { 
            console.log("ChooseLocation")
            navigation.openDrawer()}}>
        {/* <Ionicons name="person-circle" size={40} color="grey" backgroundColor="gray" /> */}
        <Image source={require('../assets/personIcon.png')}/>
      </TouchableOpacity>
      <View style={styles.detailsContainer}>
        <View style={styles.smallTopLine} />
        <View style={styles.driverDetails}>
          <Image source={driver.avatarUri} style={styles.avatar} />
          <View style={styles.driverInfo}>
            <Text style={styles.driverName}>{driver.name}</Text>
            
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>{driver.rating}</Text>
              <Icon name="star" size={16} color="#FFD700" />
            </View>
            <TouchableOpacity ><Text style={styles.viewDetails} onPress={gotoDetails}>View details</Text></TouchableOpacity>
          </View>
          <View style={styles.vehicleDetailsContainer}>
            <View style={styles.vehicleTextContainer}>
              <Text style={styles.vehicleText}>{vehicle.licensePlate}</Text>
              <Text style={styles.modelText}>{vehicle.model}</Text>
            </View>
          </View>
        </View>
        <View style={styles.separatorLine} />
        <Text style={styles.dropoffTime}>{more.dropoffTime} dropoff</Text>
        <View style={styles.sliderContainer}>
          <Animated.View style={[styles.sliderFill, { width: sliderInterpolation }]}>
             <Image source={require('../assets/Isolation_Mode.png')}  />
          </Animated.View>
          <View style={styles.sliderBackground} />
        </View>
        <View style={styles.separatorLine} />
        <View style={styles.totalPayContainer}>
          <Text style={styles.totalPay}>Total pay:</Text>
          <Text style={styles.totalPay1}> ₹ {more.totalPay}</Text>
        </View>
        <TouchableOpacity style={styles.shareButton}>
          <Text style={styles.shareButtonText} onPress={() => console.log('Share pressed')}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sosButton}>
          <Text style={styles.sosButtonText} onPress={gotoEmergency}>Emergency SOS</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  profileIconContainer: {
   position: 'absolute',
   top: 40,
   right: 20,
   zIndex: 1,
  //  backgroundColor:'gray',
   width: 40,
   height: 43,
   borderRadius: 100,
   borderWidth:0,
  },
  smallTopLine: {
    width: 30,
    height: 5,
    backgroundColor: '#000',
    borderRadius: 80,
    marginVertical: 10,
  },
  driverDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  driverInfo: {
    flex: 1,
    marginLeft: 9,
    justifyContent: 'center',
  },
  driverName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    marginRight: 4,
    marginTop: 0,
  },
  viewDetails: {
    color: '#0F6DDC',
    fontSize: 12,
    fontFamily: 'Inter',
    fontWeight: '400',
    marginTop: 4,
  },
  vehicleDetailsContainer: {
    flexDirection: 'columb',
    alignItems: 'end',
    padding: 10,
    marginBottom: 9,
  },
  vehicleTextContainer: {
    flex: 1,
    marginRight: 5,
    paddingLeft: 5,
  },
  vehicleText: {
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '700',
    textAlign: 'right',
  },
  modelText: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Inter',
    lineHeight: 12,
    textAlign: 'left',
    marginTop: 4,
    color: '#808080',
  },
  dropoffTime: {
    fontSize: 14,
    marginVertical: 8,
    marginRight: 240,
    fontWeight: 'bold',
  },
  sliderContainer: {
    width: '100%',
    height: 24,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  sliderBackground: {
    flex: 1,
    height: 4,
    backgroundColor: '#DFDFDF',
    borderRadius: 2,
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
  },
  sliderFill: {
    height: 24,
    justifyContent: 'center',
  },
  totalPayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 8,
    marginRight: 190, 
  },
  totalPay: {
    fontSize: 12,
    color:'#979797',
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  totalPay1: {
    fontSize: 15,
    marginLeft: 4,
    fontWeight: '800',
    fontFamily: 'Inter',
  },
  shareButton: {
    backgroundColor: 'white',
    paddingVertical: 12,
    borderRadius: 25,
    borderColor:'#F8C218',
    borderWidth:1.5,
    marginVertical: 8,
    width: '100%',
    alignItems: 'center',
  },
  shareButtonText: {
    fontWeight: 'bold',
    color: '#F8C218',
  },
  sosButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 12,
    borderRadius: 25,
    marginVertical: 8,
    marginTop:35,
    width: '100%',
    alignItems: 'center',
  },
  sosButtonText: {
    fontWeight: 'bold',
    color: 'white',
  },
  separatorLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#979797',
    borderRadius: 1,
    marginVertical: 10,
  },
});

export default TrackingScreen;