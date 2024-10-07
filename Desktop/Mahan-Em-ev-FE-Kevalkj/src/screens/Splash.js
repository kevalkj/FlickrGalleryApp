import {View, Text, StyleSheet, Image, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
        navigation.navigate('Intro');
    }, 2000);
  }, []);
  
  return (
    <View style={styles.container}>
      <Image  source={require('../assets/Navigate_transparent_logo1.png')}/>
    </View>
  );
};

export default Splash;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8C218',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 40,
    color: '#2f967b',
    textAlign: 'center',
  },
});
