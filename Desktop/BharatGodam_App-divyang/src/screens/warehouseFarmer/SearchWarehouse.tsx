import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import HomeHeader from '../../components/HomeHeader';
import HomeMenu from '../../components/HomeMenu';
import HomeNotification from '../../components/HomeNotification';
import CustomButton from '../../components/CustomButton';
import {Calendar} from 'react-native-calendars';
import EmailInput from '../../components/EmailInput';
import CustomInput from '../../components/CustomInputText';
import CustomImageCarousal from '../../components/CustomImageCarousalLandscape';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import textStyles from '../../components/textStyles';
import Search from '../../assets/Search';
import Calender from '../../assets/Calender';
import Weight from '../../assets/Weight';
import Commodity from '../../assets/Commodity';
import Bag from '../../assets/Bag';
import NavBar from '../../components/NavBar';
import {warehouseApi} from '../../service/api';
import getAddressFromLocation from '../../utils/Location';
// import {get} from '../../utils/auth';
import {Warehouse} from '../../types/entities';
import DropdownInput from '../../components/customDropdown';
import {SafeAreaView} from 'react-native-safe-area-context';

interface DateObject {
  dateString: string;
  day: number;
  month: number;
  timestamp: number;
  year: number;
}

export interface NavigationData {
  SelectedBagsize: string | null;
  SelectedCommodity: string | null;
  SelectedUnit: string | null;
  endDate: DateObject | null;
  startDate: DateObject | null;
  weight: string | null;
  numberOfBags?: number;
}

const today = new Date().toISOString().split('T')[0];

const {width, height} = Dimensions.get('window');
const SearchWarehouse = () => {
  const [addr, setAddr] = useState<string>('');
  const [warehouse, setWarehouse] = useState<Warehouse[] | null>(null);
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
  const [startDate, setStartDate] = useState<DateObject | null>(null);
  const [endDate, setEndDate] = useState<DateObject | null>(null);
  const [weight, setweight] = useState<string>('');
  const [menu, setMenu] = useState<boolean>(false);
  const [notification, setNotification] = useState<boolean>(false);
  const [allFieldsFilled, setAllFieldsFilled] = useState<boolean>(false);
  const handleMenu = () => {
    setMenu(!menu);
  };
  const handleNotification = () => {
    setNotification(!notification);
  };

  const minDate = startDate?.dateString || today;

  useEffect(() => {
    console.log('Min Date : ', minDate);
  }, [startDate]);

  const GetNoOfBags = (bagsize: string, weight: string) => {
    const Bag = parseInt(bagsize.split(' ')[0]);
    const Weight = parseInt(weight);
    const Bags = Weight / Bag;

    if (SelectedUnit == 'MT') {
      return Math.round(Bags * 1000).toString();
    } else {
      return Math.round(Bags * 100).toString();
    }
  };
  const handleSearchWarehouses = async () => {
    const data = {
      SelectedBagsize,
      SelectedCommodity,
      SelectedUnit,
      endDate,
      startDate,
      weight: weight || '', // Ensure weight is not null
      numberOfBags: parseInt(GetNoOfBags(SelectedBagsize, weight)),
    };
    navigation.navigate('SearchResult', {
      warehouses: warehouse,
      addr: `${addr.city}, ${addr.State}`,
      Bookingdata: data,
    });
  };

  const navigation = useNavigation<NavigationProp<Record<string, object>>>();

  const explore = [
    {id: 1, color: '#C8FFF5'},
    {id: 2, color: '#FFE4F2'},
    {id: 3, color: '#FFE3AC'},
  ];
  const Commodities = [
    {commodity: 'Bajra', code: 'BJ1', iso: 'BJF1'},
    {commodity: 'Wheat', code: 'WH1', iso: 'WHF1'},
    {commodity: 'Ajwain', code: 'AJ1', iso: 'AJF1'},
    {commodity: 'Rice', code: 'RC1', iso: 'RCF1'},
    {commodity: 'Jowar', code: 'JW1', iso: 'JWF1'},
  ];
  const Unit = [{unit: 'MT'}, {unit: 'QT'}];
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
  useEffect(() => {
    const callback = async (data: any) => {
      setAddr(data);
      console.log(data, 113);

      // const temp = await warehouseApi.searchWarehouses(addr);
      // setWarehouse(temp);
    };

    getAddressFromLocation(callback);
  }, []);

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

  useEffect(() => {
    if (addr) {
      const searchWarehouses = async () => {
        const temp = await warehouseApi.searchWarehouses({
          city: addr.city,
          commodity_name: SelectedCommodity,
        });
        setWarehouse(temp);
      };
      searchWarehouses();
    }
  }, [addr, SelectedCommodity]);
  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader
        menuCallBack={handleMenu}
        notificationCallBack={handleNotification}
      />

      <ScrollView scrollEnabled={!isClickedCommodity}>
        <View style={styles.content}>
          <View style={styles.SearchContainer}>
            <Text style={[textStyles.bodyB3, {color: 'black', left: -9}]}>
              Look for the available warehouses in 30 km radius
            </Text>
            <View
              style={{
                width: '100%',
                borderWidth: 0.5,
                borderRadius: 8,
                height: '9%',
                justifyContent: 'center',
                padding: -9,
              }}>
              <CustomInput
                PlaceHolder={
                  addr ? `${addr.city}, ${addr.State} ` : 'Fetching data'
                }
                //txt={addr ? `${addr.city}, ${addr.State} ` : "Fetching data"}
                readonly={true}
                component={() => (
                  <View style={{justifyContent: 'center', marginLeft: 15}}>
                    <Search color={'#545554'} props={undefined} />
                  </View>
                )}
              />
            </View>
            <View
              style={{
                width: '100%',
                height: '9%',
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
                    marginRight: 9.5,
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
                    marginRight: 9.5,
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
                  hideArrows={false}
                  minDate={minDate}
                  style={{borderRadius: 8, elevation: 4}}
                  onDayPress={handleChangeDate}
                  markedDates={{
                    [ModalType === 'START_DATE'
                      ? startDate?.dateString || 'defaultStartDate'
                      : endDate?.dateString || 'defaultEndDate']: {
                      selected: true,
                      // selectedColor: '#0C447D',
                      // selectedTextColor: '#FFFFFF',
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
              items={Commodities.map(c => c.commodity)}
              label="Commodity"
              placeholder="Commodity"
              icon={<Commodity />}
            />
            <View
              style={{
                width: '100%',
                height: '9%',
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
                }}>
                <View style={{justifyContent: 'center', marginLeft: 14}}>
                  <Weight />
                </View>
                <CustomInput
                  PlaceHolder="Weight"
                  onTextChange={value => setweight(value)}
                  keyboard="numeric"
                />
              </View>
              <DropdownInput
                selectedValue={SelectedUnit}
                setSelectedValue={setSelectedUnit}
                items={Unit.map(u => u.unit)}
                label="Unit"
                placeholder="Unit"
                height="100%"
                width="35%" // Specify the width here
              />
            </View>
            <View
              style={{
                width: '100%',
                height: '9%',
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
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View style={{justifyContent: 'center', marginLeft: 14}}>
                  <Bag />
                </View>
                <CustomInput
                  PlaceHolder="No. of bags"
                  keyboard="numeric"
                  txt={
                    weight && SelectedUnit && SelectedBagsize
                      ? GetNoOfBags(SelectedBagsize, weight)
                      : ''
                  }
                />
              </View>
              <DropdownInput
                selectedValue={SelectedBagsize}
                setSelectedValue={setSelectedBagsize}
                items={BagSize.map(b => b.BagSize)}
                label="Bag size"
                placeholder="Bag size"
                height="100%"
                width="35%" // Specify the width here
              />
            </View>
            <CustomButton
              role="iButton"
              disabled={!allFieldsFilled}
              text="Search"
              txtcolor="#FFFFFF"
              bgcolor="#0C447D"
              borderColor="#0C447D"
              onPress={handleSearchWarehouses}
            />

            <View style={styles.ExploreContainer}>
              <View
                style={{
                  width: '100%',
                  height: '12%',
                  marginLeft: 17,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: 20,
                    lineHeight: 24,
                    color: '#1C1C1C',
                  }}>
                  Explore our other services
                </Text>
              </View>
              <CustomImageCarousal
                data={explore}
                autoPlay={false}
                pagination={true}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <NavBar current="Warehouse" />
      <Modal visible={menu} transparent={true}>
        <HomeMenu exitCallBack={handleMenu} />
      </Modal>
      <Modal visible={notification} transparent={true}>
        <HomeNotification exitCallBack={handleNotification} Notification={[]} />
      </Modal>
    </SafeAreaView>
  );
};

export default SearchWarehouse;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    margin: '4.5%',
    flex: 1,
    width: '91.5%',
    marginBottom: '30%',
    // backgroundColor: 'blue',
    justifyContent: 'space-between',
  },
  SearchContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '110%',
    gap: 16,
    // backgroundColor: 'purple'
  },
  ExploreContainer: {
    width: '110%',
    height: '42%',
    zIndex: -5,
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
    top: '108%',
    // left: '5%',
    //height: 443,
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
    width: '100%',
    zIndex: 1,
    position: 'absolute',
    top: '108%',
    //left: '65%',
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
    width: '100%',
    zIndex: 1,
    position: 'absolute',
    top: '108%',
    //left: '65%',
    height: 'auto',
    borderWidth: 0.5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 5, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
