import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import HomeMenu from '../../components/HomeMenu';
import HomeNotification from '../../components/HomeNotification';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import HomeHeader from '../../components/HomeHeader';
import textStyles from '../../components/textStyles';
import ButtonWithAutoWidth from '../../components/ButtonWithAutoWidth';
import Plus from '../../assets/Plus';
import Dissmiss from '../../assets/Dissmiss';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FlatList} from 'react-native-gesture-handler';
import Location from '../../assets/Location';
import Edit from '../../assets/Edit';
import NavBar from '../../components/NavBar';
import Layout from '../../layouts/layout';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {Booking, authApi, warehouseApi} from '../../service/api';
import {Warehouse as warehouse} from '../../types/entities';

const Warehouse = ({route}) => {
  const data = route.params && route.params.data ? route.params.data : [];
  const [items, setItems] = useState(data);
  const [menu, setMenu] = useState<boolean>(false);
  const [notification, setNotification] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean | undefined>(false);
  const [kycStatus, setKycStatus] = useState(null);
  const [booking, setBooking] = useState<warehouse[] | null>(null);

  const role = useSelector((state: RootState) => state.user.role);
  //console.log(role);

  useEffect(() => {
    const getData = async () => {
      let temp = null;
      if (role === 'manager') {
        temp = await warehouseApi.getAllWarehousesForManager();
      } else {
        temp = await warehouseApi.getAllWarehousesForOwner();
      }
      setBooking(temp);
    };
    getData();
  }, [booking]);

  const handleMenu = () => {
    setMenu(!menu);
  };
  const handleNotification = () => {
    setNotification(!notification);
  };
  const navigation = useNavigation<NavigationProp<Record<string, object>>>();
  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <Layout>
        <HomeHeader
          menuCallBack={handleMenu}
          notificationCallBack={handleNotification}
        />
        {booking === null || booking?.length === 0 ? (
          <View style={{marginHorizontal: 16}}>
            <View
              style={{
                backgroundColor: '#F7F7F7',
                width: '100%',
                paddingHorizontal: 16,
                borderRadius: 8,
                alignItems: 'center',
                gap: 16,
                paddingVertical: 30,
              }}>
              <Text
                style={[
                  textStyles.bodyB4,
                  {width: '70%', textAlign: 'center'},
                ]}>
                Completing your profile with warehouse information helps users
                find and book with you.
              </Text>
              <View style={{width: 194, height: 48}}>
                <ButtonWithAutoWidth
                  role="iButton"
                  text="  Add warehouse"
                  txtcolor="#FFFFFF"
                  bgcolor="#0C447D"
                  borderColor="#0C447D"
                  component={() => <Plus color={'#fff'} props={undefined} />}
                  onPress={() => {
                    // if kyc is false we will add kyc
                    if (kycStatus === true) {
                      navigation.navigate('AddWarehouse', {data: data});
                    } else {
                      setIsVisible(true);
                    }
                  }}
                />
              </View>
            </View>
          </View>
        ) : (
          <View style={{flex: 1}}>
            <View style={{gap: 4, marginBottom: 24}}>
              <Text
                style={[
                  textStyles.headingH6,
                  {textAlign: 'center', color: '#1C1C1C'},
                ]}>
                Warehouses
              </Text>
              {role === 'manager' ? null : (
                <TouchableOpacity
                  style={{
                    gap: 4,
                    padding: 4,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    navigation.navigate('AddWarehouse', {data: data});
                  }}>
                  <Plus color={'#0C447D'} props={undefined} />
                  <Text style={[textStyles.buttonTextUnderline, {}]}>
                    Add warehouse
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <FlatList
              scrollEnabled
              data={booking}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <View style={{alignItems: 'center'}}>
                  <View style={{alignItems: 'center'}}>
                    <View>
                      <Text style={[textStyles.headingH6_5, {color: 'black'}]}>
                        {item.warehouse_name}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', gap: 8}}>
                      <View style={{padding: 5}}>
                        <Location />
                      </View>
                      <Text
                        style={[
                          textStyles.bodyB3,
                          {color: 'black', width: 82, textAlign: 'center'},
                        ]}>
                        {item.locality_area} {item.landmark} {item.city}{' '}
                        {item.State}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      gap: 24,
                      flexDirection: 'row',
                      marginTop: 24,
                      marginHorizontal: 14,
                    }}>
                    <View
                      style={{
                        borderRadius: 8,
                        gap: 8,
                        paddingHorizontal: 12,
                        paddingVertical: 12,
                        backgroundColor: '#FFE4F2',
                        alignItems: 'center',
                        width: '28%',
                      }}>
                      <Text
                        style={[
                          textStyles.bodyTable,
                          {color: '#1C1C1C', width: 70},
                        ]}>
                        {'Total capacity'}
                      </Text>
                      <Text style={[textStyles.headingH7, {color: '#1C1C1C'}]}>
                        {item.total_capacity}
                      </Text>
                    </View>
                    <View
                      style={{
                        borderRadius: 8,
                        gap: 8,
                        paddingHorizontal: 12,
                        paddingVertical: 12,
                        backgroundColor: '#C8FFF5',
                        alignItems: 'center',
                        width: '28%',
                      }}>
                      <Text
                        style={[
                          textStyles.bodyTable,
                          {color: '#1C1C1C', width: 65},
                        ]}>
                        Filled capacity
                      </Text>
                      <Text style={[textStyles.headingH7, {color: '#1C1C1C'}]}>
                        {item.filled_capacity}
                      </Text>
                    </View>
                    <View
                      style={{
                        borderRadius: 8,
                        gap: 8,
                        paddingHorizontal: 12,
                        paddingVertical: 12,
                        backgroundColor: '#FFE3AC',
                        alignItems: 'center',
                        width: '28%',
                      }}>
                      <Text
                        style={[
                          textStyles.bodyTable,
                          {color: '#1C1C1C', width: 78},
                        ]}>
                        Remaining capacity
                      </Text>
                      <Text style={[textStyles.headingH7, {color: '#1C1C1C'}]}>
                        {item.remainingCapacity}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 24,
                      marginHorizontal: 16,
                      marginTop: 16,
                    }}>
                    <View style={{width: '46%'}}>
                      <ButtonWithAutoWidth
                        role="iButton"
                        text="View details"
                        borderColor="#07294B"
                        txtcolor="#07294B"
                        onPress={() =>
                          navigation.navigate('ViewDetails', {
                            warehouse: item as warehouse,
                          })
                        }
                      />
                    </View>
                    <View style={{width: '46%'}}>
                      <ButtonWithAutoWidth
                        role="iButton"
                        text="  Edit details"
                        borderColor="#07294B"
                        txtcolor="#07294B"
                        onPress={() => {
                          navigation.navigate('WarehouseDetailOwner', {
                            warehouse: item as warehouse,
                          });
                        }}
                        component={() => <Edit />}
                      />
                    </View>
                  </View>
                  <View style={{width: '46%', marginTop: 24}}>
                    <ButtonWithAutoWidth
                      role="iButton"
                      text="Book warehouse"
                      borderColor="#0C447D"
                      bgcolor="#0C447D"
                      txtcolor="#FFFFFF"
                      onPress={() => {
                        navigation.navigate('WOBookWarehouse', {
                          warehouse: item as Partial<warehouse>,
                        });
                      }}
                    />
                  </View>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      width: '90%',
                      borderColor: '#C1C4C2',
                      marginVertical: 32,
                      marginHorizontal: 16,
                    }}
                  />
                </View>
              )}
            />
          </View>
        )}
        <Modal
          animationType="fade"
          transparent={true}
          visible={isVisible}
          onRequestClose={() => setIsVisible(false)}>
          <View style={styles.modalOverlay} />
          <View style={styles.modalContainer}>
            <TouchableOpacity
              onPress={() => setIsVisible(false)}
              style={styles.DissmissBotton}>
              <Dissmiss />
            </TouchableOpacity>
            <View style={styles.optionPosition}>
              <View style={styles.modalTitle}>
                <Text style={[textStyles.headingH7, styles.modalText]}>
                  Complete your{'\n'}
                  KYC verification to add warehouses
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
                        navigation.navigate('KycOwner', {});
                        setIsVisible(false);
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Modal>
        <Modal visible={menu} transparent={true}>
          <HomeMenu exitCallBack={handleMenu} />
        </Modal>
        <Modal visible={notification} transparent={true}>
          <HomeNotification
            exitCallBack={handleNotification}
            Notification={[]}
          />
        </Modal>
      </Layout>
      <NavBar current="Warehouse" />
    </View>
  );
};

export default Warehouse;

const styles = StyleSheet.create({
  modalOverlay: {
    backgroundColor: '#5E5E5EB2',
    width: '100%',
    height: '100%',
  },
  modalContainer: {
    width: '92%',
    height: 250,
    top: 257,
    left: 16,
    borderRadius: 8,
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
    top: 10,
    position: 'absolute',
    width: '100%',
    // height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    color: '#1C1C1C',
    textAlign: 'center',
  },
  buttonRow: {
    width: '100%',
    marginHorizontal: '5%',
    marginVertical: '2%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
  },
  buttonHalf: {
    flexDirection: 'row',
    width: '48%',
  },
});
