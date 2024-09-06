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
import HomeMenu from '../../components/HomeMenu';
import HomeNotification from '../../components/HomeNotification';
import Sort from '../../assets/Sort';
import Searching from '../../assets/Searching';
import {ScrollView} from 'react-native-gesture-handler';
import Next from '../../assets/Next';
import Prev from '../../assets/Prev';
import Back from '../../assets/Back';
import {warehouseApi, Weighbridge} from '../../service/api';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../../types/navigationTypes';
import CustomModal from '../../components/LoadingModal';
import {convertDate, convertToReadableTime} from '../../utils/date';
import {Warehouse} from '../../types/entities';
import Layout from '../../layouts/layout';

type WeighbridgeDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  'Weighbridge details'
>;

const height = Dimensions.get('window').height;

const WeighbridgeDetails: React.FC<WeighbridgeDetailsProps> = ({
  route,
  navigation,
}) => {
  const {variant = 'inbound'} = route.params;
  const [menu, setMenu] = useState<boolean>(false);
  const [notification, setNotification] = useState<boolean>(false);
  const [search, setSearch] = useState('');
  const [toggleSort, setToggleSort] = useState(false);
  const [back, setBack] = useState(false);
  const [front, setFront] = useState(true);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(10);
  const [reload, setReload] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const rangeOptions = [
    'Start date',
    'End date',
    'commodity type',
    'Customer name : A to Z',
    'Customer name : Z to A',
    'Total weight : Low to high',
    'Total weight : High to low',
    'inbound',
    'Rejected',
  ];
  let heading = [
    'Booking ID',
    'Warehouse',
    'Commodity',
    'Date',
    'Time',
    'Gross\nweight',
    'Tare\nweight',
    'Net weight',
    'Truck\nnumber',
    'Truck driver\nname',
  ];
  const [Staticdata, setStaticData] = useState<
    (string | boolean | undefined)[][]
  >([]);
  const [data, setData] = useState<(string | boolean | undefined)[][]>([]);
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

    switch (option) {
      case 'Customer name : A to Z':
        sortedData.sort((a, b) => String(a[1]).localeCompare(String(b[1])));
        break;

      case 'Customer name : Z to A':
        sortedData.sort((a, b) => String(b[1]).localeCompare(String(a[1])));
        break;

      case 'Total weight : Low to high':
        sortedData.sort(
          (a, b) => parseFloat(String(a[7])) - parseFloat(String(b[7])),
        );
        break;

      case 'Total weight : High to low':
        sortedData.sort(
          (a, b) => parseFloat(String(b[7])) - parseFloat(String(a[7])),
        );
        break;

      case 'Start date':
        sortedData.sort(
          (a, b) =>
            new Date(String(b[3])).getTime() - new Date(String(a[3])).getTime(),
        );
        break;

      case 'End date':
        sortedData.sort(
          (a, b) =>
            new Date(String(a[3])).getTime() - new Date(String(b[3])).getTime(),
        );
        break;

      case 'commodity type':
        sortedData.sort((a, b) => String(a[2]).localeCompare(String(b[2])));
        break;

      // case 'inbound':
      //   sortedData = Staticdata.filter(item => item[7] === 'Accepted');
      //   break;

      // case 'Rejected':
      //   sortedData = Staticdata.filter(item => item[7] === 'Rejected');
      //   break;

      default:
        sortedData = Staticdata;
    }

    // Update the data state with the sorted data
    setData(sortedData);
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
    navigation.navigate('Weighbridge details', {
      variant: variant === 'inbound' ? 'outbound' : 'inbound',
    });
  };

  const fetchWarehouse = async (WarehouseId: string) => {
    console.log(WarehouseId);

    let warehouse;
    try {
      warehouse = await warehouseApi.getWarehouseById(WarehouseId);
    } catch (WarehouseError: any) {
      //console.error(`Error `, WarehouseError?.response?.data.error);
      warehouse = {warehouse_name: 'Not Found'}; // Default value for missing warehouse
    }

    return warehouse;
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
  const getData = async () => {
    setLoading(true);
    setError(null);
    try {
      let temp = await Weighbridge.get_all_details();
      //console.log('Initial data:', temp);

      temp = temp.filter(item => item && item.booking_id);
      //console.log('After filtering null and missing booking IDs:', temp);

      if (variant === 'inbound') {
        temp = temp.filter(item => item.booking_id.isItemInWarehouse);
      } else {
        temp = temp.filter(item => !item.booking_id.isItemInWarehouse);
      }
      //console.log('After filtering based on variant:', temp[0]);

      const warehousePromises = temp.map(async item => {
        const warehouse = await fetchWarehouse(item.booking_id.warehouse);
        return {
          item,
          warehouse: (warehouse as Partial<Warehouse>).warehouse_name,
        };
      });

      const results = await Promise.all(warehousePromises);

      const tempy = results.map(({item, warehouse}) => {
        return [
          item._id,
          warehouse,
          item.booking_id.Commodity[0].name,
          convertDate(item.booking_id.fromDate),
          item.time,
          //convertToReadableTime(parseInt(item.booking_id.fromTime)),
          item.gross_weight,
          item.tore_weight,
          parseInt(item.gross_weight) - parseInt(item.tore_weight),
          item.truck_number,
          item.driver_name,
          '',
        ];
      });
      console.log('Mapped data (tempy):', tempy);

      const max = tempy.length >= 10 ? 10 : tempy.length;
      const condition = tempy.length >= 10;

      setFront(condition);
      setMax(max);
      setStaticData(tempy);
      setData(tempy.slice(min, max));
    } catch (error) {
      console.error(error);
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
      setReload(false);
      console.log(reload, 1);
    }
  };

  useEffect(() => {
    getData();
    //setTimeout(getData, 500);
  }, [route.params]);

  return (
    <View style={styles.container}>
      <Layout>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{alignItems: 'center'}}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Back />
            </TouchableOpacity>
            <Text style={styles.heading}>Weighbridge data{'\n'}details</Text>
          </View>
          <View style={styles.navigationButtonContainer}>
            <TouchableOpacity
              style={
                variant === 'inbound' ? styles.focusButton : styles.idleButton
              }
              disabled={variant === 'inbound' ? true : false}
              onPress={handleNavigation}>
              <Text
                style={
                  variant === 'inbound'
                    ? styles.buttonText
                    : styles.buttonTextIdle
                }>
                Delivery inbound
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                variant !== 'inbound' ? styles.focusButton : styles.idleButton
              }
              disabled={variant !== 'inbound' ? true : false}
              onPress={handleNavigation}>
              <Text
                style={
                  variant !== 'inbound'
                    ? styles.buttonText
                    : styles.buttonTextIdle
                }>
                Delivery outbound
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.desc}>
            Here's the weighbridge data for commodities{'\n'}entering the
            warehouse.
          </Text>
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
              <View style={styles.dropDownOptionsContainer}>
                {rangeOptions.map(option => renderDropdownOptions(option))}
              </View>
            )}
          </View>
          <CustomModal isVisible={loading} setIsVisible={setLoading} />
          <Table
            height={height}
            heading={heading}
            data={data}
            commodity={2}
            weight={7}
            action={false}
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
    </View>
  );
};

export default WeighbridgeDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: height * 0.1,
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
  navigationButtonContainer: {
    flexDirection: 'row',
    width: '95%',
    height: height * 0.055,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
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
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
    fontSize: 16,
  },
  buttonTextIdle: {
    fontFamily: 'Poppins-SemiBold',
    color: '#989E9A',
    fontSize: 16,
  },
  sortText: {
    color: 'black',
    fontFamily: 'NotoSerif-Regular',
    fontSize: 14,
    marginRight: 5,
  },
  dropDownOptions: {height: '10%', width: '80%', justifyContent: 'center'},
  dropDownText: {
    fontFamily: 'NotoSerif-Regular',
    color: 'black',
    fontSize: 14,
    marginRight: 8,
  },
  dropDownOptionsContainer: {
    backgroundColor: 'white',
    width: '72%',
    zIndex: 2,
    position: 'absolute',
    top: '110%',
    height: '850%',
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
    height: height * 0.06,
    width: '90%',
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // zIndex: -10,
  },
  searchContainer: {
    width: '60%',
    height: '100%',
    borderWidth: 1,
    borderColor: '#707371',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  desc: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'NotoSerif-Regular',
    marginVertical: 16,
    zIndex: -2,
    alignSelf: 'flex-start',
    marginHorizontal: 26,
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
    borderRadius: 12,
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
    zIndex: -2,
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
