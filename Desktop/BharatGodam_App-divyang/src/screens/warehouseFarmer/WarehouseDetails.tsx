import {
  Image,
  Linking,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ButtonWithAutoWidth from '../../components/ButtonWithAutoWidth';
import Dismiss from '../../assets/Dissmiss';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import HeaderComponent from '../../components/Header';
import Search from '../../assets/Search';
import Like from '../../assets/Like';
import Share from '../../assets/Share';
import textStyles from '../../components/textStyles';
import Location from '../../assets/Location';
import Commodity from '../../assets/Commodity';
//import { Calendar } from 'react-native-calendars';
import Calender from '../../assets/Calender';
import Weight from '../../assets/Weight';
import Bag from '../../assets/Bag';
import Security from '../../assets/Security';
import BankLoan from '../../assets/BankLoan';
import Logistic from '../../assets/Logistic';
import WDRA from '../../assets/WDRA';
import Tick from '../../assets/Tick';
// import { RootStackParamList } from '../../../App'
import {RootStackParamList} from '../../types/navigationTypes';
import {formatDate} from '../../utils/date';
import {Warehouse} from '../../types/entities';
import {authApi} from '../../service/api';
import {NavigationData} from './SearchWarehouse';
import Layout from '../../layouts/layout';
import ImageCollage from '../../components/ImageCollage';
import Dropdown from '../../assets/Dropdown';
import Dropup from '../../assets/Dropup';
import SearchWarehouseModal from '../../components/BookWarehouseModal';
import Crop from '../../assets/Crop';
//import Warehouse from '../WarehouseOwner/Warehouse';

type WarehouseDetailsRouteProp = RouteProp<
  RootStackParamList,
  'WarehouseDetails'
>;

type Props = {
  route: WarehouseDetailsRouteProp;
};

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

  const bagWeight = parseFloat(bookingdata.SelectedBagsize.split(' ')[0]);
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

const WarehouseDetails = ({route}: Props) => {
  const {warehouse, Bookingdata, simmilarWarehouses} = route.params;
  //console.log(Bookingdata);

  const totalDays = calculateDaysBetweenDates(
    Bookingdata?.startDate?.dateString,
    Bookingdata?.endDate?.dateString,
  );
  const totalCost = Math.round(
    calculateCostPerBagPerDay(warehouse, Bookingdata) *
      totalDays *
      Bookingdata?.numberOfBags,
  );

  //const token = useSelector((state)=>state.user.token);
  const [isVisible, setIsVisible] = useState<boolean | undefined>(false);
  const [isModalVIsible, setIsModalVIsible] = useState<boolean>(false);
  const [isDropdown, setIsDropdown] = useState<boolean | undefined>(false);
  const navigation = useNavigation<NavigationProp<Record<string, object>>>();
  const [kycStatus, setKycStatus] = useState<boolean>(false);

  useEffect(() => {
    const fetchKycStatus = async () => {
      try {
        const response = await authApi.getUserProfile();
        setKycStatus(response.isKycDone);
      } catch (e) {
        // handle error
        console.error(e);
      }
    };
    fetchKycStatus();
    // setKycStatus(true);
  }, []);

  const photos = [...warehouse.main_photo, ...warehouse.other_photo];

  return (
    <View style={styles.container}>
      <Layout>
        <HeaderComponent
          title={''}
          component={() => (
            <View style={styles.headerIcons}>
              <TouchableOpacity style={styles.iconButton}>
                <Search props={undefined} color={'#212121'} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Like />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Share />
              </TouchableOpacity>
            </View>
          )}
        />
        <ScrollView style={styles.scrollView}>
          <View style={styles.banner}>
            {photos.length > 0 && <ImageCollage imageUris={photos} />}
          </View>
          <View style={styles.customView1}>
            <View style={styles.customView3}>
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
                    style={[
                      textStyles.bodyB3,
                      {width: 'auto', color: 'black'},
                    ]}>
                    {warehouse.locality_area}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      const scheme = Platform.select({
                        ios: 'maps://0,0?q=',
                        android: 'geo:0,0?q=',
                      });
                      const lat = 28.682733; // need from backend in warehouse data
                      const lng = 77.293384; // need from backend in warehouse data
                      const latLng = `${lat},${lng}`;
                      const label = warehouse.warehouse_name;
                      const url = Platform.select({
                        ios: `${scheme}${label}@${latLng}`,
                        android: `${scheme}${latLng}(${label})`,
                      });
                      Linking.openURL(url);
                    }}>
                    <Text style={[textStyles.bodyB4, {color: '#0038FF'}]}>
                      View on map
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={[textStyles.bodyB3, {color: 'black'}]}>
                  Available capacity :
                </Text>
                <Text style={[textStyles.bodyBoldB3, {color: 'black'}]}>
                  {`${warehouse.remainingCapacity} MT`}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={[textStyles.bodyB3, {color: 'black'}]}>
                  Total capacity :
                </Text>
                <Text style={[textStyles.bodyBoldB3, {color: 'black'}]}>
                  {`${warehouse.total_capacity} MT`}
                </Text>
              </View>
            </View>
            <View style={styles.line} />
            <View style={styles.customView4}>
              <View>
                <Text style={[textStyles.headingH7, {color: 'black'}]}>
                  Dates, commodity & weight
                </Text>
              </View>
              <View style={styles.DetailContainer}>
                <View style={{height: 40, width: 312, flexDirection: 'row'}}>
                  <TouchableOpacity
                    onPress={() => {
                      setIsModalVIsible(true);
                    }}
                    style={{
                      borderColor: '#989E9A',
                      borderWidth: 1,
                      height: 40,
                      width: 141,
                      borderRadius: 4,
                      alignItems: 'center',
                      justifyContent: 'space-evenly',
                      flexDirection: 'row',
                    }}>
                    <Calender />
                    <Text
                      style={[
                        textStyles.uiText,
                        {color: '#0038FF', lineHeight: 19},
                      ]}>
                      {formatDate(Bookingdata?.startDate?.dateString || '')} -{' '}
                      {formatDate(Bookingdata?.endDate?.dateString || '')}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setIsModalVIsible(true);
                    }}
                    style={{
                      borderColor: '#989E9A',
                      borderWidth: 1,
                      height: 40,
                      width: 90,
                      marginLeft: 8,
                      borderRadius: 4,
                      alignItems: 'center',
                      justifyContent: 'space-evenly',
                      flexDirection: 'row',
                    }}>
                    <Commodity />
                    <Text
                      style={[
                        textStyles.uiText,
                        {color: '#0038FF', lineHeight: 19},
                      ]}>
                      {Bookingdata?.SelectedCommodity}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{height: 40, width: 312, flexDirection: 'row'}}>
                  <TouchableOpacity
                    onPress={() => {
                      setIsModalVIsible(true);
                    }}
                    style={{
                      borderColor: '#989E9A',
                      borderWidth: 1,
                      height: 40,
                      width: 81,
                      borderRadius: 4,
                      alignItems: 'center',
                      justifyContent: 'space-evenly',
                      flexDirection: 'row',
                    }}>
                    <Weight />
                    <Text
                      style={[
                        textStyles.uiText,
                        {color: '#0038FF', lineHeight: 19},
                      ]}>
                      {Bookingdata?.weight} {Bookingdata?.SelectedUnit}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setIsModalVIsible(true);
                    }}
                    style={{
                      borderColor: '#989E9A',
                      borderWidth: 1,
                      height: 40,
                      width: 155,
                      marginLeft: 8,
                      borderRadius: 4,
                      alignItems: 'center',
                      justifyContent: 'space-evenly',
                      flexDirection: 'row',
                    }}>
                    <Bag />
                    <Text
                      style={[
                        textStyles.uiText,
                        {color: '#0038FF', lineHeight: 19},
                      ]}>{`${Bookingdata?.numberOfBags} (${Bookingdata?.SelectedBagsize})`}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.emptyView}>
            <Text style={[textStyles.headingH7, {color: '#000000'}]}>
              Other price details
            </Text>
            <TouchableOpacity
              onPress={() => {
                setIsDropdown(!isDropdown);
              }}
              style={{
                backgroundColor: '#0C447D',
                borderRadius: 50,
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {isDropdown ? <Dropup /> : <Dropdown />}
            </TouchableOpacity>
          </View>

          {isDropdown &&
            warehouse?.Commodity?.map(commodity => (
              <View
                style={{
                  gap: 16,
                }}>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                  <Text style={[textStyles.bodyB2, {color: '#1C1C1C'}]}>
                    Commodity :
                  </Text>
                  <Text style={[textStyles.headingH7, {color: '#1C1C1C'}]}>
                    {commodity?.name}
                  </Text>
                </View>
                <View style={{gap: 4}}>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderColor: '#E0E1E1',
                      flexDirection: 'row',
                      height: 62,
                    }}>
                    <View
                      style={{
                        paddingHorizontal: 8,
                        paddingVertical: 25,
                        gap: 16,
                        width: 164,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={[
                          textStyles.headingH7,
                          {
                            color: '#000000',
                            width: 92,
                            height: 38,
                            textAlign: 'center',
                          },
                        ]}>
                        Available options
                      </Text>
                    </View>
                    <View
                      style={{
                        paddingHorizontal: 8,
                        paddingVertical: 25,
                        gap: 16,
                        width: 164,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={[
                          textStyles.headingH7,
                          {
                            color: '#000000',
                            width: 90,
                            height: 41,
                            textAlign: 'center',
                          },
                        ]}>
                        Set price per day
                      </Text>
                    </View>
                  </View>
                  {commodity.price_perday.map(item => (
                    <View
                      key={item._id}
                      style={{
                        borderBottomWidth: 1,
                        borderColor: '#E0E1E1',
                        flexDirection: 'row',
                        height: 62,
                      }}>
                      <View
                        style={{
                          paddingHorizontal: 8,
                          paddingVertical: 25,
                          gap: 16,
                          width: 164,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={[
                            textStyles.bodyB3,
                            {
                              color: '#000000',
                              width: 56,
                              height: 21,
                              textAlign: 'center',
                            },
                          ]}>{`${item.weight}KG`}</Text>
                      </View>
                      <View
                        style={{
                          paddingHorizontal: 8,
                          paddingVertical: 25,
                          gap: 16,
                          width: 164,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={[
                            textStyles.bodyB3,
                            {
                              backgroundColor: '#B6C7D8',
                              width: 56,
                              height: 32,
                              borderRadius: 4,
                              borderColor: '#86A2BE',
                              textAlign: 'center',
                              color: '#000000',
                              textAlignVertical: 'center',
                            },
                          ]}>
                          ₹{item.price}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          <View style={styles.largeEmptyView}>
            <View style={{height: 19}}>
              <Text style={[textStyles.headingH7, {color: 'black'}]}>
                Services Offered
              </Text>
            </View>
            <View
              style={{
                height: 168,
                width: 312,
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    width: 96,
                    height: 80,
                  }}>
                  <View>
                    <Security />
                  </View>
                  <View style={{width: 79, height: 34}}>
                    <Text style={[textStyles.bodyTable, {color: 'black'}]}>
                      24x7 security
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    width: 96,
                    height: 80,
                  }}>
                  <View>
                    <BankLoan />
                  </View>
                  <View style={{width: 59, height: 34}}>
                    <Text style={[textStyles.bodyTable, {color: 'black'}]}>
                      Bank loan
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    width: 96,
                    height: 80,
                  }}>
                  <View>
                    <Logistic />
                  </View>
                  <View style={{width: 79, height: 34}}>
                    <Text style={[textStyles.bodyTable, {color: 'black'}]}>
                      Logistics
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    width: 96,
                    height: 80,
                  }}>
                  <View>
                    <WDRA />
                  </View>
                  <View style={{width: 79, height: 34}}>
                    <Text style={[textStyles.bodyTable, {color: 'black'}]}>
                      WDRA registered
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                height: 246,
                width: 312,
                paddingHorizontal: 8,
                justifyContent: 'space-evenly',
              }}>
              <View style={{height: 19}}>
                <Text style={[textStyles.headingH7, {color: 'black'}]}>
                  Can Store
                </Text>
              </View>
              <View
                style={{
                  width: 312,
                  height: 187,
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: 92,
                      height: 40,
                      justifyContent: 'space-evenly',
                    }}>
                    <View style={{width: 24, height: 24}}>
                      <Image
                        source={require('../../assets/images/Wheat.png')}
                      />
                    </View>
                    <Text style={[textStyles.bodyB3, {color: 'black'}]}>
                      Wheat
                    </Text>
                  </View>
                  <View
                    style={{
                      marginLeft: 16,
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: 112,
                      height: 40,
                      justifyContent: 'space-evenly',
                    }}>
                    <View style={{width: 24, height: 24}}>
                      <Image source={require('../../assets/images/soya.png')} />
                    </View>
                    <Text style={[textStyles.bodyB3, {color: 'black'}]}>
                      Soyabean
                    </Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: 95,
                      height: 40,
                      justifyContent: 'space-evenly',
                    }}>
                    <View style={{width: 24, height: 24}}>
                      <Image
                        source={require('../../assets/images/ajwain.png')}
                      />
                    </View>
                    <Text style={[textStyles.bodyB3, {color: 'black'}]}>
                      Ajwain
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 16,
                      alignItems: 'center',
                      width: 87,
                      height: 40,
                      justifyContent: 'space-evenly',
                    }}>
                    <View style={{width: 24, height: 24}}>
                      <Image
                        source={require('../../assets/images/jawar.png')}
                      />
                    </View>
                    <Text style={[textStyles.bodyB3, {color: 'black'}]}>
                      Jawar
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 16,
                      alignItems: 'center',
                      width: 89,
                      height: 40,
                      justifyContent: 'space-evenly',
                    }}>
                    <View style={{width: 24, height: 24}}>
                      <Image
                        source={require('../../assets/images/paddy.png')}
                      />
                    </View>
                    <Text style={[textStyles.bodyB3, {color: 'black'}]}>
                      Paddy
                    </Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: 89,
                      height: 40,
                      justifyContent: 'space-evenly',
                    }}>
                    <View style={{width: 24, height: 24}}>
                      <Image
                        source={require('../../assets/images/paddy.png')}
                      />
                    </View>
                    <Text style={[textStyles.bodyB3, {color: 'black'}]}>
                      Paddy
                    </Text>
                  </View>
                  <View
                    style={{
                      marginLeft: 16,
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: 112,
                      height: 40,
                      justifyContent: 'space-evenly',
                    }}>
                    <View style={{width: 24, height: 24}}>
                      <Image source={require('../../assets/images/soya.png')} />
                    </View>
                    <Text style={[textStyles.bodyB3, {color: 'black'}]}>
                      Soyabean
                    </Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: 92,
                      height: 40,
                      justifyContent: 'space-evenly',
                    }}>
                    <View style={{width: 24, height: 24}}>
                      <Crop width={24} height={24} />
                    </View>
                    <Text style={[textStyles.bodyB3, {color: 'black'}]}>
                      Wheat
                    </Text>
                  </View>
                  <View
                    style={{
                      marginLeft: 16,
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: 87,
                      height: 43,
                      justifyContent: 'space-evenly',
                    }}>
                    <Text style={[textStyles.headingH7, {color: '#0C447D'}]}>
                      +15 more
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                height: 244,
                width: 312,
                paddingHorizontal: 8,
                justifyContent: 'space-evenly',
              }}>
              <View style={{height: 19}}>
                <Text style={[textStyles.headingH7, {color: 'black'}]}>
                  Can Store
                </Text>
              </View>
              <View
                style={{
                  width: 312,
                  height: 185,
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 8,
                      gap: 8,
                      justifyContent: 'space-evenly',
                    }}>
                    <View
                      style={{
                        width: 24,
                        height: 24,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Tick />
                    </View>
                    <Text style={[textStyles.bodyB3, {color: 'black'}]}>
                      Warehouse management
                    </Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 8,
                      gap: 8,
                      justifyContent: 'space-evenly',
                    }}>
                    <View
                      style={{
                        width: 24,
                        height: 24,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Tick />
                    </View>
                    <Text style={[textStyles.bodyB3, {color: 'black'}]}>
                      Fumigation
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 16,
                      alignItems: 'center',
                      padding: 8,
                      gap: 8,
                      justifyContent: 'space-evenly',
                    }}>
                    <View
                      style={{
                        width: 24,
                        height: 24,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Tick />
                    </View>
                    <Text style={[textStyles.bodyB3, {color: 'black'}]}>
                      Logistics
                    </Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 8,
                      gap: 8,
                      justifyContent: 'space-evenly',
                    }}>
                    <View
                      style={{
                        width: 24,
                        height: 24,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Tick />
                    </View>
                    <Text style={[textStyles.bodyB3, {color: 'black'}]}>
                      Insurance
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 16,
                      alignItems: 'center',
                      padding: 8,
                      gap: 8,
                      justifyContent: 'space-evenly',
                    }}>
                    <View
                      style={{
                        width: 24,
                        height: 24,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Tick />
                    </View>
                    <Text style={[textStyles.bodyB3, {color: 'black'}]}>
                      Monitoring
                    </Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 8,
                      gap: 8,
                      justifyContent: 'space-evenly',
                    }}>
                    <View
                      style={{
                        width: 24,
                        height: 24,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Tick />
                    </View>
                    <Text style={[textStyles.bodyB3, {color: 'black'}]}>
                      Finance
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.bottomEmptyView}>
            <View style={{top: 12, left: 8}}>
              <Text style={[textStyles.headingH7, {color: 'black'}]}>
                Similar warehouses
              </Text>
            </View>
            <View style={{top: 47, position: 'absolute'}}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {simmilarWarehouses?.map(item => (
                  <TouchableOpacity
                    style={{
                      marginHorizontal: 8,
                      borderRadius: 8,
                      borderWidth: 1,
                    }}
                    onPress={() => {
                      navigation.navigate('WarehouseDetails', {
                        warehouse: item,
                        Bookingdata: Bookingdata,
                        simmilarWarehouses: simmilarWarehouses,
                      });
                    }}>
                    <View
                      style={{
                        width: '100%',
                        height: 126,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        backgroundColor: 'brown',
                      }}>
                      <Image
                        source={{uri: item.main_photo[0]}}
                        style={{
                          width: '100%',
                          height: '100%',
                          borderTopRightRadius: 8,
                          borderTopLeftRadius: 8,
                        }}
                      />
                    </View>
                    <View
                      style={{
                        paddingVertical: 12,
                        paddingHorizontal: 8,
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        flexDirection: 'row',
                      }}>
                      <View style={{gap: 4}}>
                        <View>
                          <Text
                            style={[textStyles.headingH6_5, {color: 'black'}]}>
                            {item.warehouse_name}
                          </Text>
                        </View>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <View style={{padding: 5}}>
                            <Location />
                          </View>
                          <View style={{flexDirection: 'column'}}>
                            <Text
                              style={[
                                textStyles.bodyB3,
                                {width: 'auto', color: 'black'},
                              ]}>
                              {item.city},{item.State || item.locality_area}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View style={{gap: 4, height: 38, width: 39}}>
                        <View>
                          <Text
                            style={{
                              fontFamily: 'Poppins-Regular',
                              fontSize: 16,
                              fontWeight: '500',
                              lineHeight: 18,
                              color: 'black',
                              width: 100,
                            }}>
                            ₹{calculateCostPerBagPerDay(item, Bookingdata)}
                          </Text>
                        </View>
                        <View>
                          <Text style={textStyles.bodyB4}>₹ 5/km</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      </Layout>
      <View style={styles.paymentDetails}>
        <View style={styles.bookInfoContainer}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 4,
            }}>
            <Text style={[textStyles.headingH7, {color: 'black'}]}>
              {`₹ ${totalCost}`}
            </Text>
            <Text style={[textStyles.bodyB3, {color: '#1C1C1C'}]}>
              {` for ${totalDays} days, ${Bookingdata?.weight} ${Bookingdata?.SelectedUnit} / ${Bookingdata?.numberOfBags} (${Bookingdata?.SelectedBagsize})`}
            </Text>
          </View>
          <Text style={textStyles.bodyB4}>
            +₹ 100 for 20 km transport charge
          </Text>
          <Text style={[textStyles.headingH6_5, {color: 'black'}]}>
            {`To pay : ₹ ${totalCost + 100}`}
          </Text>
        </View>
        <View style={styles.bookButtonContainer}>
          <ButtonWithAutoWidth
            role="iButton"
            text="Book now"
            bgcolor="#0C447D"
            borderColor="#0C447D"
            txtcolor="#FFFFFF"
            onPress={() => {
              // if kyc is false we will add kyc
              // setIsVisible(true)
              if (kycStatus == true) {
                navigation.navigate('BookWarehouse', {
                  warehouse: warehouse,
                  Bookingdata: Bookingdata,
                  TotalCost: totalCost,
                  Totaldays: totalDays,
                });
              } else {
                setIsVisible(true);
              }
            }}
          />
        </View>
      </View>
      <SearchWarehouseModal
        visible={isModalVIsible}
        onClose={() => {
          setIsModalVIsible(false);
        }}
        addr={warehouse?.city}
        onSearch={({warehouse_s, bookingData}) => {
          //console.log("Warehouse : ", warehouse_s);
          navigation.navigate('SearchResult', {
            warehouses: warehouse_s,
            addr: `${warehouse.city}, ${warehouse?.State}`,
            Bookingdata: bookingData,
          });
        }}
      />
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
                Complete your Know Your Customer (KYC) to book your warehouse
              </Text>
              <View style={styles.buttonRow}>
                <View style={styles.buttonHalf}>
                  <ButtonWithAutoWidth
                    txtcolor="#07294B"
                    borderColor="#07294B"
                    text="Back"
                    role="iButton"
                    onPress={() => setIsVisible(false)}
                  />
                </View>
                <View style={styles.buttonHalf}>
                  <ButtonWithAutoWidth
                    role="iButton"
                    text="Verify KYC"
                    bgcolor="#0C447D"
                    borderColor="#0C447D"
                    txtcolor="#FFFFFF"
                    onPress={() => {
                      navigation.navigate('KycFarmer', {});
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

export default WarehouseDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'green',
  },
  headerIcons: {
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
  },
  iconButton: {
    marginRight: 16,
  },
  scrollView: {
    width: '95%',
    height: 'auto',
    marginHorizontal: 16,
    marginTop: -8,
    // backgroundColor: 'red',
  },
  banner: {
    width: '98%',
    height: 200,
    borderRadius: 8,
    // backgroundColor: 'blue',
  },
  customView1: {
    width: '98%',
    height: 324,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginVertical: 16,
    borderRadius: 8,
    justifyContent: 'space-between',
    backgroundColor: '#F7F7F7',
  },
  customView3: {
    width: 312,
    height: 145,
    justifyContent: 'space-between',
    // backgroundColor: 'pink',
  },
  customView5: {
    width: 'auto',
    height: 'auto',
  },
  customView6: {
    width: 312,
    height: 'auto',
    paddingHorizontal: 8,
    justifyContent: 'space-between',
  },
  customView7: {
    width: 'auto',
    height: 'auto',
    marginVertical: 8,
  },
  ViewinC6: {
    width: 'auto',
    height: 'auto',
    marginVertical: 3,
  },
  line: {
    width: 312,
    height: 0,
    marginVertical: 0,
    borderTopWidth: 1,
    borderColor: '#E0E1E1',
  },
  customView4: {
    width: 312,
    height: 123,
    justifyContent: 'space-between',
    // backgroundColor: 'pink',
  },
  DetailContainer: {
    width: 312,
    height: 88,
    justifyContent: 'space-between',
  },
  emptyView: {
    width: '98%',
    height: 64,
    marginBottom: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F7F7F7',
  },
  largeEmptyView: {
    width: '98%',
    height: 749, // Since "Hug" implies height based on content
    paddingTop: 12,
    paddingRight: 8,
    paddingBottom: 12,
    paddingLeft: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 16,
    borderRadius: 8,
    backgroundColor: '#F7F7F7',
  },
  bottomEmptyView: {
    width: '98%',
    height: 261,
    gap: 0,
    marginVertical: 16,
    borderRadius: 8,
    backgroundColor: '#F7F7F7',
  },
  paymentDetails: {
    padding: 16,
    backgroundColor: '#CEDAE5',
  },
  bookInfoContainer: {
    gap: 8,
    width: 283,
  },
  bookButtonContainer: {
    position: 'relative',
    left: '50%',
    width: '46%',
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
    flexDirection: 'row',
    width: '48%',
  },
  dismissButton: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
});
