import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import Dissmiss from '../../assets/Dissmiss';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../../types/navigationTypes';
import Toast from 'react-native-toast-message';
import {Booking} from '../../service/api';
import {Warehouse} from '../../types/entities';
import {NavigationData} from '../warehouseFarmer/SearchWarehouse';
import {SafeAreaView} from 'react-native-safe-area-context';
import {formatDate} from '../../utils/date';
import DropdownInput from '../../components/customDropdown';
import BookingTick from '../../assets/BookingTick';

interface DateObject {
  dateString: string;
  day: number;
  month: number;
  timestamp: number;
  year: number;
}

type DetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'WOBookWarehouse'
>;

const WOBookWarehouse: React.FC<DetailsScreenProps> = ({navigation, route}) => {
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
  const [SelectedUnit, setSelectedUnit] = useState<string>('');
  const [SelectedBagsize, setSelectedBagsize] = useState<string>('');
  const [weight, setweight] = useState<string>('');
  const [startDate, setStartDate] = useState<DateObject | null>(null);
  const [endDate, setEndDate] = useState<DateObject | null>(null);
  const [isVisible, setIsVisible] = useState<boolean | undefined>(false);
  const [allFieldsFilled, setAllFieldsFilled] = useState<boolean>(false);

  const [menu, setMenu] = useState<boolean>(false);
  const [notification, setNotification] = useState<boolean>(false);
  const handleMenu = () => {
    setMenu(!menu);
  };
  const handleNotification = () => {
    setNotification(!notification);
  };

  useEffect(() => {
    console.log('Start Date : ', startDate?.dateString);
  }, [startDate]);
  const GetNoOfBags = (bagsize: string, weight: string) => {
    const Bag = parseInt(bagsize);
    const Weight = parseInt(weight);
    const Bags = Weight / Bag;

    if (SelectedUnit == 'MT') {
      return Math.round(Bags * 1000).toString();
    } else {
      return Math.round(Bags * 100).toString();
    }
  };
  const Bookingdata = {
    SelectedBagsize,
    SelectedCommodity,
    SelectedUnit,
    endDate,
    startDate,
    weight: weight || '', // Ensure weight is not null
    numberOfBags: parseInt(GetNoOfBags(SelectedBagsize, weight)),
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

  function calculateCostPerBagPerDay(
    warehouse: Warehouse,
    bookingdata: NavigationData,
  ): number | null {
    const selectedCommodity = warehouse.Commodity.find(
      commodity => commodity.name === bookingdata.SelectedCommodity,
    );
    if (!selectedCommodity) {
      console.error('Commodity not found in the warehouse');
      return null;
    }

    const bagWeight = parseFloat(bookingdata.SelectedBagsize);
    const pricePerDay = selectedCommodity.price_perday.find(
      price => parseFloat(price.weight) === bagWeight,
    );
    if (!pricePerDay) {
      console.error('Price per day not found for the selected bag size');
      return null;
    }

    return pricePerDay.price;
  }

  function calculateDaysBetweenDates(
    startDate: string | undefined,
    endDate: string | undefined,
  ): number {
    // Parse the start and end dates into Date objects
    const start = new Date(startDate || '');
    const end = new Date(endDate || '');

    // Calculate the difference in time (milliseconds)
    const differenceInTime = end.getTime() - start.getTime();

    // Convert the time difference from milliseconds to days
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    // Return the absolute value of the difference in days to avoid negative results
    return Math.abs(differenceInDays);
  }

  const {warehouse} = route.params;
  //console.log(warehouse?.Commodity[0].price_perday);

  const handleBooking = async () => {
    const totalDays = calculateDaysBetweenDates(
      Bookingdata?.startDate?.dateString,
      Bookingdata?.endDate?.dateString,
    );
    const totalCost =
      calculateCostPerBagPerDay(warehouse, Bookingdata) *
      totalDays *
      Bookingdata?.numberOfBags;
    try {
      const booking = await Booking.create_booking(warehouse?._id || '', {
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
        bagSize: `${SelectedBagsize} kg`,
        total_price: totalCost,
        requestcapacity: Bookingdata.weight || '',
      });
      console.log(booking, 100);
      // Toast.show({
      //     type: 'success',
      //     text1: 'Success',
      //     text2: 'Warehouse Booked Successfully',
      // })
      setIsVisible(true);
      //navigation.goBack();
    } catch (error) {
      console.log('Error in booking : ', error);
      navigation.goBack();
    }
  };
  //const navigation = useNavigation<NavigationProp<Record<string, object>>>();

  const explore = [
    {id: 1, color: '#C8FFF5'},
    {id: 2, color: '#FFE4F2'},
    {id: 3, color: '#C8FFF5'},
  ];

  const Unit = [{unit: 'MT'}, {unit: 'QT'}];
  // const BagSize = [
  //     { BagSize: '25 kg bag' },
  //     { BagSize: '50 kg bag' },
  //     { BagSize: '75 kg bag' },
  //     { BagSize: '100 kg bag' },
  // ];

  const handleChangeDate = (date: DateObject) => {
    setshowCalender(false);
    ModalType === 'START_DATE' ? setStartDate(date) : setEndDate(date);
    setModalType('');
  };

  const handlePressedStartDate = () => {
    setIsClickedUnit(false);
    setIsClickedBagsize(false);
    setIsClickedCommodity(false);
    ModalType == 'END_DATE'
      ? (setModalType('START_DATE'),
        showCalender == false ? setshowCalender(true) : setshowCalender(true))
      : (setshowCalender(!showCalender), setModalType('START_DATE'));
  };
  const handlePressedEndDate = () => {
    setIsClickedUnit(false);
    setIsClickedBagsize(false);
    setIsClickedCommodity(false);
    ModalType == 'START_DATE'
      ? (setModalType('END_DATE'),
        showCalender == false ? setshowCalender(true) : setshowCalender(true))
      : (setshowCalender(!showCalender), setModalType('END_DATE'));
  };
  const today = new Date().toISOString().split('T')[0];
  const selected_commodity = warehouse?.Commodity?.find(item => {
    return item.name === SelectedCommodity;
  });

  useEffect(() => {
    setAllFieldsFilled(
      SelectedCommodity !== '' &&
        SelectedUnit !== '' &&
        SelectedBagsize !== '' &&
        startDate !== null &&
        endDate !== null &&
        weight !== '',
    );
  }, [
    SelectedCommodity,
    SelectedUnit,
    SelectedBagsize,
    startDate,
    endDate,
    weight,
  ]);
  return (
    <SafeAreaView style={{backgroundColor: '#FFFFFF', flex: 1}}>
      <HeaderComponent title={'Book warehouse'} />
      <View style={{alignItems: 'center', justifyContent: 'space-between'}}>
        <View>
          <Text style={[textStyles.headingH6_5, {color: 'black'}]}>
            {warehouse?.warehouse_name}
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{padding: 5}}>
            <Location />
          </View>
          <View style={{flexDirection: 'column'}}>
            <Text
              style={[textStyles.bodyB3, {width: 'auto', color: 'black'}]}>{`${
              warehouse?.city
            } ${warehouse?.State || warehouse?.locality_area}`}</Text>
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
              onPress={handlePressedStartDate}
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
                {startDate == null ? null : (
                  <Text style={textStyles.bodyB4}>Start Date</Text>
                )}
                <Text
                  style={
                    startDate == null
                      ? textStyles.bodyB3
                      : [textStyles.headingH8, {color: 'black'}]
                  }>
                  {startDate == null ? 'Start Date' : startDate.dateString}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handlePressedEndDate}
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
                  {endDate == null ? 'End date' : endDate.dateString}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {showCalender ? (
            <View style={styles.calender}>
              <Calendar
                minDate={today}
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
                theme={{
                  todayTextColor: '#00adf5',
                  arrowColor: 'blue',
                  disabledArrowColor: '#d9e1e8',
                }}
                hideExtraDays={true}
              />
            </View>
          ) : (
            <></>
          )}
          <DropdownInput
            selectedValue={SelectedCommodity}
            setSelectedValue={setSelectedCommodity}
            items={warehouse?.Commodity?.map(c => c.name)}
            label="Commodity"
            placeholder="Commodity"
            icon={<Commodity />}
          />
          <View
            style={{
              width: '100%',
              height: '20%',
              justifyContent: 'space-between',
              flexDirection: 'row',
              zIndex: -10,
            }}>
            <View
              style={{
                width: '60%',
                height: '100%',
                borderWidth: 0.5,
                borderRadius: 8,
                flexDirection: 'row',
                alignItems: 'center',
                // zIndex: -10,
              }}>
              <View style={{justifyContent: 'center', marginLeft: 14}}>
                <Weight />
              </View>
              <CustomInputText
                PlaceHolder="Weight"
                onTextChange={setweight}
                keyboardType="numeric"
              />
            </View>
            <DropdownInput
              selectedValue={SelectedUnit}
              setSelectedValue={setSelectedUnit}
              items={Unit.map(u => u.unit)}
              label="Unit"
              placeholder="Unit"
              //icon={<Commodity/>}
              height="100%"
              width="35%" // Specify the width here
            />
          </View>

          <View
            style={{
              width: '100%',
              height: '20%',
              justifyContent: 'space-between',
              flexDirection: 'row',
              zIndex: -60,
            }}>
            <View
              style={{
                width: '60%',
                height: '100%',
                borderWidth: 0.5,
                borderRadius: 8,
                flexDirection: 'row',
                alignItems: 'center',
                // zIndex: -10,
              }}>
              <View style={{justifyContent: 'center', marginLeft: 14}}>
                <Bag />
              </View>
              <CustomInputText
                PlaceHolder="No. of bags"
                txt={
                  weight && SelectedUnit && SelectedBagsize
                    ? GetNoOfBags(SelectedBagsize, weight)
                    : ''
                }
                keyboardType="numeric"
              />
            </View>
            <DropdownInput
              selectedValue={SelectedBagsize}
              setSelectedValue={setSelectedBagsize}
              items={selected_commodity?.price_perday.map(
                p => `${p.weight} kg bag`,
              )}
              label="Bag Size"
              placeholder="Bag size"
              //icon={<Commodity/>}
              height="100%"
              width="35%" // Specify the width here
            />
          </View>
        </View>
        <View
          style={{
            marginTop: 16,
            zIndex: -10,
            width: '90%',
          }}>
          {allFieldsFilled && (
            <View style={{width: '98%'}}>
              <Text
                style={[
                  textStyles.headingH6_5,
                  {marginTop: 24, color: 'black'},
                ]}>
                Booking payment details
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 16,
                  width: '100%',
                }}>
                <Text
                  style={[
                    textStyles.bodyB3,
                    {width: 206, color: 'black'},
                  ]}>{`${calculateDaysBetweenDates(
                  Bookingdata?.startDate?.dateString,
                  Bookingdata?.endDate?.dateString,
                )} days ${formatDate(
                  Bookingdata?.startDate?.dateString || '',
                )} - ${formatDate(
                  Bookingdata?.endDate?.dateString || '',
                )} for \n${Bookingdata?.weight} ${
                  Bookingdata?.SelectedUnit
                }  / ${Bookingdata.numberOfBags} (${
                  Bookingdata.SelectedBagsize
                }kg bag)`}</Text>
                <Text style={[textStyles.bodyB2, {color: 'black'}]}>
                  ₹{' '}
                  {(
                    calculateCostPerBagPerDay(warehouse, Bookingdata) *
                    calculateDaysBetweenDates(
                      Bookingdata?.startDate?.dateString,
                      Bookingdata?.endDate?.dateString,
                    ) *
                    Bookingdata?.numberOfBags
                  ).toFixed(2)}
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
                <Text style={[textStyles.bodyB2, {color: 'black'}]}>
                  + ₹ 100
                </Text>
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
                  style={[
                    textStyles.headingH6_5,
                    {width: 206, color: 'black'},
                  ]}>
                  {'Total'}
                </Text>
                <Text style={[textStyles.headingH6_5, {color: 'black'}]}>
                  ₹{' '}
                  {(
                    calculateCostPerBagPerDay(warehouse, Bookingdata) *
                      calculateDaysBetweenDates(
                        Bookingdata?.startDate?.dateString,
                        Bookingdata?.endDate?.dateString,
                      ) *
                      Bookingdata?.numberOfBags +
                    100
                  ).toFixed(2)}
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
            </View>
          )}
          <CustomButton
            disabled={!allFieldsFilled}
            role="iButton"
            text="Book warehouse"
            txtcolor="#FFFFFF"
            bgcolor="#0C447D"
            borderColor="#0C447D"
            onPress={handleBooking}
          />
        </View>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}>
        <View style={styles.modalOverlay} />
        <View style={styles.modalContainer}>
          <TouchableOpacity
            onPress={() => {
              setIsVisible(false);
              navigation.goBack();
            }}
            style={styles.DissmissBotton}>
            <Dissmiss />
          </TouchableOpacity>
          <View style={styles.optionPosition}>
            <View style={styles.modalTitle}>
              <BookingTick height={56} width={56} />
              <Text style={[textStyles.headingH7, styles.modalText]}>
                The warehouse booking has been confirmed
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default WOBookWarehouse;

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
    // height: 443,
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
    height: 222,
    top: 257,
    left: 16,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
  },
  DissmissBotton: {
    position: 'absolute',
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    right: 22,
    top: 24,
  },
  optionPosition: {
    top: 70,
    marginHorizontal: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    top: 36,
    position: 'absolute',
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 32,
  },
  modalText: {
    color: '#1C1C1C',
    textAlign: 'center',
  },
});
