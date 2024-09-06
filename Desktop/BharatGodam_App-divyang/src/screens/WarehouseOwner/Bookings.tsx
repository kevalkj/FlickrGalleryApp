import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import Table from '../../components/Table';
import HomeHeader from '../../components/HomeHeader';
import HomeMenu from '../../components/HomeMenu';
import HomeNotification from '../../components/HomeNotification';
import Sort from '../../assets/Sort';
import Searching from '../../assets/Searching';
import {ScrollView} from 'react-native-gesture-handler';
import NavBar from '../../components/NavBar';
import Next from '../../assets/Next';
import Prev from '../../assets/Prev';
import {convertDate} from '../../utils/date';
import {Booking, authApi} from '../../service/api';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../../types/navigationTypes';
import {ActivityIndicator} from 'react-native-paper';
import CustomModal from '../../components/LoadingModal';
import Layout from '../../layouts/layout';

type BookingsProps = NativeStackScreenProps<RootStackParamList, 'Bookings'>;

const height = Dimensions.get('window').height;

const Bookings: React.FC<BookingsProps> = ({route, navigation}) => {
  const {variant} = route.params;
  const [menu, setMenu] = useState<boolean>(false);
  const [notification, setNotification] = useState<boolean>(false);
  const [search, setSearch] = useState('');
  const [toggleSort, setToggleSort] = useState(false);
  const [back, setBack] = useState(false);
  const [front, setFront] = useState(true);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(10);
  const [reload, setReload] = useState(true);
  const [loading, setLoading] = useState(true);
  const SortcontainerHeight = variant === 'accepted' ? '650%' : '850%';
  const rangeOptions = [
    'Start date',
    'End date',
    'commodity type',
    'Customer name : A to Z',
    'Customer name : Z to A',
    'Total weight : Low to high',
    'Total weight : High to low',
    ...(variant !== 'accepted' ? ['Accepted', 'Rejected'] : []),
  ];
  let heading = [
    'Warehouse',
    'Customer name',
    'Commodity',
    'Start date',
    'End date',
    'Total weight',
    'Total amount',
    'Action',
  ];
  if (variant === 'accepted') {
    heading.pop();
    heading = ['Booking ID', ...heading];
  }

  const [Staticdata, setStaticData] = useState<(string | boolean)[][]>([]);
  const [data, setData] = useState<(string | boolean)[][]>([]);
  const handleMenu = () => {
    setMenu(!menu);
  };
  const handleNotification = () => {
    setNotification(!notification);
  };
  // handle search logic here
  const handleSearch = () => {
    if (!search || search === '') {
      setData(Staticdata.slice(min, max));
      return;
    }
    const filteredData = Staticdata.filter(item =>
      item.some(val =>
        String(val).toLowerCase().includes(search.toLowerCase()),
      ),
    );
    setData(filteredData.slice(min, max));
  };

  // handle sort logic here
  const handleSort = (option: string) => {
    let sortedData = [...Staticdata];

    const customerNameIndex = variant === 'accepted' ? 2 : 1;
    const totalWeightIndex = variant === 'accepted' ? 6 : 5;
    const commodityTypeIndex = variant === 'accepted' ? 3 : 2;
    const startDateIndex = variant === 'accepted' ? 4 : 3;
    const endDateIndex = variant === 'accepted' ? 5 : 4;
    //const weightIndex = variant === 'accepted' ? 5 : 4;
    const statusIndex = variant === 'accepted' ? 6 : 7;

    switch (option) {
      case 'Customer name : A to Z':
        sortedData.sort((a, b) =>
          String(a[customerNameIndex]).localeCompare(
            String(b[customerNameIndex]),
          ),
        );
        break;

      case 'Customer name : Z to A':
        sortedData.sort((a, b) =>
          String(b[customerNameIndex]).localeCompare(
            String(a[customerNameIndex]),
          ),
        );
        break;

      case 'Total weight : Low to high':
        sortedData.sort(
          (a, b) =>
            parseFloat(String(a[totalWeightIndex]).replace(' MT', '')) -
            parseFloat(String(b[totalWeightIndex]).replace(' MT', '')),
        );
        break;

      case 'Total weight : High to low':
        sortedData.sort(
          (a, b) =>
            parseFloat(String(b[totalWeightIndex]).replace(' MT', '')) -
            parseFloat(String(a[totalWeightIndex]).replace(' MT', '')),
        );
        break;

      case 'Start date':
        sortedData.sort(
          (a, b) =>
            new Date(String(b[startDateIndex])).getTime() -
            new Date(String(a[startDateIndex])).getTime(),
        );
        break;

      case 'End date':
        sortedData.sort(
          (a, b) =>
            new Date(String(a[endDateIndex])).getTime() -
            new Date(String(b[endDateIndex])).getTime(),
        );
        break;

      case 'commodity type':
        sortedData.sort((a, b) =>
          String(a[commodityTypeIndex]).localeCompare(
            String(b[commodityTypeIndex]),
          ),
        );
        break;

      case 'Accepted':
        sortedData = Staticdata.filter(
          item => item[statusIndex] === 'Accepted',
        );
        break;

      case 'Rejected':
        sortedData = Staticdata.filter(
          item => item[statusIndex] === 'Rejected',
        );
        break;

      default:
        sortedData = Staticdata;
    }

    setStaticData(sortedData);
    setData(sortedData.slice(min, max));
    setToggleSort(false);
  };
  const handleToggleSort = () => {
    setToggleSort(!toggleSort);
  };
  const handleNext = () => {
    if (max + 10 > Staticdata.length) {
      if (max + 1 <= Staticdata.length) {
        setMin(max);
        setMax(max + (Staticdata.length % 10));
        setFront(false);
        setBack(true);
        setData(Staticdata.slice(max, max + (Staticdata.length % 10)));
        return;
      }
      return;
    }
    if (max + 10 === Staticdata.length) {
      setMin(max);
      setMax(max + 10);
      setFront(false);
      setBack(true);
      setData(Staticdata.slice(max, max + 10));
      return;
    }
    setMin(max);
    setMax(max + 10);
    setBack(true);
    setFront(true);
    setData(Staticdata.slice(max, max + 10));
  };
  const handlePrev = () => {
    if (max % 10 > 1) {
      setMax(max - (max % 10));
      setMin(min - 10);
      setData(Staticdata.slice(min - 10, max - (max % 10)));
      setBack(true);
      setFront(true);
      return;
    }
    if (min - 10 === 0) {
      setMax(max - 10);
      setMin(min - 10);
      setData(Staticdata.slice(min - 10, max - 10));
      setBack(false);
      setFront(true);
      return;
    }

    setMax(max - 10);
    setMin(min - 10);
    setData(Staticdata.slice(min - 10, max - 10));
  };
  const handleNavigation = () => {
    navigation.navigate('Bookings', {
      variant: variant === 'accepted' ? 'requests' : 'accepted',
    });
  };
  const renderDropdownOptions = (option: string) => {
    return (
      <TouchableOpacity
        style={styles.dropDownOptions}
        onPress={() => handleSort(option)}>
        <Text style={styles.dropDownText}>{option}</Text>
      </TouchableOpacity>
    );
  };
  const getData = async (variant: string) => {
    try {
      setLoading(true);
      let temp = await Booking.get_all_bookings_farmer();
      if (variant === 'accepted') {
        temp = temp.filter(item => item.isAccepted);
      }
      const tempy = [];
      for (const item of temp) {
        const fromDate = convertDate(String(item.fromDate));
        const toDate = convertDate(String(item.toDate));
        const action = item.isRejected
          ? 'Rejected'
          : item.isAccepted
          ? 'Accepted'
          : 'Action';

        // Fetch user data with error handling
        let user;
        try {
          user = await authApi.getUser(item.user);
          if (user.role === 'manager') {
            user.firstName = user.name;
          }
        } catch (userError: any) {
          console.error(
            `Error fetching user: ${item.user}`,
            userError.response.data.error,
          );
          user = {firstName: 'Unknown User'}; // Default value for missing user
        }

        let commodities = '';
        if (item.Commodity) {
          item.Commodity.forEach(com => (commodities += com.name + ', '));
          commodities = commodities.slice(0, -2); // Remove trailing comma and space
        }
        let price = item.total_price ? Math.round(item.total_price) : 0;
        const data = [
          item?.bookingId || item?._id,
          item.warehouse?.warehouse_name,
          user.firstName,
          commodities,
          fromDate,
          toDate,
          Math.round(item.totalWeight) + ' MT',
          '₹ ' + price,
          action,
          item._id,
        ];
        tempy.push(variant === 'accepted' ? data.slice(0, 9) : data.slice(1));
      }
      const max = tempy.length >= 10 ? 10 : tempy.length;
      const condition = tempy.length >= 10;
      setFront(condition);
      setMax(max);
      setMin(0);
      setStaticData(tempy);
      setData(tempy.slice(0, max));
      setReload(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData(variant);
    //setTimeout(getData(variant), 500);
  }, [route.params]);

  return (
    <View style={styles.container}>
      <Layout>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{alignItems: 'center'}}>
          <HomeHeader
            menuCallBack={handleMenu}
            notificationCallBack={handleNotification}
          />
          <Text style={styles.heading}>My bookings</Text>
          <View style={styles.navigationButtonContainer}>
            <TouchableOpacity
              style={
                variant === 'accepted' ? styles.idleButton : styles.focusButton
              }
              disabled={variant === 'accepted' ? false : true}
              onPress={handleNavigation}>
              <Text
                style={
                  variant === 'accepted'
                    ? styles.buttonTextIdle
                    : styles.buttonText
                }>
                Booking requests
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                variant !== 'accepted' ? styles.idleButton : styles.focusButton
              }
              disabled={variant !== 'accepted' ? false : true}
              onPress={handleNavigation}>
              <Text
                style={
                  variant !== 'accepted'
                    ? styles.buttonTextIdle
                    : styles.buttonText
                }>
                Accepted bookings
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.filterContainer}>
            <View style={styles.searchContainer}>
              <Searching />
              <TextInput
                style={styles.search}
                placeholder="Search"
                placeholderTextColor={'#707371'}
                onChangeText={text => setSearch(text)}
                onSubmitEditing={handleSearch}
              />
            </View>

            <TouchableOpacity style={styles.sortby} onPress={handleToggleSort}>
              <Text style={styles.sortText}>Sort by</Text>
              <Sort />
            </TouchableOpacity>
            {toggleSort && (
              <View style={[styles.dropDownOptionsContainer]}>
                {rangeOptions.map(option => renderDropdownOptions(option))}
              </View>
            )}
          </View>
          {/* <Table
          height={height}
          heading={heading}
          data={data}
          commodity={variant === 'accepted' ? 3 : 2}
          weight={variant === 'accepted' ? 6 : 5}
          action={variant === 'accepted' ? false : true}
        /> */}
          <CustomModal isVisible={loading} setIsVisible={setLoading} />
          <Table
            height={height}
            heading={heading}
            data={data}
            commodity={variant === 'accepted' ? 3 : 2}
            weight={variant === 'accepted' ? 6 : 5}
            action={variant === 'accepted' ? false : true}
          />

          <View style={styles.navigationContainer}>
            <TouchableOpacity
              style={[
                {
                  backgroundColor: back ? '#0C447D' : '#E0E1E1',
                },
                styles.navButton,
              ]}
              disabled={!back}
              onPress={handlePrev}>
              <Prev color={back && 'white'} />
            </TouchableOpacity>
            <Text style={styles.navText}>
              Showing {min + 1} to {max} of {Staticdata.length}
            </Text>
            <TouchableOpacity
              style={[
                {
                  backgroundColor: front ? '#0C447D' : '#E0E1E1',
                },
                styles.navButton,
              ]}
              disabled={!front}
              onPress={handleNext}>
              <Next color={!front && '#C1C4C2'} />
            </TouchableOpacity>
          </View>
          <Modal visible={menu} transparent={true}>
            <HomeMenu exitCallBack={handleMenu} />
          </Modal>
          <Modal visible={notification} transparent={true}>
            <HomeNotification
              exitCallBack={handleNotification}
              Notification={[]}
            />
          </Modal>
        </ScrollView>
      </Layout>
      <NavBar current="Bookings" />
      <CustomModal isVisible={loading} setIsVisible={setLoading} />
    </View>
  );
};

export default Bookings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  heading: {
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
    fontSize: 20,
  },
  navigationButtonContainer: {
    flexDirection: 'row',
    width: '95%',
    height: height * 0.055,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 12,
  },
  focusButton: {
    width: '47%',
    height: '100%',
    backgroundColor: '#0038FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  idleButton: {
    width: '47%',
    height: '100%',
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Poppins-Regular',
    color: 'white',
    fontSize: 16,
  },
  buttonTextIdle: {
    fontFamily: 'Poppins-Regular',
    color: '#989E9A',
    fontSize: 16,
  },
  sortText: {
    color: '#707371',
    fontFamily: 'NotoSerif-Regular',
    fontSize: 14,
    marginRight: 5,
  },
  dropDownOptions: {height: '14%', width: '80%', justifyContent: 'center'},
  dropDownText: {
    fontFamily: 'NotoSerif-Regular',
    color: 'black',
    fontSize: 14,
    marginRight: 8,
  },
  dropDownOptionsContainer: {
    backgroundColor: 'white',
    width: '72%',
    zIndex: 10,
    position: 'absolute',
    top: '110%',
    height: '700%',
    right: 0,
    marginRight: 10,
    paddingVertical: '1%',
    borderColor: '#989E9A',
    borderWidth: 1,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 5, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterContainer: {
    height: height * 0.05,
    width: '90%',
    marginVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchContainer: {
    width: '60%',
    height: '100%',
    borderWidth: 1,
    borderColor: '#707371',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  search: {
    width: '70%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    color: '#707371',
  },
  sortby: {
    width: '30%',
    height: '100%',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#707371',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  navigationContainer: {
    width: '90%',
    height: height * 0.15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: -20,
  },
  navButton: {
    width: '10%',
    aspectRatio: 1,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    flexGrow: 1,
    textAlign: 'center',
    color: 'black',
  },
});
