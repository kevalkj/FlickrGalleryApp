import {Image, Pressable, StyleSheet, View} from 'react-native';
import HomepageModal from '../components/modals/HomepageModal';
import React, {useEffect, useRef, useState} from 'react';
import LocationIcon from '../assets/icons/LocationIcon.svg';
import Map from '../components/Map';
import MapplsGL from 'mappls-map-react-native';

function Homepage({navigation}) {
  const mapRef = useRef(null);
  const [showModal, setShowModal] = useState(true);
  const [showScheduleStatusModal, setShowScheduleStatusModal] = useState(false);
  const [gpsEnable, setGpsEnable] = useState(false);
  useEffect(() => {}, []);
  function closeModal() {
    setShowModal(false);
  }

  return (
    <View style={styles.connatiner}>
      <Map ref={mapRef} />
      <Pressable
        onPress={() => {
          console.log('open drawer');
          navigation.openDrawer();
        }}
        style={styles.icon}>
        <Image source={require('../assets/personIcon.png')} />
      </Pressable>
      {/* <Pressable
        style={{
          ...styles.icon,
          top: 80,
          height: 40,
          width: 40,
          backgroundColor: 'gray',
        }}
        onPress={() => {
          mapRef.current.goToMyLocation();
        }}></Pressable>
      <Pressable
        style={{
          ...styles.icon,
          top: 140,
          height: 40,
          width: 40,
          backgroundColor: 'gray',
        }}
        onPress={() => {
          mapRef.current.showRoute(
            '77.242432,28.594475',
            '77.186982,28.504676',
          );
        }}></Pressable> */}
      <HomepageModal closeModal={closeModal} />
    </View>
  );
}
export default Homepage;

const styles = StyleSheet.create({
  connatiner: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
  },
  icon: {
    width: 40,
    height: 40,
    position: 'absolute',
    left: 'auto',
    right: 15,
    top: 15,
  },
});
