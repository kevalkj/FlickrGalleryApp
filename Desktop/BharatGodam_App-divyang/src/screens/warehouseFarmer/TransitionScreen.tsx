import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../../types/navigationTypes';
import React, {useEffect, useState} from 'react';
import HeaderComponent from '../../components/Header';
import {ScrollView} from 'react-native-gesture-handler';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FarmerBooking} from '../../types/entities';
import {Booking} from '../../service/api';
import BookingDetails from '../../components/BookingDetails';
import OrderTracking from '../../components/Transition';
import Commodity from '../../assets/Commodity';
import textStyles from '../../components/textStyles';
import Layout from '../../layouts/layout';

type TransitionScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Transition history'
>;

const TransitionScreen: React.FC<TransitionScreenProps> = () => {
  const [SelectedBooking, setSelectedBooking] = useState<FarmerBooking>();
  const [isClickedBooking, setIsClickedBooking] = useState<boolean | undefined>(
    false,
  );
  const [bookings, setBookings] = useState<FarmerBooking[] | []>([]);

  const fetchBookings = async () => {
    const response = await Booking.get_all_bookings_farmer();
    // console.log("bookings : ",response);
    setBookings(response);
  };

  useEffect(() => {
    fetchBookings();
    console.log(bookings);
  }, []);

  return (
    <Layout>
      <HeaderComponent title="Transition" />

      <TouchableOpacity
        style={{
          borderWidth: 0.5,
          alignSelf: 'center',
          width: '90%',
          borderRadius: 8,
          height: 60,
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={() => {
          setIsClickedBooking(!isClickedBooking);
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignSelf: 'center',
            marginLeft: 14,
            marginRight: 9.5,
          }}>
          <Commodity />
        </View>
        <View>
          {SelectedBooking === undefined ? null : (
            <Text style={textStyles.bodyB4}>Bookings</Text>
          )}
          <Text
            style={
              SelectedBooking === undefined
                ? textStyles.bodyB3
                : [textStyles.headingH8, {color: 'black'}]
            }>
            {SelectedBooking === undefined ? 'Bookings' : SelectedBooking._id}
          </Text>
        </View>
      </TouchableOpacity>
      {isClickedBooking ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.commodityScrollView}>
          {bookings.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{
                width: '90%',
                alignSelf: 'center',
                borderRadius: 8,
                padding: 15,
                justifyContent: 'center',
              }}
              onPress={() => {
                setSelectedBooking(item);
                setIsClickedBooking(!isClickedBooking);
              }}>
              <Text
                style={{fontWeight: 'bold', paddingLeft: 20, color: '#696969'}}>
                {item._id}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <></>
      )}
      {SelectedBooking && (
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
          }}>
          <BookingDetails booking={SelectedBooking} />

          <OrderTracking
            isBookingAccepted={SelectedBooking.isAccepted}
            isWeighbridgeData={SelectedBooking.isBookingWeighbridgeAdded}
            isDeposit={SelectedBooking.isBookingDeposited}
            isGrading={SelectedBooking.isBookingGraded}
            isWithdrawal={SelectedBooking.isBookingWithdrawn}
            isCompleted={SelectedBooking.status === 'COMPLETED'}
          />
        </View>
      )}
    </Layout>
  );
};

export default TransitionScreen;

const styles = StyleSheet.create({
  commodityScrollView: {
    backgroundColor: 'white',
    width: '90%',
    alignSelf: 'center',
    zIndex: 1,
    borderWidth: 0.5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 5, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
