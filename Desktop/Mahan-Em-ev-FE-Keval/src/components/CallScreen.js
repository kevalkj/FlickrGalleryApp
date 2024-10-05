import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CallScreen = ({navigation}) => {
  const [mute, setMute] = useState(false);
  const [speaker, setSpeaker] = useState(false);
  const [call, setCall] = useState(false);
  const [headername, setheadername] = useState('Samay Rainaa');

  const handleCallPress = () => {
    setCall(!call);
  };

  const handleMutePress = () => {
    setMute(!mute);
  };

  const handleSpeakerPress = () => {
    setSpeaker(!speaker);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={()=>{navigation.goBack()}}>
          {/* <Icon name="arrow-back" size={24} color="#000" /> */}
          <Image source={require('../assets/ArrowBack.png')}/>
        </TouchableOpacity>
      </View>
      <View style={styles.callContainer}>
        <View style={styles.profileContainer}>
          {/* <Icon name="person" size={48} color="#ddd" /> */}
          <Image style={styles.avatar} source={require('../assets/Ellipse.png')} />
        </View>
        <Text style={styles.nameText}>{headername}</Text>
        <Text style={styles.callTimeText}>01:23</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity onPress={handleMutePress} style={styles.button}>
            <Ionicons name={mute ? 'volume-mute' : 'volume-mute'} size={30} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.buttonText}>Mute</Text>
        </View>
        <TouchableOpacity onPress={handleCallPress} style={styles.endCallButton}>
          {/* <Icon name="call" size={30} color="#fff" /> */}
          <Image source={require('../assets/Cector.png')}/>
        </TouchableOpacity>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity onPress={handleSpeakerPress} style={styles.button}>
            <Ionicons name={speaker ? 'volume-high' : 'volume-mute'} size={30} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.buttonText}>Speaker</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    marginRight: 20,
  },
  callContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    width: 90,
    height: 90,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#ddd',
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 30,
    
  },
  nameText: {
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily:'Inter',
    marginBottom: 8,
  },
  callTimeText: {
    fontSize: 14,
    fontFamily:'Inter',
    color: '#808080',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    position: 'absolute',
    bottom: 50,
    width: '100%',
  },
  buttonWrapper: {
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    borderRadius: 50,
    width: 42.76,
    height: 42.36,
    top:19,
  },
  endCallButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    borderRadius: 50,
    width: 73.72,
    height: 73.72,
  },
  buttonText: {
    fontSize: 10,
    fontFamily:'Inter',
    color: '#808080',
    marginTop: 5,
    top:18,
  },
});

export default CallScreen;