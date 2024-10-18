import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LastTripHeading from '../LastTripHeading';
import LastTripCard from '../LastTripCard';
import VehicleImage from '../VehicleImage';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useMemo, useState} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';

function HomepageModal({showModal, closeModal}) {
  const navigation = useNavigation();
  const [spanIndex, setSnapIndex] = useState(0);

  useEffect(() => {
    if (spanIndex == 0) setSnapIndex(1);
    else setSnapIndex(0);
  }, [closeModal]);

  function gotoChooseLocation() {
    navigation.navigate('ChooseLocation');
    closeModal();
  }

  const snapPoints = useMemo(() => ['3', '55'], []);

  return (
    <BottomSheet index={spanIndex} snapPoints={snapPoints}>
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.searchbar} onPress={gotoChooseLocation}>
          {/* <Pressable style={styles.searchBtn} onPress={gotoChooseLocation}> */}
          <Text style={styles.placeholderTxt}>Where are you going?</Text>
          {/* </Pressable> */}
        </TouchableOpacity>
        <LastTripHeading />
        <LastTripCard />
        <LastTripCard />
        <View style={styles.vehicleContainer}>
          <VehicleImage image={require('../../assets/scooter.png')} />
          <VehicleImage image={require('../../assets/auto.png')} />
          <VehicleImage image={require('../../assets/car.png')} />
        </View>
      </View>
    </BottomSheet>
  );
}
export default HomepageModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 25,
  },

  searchbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 54,
    backgroundColor: 'rgba(223,223,223,0.5)',
    borderRadius: 27,
    paddingHorizontal: 25,
  },
  searchBtn: {
    //width:'65%'
  },
  placeholderTxt: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Inter',
    color: '#808080',
  },
  scheduleBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 27,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  calenderIcon: {
    height: 17,
    width: 15,
    marginRight: 5,
  },
  vehicleContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
});
