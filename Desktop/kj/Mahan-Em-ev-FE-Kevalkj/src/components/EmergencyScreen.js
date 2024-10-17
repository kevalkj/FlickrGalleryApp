import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const EmergencyScreen = ({navigation}) => {
 
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');

  const handleSetContact = () => {
    console.log('Name:', name);
    console.log('Contact:', contact);
    setName('');
    setContact('');
    navigation.navigate('SOSContacts');
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/basemap.png')} style={styles.map} />
      <TouchableOpacity style={styles.profileIconContainer} onPress={() => console.log('Profile icon pressed') /* Add Drawer here*/}>
        {/* <Ionicons name="person-circle" size={40} color="white" backgroundColor="gray" /> */}
        <Image source={require('../assets/personIcon.png')}/>
      </TouchableOpacity>
      <View style={styles.detailsContainer}>
        <View style={styles.smallTopLine} />
        <View style={styles.driverDetails}>
          <View style={styles.driverInfo}>
            <Text style={styles.driverName}>Add Emergency Contact</Text>
          </View>
        </View>
        <View style={styles.contactconatiner}>
            <TouchableOpacity onPress={{}}>
              <Image style={styles.conatctimg} source={require('../assets/Isolation_Node.png')}/>
            </TouchableOpacity>
            <Text style={styles.contact}>Select Contact</Text>
            <TextInput 
              style={styles.contactinput} 
              placeholder="Enter"
              value={contact}
              onChangeText={setContact}
              keyboardType="numeric"
            />
            <Text style={styles.contact}>Relationship</Text>
            <TextInput 
              style={styles.contactinput} 
              placeholder="Enter"
              value={name}
              onChangeText={setName}
            />
        </View>
        <TouchableOpacity style={styles.shareButton}>
          <Text style={styles.shareButtonText} onPress={handleSetContact}>Add Emergency Contact</Text>
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
  conatctimg: {
   position: 'absolute',
   top: 45,
   right: 20,
   zIndex: 1,
  //  backgroundColor:'gray',
   width: 20,
   height: 20,
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
  
  driverInfo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:13,
    paddingBottom:24,
  },
  driverName: {
    fontSize: 24,
    fontFamily:'Inter',
    fontWeight: 'bold',
  },
  contactconatiner: {
    flexDirection: 'columb',
    alignItems: 'left',
    width: '100%',
    
  },
  contact: {
  
    marginLeft:5,
    paddingTop:1,
    // paddingBottom:1,
    fontSize: 14,
    fontFamily:'Inter',
  },
  contactinput: {
    margin:9,
    borderRadius:4,
    borderCurve:5,
    borderColor:'#9F9F9F',
    borderWidth:1.5,
    padding:12, 
    color:'#9F9F9F',
    fontFamily:'Inter', 
    fontSize: 12,
    // padding:12 10 12 10, 
    // padding:12 10 12 10, 
    // padding:12 10 12 10, 
    // padding:12 10 12 10,  
  },
  shareButton: {
    backgroundColor: '#F8C218',
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
    color: 'black',
  },
  
});

export default EmergencyScreen;
