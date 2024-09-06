import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderComponent from '../../components/Header';
import textStyles from '../../components/textStyles';
import {Booking, Weighbridge} from '../../service/api';
import {Calendar} from 'react-native-calendars';
import CalendarModal from '../../components/Calendar';
import CustomInputText from '../../components/CustomInputText';
import Calender from '../../assets/Calender';
import TimeIMG from '../../assets/Time';
import Weight from '../../assets/Weight';
import Info from '../../assets/Info';
import Dropdown from '../../assets/Dropdown';
import Cross from '../../assets/Cross';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../../types/navigationTypes';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {convertDate, formatDate} from '../../utils/date';
import Layout from '../../layouts/layout';

interface DateObject {
  dateString: string;
  day: number;
  month: number;
  timestamp: number;
  year: number;
}

type WeightBridgeDataProps = NativeStackScreenProps<
  RootStackParamList,
  'New weighbridge data'
>;

const WeightBridgeData: React.FC<WeightBridgeDataProps> = ({navigation}) => {
  const [isClickedCommodity, setIsClickedCommodity] = useState<
    boolean | undefined
  >(false);
  const [SelectedCommodity, setSelectedCommodity] = useState<string>('');
  const [Time, setTime] = useState<string>('');
  const [Txt, setTxt] = useState<string>('');
  const [Txt1, setTxt1] = useState<string>('');
  const [DepositDate, setDepositDate] = useState<string>('');
  const [showCalender, setshowCalender] = useState<boolean>(false);
  const [booking, setBooking] = useState<string[]>([]);
  const [bookingDetails, setBookingDetails] = useState<string[]>([]);
  const [staticBookingDetails, setStaticBookingDetails] = useState<string[][]>(
    [],
  );
  const [trigger, setTrigger] = useState(false);
  const [isClickedUnit, setIsClickedUnit] = useState<boolean | undefined>(
    false,
  );
  const [SelectedUnit, setSelectedUnit] = useState<string>('');
  const [isClickedUnit1, setIsClickedUnit1] = useState<boolean | undefined>(
    false,
  );
  const [SelectedUnit1, setSelectedUnit1] = useState<string>('');
  const [timeToggle, setTimeToggle] = useState(false);
  const [clearToggle, setClearToggle] = useState(false);
  const heading = ['Commodity', 'StartDate', 'EndDate'];
  const handleChangeDate = (date: DateObject) => {
    const month = String(date.month).padStart(2, '0');
    const day = String(date.day).padStart(2, '0');
    setshowCalender(false);
    setDepositDate(`${date.year}${month}${day}`);
  };
  const clearFormCondition =
    bookingDetails.length === 0 &&
    SelectedCommodity === '' &&
    DepositDate === null &&
    Time === '' &&
    Txt === '' &&
    Txt1 === '';
  const saveCondition =
    bookingDetails.length !== 0 &&
    SelectedCommodity !== '' &&
    DepositDate !== null &&
    Time !== '' &&
    Txt !== '' &&
    Txt1 !== '';
  const handlePressedDepositDate = () => {
    setshowCalender(!showCalender);
  };
  const handleTime = (timestamp: Date) => {
    const hours = timestamp.getHours();
    const minutes = String(timestamp.getMinutes()).padStart(2, '0');
    setTime(`${hours}:${minutes}`);
  };
  const Unit = [{unit: 'MT'}, {unit: 'QT'}];

  const handleClearToggle = () => {
    setClearToggle(!clearToggle);
  };
  const handleTimeToggle = () => {
    setTimeToggle(!timeToggle);
  };
  const handleClear = () => {
    handleClearToggle();
    setSelectedCommodity('');
    setBookingDetails([]);
    setTime('');
    setDepositDate('');
    setTxt('');
    setTxt1('');
    setSelectedUnit('');
    setSelectedUnit1('');
    setTrigger(!trigger);
  };
  const saveData = async () => {
    const res = await Weighbridge.add_details(
      SelectedCommodity,
      Txt,
      SelectedUnit,
      Txt1,
      SelectedUnit1,
      Time,
    );
    console.log('success :', res);
    navigation.goBack();
  };
  const getData = async () => {
    try {
      let temp = await Booking.get_all_bookings_farmer();
      temp = temp.filter(item => item.isAccepted);
      temp = temp.filter(item => !item.isBookingWeighbridgeAdded);
      console.log(temp[0], 100);
      const tempy: [string, string[]][] = temp.map(item => {
        return [item._id, [item.Commodity[0].name, item.fromDate, item.toDate]];
      });
      const temp1 = tempy.map(item => item[0]);
      const temp2 = tempy.map(item => item[1]);
      setBooking(temp1);
      setStaticBookingDetails(temp2);
    } catch (error) {
      console.log(error);
    }
  };
  const renderText = (item: string, index: number) => {
    const value =
      index > 0 ? convertDate(bookingDetails[index]) : bookingDetails[index];
    return (
      <View style={styles.requestTextContainer}>
        <Text style={styles.desc}>{item}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    );
  };
  useEffect(() => {
    console.log(99);
    getData();
    setTimeout(getData, 500);
  }, []);

  useEffect(() => {
    const selectedDate = new Date();
    const month = selectedDate.toLocaleString('default', {
      month: 'short',
    });
    const day = selectedDate.getDate();
    const year = selectedDate.getFullYear();
    setDepositDate(`${day} ${month} ${year}`);
  });
  return (
    <View style={{backgroundColor: '#FFFFFF', flex: 1}}>
      <Layout>
        <HeaderComponent title={'Enter weighbridge data'} />
        <View style={{paddingHorizontal: 16, gap: 16, zIndex: -2}}>
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
                  alignItems: 'center',
                  paddingRight: 10,
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
                    {SelectedCommodity == '' ? 'Booking ID' : SelectedCommodity}
                  </Text>
                </View>
                <Dropdown />
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
                      setSelectedCommodity(item);
                      const temp = staticBookingDetails[booking.indexOf(item)];
                      console.log(temp);
                      setBookingDetails(temp);
                      setIsClickedCommodity(!isClickedCommodity);
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
          {bookingDetails.length == 0 ? null : (
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
                {DepositDate === '' ? null : (
                  <Text style={textStyles.bodyB4}>Today's date</Text>
                )}
                <Text
                  style={
                    DepositDate === ''
                      ? textStyles.bodyB3
                      : [textStyles.headingH8, {color: 'black'}]
                  }>
                  {DepositDate === '' ? "Today's date" : DepositDate}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleTimeToggle}
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
                <TimeIMG />
              </View>
              <View>
                {Time == '' ? '' : <Text style={textStyles.bodyB4}>Time</Text>}
                <Text
                  style={
                    Time == ''
                      ? textStyles.bodyB3
                      : [textStyles.headingH8, {color: 'black'}]
                  }>
                  {Time == '' ? 'Time' : Time}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '100%',
              height: 56,
              justifyContent: 'space-between',
              flexDirection: 'row',
              zIndex: -2,
            }}>
            <View
              style={{
                width: '60%',
                height: '100%',
                borderWidth: 0.5,
                borderRadius: 8,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 12,
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row', gap: 8, width: '70%'}}>
                <View style={{justifyContent: 'center'}}>
                  <Weight />
                </View>
                {trigger && (
                  <CustomInputText
                    PlaceHolder="Gross weight"
                    txt={Txt}
                    onTextChange={txt => setTxt(txt)}
                    keyboard="numeric"
                  />
                )}
                {!trigger && (
                  <CustomInputText
                    PlaceHolder="Gross weight"
                    txt={Txt}
                    onTextChange={txt => setTxt(txt)}
                    keyboard="numeric"
                  />
                )}
              </View>
              <TouchableOpacity
                onPressIn={() => {}}
                onPressOut={() => {}}
                style={{justifyContent: 'center'}}>
                <Info />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                width: '35%',
                borderWidth: 0.5,
                height: '100%',
                borderRadius: 8,
                paddingHorizontal: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              onPress={() => setIsClickedUnit(!isClickedUnit)}>
              <View>
                {SelectedUnit == '' ? null : (
                  <Text style={textStyles.bodyB4}>Unit</Text>
                )}
                <Text
                  style={
                    SelectedUnit == ''
                      ? textStyles.bodyB3
                      : [textStyles.headingH8, {color: 'black'}]
                  }>
                  {SelectedUnit == '' ? 'Unit' : SelectedUnit}
                </Text>
              </View>
              <View style={{justifyContent: 'center'}}>
                <Dropdown />
              </View>
            </TouchableOpacity>
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
                    <Text
                      style={{
                        fontWeight: 'bold',
                        paddingLeft: 20,
                        color: 'black',
                      }}>
                      {item.unit}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            ) : (
              <></>
            )}
          </View>
          <View
            style={{
              width: '100%',
              height: 56,
              justifyContent: 'space-between',
              flexDirection: 'row',
              zIndex: -3,
            }}>
            <View
              style={{
                width: '60%',
                height: '100%',
                borderWidth: 0.5,
                borderRadius: 8,
                paddingHorizontal: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row', gap: 8, width: '70%'}}>
                <View style={{justifyContent: 'center'}}>
                  <Weight />
                </View>
                {trigger && (
                  <CustomInputText
                    PlaceHolder="Tare weight"
                    txt={Txt1}
                    onTextChange={txt => setTxt1(txt)}
                    keyboard="numeric"
                  />
                )}
                {!trigger && (
                  <CustomInputText
                    PlaceHolder="Tare weight"
                    txt={Txt1}
                    onTextChange={txt => setTxt1(txt)}
                    keyboard="numeric"
                  />
                )}
              </View>
              <TouchableOpacity
                onPressIn={() => {}}
                onPressOut={() => {}}
                style={{justifyContent: 'center'}}>
                <Info />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                width: '35%',
                borderWidth: 0.5,
                height: '100%',
                borderRadius: 8,
                paddingHorizontal: 12,
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
              }}
              onPress={() => setIsClickedUnit1(!isClickedUnit1)}>
              <View>
                {SelectedUnit == '' ? null : (
                  <Text style={textStyles.bodyB4}>Unit</Text>
                )}
                <Text
                  style={
                    SelectedUnit == ''
                      ? textStyles.bodyB3
                      : [textStyles.headingH8, {color: 'black'}]
                  }>
                  {SelectedUnit1 == '' ? 'Unit' : SelectedUnit1}
                </Text>
              </View>
              <View style={{justifyContent: 'center'}}>
                <Dropdown />
              </View>
            </TouchableOpacity>
            {isClickedUnit1 ? (
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
                      setSelectedUnit1(item.unit);
                      setIsClickedUnit1(!isClickedUnit1);
                    }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        paddingLeft: 20,
                        color: 'black',
                      }}>
                      {item.unit}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            ) : (
              <></>
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 22,
              zIndex: -5,
              justifyContent: 'space-between',
            }}>
            <Text style={textStyles.headingH8}>
              Net weight{' '}
              <Text style={textStyles.bodyB4}>(automatically calculated)</Text>
            </Text>
            <View
              style={{
                width: 82,
                height: 40,
                backgroundColor: '#CEDAE5',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 6,
              }}>
              <Text style={textStyles.headingH8}>
                {Txt !== '' && Txt1 !== ''
                  ? (parseFloat(Txt) - parseFloat(Txt1)).toFixed(2)
                  : null}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.buttonModalContainer}>
          <TouchableOpacity
            style={[
              styles.reject,
              {borderColor: clearFormCondition ? '#989E9A' : '#07294B'},
            ]}
            onPress={handleClearToggle}
            disabled={clearFormCondition}>
            <Text
              style={[
                styles.rejectText,
                {color: clearFormCondition ? '#989E9A' : '#07294B'},
              ]}>
              Clear Form
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.accept,
              {backgroundColor: saveCondition ? '#07294B' : '#989E9A'},
            ]}
            onPress={saveData}
            disabled={!saveCondition}>
            <Text
              style={[
                styles.acceptText,
                {color: saveCondition ? 'white' : 'black'},
              ]}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </Layout>
      <Modal visible={clearToggle} transparent={true}>
        <TouchableOpacity
          style={styles.modalContainer}
          onPress={handleClearToggle}>
          <View style={styles.popup}>
            <View style={styles.popupHeader}>
              <TouchableOpacity onPress={handleClearToggle}>
                <Cross />
              </TouchableOpacity>
            </View>
            <Text style={styles.prompt}>
              This will clear all information from the form. Are you sure?
            </Text>
            <View style={styles.buttonPopupContainer}>
              <TouchableOpacity
                style={styles.reject}
                onPress={handleClearToggle}>
                <Text style={styles.rejectText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.accept} onPress={handleClear}>
                <Text style={styles.acceptText}>Yes, clear form</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      <DateTimePickerModal
        isVisible={timeToggle}
        mode="time"
        onConfirm={handleTime}
        onCancel={handleTimeToggle}
      />
      <CalendarModal
        toggleCalendar={showCalender}
        setDate={setDepositDate}
        handleToggleCalendar={handlePressedDepositDate}
      />
    </View>
  );
};

export default WeightBridgeData;

const styles = StyleSheet.create({
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
  UnitScrollView: {
    backgroundColor: 'white',
    width: '35%',
    zIndex: 100,
    position: 'absolute',
    top: '10%',
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
  buttonModalContainer: {
    height: '7%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '4%',
    marginTop: 16,
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
    fontFamily: 'Poppins-SemiBold',
    color: '#07294B',
    fontSize: 16,
  },
  accept: {
    width: '47%',
    backgroundColor: '#0C447D',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptText: {
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
    fontSize: 16,
  },
  requestContainer: {
    width: '100%',
    height: '25%',
    backgroundColor: '#F7F7F7',
    alignSelf: 'center',
    borderColor: '#C1C4C2',
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -2,
  },
  requestTextContainer: {
    height: '33.5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  desc: {
    fontFamily: 'NotoSerif-Regular',
    color: 'black',
    fontSize: 14,
    width: '45%',
  },
  value: {
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
    fontSize: 14,
    width: '45%',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  popup: {
    width: '90%',
    height: '22%',
    backgroundColor: 'white',
    borderRadius: 16,
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
  buttonPopupContainer: {
    height: '35%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
  },
});
