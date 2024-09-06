import {StyleSheet, Text, View, TouchableOpacity, Modal} from 'react-native';
import React, {useState} from 'react';
import Back from '../../assets/Back';
import Cross from '../../assets/Cross';

import {Booking} from '../../service/api';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../../types/navigationTypes';
import Toast from 'react-native-toast-message';
import {AxiosError} from 'axios';
import Layout from '../../layouts/layout';

type ActionProps = NativeStackScreenProps<RootStackParamList, 'Action'>;

const Action: React.FC<ActionProps> = ({route, navigation}) => {
  const [toggleReject, setToggleReject] = useState<boolean>(false);
  const token = useSelector((state: RootState) => state.user.token);
  const heading = [
    'Warehouse',
    'Customer name',
    'Commodity',
    'Start date',
    'End date',
    'Total weight',
    'Total amount',
  ];

  const {data} = route.params;
  const renderText = (item: string, index: number) => {
    return (
      <View style={styles.requestTextContainer}>
        <Text style={styles.desc}>{item}</Text>
        <Text style={styles.value}>{data[index]}</Text>
      </View>
    );
  };
  const handleAccept = async () => {
    console.log(data.at(-1), 100);
    try {
      await Booking.accept_booking(data.at(-1));
      navigation.navigate('Bookings', {variant: 'requests'});
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Booking Accepted Successfully',
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        Toast.show({
          type: 'error',
          text1: 'An error occurred!',
          text2: error.response?.data.error,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'An error occurred!',
          //text2: error.response?.data.error,
        });
      }
    }
  };
  const handleReject = () => {
    setToggleReject(!toggleReject);
  };
  const handleConfirmReject = () => {
    handleReject();
    navigation.navigate('Reasons', {id: data.at(-1)});
  };
  return (
    <View style={styles.container}>
      <Layout>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Back />
          </TouchableOpacity>

          <Text style={styles.heading}>Request to book warehouse </Text>
        </View>
        <View style={styles.requestContainer}>
          {heading.map((item, index) => renderText(item, index))}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.reject} onPress={handleReject}>
              <Text style={styles.rejectText}>Reject</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.accept} onPress={handleAccept}>
              <Text style={styles.acceptText}>Accept</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Layout>
      <Modal visible={toggleReject} transparent={true}>
        <TouchableOpacity style={styles.modalContainer} onPress={handleReject}>
          <View style={styles.popup}>
            <View style={styles.popupHeader}>
              <TouchableOpacity onPress={handleReject}>
                <Cross />
              </TouchableOpacity>
            </View>
            <Text style={styles.prompt}>
              Are you sure you want to reject the booking?
            </Text>
            <View style={styles.buttonModalContainer}>
              <TouchableOpacity style={styles.reject} onPress={handleReject}>
                <Text style={styles.rejectText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.accept}
                onPress={handleConfirmReject}>
                <Text style={styles.acceptText}>Yes, reject</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default Action;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3%',
    marginBottom: 24,
  },
  heading: {
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    flexGrow: 1,
    textAlign: 'center',
  },
  requestContainer: {
    width: '90%',
    height: '50%',
    alignSelf: 'center',
    borderColor: '#C1C4C2',
    borderWidth: 1,
    borderRadius: 8,
    padding: '5%',
  },
  requestTextContainer: {
    height: '12%',
    flexDirection: 'row',
  },
  desc: {
    fontFamily: 'NotoSerif-Regular',
    color: 'black',
    fontSize: 14,
    flex: 1,
  },
  value: {
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
    fontSize: 14,
    flex: 1,
  },
  buttonContainer: {
    height: '16%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reject: {
    width: '47%',
    borderColor: '#07294B',
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rejectText: {
    color: '#07294B',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  accept: {
    width: '47%',
    backgroundColor: '#07294B',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptText: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  popup: {
    width: '90%',
    height: '25%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: '5%',
  },
  popupHeader: {
    height: '5%',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  prompt: {
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 18,
  },
  buttonModalContainer: {
    height: '35%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
