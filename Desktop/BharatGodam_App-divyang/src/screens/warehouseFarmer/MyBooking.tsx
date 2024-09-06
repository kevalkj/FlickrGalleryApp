import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import HomeHeader from '../../components/HomeHeader';
import HomeMenu from '../../components/HomeMenu';
import HomeNotification from '../../components/HomeNotification';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import textStyles from '../../components/textStyles';
import {black} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import Location from '../../assets/Location';
import NavBar from '../../components/NavBar';
import Calender from '../../assets/Calender';
import Logistic from '../../assets/Logistic';
import Weight from '../../assets/Weight';
import TimeTruck from '../../assets/TimeTruck';
import ButtonWithAutoWidth from '../../components/ButtonWithAutoWidth';
import {useSelector} from 'react-redux';
import {Booking, authApi} from '../../service/api';
import {Bookings, FarmerBooking} from '../../types/entities';
import Layout from '../../layouts/layout';
import {formatDate} from '../../utils/date';

const {width, height} = Dimensions.get('window');

function convertFormattedNumberToDateString(
  formattedDateNumber: number,
): string {
  // Convert the number to a string
  const formattedDateString = formattedDateNumber.toString();

  // Extract the year, month, and day from the formatted date string
  const year = formattedDateString.substring(0, 4);
  const month = formattedDateString.substring(4, 6);
  const day = formattedDateString.substring(6, 8);

  // Create a date object
  const date = new Date(`${year}-${month}-${day}`);

  // Define month names
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Get the day of the month with the correct ordinal suffix
  const dayWithSuffix = getDayWithSuffix(date.getDate());

  // Get the full month name
  const monthName = monthNames[date.getMonth()];

  // Construct the formatted date string
  const humanReadableDateString = `${dayWithSuffix} ${monthName}`;

  return humanReadableDateString;
}

function getDayWithSuffix(day: number): string {
  if (day > 3 && day < 21) {
    return day + 'th';
  } // catch 11th, 12th, 13th
  switch (day % 10) {
    case 1:
      return day + 'st';
    case 2:
      return day + 'nd';
    case 3:
      return day + 'rd';
    default:
      return day + 'th';
  }
}

const MyBooking = () => {
  const [menu, setMenu] = useState<boolean>(false);
  // const [user, setUser] = useState<User|[]>([]);
  const [bookings, setbookings] = useState<FarmerBooking[] | []>([]);
  const [notification, setNotification] = useState<boolean>(false);
  const [selectedButton, setSelectedButton] = useState(true);
  const [selectedStatusButton, setSelectedStatusButton] = useState('Accepted');

  const fetchBookings = async () => {
    const response = await Booking.get_all_bookings_farmer();
    // console.log("bookings : ",response);
    setbookings(response);
  };

  useEffect(() => {
    fetchBookings();
    console.log(bookings);
  }, []);

  const handlePress = (button: boolean | ((prevState: boolean) => boolean)) => {
    setSelectedButton(button);
  };
  const handlePressStatus = (button: React.SetStateAction<string>) => {
    setSelectedStatusButton(button);
  };
  const handleMenu = () => {
    setMenu(!menu);
  };
  const handleNotification = () => {
    setNotification(!notification);
  };
  const navigation = useNavigation<NavigationProp<Record<string, object>>>();

  const renderContent = () => {
    let filteredData;
    switch (selectedStatusButton) {
      case 'Accepted':
        filteredData = bookings.filter(item => item.status === 'Accepted');
        break;
      case 'Pending':
        filteredData = bookings.filter(item => item.status === 'Pending');
        break;
      case 'Rejected':
        filteredData = bookings.filter(
          item => item.status === 'Cancelled' || item.status === 'Rejected',
        );
        break;
      default:
        filteredData = bookings;
    }

    return (
      <ScrollView>
        {filteredData.map((item, index) => (
          <View
            key={index}
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: 8,
              backgroundColor: '#FFFFFF',
            }}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  width: 72,
                  height: 61.51,
                  backgroundColor: 'brown',
                  borderRadius: 8,
                }}>
                <Image
                  source={{uri: item.warehouse.main_photo[0]}}
                  style={{width: '100%', height: '100%', borderRadius: 8}}
                />
              </View>
              <View style={{marginLeft: 8}}>
                <View>
                  <Text style={[textStyles.headingH6_5, {color: 'black'}]}>
                    {item.warehouse.warehouse_name}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={{padding: 5}}>
                    <Location />
                  </View>
                  <Text style={[textStyles.bodyB3, {color: 'black'}]}>
                    {item.warehouse.city}, {item.warehouse.State}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                marginTop: 16,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}>
              <View style={{}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={{padding: 5}}>
                    <Calender />
                  </View>
                  <Text style={[textStyles.bodyB3, {color: 'black'}]}>
                    {convertFormattedNumberToDateString(item.fromDate)} -{' '}
                    {convertFormattedNumberToDateString(item.toDate)}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={{padding: 5}}>
                    <Weight />
                  </View>
                  <Text style={[textStyles.bodyB3, {color: 'black'}]}>
                    {item.totalWeight} MT
                  </Text>
                </View>
              </View>
              <View style={{}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={{padding: 5}}>
                    <Logistic />
                  </View>
                  <Text style={[textStyles.bodyB3, {color: 'black'}]}>
                    {`${item.warehouse.remainingCapacity}MT capacity truck`}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={{padding: 5}}>
                    <TimeTruck />
                  </View>
                  <Text style={[textStyles.bodyB3, {color: 'black'}]}>
                    {formatDate(item.updatedAt.toString())}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginVertical: 10}}>
              <Text
                style={{
                  marginLeft: 6,
                  fontSize: 14,
                  color: '#1C1C1C',
                  fontFamily: 'NotoSerif-Regular',
                  lineHeight: 21,
                }}>
                To pay{' '}
              </Text>
              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 17,
                  color: '#1C1C1C',
                  fontFamily: 'Poppins-SemiBold',
                }}>
                {' '}₹{item.total_price}
              </Text>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{width: '48%'}}>
                <ButtonWithAutoWidth
                  disabled={item.status === 'Cancelled'}
                  role="iButton"
                  text="Cancel booking"
                  borderColor="#07294B"
                  txtcolor="#07294B"
                  onPress={() =>
                    navigation.navigate('CancelBooking', {
                      booking: item,
                      warehouse: item.warehouse,
                    })
                  }
                />
              </View>
              <View style={{width: '48%'}}>
                <ButtonWithAutoWidth
                  role="iButton"
                  disabled={item.status === 'Pending'}
                  text="View details"
                  bgcolor="#0C447D"
                  borderColor="#0C447D"
                  txtcolor="#FFFFFF"
                  onPress={() => {
                    switch (item.status) {
                      case 'Accepted':
                        navigation.navigate('AcceptedBookingDetails', {
                          booking: item,
                          warehouse: item.warehouse,
                        });
                        break;
                      // case 'Pending':
                      //     navigation.navigate('PendingBookingDetails', { data: item });
                      //     break;
                      case 'Cancelled':
                        navigation.navigate('RejectedBookingDetails', {
                          booking: item,
                        });
                        break;
                      default:
                        break;
                    }
                  }}
                />
              </View>
            </View>
            {/* <TouchableOpacity
                            onPress={() => navigation.navigate('WarehouseDetails', {
                                WarehouseName: item.warehouseName,
                                warehouseLocation: item.warehouseLocation,
                                availableCapacity: item.availableCapacity,
                                totalCapacity: item.totalCapacity
                            })}
                            style={{ width: 328, height: 160, borderBottomLeftRadius: 8, borderBottomRightRadius: 8, paddingHorizontal: 8, paddingVertical: 12, flexDirection: 'column', justifyContent: 'space-evenly' }}
                        >

                            <View>
                                <Text style={textStyles.bodyB4}>{item.availableCapacity} Available capacity</Text>
                            </View>
                            <View style={{ alignItems: 'flex-end' }}>
                                <View style={{ flexDirection: 'row', marginBottom: 4 }}>
                                    <Text style={[textStyles.headingH7, { color: 'black' }]}>{item.price}</Text>
                                    <Text style={[textStyles.bodyB4, { color: 'black' }]}>{item.bagSize}</Text>
                                </View>
                                <View>
                                    <Text style={textStyles.bodyB4}>{item.transportCharge}</Text>
                                </View>
                            </View>
                        </TouchableOpacity> */}
            <View
              style={{
                borderTopWidth: 1,
                borderColor: '#C1C4C2',
                marginVertical: 40,
              }}
            />
          </View>
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <Layout>
        <HomeHeader
          menuCallBack={handleMenu}
          notificationCallBack={handleNotification}
        />
        <View style={styles.content}>
          <Text style={[textStyles.headingH6, {color: 'black'}]}>
            My bookings
          </Text>
          {selectedButton == false ? (
            <></>
          ) : (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 24,
                  height: 35,
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  style={{
                    borderRadius: 8,
                    backgroundColor:
                      selectedStatusButton === 'Accepted'
                        ? '#00A241'
                        : '#F7F7F7',
                    padding: 8,
                    justifyContent: 'center',
                    height: 40,
                    width: 104,
                    alignItems: 'center',
                    borderWidth: selectedStatusButton === 'Accepted' ? 0 : 1,
                    borderColor:
                      selectedStatusButton === 'Accepted' ? '' : '#C1C4C2',
                  }}>
                  <Text
                    style={[
                      textStyles.headingH7,
                      {
                        color:
                          selectedStatusButton === 'Accepted'
                            ? '#ffffff'
                            : '#1C1C1C',
                      },
                    ]}
                    onPress={() => handlePressStatus('Accepted')}>
                    Accepted
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderRadius: 8,
                    backgroundColor:
                      selectedStatusButton === 'Pending'
                        ? '#0038FF'
                        : '#F7F7F7',
                    padding: 8,
                    justifyContent: 'center',
                    height: 40,
                    width: 104,
                    alignItems: 'center',
                    borderWidth: selectedStatusButton === 'Pending' ? 0 : 1,
                    borderColor:
                      selectedStatusButton === 'Pending' ? '' : '#C1C4C2',
                  }}>
                  <Text
                    style={[
                      textStyles.headingH7,
                      {
                        color:
                          selectedStatusButton === 'Pending'
                            ? '#ffffff'
                            : '#1C1C1C',
                      },
                    ]}
                    onPress={() => handlePressStatus('Pending')}>
                    Pending
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderRadius: 8,
                    backgroundColor:
                      selectedStatusButton === 'Rejected'
                        ? '#FF5858'
                        : '#F7F7F7',
                    padding: 8,
                    justifyContent: 'center',
                    height: 40,
                    width: 104,
                    alignItems: 'center',
                    borderWidth: selectedStatusButton === 'Rejected' ? 0 : 1,
                    borderColor:
                      selectedStatusButton === 'Rejected' ? '' : '#C1C4C2',
                  }}>
                  <Text
                    style={[
                      textStyles.headingH7,
                      {
                        color:
                          selectedStatusButton === 'Rejected'
                            ? '#ffffff'
                            : '#1C1C1C',
                      },
                    ]}
                    onPress={() => handlePressStatus('Rejected')}>
                    Rejected
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  borderTopWidth: 1,
                  borderColor: '#C1C4C2',
                  marginVertical: 24,
                }}
              />
              <View style={{marginBottom: '15%'}}>{renderContent()}</View>
            </>
          )}
        </View>
      </Layout>
      <NavBar current="MyBooking" />
      <Modal visible={menu} transparent={true}>
        <HomeMenu exitCallBack={handleMenu} />
      </Modal>
      <Modal visible={notification} transparent={true}>
        <HomeNotification exitCallBack={handleNotification} Notification={[]} />
      </Modal>
    </View>
  );
};

export default MyBooking;

const styles = StyleSheet.create({
  content: {
    marginHorizontal: '4.5%',
    flex: 1,
    width: '91.5%',
    height: height,
    marginBottom: '30%',
    // backgroundColor: 'blue',
    // justifyContent: 'space-between',
  },
});
