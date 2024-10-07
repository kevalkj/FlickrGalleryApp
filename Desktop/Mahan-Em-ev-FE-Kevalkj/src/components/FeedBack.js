import React, { useState, useEffect, useCallback} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground, TextInput } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';

const FeedBack = ({navigation}) => {
 
  const [rating, setRating] = useState(3);
  const [review, setReview] = useState('');

  // useFocusEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     console.log('Navigating');
  //     navigation.navigate('SafetyAlert');
  //   }, 5000);

  //   return () => clearTimeout(timeoutId); 
  // }, []);

  useFocusEffect(
    useCallback(() => {
      const timeoutId = setTimeout(() => {
        console.log('Navigating');
        navigation.navigate('SafetyAlert');
      }, 600000);

      return () => clearTimeout(timeoutId); 
    }, [])
  );

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/basemap.png')} style={styles.map} />
      <TouchableOpacity style={styles.profileIconContainer} onPress={() => { 
            console.log("ChooseLocation")
            navigation.openDrawer()}}>
        {/* <Ionicons name="person-circle" size={40} color="white" backgroundColor="gray" /> */}
        <Image source={require('../assets/personIcon.png')}/>
      </TouchableOpacity>
      <View style={styles.detailsContainer}>
        <View style={styles.smallTopLine} />
        <View style={styles.driverDetails}>
          <View style={styles.driverInfo}>
            <Image style={styles.avatar} source={require('../assets/Ellipse.png')} />
            <Text style={styles.driverName}>Samay Raina</Text>
          </View>
        </View>
        <View style={styles.contactconatiner}>
            {/* <AirbnbRating
            count={5}
            defaultRating={rating}
            size={20}
            showRating={false}
            onFinishRating={(value) => setRating(value)}
            starContainerStyle={styles.starContainer}
          /> */}
          <TextInput
            style={styles.input}
            placeholder="Write your experience"
            placeholderTextColor="#999"
            value={review}
            onChangeText={setReview}
            multiline
          />
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.cancleButton]} onPress={() => navigation.goBack()} > 
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.submitButton]} onPress={() => navigation.navigate('Homepage')  }> 
              <Text style={ styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
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
  starContainer: {
    marginVertical: 10,
  },
  input: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    height: 100,
    textAlignVertical: 'top',
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
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    
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
  
  driverInfo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:13,
    paddingBottom:1,
  },
  driverName: {
    fontSize: 15,
    fontFamily:'Inter',
    paddingTop:12,
    paddingBottom:0,
  },
  contactconatiner: {
    flexDirection: 'columb',
    alignItems: 'left',
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    width: '100%',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    marginHorizontal: 5,
  },
  submitButton: {
    backgroundColor: '#F8C218',
  },
  cancleButton: {
    backgroundColor: 'white',
    borderWidth:1.5,
    borderColor:'#F8C218',
  },
  cancelButtonText: {
    color: '#F8C218',
    fontFamily:'Inter',
  },
  submitButtonText: {
    color: 'black',
    fontFamily:'Inter',
  },
  
});

export default FeedBack;
