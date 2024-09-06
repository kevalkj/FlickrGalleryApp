import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderComponent from '../../components/Header';
import {TouchableOpacity} from 'react-native';
import Calender from '../../assets/Calender';
import CalendarModal from '../../components/Calendar';
import textStyles from '../../components/textStyles';
import {Calendar} from 'react-native-calendars';
import CustomInputText from '../../components/CustomInputText';
import {ScrollView} from 'react-native';
import CustomButton from '../../components/CustomButton';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RadioButton} from 'react-native-paper';
import Layout from '../../layouts/layout';
import {GradeAndDeposit, Booking, authApi} from '../../service/api';
import {WithdrawalDetails, addDeposit} from '../../types/entities';
import {convertDate} from '../../utils/date';
import {AxiosError} from 'axios';
import Toast from 'react-native-toast-message';

interface DateObject {
  dateString: string;
  day: number;
  month: number;
  timestamp: number;
  year: number;
}
const {width, height} = Dimensions.get('window');
const NewDeposit = () => {
  const [isClickedCommodity, setIsClickedCommodity] = useState<
    boolean | undefined
  >(false);
  const [SelectedCommodity, setSelectedCommodity] = useState<string>('');
  const [showCalender, setshowCalender] = useState<boolean>(false);
  const [ModalType, setModalType] = useState<string>('');
  const [DepositDate, setDepositDate] = useState<string>('');
  const [RevalidationDate, setRevalidationDate] = useState<string>('');
  const [ExpiryDate, setExpiryDate] = useState<string>('');
  const [SlotNo, setSlotNo] = useState<string>('');
  const navigation = useNavigation<NavigationProp<Record<string, object>>>();
  const [checked, setChecked] = useState('');
  const [booking, setBooking] = useState<string[]>([]);
  const [StaticData, setStaticData] = useState<WithdrawalDetails[]>([]);
  const [bookingDetails, setBookingDetails] = useState<string[]>([]);
  const [tobeGraded, settobeGraded] = useState<boolean>(true);
  // Temp fix
  const formatDate = (date: string) => {
    if (date === '') {
      return '';
    }
    const parts = date.split(' ');
    const day = parts[0].padStart(2, '0');
    const month = parts[1];
    const year = parts[2];
    const months: {[key: string]: string} = {
      Jan: '01',
      Feb: '02',
      Mar: '03',
      Apr: '04',
      May: '05',
      Jun: '06',
      Jul: '07',
      Aug: '08',
      Sep: '09',
      Oct: '10',
      Nov: '11',
      Dec: '12',
    };
    const monthNumber = months[month];
    return `${year}-${monthNumber}-${day}`;
  };
  const Booking_ID = [
    {booking_ID: '#78877'},
    {booking_ID: '#78878'},
    {booking_ID: '#78879'},
    {booking_ID: '#78880'},
    {booking_ID: '#88877'},
    {booking_ID: '#18877'},
    {booking_ID: '#68877'},
  ];

  useEffect(() => {
    const getData = async () => {
      let temp = await Booking.get_all_bookings_farmer();
      temp = temp.filter(item => item.isAccepted);
      temp = temp.filter(item => !item.isBookingDeposited);
      console.log(temp[0], 103);
      setBooking(temp.map(item => item._id));
      setStaticData(temp);
    };
    getData();
  }, []);

  const handleChangeDate = (date: DateObject) => {
    setshowCalender(false);
    const selectedDate = new Date(date.dateString);
    const month = selectedDate.toLocaleString('default', {
      month: 'short',
    });
    const day = selectedDate.getDate();
    const year = selectedDate.getFullYear();

    ModalType === 'Deposit date'
      ? setDepositDate(`${day} ${month} ${year}`)
      : ModalType === 'Revalidation date'
      ? setRevalidationDate(`${day} ${month} ${year}`)
      : setExpiryDate(`${day} ${month} ${year}`);
    setModalType('');
  };

  const handlePressedDepositDate = () => {
    if (ModalType === 'Revalidation date' || ModalType === 'Expiry date') {
      setModalType('Deposit date');
      setshowCalender(true);
    } else {
      setshowCalender(!showCalender);
      setModalType('Deposit date');
    }
  };

  const handlePressedRevalidationDate = () => {
    if (ModalType === 'Deposit date' || ModalType === 'Expiry date') {
      setModalType('Revalidation date');
      setshowCalender(true);
    } else {
      setshowCalender(!showCalender);
      setModalType('Revalidation date');
    }
  };

  const handlePressedExpiryDate = () => {
    if (ModalType === 'Deposit date' || ModalType === 'Revalidation date') {
      setModalType('Expiry date');
      setshowCalender(true);
    } else {
      setshowCalender(!showCalender);
      setModalType('Expiry date');
    }
  };

  useEffect(() => {
    checked == 'exchangeCommodity' ? setRevalidationDate('') : null;
  }, [checked]);

  const allFieldsFilled =
    SlotNo !== '' &&
    SelectedCommodity !== '' &&
    DepositDate !== '' &&
    ExpiryDate !== '' &&
    (checked === 'non-exchangeCommodity' ? RevalidationDate !== '' : true);

  console.log(bookingDetails, 868);
  const heading = [
    'Name',
    'Email id',
    'Warehouse name',
    'Commodity',
    'Start date',
    'End date',
    'Total weight',
    'Total actual weight',
    'Total no of bags',
    'Bag size',
  ];
  const renderText = (item: string, index: number) => {
    return (
      <View style={styles.requestTextContainer}>
        <Text style={styles.desc}>{item}</Text>
        <Text style={styles.value}>{bookingDetails[index]}</Text>
      </View>
    );
  };
  const handleSelected = async (item: string) => {
    setSelectedCommodity(item);
    const temp: WithdrawalDetails = StaticData[booking.indexOf(item)];
    console.log(temp, 990);
    const user_id = temp.user;
    const userDetails = await authApi.getUser(user_id);
    setBookingDetails([
      userDetails.firstName,
      userDetails.email,
      temp.warehouse.warehouse_name,
      temp.Commodity[0].name,
      convertDate(temp.fromDate),
      convertDate(temp.toDate),
      temp.totalWeight + 'MT',
      temp.totalWeight + 'MT',
      temp.noOfBags,
      temp.bagSize,
    ]);
    console.log(1);
    setIsClickedCommodity(!isClickedCommodity);
  };
  const handleSubmit = async () => {
    const payload: addDeposit = {
      bookingId: SelectedCommodity,
      depositDate: formatDate(DepositDate),
      slotNumber: SlotNo,
      expiraryDate: formatDate(ExpiryDate),
      commodityType: checked,
    };

    if (checked != 'exchangeCommodity') {
      console.log(checked);
      payload.revalidationDate = formatDate(RevalidationDate);
    }

    try {
      await GradeAndDeposit.addDeposit(payload);
      if (tobeGraded) {
        navigation.navigate('Pending transactions', {});
      } else {
        navigation.goBack();
      }
      Toast.show({
        type: 'success',
        text2: 'Deposit added successfully !',
        text1: 'Success!',
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('Axios error: ', error.message);
        console.error('Response data: ', error.response?.data);
        console.error('Status: ', error.response?.status);
        Toast.show({
          type: 'error',
          text1: 'An error occured !',
          text2: error.response?.data?.error,
        });
      } else {
        console.error('Unknown error: ', error);
        Toast.show({
          type: 'error',
          text1: 'An error occured !',
          //text2:error.response?.data?.error
        });
      }
    }
  };

  return (
    <Layout>
      <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <HeaderComponent title={'New deposit'} />
        <ScrollView scrollEnabled={!isClickedCommodity}>
          <View style={{gap: 16, paddingHorizontal: 16}}>
            <View>
              <TouchableOpacity
                style={{
                  borderWidth: 0.5,
                  width: '100%',
                  borderRadius: 8,
                  height: 56,
                  paddingLeft: 9.5,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={() => {
                  setIsClickedCommodity(!isClickedCommodity);
                }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 6,
                  }}>
                  <View>
                    {SelectedCommodity == '' ? null : (
                      <Text style={textStyles.bodyB4}>Booking ID</Text>
                    )}
                    <Text
                      style={
                        SelectedCommodity == ''
                          ? textStyles.bodyB3
                          : [textStyles.headingH8, {color: 'black'}]
                      }>
                      {SelectedCommodity == ''
                        ? 'Booking ID'
                        : SelectedCommodity}
                    </Text>
                  </View>
                  <View
                    style={{
                      marginRight: 6,
                    }}>
                    <Image
                      source={require('../../assets/images/DropDown.png')}
                    />
                  </View>
                </View>
              </TouchableOpacity>
              {isClickedCommodity ? (
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  style={styles.commodityScrollView}>
                  {booking.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={{
                        width: '100%',
                        borderRadius: 8,
                        height: 50,
                        justifyContent: 'center',
                      }}
                      onPress={() => {
                        handleSelected(item);
                      }}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          paddingLeft: 20,
                          color: 'black',
                        }}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              ) : (
                <></>
              )}
            </View>
            {bookingDetails.length > 0 && (
              <View style={styles.requestContainer}>
                {heading.map((item, index) => renderText(item, index))}
              </View>
            )}
            <View
              style={{
                width: '100%',
                height: 56,
                justifyContent: 'space-between',
                flexDirection: 'row',
                zIndex: -2,
              }}>
              <TouchableOpacity
                onPress={handlePressedDepositDate}
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
                    marginRight: 9.5,
                  }}>
                  <Calender />
                </View>
                <View>
                  {DepositDate == '' ? null : (
                    <Text style={textStyles.bodyB4}>Deposit date</Text>
                  )}
                  <Text
                    style={
                      DepositDate == ''
                        ? textStyles.bodyB3
                        : [textStyles.headingH8, {color: 'black'}]
                    }>
                    {DepositDate == '' ? 'Deposit date' : DepositDate}
                  </Text>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  width: '48%',
                  borderWidth: 0.5,
                  height: '100%',
                  borderRadius: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <CustomInputText
                  PlaceHolder="Slot number"
                  onTextChange={text => setSlotNo(text)}
                  //keyboard="numeric"
                />
              </View>
            </View>
            <View
              style={{
                width: '100%',
                height: 56,
                justifyContent: 'space-between',
                flexDirection: 'row',
                zIndex: -2,
              }}>
              {checked !== 'exchangeCommodity' ? (
                <TouchableOpacity
                  onPress={handlePressedRevalidationDate}
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
                      marginRight: 9.5,
                    }}>
                    <Calender />
                  </View>
                  <View>
                    {RevalidationDate == '' ? null : (
                      <Text style={textStyles.bodyB4}>Revalidation date</Text>
                    )}
                    <Text
                      style={[
                        RevalidationDate == ''
                          ? textStyles.bodyB3
                          : [textStyles.headingH8, {color: 'black'}],
                        {width: 103},
                      ]}>
                      {RevalidationDate == ''
                        ? 'Revalidation date'
                        : RevalidationDate}
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <View
                  style={{
                    borderColor: '#FFFFFF',
                    width: '48%',
                    borderWidth: 0.5,
                    height: '100%',
                    borderRadius: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#E0E1E1',
                  }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      marginLeft: 14,
                      marginRight: 9.5,
                    }}>
                    <Calender />
                  </View>
                  <View>
                    {RevalidationDate == '' ? null : (
                      <Text style={textStyles.bodyB4}>Revalidation date</Text>
                    )}
                    <Text
                      style={[
                        RevalidationDate == ''
                          ? textStyles.bodyB3
                          : [textStyles.headingH8, {color: 'black'}],
                        {width: 103},
                      ]}>
                      {RevalidationDate == ''
                        ? 'Revalidation date'
                        : RevalidationDate}
                    </Text>
                  </View>
                </View>
              )}

              <TouchableOpacity
                onPress={handlePressedExpiryDate}
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
                    marginRight: 9.5,
                  }}>
                  <Calender />
                </View>
                <View>
                  {ExpiryDate == '' ? null : (
                    <Text style={textStyles.bodyB4}>Expiry date</Text>
                  )}
                  {/* <Text style={textStyles.bodyB4}>End date</Text> */}
                  <Text
                    style={
                      ExpiryDate == ''
                        ? textStyles.bodyB3
                        : [textStyles.headingH8, {color: 'black'}]
                    }>
                    {ExpiryDate == '' ? 'Expiry date' : ExpiryDate}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{gap: -5, zIndex: -2}}>
              <View style={styles.radioButton}>
                {checked === 'exchangeCommodity' ? (
                  <RadioButton
                    value="Pledge"
                    status={'checked'}
                    onPress={() => setChecked('exchangeCommodity')}
                  />
                ) : (
                  <TouchableOpacity
                    style={styles.uncheckedBox}
                    onPress={() => setChecked('exchangeCommodity')}>
                    <View style={styles.innerUncheckedBox} />
                  </TouchableOpacity>
                )}
                <Text style={styles.radioButtonText}>Exchange commodity</Text>
              </View>
              <View style={styles.radioButton}>
                {/* <RadioButton
                  value="Pledge"
                  status={
                    checked === 'non-exchangeCommodity'
                      ? 'checked'
                      : 'unchecked'
                  }
                  onPress={() => setChecked('non-exchangeCommodity')}
                /> */}
                {checked === 'non-exchangeCommodity' ? (
                  <RadioButton
                    value="Pledge"
                    status={'checked'}
                    onPress={() => setChecked('non-exchangeCommodity')}
                  />
                ) : (
                  <TouchableOpacity
                    style={styles.uncheckedBox}
                    onPress={() => setChecked('non-exchangeCommodity')}>
                    <View style={styles.innerUncheckedBox} />
                  </TouchableOpacity>
                )}
                <Text style={styles.radioButtonText}>
                  Non-exchange commodity
                </Text>
              </View>
            </View>
            <View style={{zIndex: -2}}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '400',
                  color: 'black',
                }}>
                Grading
              </Text>
            </View>

            <View style={{zIndex: -2}}>
              <View style={styles.radioButton}>
                {tobeGraded ? (
                  <RadioButton
                    value="Pledge"
                    status={tobeGraded === true ? 'checked' : 'unchecked'}
                    onPress={() => settobeGraded(true)}
                  />
                ) : (
                  <TouchableOpacity
                    style={styles.uncheckedBox}
                    onPress={() => settobeGraded(true)}>
                    <View style={styles.innerUncheckedBox} />
                  </TouchableOpacity>
                )}
                {/* <RadioButton
                  value="Pledge"
                  status={tobeGraded === true ? 'checked' : 'unchecked'}
                  onPress={() => settobeGraded(true)}
                /> */}
                <Text style={styles.radioButtonText}>Yes</Text>
              </View>
              <View style={styles.radioButton}>
                {!tobeGraded ? (
                  <RadioButton
                    value="Pledge"
                    status={tobeGraded === false ? 'checked' : 'unchecked'}
                    onPress={() => settobeGraded(false)}
                  />
                ) : (
                  <TouchableOpacity
                    style={styles.uncheckedBox}
                    onPress={() => settobeGraded(false)}>
                    <View style={styles.innerUncheckedBox} />
                  </TouchableOpacity>
                )}
                {/*<RadioButton
                  value="Pledge"
                  status={tobeGraded === false ? 'checked' : 'unchecked'}
                  onPress={() => settobeGraded(false)}
                />*/}
                <Text style={styles.radioButtonText}>No</Text>
              </View>
            </View>

            <CustomButton
              text="Save deposit"
              txtcolor="#FFFFFF"
              bgcolor="#0C447D"
              borderColor="#0C447D"
              role="iButton"
              onPress={() => handleSubmit()}
              disabled={!allFieldsFilled}
            />
          </View>
        </ScrollView>
      </View>
      <CalendarModal
        toggleCalendar={showCalender}
        setDate={
          ModalType === 'Deposit date'
            ? setDepositDate
            : ModalType === 'Revalidation date'
            ? setRevalidationDate
            : setExpiryDate
        }
        handleToggleCalendar={() => setshowCalender(false)}
      />
    </Layout>
  );
};

export default NewDeposit;

const styles = StyleSheet.create({
  calender: {
    backgroundColor: 'white',
    width: '100%',
    zIndex: 1,
    position: 'absolute',
    top: '7%',
    left: '4.8%',
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
    zIndex: 10,
    position: 'absolute',
    top: '105%',
    // left: '4.8%',
    // height: 228,
    borderWidth: 0.5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 5, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButtonText: {
    ...textStyles.bodyB3,
    color: '#1C1C1C',
  },
  requestContainer: {
    width: '100%',
    height: 'auto',
    alignSelf: 'center',
    borderColor: '#C1C4C2',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: '5%',
    paddingVertical: '5%',
    zIndex: -2,
    // marginTop: 24,
  },
  requestTextContainer: {
    height: height * 0.045,
    flexDirection: 'row',
  },
  desc: {
    fontFamily: 'NotoSerif-Regular',
    color: 'black',
    fontSize: 12,
    flex: 1,
  },
  value: {
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
    fontSize: 11,
    flex: 1,
  },
  uncheckedBox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#0C447D', // Color of the border for unchecked state
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
    marginVertical: 6,
  },
  innerUncheckedBox: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'white',
  },
});
