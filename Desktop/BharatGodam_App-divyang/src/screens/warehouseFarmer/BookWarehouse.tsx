import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import HeaderComponent from '../../components/Header';
import textStyles from '../../components/textStyles';
import Location from '../../assets/Location';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Calendar} from 'react-native-calendars';
import Bag from '../../assets/Bag';
import Calender from '../../assets/Calender';
import Commodity from '../../assets/Commodity';
import Weight from '../../assets/Weight';
import CustomInputText from '../../components/CustomInputText';
import {black} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import CustomButton from '../../components/CustomButton';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../../types/navigationTypes';
import {Booking} from '../../service/api';
import {value} from 'react-native-extended-stylesheet';
import {formatDate} from '../../utils/date';
import Toast from 'react-native-toast-message';
import ButtonWithAutoWidth from '../../components/ButtonWithAutoWidth';
import {AxiosError} from 'axios';
import Layout from '../../layouts/layout';
import Dismiss from '../../assets/Dissmiss';

interface DateObject {
  dateString: string;
  day: number;
  month: number;
  timestamp: number;
  year: number;
}
type SearchScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'BookWarehouse'
>;
const BookWarehouse: React.FC<SearchScreenProps> = ({navigation, route}) => {
  const {warehouse, Bookingdata, TotalCost, Totaldays} = route.params;
  console.log(route.params);

  const [isClickedCommodity, setIsClickedCommodity] = useState<
    boolean | undefined
  >(false);
  const [isClickedUnit, setIsClickedUnit] = useState<boolean | undefined>(
    false,
  );
  const [isClickedBagsize, setIsClickedBagsize] = useState<boolean | undefined>(
    false,
  );
  const [showCalender, setshowCalender] = useState<boolean>(false);
  const [ModalType, setModalType] = useState<string>('');
  const [SelectedCommodity, setSelectedCommodity] = useState<string>('');
  const [Selectedweight, setSelectedweight] = useState<string>('');
  const [numberOfBags, setnumberOfBags] = useState<string>('');
  const [SelectedUnit, setSelectedUnit] = useState<string>('');
  const [SelectedBagsize, setSelectedBagsize] = useState<string>('');
  const [startDate, setStartDate] = useState<DateObject | null>(null);
  const [endDate, setEndDate] = useState<DateObject | null>(null);
  const [menu, setMenu] = useState<boolean>(false);
  const [notification, setNotification] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean | undefined>(false);

  const handleMenu = () => {
    setMenu(!menu);
  };
  const handleNotification = () => {
    setNotification(!notification);
  };

  function convertDateStringToFormattedString(dateString: string): string {
    const [year, month, day] = dateString.split('-');
    const formattedDateString = `${year}${month}${day}`;
    return formattedDateString;
  }

  function convertBagSize(bagSize: string): string {
    const result = bagSize.match(/^(\d+)\s*kg\s*bag$/i);
    return result ? `${result[1]} kg` : bagSize;
  }

  const handleBooking = async () => {
    try {
      const booking = await Booking.create_booking(warehouse._id, {
        fromDate: convertDateStringToFormattedString(
          Bookingdata.startDate?.dateString || '20240720',
        ),
        toDate: convertDateStringToFormattedString(
          Bookingdata.endDate?.dateString || '20240820',
        ),
        commodity: Bookingdata.SelectedCommodity || '',
        weight: Bookingdata.weight || '',
        unit: Bookingdata.SelectedUnit || '',
        noOfBags: Bookingdata.numberOfBags?.toLocaleString() || '',
        bagSize: convertBagSize(Bookingdata.SelectedBagsize || ''),
        total_price: TotalCost,
        requestcapacity: Bookingdata.weight || '',
      });
      console.log(booking, 100);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Warehouse Booked Successfully',
      });
      navigation.navigate('Dashboard');
    } catch (error) {
      console.log('Error in booking : ', error);
      if (error instanceof AxiosError) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error.response?.data.error,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'An Error occurred',
          //text2: error.response?.data.error,
        });
      }
    }
  };
  const Unit = [{unit: 'kg'}];
  const BagSize = [
    {BagSize: '25 kg bag'},
    {BagSize: '50 kg bag'},
    {BagSize: '75 kg bag'},
    {BagSize: '100 kg bag'},
  ];

  const handleChangeDate = (date: DateObject) => {
    setshowCalender(false);
    ModalType === 'START_DATE' ? setStartDate(date) : setEndDate(date);
    setModalType('');
  };

  return (
    <View style={{backgroundColor: '#FFFFFF', flex: 1}}>
      <Layout>
        <HeaderComponent title={'Book warehouse'} />
        <View style={{alignItems: 'center', justifyContent: 'space-between'}}>
          <View>
            <Text style={[textStyles.headingH6_5, {color: 'black'}]}>
              {warehouse.warehouse_name}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{padding: 5}}>
              <Location />
            </View>
            <View style={{flexDirection: 'column'}}>
              <Text
                style={[textStyles.bodyB3, {width: 'auto', color: 'black'}]}>
                {warehouse.locality_area}, {warehouse.State || warehouse.city}
              </Text>
            </View>
          </View>
          <View style={styles.SearchContainer}>
            <View
              style={{
                width: '100%',
                height: '20%',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                onPress={() => {}}
                style={{
                  width: '48%',
                  borderWidth: 0.5,
                  height: '100%',
                  borderRadius: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    marginLeft: 14,
                    marginRight: 7.5,
                  }}>
                  <Calender />
                </View>
                <View>
                  <Text
                    style={
                      startDate == null
                        ? textStyles.bodyB3
                        : [textStyles.headingH8, {color: 'black'}]
                    }>
                    {Bookingdata?.startDate?.dateString || ''}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {}}
                style={{
                  width: '48%',
                  borderWidth: 0.5,
                  height: '100%',
                  borderRadius: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    marginLeft: 14,
                    marginRight: 7.5,
                  }}>
                  <Calender />
                </View>
                <View>
                  {endDate == null ? null : (
                    <Text style={textStyles.bodyB4}>End date</Text>
                  )}
                  {/* <Text style={textStyles.bodyB4}>End date</Text> */}
                  <Text
                    style={
                      endDate == null
                        ? textStyles.bodyB3
                        : [textStyles.headingH8, {color: 'black'}]
                    }>
                    {Bookingdata?.endDate?.dateString}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            {showCalender ? (
              <View style={styles.calender}>
                <Calendar
                  style={{borderRadius: 8, elevation: 4}}
                  onDayPress={handleChangeDate}
                  markedDates={{
                    [ModalType === 'START_DATE'
                      ? startDate?.dateString || 'defaultStartDate'
                      : endDate?.dateString || 'defaultEndDate']: {
                      selected: true,
                      selectedColor: '#0C447D',
                      selectedTextColor: '#FFFFFF',
                    },
                  }}
                  hideExtraDays={true}
                />
              </View>
            ) : (
              <></>
            )}
            <TouchableOpacity
              style={{
                borderWidth: 0.5,
                width: '100%',
                borderRadius: 8,
                height: '20%',
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => {}}>
              <View
                style={{
                  justifyContent: 'center',
                  marginLeft: 14,
                  marginRight: 7.5,
                }}>
                <Commodity />
              </View>
              <View>
                <Text style={textStyles.bodyB4}>Commodity</Text>
                <Text
                  style={
                    SelectedCommodity == ''
                      ? [textStyles.bodyB3, {color: 'black'}]
                      : [textStyles.headingH8, {color: 'black'}]
                  }>
                  {Bookingdata?.SelectedCommodity}
                </Text>
              </View>
            </TouchableOpacity>
            {isClickedCommodity ? (
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.commodityScrollView}>
                {warehouse.Commodity.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{
                      width: '100%',
                      borderRadius: 8,
                      height: 50,
                      justifyContent: 'center',
                    }}
                    onPress={() => {
                      setSelectedCommodity(item.name);
                      setIsClickedCommodity(!isClickedCommodity);
                    }}>
                    <Text style={{fontWeight: 'bold', paddingLeft: 20}}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            ) : (
              <></>
            )}
            <View
              style={{
                width: '100%',
                height: '20%',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  width: '60%',
                  height: '100%',
                  borderWidth: 0.5,
                  borderRadius: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View style={{justifyContent: 'center', marginLeft: 14}}>
                  <Weight />
                </View>
                <CustomInputText
                  PlaceHolder="Weight"
                  txt={Bookingdata.weight || ''}
                  readonly={true}
                />
              </View>
              <TouchableOpacity
                style={{
                  width: '35%',
                  borderWidth: 0.5,
                  height: '100%',
                  borderRadius: 8,
                  paddingLeft: 12,
                  justifyContent: 'center',
                }}
                onPress={() => {}}>
                <Text style={textStyles.bodyB4}>Unit</Text>
                <Text
                  style={
                    SelectedUnit == ''
                      ? [textStyles.bodyB3, {color: 'black'}]
                      : [textStyles.headingH8, {color: 'black'}]
                  }>
                  {Bookingdata.SelectedUnit}
                </Text>
              </TouchableOpacity>
            </View>
            {isClickedUnit ? (
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.UnitScrollView}>
                {Unit.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{
                      width: '100%',
                      borderRadius: 8,
                      height: 31,
                      marginVertical: 9,
                      justifyContent: 'center',
                    }}
                    onPress={() => {
                      setSelectedUnit(item.unit);
                      setIsClickedUnit(!isClickedUnit);
                    }}>
                    <Text style={{fontWeight: '500', paddingLeft: 20}}>
                      {item.unit}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            ) : (
              <></>
            )}
            <View
              style={{
                width: '100%',
                height: '20%',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  width: '60%',
                  height: '100%',
                  borderWidth: 0.5,
                  borderRadius: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View style={{justifyContent: 'center', marginLeft: 14}}>
                  <Bag />
                </View>
                <CustomInputText
                  PlaceHolder="No. of bags"
                  txt={Bookingdata.numberOfBags?.toLocaleString()}
                  readonly={true}
                />
              </View>
              <TouchableOpacity
                style={{
                  width: '35%',
                  borderWidth: 0.5,
                  height: '100%',
                  borderRadius: 8,
                  paddingLeft: 12,
                  justifyContent: 'center',
                }}
                onPress={() => {}}>
                <Text style={textStyles.bodyB4}>Bag size</Text>
                <Text
                  style={
                    SelectedBagsize == ''
                      ? [textStyles.bodyB3, {color: 'black'}]
                      : [textStyles.headingH8, {color: 'black'}]
                  }>
                  {Bookingdata.SelectedBagsize}
                </Text>
              </TouchableOpacity>
            </View>
            {isClickedBagsize ? (
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.BagSizeScrollView}>
                {BagSize.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{
                      width: '100%',
                      borderRadius: 8,
                      height: 31,
                      marginVertical: 9,
                      justifyContent: 'center',
                    }}
                    onPress={() => {
                      setSelectedBagsize(item.BagSize.split(' ')[0]);
                      setIsClickedBagsize(!isClickedBagsize);
                    }}>
                    <Text style={{fontWeight: 'bold', paddingLeft: 20}}>
                      {item.BagSize}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            ) : (
              <></>
            )}
          </View>
          <View style={{width: '89%'}}>
            <Text
              style={[textStyles.headingH6_5, {marginTop: 24, color: 'black'}]}>
              Booking payment details
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 16,
              }}>
              <Text
                style={[
                  textStyles.bodyB3,
                  {width: 206, color: 'black'},
                ]}>{`${Totaldays} days ${formatDate(
                Bookingdata?.startDate?.dateString || '',
              )} - ${formatDate(Bookingdata?.endDate?.dateString || '')} for ${
                Bookingdata?.weight
              } ${Bookingdata?.SelectedUnit}  / ${Bookingdata.numberOfBags} (${
                Bookingdata.SelectedBagsize
              })`}</Text>
              <Text style={[textStyles.bodyB2, {color: 'black'}]}>
                ₹ {TotalCost}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 14,
              }}>
              <Text style={[textStyles.bodyB3, {width: 206, color: 'black'}]}>
                {'Transport charge for 20 km'}
              </Text>
              <Text style={[textStyles.bodyB2, {color: 'black'}]}>+ ₹ 100</Text>
            </View>
            <View
              style={{
                borderTopWidth: 1,
                borderColor: '#E0E1E1',
                marginVertical: 8,
              }}
            />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={[textStyles.headingH6_5, {width: 206, color: 'black'}]}>
                {'Total'}
              </Text>
              <Text style={[textStyles.headingH6_5, {color: 'black'}]}>
                ₹ {TotalCost + 100}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 24,
                marginBottom: 16,
              }}>
              <Text style={[textStyles.bodyB3, {color: '#545554'}]}>
                {
                  'Request will be accepted or rejected within 24 hours by the warehouse owner'
                }
              </Text>
            </View>

            <ButtonWithAutoWidth
              role="iButton"
              text="Submit request"
              txtcolor="#FFFFFF"
              bgcolor="#0C447D"
              borderColor="#0C447D"
              // onPress={handleBooking}
              onPress={() => setIsVisible(true)}
            />
          </View>
        </View>
      </Layout>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}>
        <View style={styles.modalOverlay} />
        <View style={styles.modalContainer}>
          <TouchableOpacity
            onPress={() => setIsVisible(false)}
            style={styles.dismissButton}>
            <Dismiss />
          </TouchableOpacity>
          <View style={styles.optionPosition}>
            <View style={styles.modalTitle}>
              <Text style={styles.modalText}>
                Are you sure you want to submit the booking request
              </Text>
              <View style={styles.buttonRow}>
                <View style={styles.buttonHalf}>
                  <ButtonWithAutoWidth
                    txtcolor="#07294B"
                    borderColor="#07294B"
                    text="Go back"
                    role="iButton"
                    onPress={() => {
                      setIsVisible(false);
                      navigation.goBack();
                    }}
                  />
                </View>
                <View style={styles.buttonHalf}>
                  <ButtonWithAutoWidth
                    role="iButton"
                    text="Yes, submit"
                    bgcolor="#0C447D"
                    borderColor="#0C447D"
                    txtcolor="#FFFFFF"
                    onPress={() => {
                      handleBooking();
                      setIsVisible(false);
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BookWarehouse;

const styles = StyleSheet.create({
  SearchContainer: {
    marginTop: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    height: 260,
    // backgroundColor: 'purple'
  },
  calender: {
    backgroundColor: 'white',
    width: '100%',
    zIndex: 1,
    position: 'absolute',
    top: '23%',
    // left: '5%',
    borderWidth: 0.5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 5, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  commodityScrollView: {
    backgroundColor: 'white',
    width: '100%',
    zIndex: 1,
    position: 'absolute',
    top: '50%',
    // left: '5%',
    height: 443,
    borderWidth: 0.5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 5, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  UnitScrollView: {
    backgroundColor: 'white',
    width: '35%',
    zIndex: 1,
    position: 'absolute',
    top: '75%',
    left: '65%',
    height: 'auto',
    borderWidth: 0.5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 5, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  BagSizeScrollView: {
    backgroundColor: 'white',
    width: '35%',
    zIndex: 1,
    position: 'absolute',
    top: '102%',
    left: '65%',
    height: 'auto',
    borderWidth: 0.5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 5, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalOverlay: {
    backgroundColor: '#5E5E5EB2',
    width: '100%',
    height: '100%',
  },
  modalContainer: {
    width: '93%',
    top: '40%',
    left: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    paddingVertical: 20,
  },
  optionPosition: {
    marginHorizontal: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    alignItems: 'center',
    marginTop: 42,
    marginBottom: 16,
  },
  modalText: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19.2,
    color: '#1C1C1C',
    textAlign: 'center',
    fontFamily: 'Poppins',
    marginBottom: 32,
  },
  buttonRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonHalf: {
    width: '48%',
  },
  dismissButton: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
});
