import {
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import HomeHeader from '../../components/HomeHeader';
import HomeMenu from '../../components/HomeMenu';
import HomeNotification from '../../components/HomeNotification';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import textStyles from '../../components/textStyles';
import Location from '../../assets/Location';
import ButtonWithAutoWidth from '../../components/ButtonWithAutoWidth';
import ArrowUpload from '../../assets/ArrowUpload';
import Dissmiss from '../../assets/Dissmiss';
import Commodity from '../../assets/Commodity';
import CheckBox from '../../components/CheckBox';
import HeaderComponent from '../../components/Header';
import Plus from '../../assets/Plus';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../../types/navigationTypes';
import {Manager} from '../../types/entities';
import {warehouseApi} from '../../service/api';
import Layout from '../../layouts/layout';

type DetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ViewDetails'
>;

const ViewDetails: React.FC<DetailsScreenProps> = ({navigation, route}) => {
  const {warehouse} = route?.params;
  //console.log(warehouse?.Commodity[0].price_perday);

  const [menu, setMenu] = useState<boolean>(false);
  const [notification, setNotification] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean | undefined>(false);
  const [isClickedCommodity, setIsClickedCommodity] = useState<
    boolean | undefined
  >(false);

  const [Manager, setManager] = useState<Manager>();

  const getManager = async () => {
    try {
      const res = await warehouseApi.getWarehouseManager(warehouse?._id);
      console.log(res, 100);
      setManager(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getManager();
  }, [warehouse]);

  // const Main = [
  //     { img: 'https://s3-alpha-sig.figma.com/img/430b/3cae/485c51a9a1826dbaf8b9127757e2fcfd?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ghpx3YE1Otjrgmi4xiD3h84rl-CkUDqVsWmUvrlaArXTvD4jvu0u12MWC3l4LEtG1ugoooS8Cv5Td9m09KJVlW0MpnvGxykGN7MO57IBBjEJE~MginG6U1eFLiGd5BgbXxNuwqoFeccEYfK5uy0xPLvQ7TEZjXxmtL2rdd8cbV3SmwtLqSpikHmtwsVrwjiTc6MSDCIJOMGKm3zx5jOzdiUBpb7kSUY18xDSEVjzqvg~F21KejzE0hJfVwUpRuWHuwVNK5Ea1JRK1a-f~Xpu02fK3ST78iMMeSo1~uGMA9p-HckfFsZ6A-1dWVW~FeNtBp33-bqYZ8Co~UlEguNtlw__' },
  //     { img: 'https://s3-alpha-sig.figma.com/img/430b/3cae/485c51a9a1826dbaf8b9127757e2fcfd?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ghpx3YE1Otjrgmi4xiD3h84rl-CkUDqVsWmUvrlaArXTvD4jvu0u12MWC3l4LEtG1ugoooS8Cv5Td9m09KJVlW0MpnvGxykGN7MO57IBBjEJE~MginG6U1eFLiGd5BgbXxNuwqoFeccEYfK5uy0xPLvQ7TEZjXxmtL2rdd8cbV3SmwtLqSpikHmtwsVrwjiTc6MSDCIJOMGKm3zx5jOzdiUBpb7kSUY18xDSEVjzqvg~F21KejzE0hJfVwUpRuWHuwVNK5Ea1JRK1a-f~Xpu02fK3ST78iMMeSo1~uGMA9p-HckfFsZ6A-1dWVW~FeNtBp33-bqYZ8Co~UlEguNtlw__' },
  //     { img: 'https://s3-alpha-sig.figma.com/img/430b/3cae/485c51a9a1826dbaf8b9127757e2fcfd?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ghpx3YE1Otjrgmi4xiD3h84rl-CkUDqVsWmUvrlaArXTvD4jvu0u12MWC3l4LEtG1ugoooS8Cv5Td9m09KJVlW0MpnvGxykGN7MO57IBBjEJE~MginG6U1eFLiGd5BgbXxNuwqoFeccEYfK5uy0xPLvQ7TEZjXxmtL2rdd8cbV3SmwtLqSpikHmtwsVrwjiTc6MSDCIJOMGKm3zx5jOzdiUBpb7kSUY18xDSEVjzqvg~F21KejzE0hJfVwUpRuWHuwVNK5Ea1JRK1a-f~Xpu02fK3ST78iMMeSo1~uGMA9p-HckfFsZ6A-1dWVW~FeNtBp33-bqYZ8Co~UlEguNtlw__' },
  //     { img: 'https://s3-alpha-sig.figma.com/img/430b/3cae/485c51a9a1826dbaf8b9127757e2fcfd?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ghpx3YE1Otjrgmi4xiD3h84rl-CkUDqVsWmUvrlaArXTvD4jvu0u12MWC3l4LEtG1ugoooS8Cv5Td9m09KJVlW0MpnvGxykGN7MO57IBBjEJE~MginG6U1eFLiGd5BgbXxNuwqoFeccEYfK5uy0xPLvQ7TEZjXxmtL2rdd8cbV3SmwtLqSpikHmtwsVrwjiTc6MSDCIJOMGKm3zx5jOzdiUBpb7kSUY18xDSEVjzqvg~F21KejzE0hJfVwUpRuWHuwVNK5Ea1JRK1a-f~Xpu02fK3ST78iMMeSo1~uGMA9p-HckfFsZ6A-1dWVW~FeNtBp33-bqYZ8Co~UlEguNtlw__' },
  //     { img: 'https://s3-alpha-sig.figma.com/img/430b/3cae/485c51a9a1826dbaf8b9127757e2fcfd?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ghpx3YE1Otjrgmi4xiD3h84rl-CkUDqVsWmUvrlaArXTvD4jvu0u12MWC3l4LEtG1ugoooS8Cv5Td9m09KJVlW0MpnvGxykGN7MO57IBBjEJE~MginG6U1eFLiGd5BgbXxNuwqoFeccEYfK5uy0xPLvQ7TEZjXxmtL2rdd8cbV3SmwtLqSpikHmtwsVrwjiTc6MSDCIJOMGKm3zx5jOzdiUBpb7kSUY18xDSEVjzqvg~F21KejzE0hJfVwUpRuWHuwVNK5Ea1JRK1a-f~Xpu02fK3ST78iMMeSo1~uGMA9p-HckfFsZ6A-1dWVW~FeNtBp33-bqYZ8Co~UlEguNtlw__' },
  // ]
  // const other = [
  //     { img: 'https://s3-alpha-sig.figma.com/img/430b/3cae/485c51a9a1826dbaf8b9127757e2fcfd?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ghpx3YE1Otjrgmi4xiD3h84rl-CkUDqVsWmUvrlaArXTvD4jvu0u12MWC3l4LEtG1ugoooS8Cv5Td9m09KJVlW0MpnvGxykGN7MO57IBBjEJE~MginG6U1eFLiGd5BgbXxNuwqoFeccEYfK5uy0xPLvQ7TEZjXxmtL2rdd8cbV3SmwtLqSpikHmtwsVrwjiTc6MSDCIJOMGKm3zx5jOzdiUBpb7kSUY18xDSEVjzqvg~F21KejzE0hJfVwUpRuWHuwVNK5Ea1JRK1a-f~Xpu02fK3ST78iMMeSo1~uGMA9p-HckfFsZ6A-1dWVW~FeNtBp33-bqYZ8Co~UlEguNtlw__' },
  //     { img: 'https://s3-alpha-sig.figma.com/img/430b/3cae/485c51a9a1826dbaf8b9127757e2fcfd?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ghpx3YE1Otjrgmi4xiD3h84rl-CkUDqVsWmUvrlaArXTvD4jvu0u12MWC3l4LEtG1ugoooS8Cv5Td9m09KJVlW0MpnvGxykGN7MO57IBBjEJE~MginG6U1eFLiGd5BgbXxNuwqoFeccEYfK5uy0xPLvQ7TEZjXxmtL2rdd8cbV3SmwtLqSpikHmtwsVrwjiTc6MSDCIJOMGKm3zx5jOzdiUBpb7kSUY18xDSEVjzqvg~F21KejzE0hJfVwUpRuWHuwVNK5Ea1JRK1a-f~Xpu02fK3ST78iMMeSo1~uGMA9p-HckfFsZ6A-1dWVW~FeNtBp33-bqYZ8Co~UlEguNtlw__' },
  //     { img: 'https://s3-alpha-sig.figma.com/img/430b/3cae/485c51a9a1826dbaf8b9127757e2fcfd?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ghpx3YE1Otjrgmi4xiD3h84rl-CkUDqVsWmUvrlaArXTvD4jvu0u12MWC3l4LEtG1ugoooS8Cv5Td9m09KJVlW0MpnvGxykGN7MO57IBBjEJE~MginG6U1eFLiGd5BgbXxNuwqoFeccEYfK5uy0xPLvQ7TEZjXxmtL2rdd8cbV3SmwtLqSpikHmtwsVrwjiTc6MSDCIJOMGKm3zx5jOzdiUBpb7kSUY18xDSEVjzqvg~F21KejzE0hJfVwUpRuWHuwVNK5Ea1JRK1a-f~Xpu02fK3ST78iMMeSo1~uGMA9p-HckfFsZ6A-1dWVW~FeNtBp33-bqYZ8Co~UlEguNtlw__' },
  //     { img: 'https://s3-alpha-sig.figma.com/img/430b/3cae/485c51a9a1826dbaf8b9127757e2fcfd?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ghpx3YE1Otjrgmi4xiD3h84rl-CkUDqVsWmUvrlaArXTvD4jvu0u12MWC3l4LEtG1ugoooS8Cv5Td9m09KJVlW0MpnvGxykGN7MO57IBBjEJE~MginG6U1eFLiGd5BgbXxNuwqoFeccEYfK5uy0xPLvQ7TEZjXxmtL2rdd8cbV3SmwtLqSpikHmtwsVrwjiTc6MSDCIJOMGKm3zx5jOzdiUBpb7kSUY18xDSEVjzqvg~F21KejzE0hJfVwUpRuWHuwVNK5Ea1JRK1a-f~Xpu02fK3ST78iMMeSo1~uGMA9p-HckfFsZ6A-1dWVW~FeNtBp33-bqYZ8Co~UlEguNtlw__' },
  //     { img: 'https://s3-alpha-sig.figma.com/img/430b/3cae/485c51a9a1826dbaf8b9127757e2fcfd?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ghpx3YE1Otjrgmi4xiD3h84rl-CkUDqVsWmUvrlaArXTvD4jvu0u12MWC3l4LEtG1ugoooS8Cv5Td9m09KJVlW0MpnvGxykGN7MO57IBBjEJE~MginG6U1eFLiGd5BgbXxNuwqoFeccEYfK5uy0xPLvQ7TEZjXxmtL2rdd8cbV3SmwtLqSpikHmtwsVrwjiTc6MSDCIJOMGKm3zx5jOzdiUBpb7kSUY18xDSEVjzqvg~F21KejzE0hJfVwUpRuWHuwVNK5Ea1JRK1a-f~Xpu02fK3ST78iMMeSo1~uGMA9p-HckfFsZ6A-1dWVW~FeNtBp33-bqYZ8Co~UlEguNtlw__' },
  // ]

  // const Commodities = [
  //     { commodity: 'Bajra', code: 'BJ1', iso: 'BJF1' },
  //     { commodity: 'Wheat', code: 'WH1', iso: 'WHF1' },
  //     { commodity: 'Ajwain', code: 'AJ1', iso: 'AJF1' },
  //     { commodity: 'Rice', code: 'RC1', iso: 'RCF1' },
  //     { commodity: 'Jowar', code: 'JW1', iso: 'JWF1' },
  //     { commodity: 'Bajra', code: 'BJ1', iso: 'BJF1' },
  //     { commodity: 'Wheat', code: 'WH1', iso: 'WHF1' },
  //     { commodity: 'Ajwain', code: 'AJ1', iso: 'AJF1' },
  //     { commodity: 'Rice', code: 'RC1', iso: 'RCF1' },
  //     { commodity: 'Jowar', code: 'JW1', iso: 'JWF1' },
  // ];

  const handleMenu = () => {
    setMenu(!menu);
  };
  const handleNotification = () => {
    setNotification(!notification);
  };
  //const navigation = useNavigation<NavigationProp<Record<string, object>>>();

  return (
    <View style={{flex: 1}}>
      <Layout>
        <HeaderComponent title={'Warehouse details'} />
        <ScrollView scrollEnabled={!isClickedCommodity}>
          <View style={{marginHorizontal: 16, marginBottom: 97, flex: 1}}>
            <View style={{alignItems: 'center'}}>
              <View style={{alignItems: 'center'}}>
                <View>
                  <Text style={[textStyles.headingH6_5, {color: 'black'}]}>
                    {warehouse?.warehouse_name}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={{padding: 5}}>
                    <Location />
                  </View>
                  <Text
                    style={[
                      textStyles.bodyB3,
                      {color: 'black'},
                    ]}>{`${warehouse?.locality_area} ${warehouse?.city}`}</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 24,
              }}>
              <Text style={[textStyles.headingH7, {color: 'black'}]}>
                {'Warehouse manager'}
              </Text>
              <Text style={[textStyles.bodyB2, {color: 'black'}]}>
                {Manager?.name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 24,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  borderRadius: 8,
                  gap: 8,
                  paddingHorizontal: 12,
                  paddingVertical: 14,
                  backgroundColor: '#FFE4F2',
                  alignItems: 'center',
                  width: '30%',
                }}>
                <Text
                  style={[textStyles.bodyTable, {color: '#1C1C1C', width: 70}]}>
                  Total capacity
                </Text>
                <Text style={[textStyles.headingH7, {color: '#1C1C1C'}]}>
                  {warehouse?.total_capacity} MT
                </Text>
              </View>
              <View
                style={{
                  borderRadius: 8,
                  gap: 8,
                  paddingHorizontal: 12,
                  paddingVertical: 14,
                  backgroundColor: '#C8FFF5',
                  alignItems: 'center',
                  width: '30%',
                }}>
                <Text
                  style={[textStyles.bodyTable, {color: '#1C1C1C', width: 65}]}>
                  Filled capacity
                </Text>
                <Text style={[textStyles.headingH7, {color: '#1C1C1C'}]}>
                  {warehouse?.filled_capacity} MT
                </Text>
              </View>
              <View
                style={{
                  borderRadius: 8,
                  gap: 8,
                  paddingHorizontal: 12,
                  paddingVertical: 14,
                  backgroundColor: '#FFE3AC',
                  alignItems: 'center',
                  width: '30%',
                }}>
                <Text
                  style={[textStyles.bodyTable, {color: '#1C1C1C', width: 78}]}>
                  Remaining capacity
                </Text>
                <Text style={[textStyles.headingH7, {color: '#1C1C1C'}]}>
                  {warehouse?.remainingCapacity} MT
                </Text>
              </View>
            </View>
            <View style={{gap: 16, marginTop: 24}}>
              <Text style={[textStyles.headingH6_5, {color: '#1C1C1C'}]}>
                warehouse photos
              </Text>
              <View style={{gap: 8}}>
                <Text style={[textStyles.headingH7, {color: '#1C1C1C'}]}>
                  Main photos
                </Text>
                <FlatList
                  data={warehouse?.main_photo}
                  keyExtractor={(item, index) => index.toString()}
                  numColumns={5}
                  renderItem={({item}) => (
                    <View style={{marginRight: 12}}>
                      <Image
                        source={{uri: item}}
                        style={{width: 56, height: 56, borderRadius: 4}}
                      />
                    </View>
                  )}
                  contentContainerStyle={{flexGrow: 1}}
                />
              </View>
              <View style={{gap: 8}}>
                <Text style={[textStyles.headingH7, {color: '#1C1C1C'}]}>
                  Other photos
                </Text>
                <FlatList
                  data={warehouse?.other_photo}
                  keyExtractor={(item, index) => index.toString()}
                  numColumns={5}
                  renderItem={({item}) => (
                    <View style={{marginRight: 12}}>
                      <Image
                        source={{uri: item}}
                        style={{width: 56, height: 56, borderRadius: 4}}
                      />
                    </View>
                  )}
                  contentContainerStyle={{justifyContent: 'space-between'}}
                />
              </View>
            </View>
            <View style={{gap: 16, marginTop: 24}}>
              <Text style={[textStyles.headingH6_5, {color: '#1C1C1C'}]}>
                Commodity details
              </Text>
              {warehouse?.Commodity?.map(commodity => (
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                    }}>
                    <Text style={[textStyles.bodyB2, {color: '#1C1C1C'}]}>
                      Commodity:
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
                        justifyContent: 'space-between',
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
                              // width: 92,
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
                              // width: 90,
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
                          justifyContent: 'space-between',
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
                </>
              ))}
            </View>
          </View>
        </ScrollView>
      </Layout>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}>
        <View
          style={{
            backgroundColor: '#5E5E5EB2',
            width: '100%',
            height: '100%',
          }}
        />
        <View style={styles.modalContainer}>
          <View style={styles.modalTitle}>
            <Text
              style={[
                textStyles.headingH6,
                {
                  color: '#1C1C1C',
                },
              ]}>
              Select photos
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setIsVisible(false)}
            style={styles.DissmissBotton}>
            <Dissmiss />
          </TouchableOpacity>
          <View style={styles.optionPosition}>
            <TouchableOpacity style={styles.option} onPress={() => {}}>
              <Text style={[textStyles.headingH7, {color: '#1C1C1C'}]}>
                Gallery
              </Text>
              <Text style={[textStyles.bodyB3, {color: '#707371'}]}>
                Choose an existing file
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={() => {}}>
              <Text style={[textStyles.headingH7, {color: '#1C1C1C'}]}>
                Camera
              </Text>
              <Text style={[textStyles.bodyB3, {color: '#707371'}]}>
                Take a picture
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ViewDetails;

const styles = StyleSheet.create({
  DissmissBotton: {
    // backgroundColor: 'pink',
    position: 'absolute',
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    right: 24,
    top: 24,
  },
  modalContainer: {
    width: 312,
    height: 232,
    top: 257,
    left: 24,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    // alignItems: 'center',
    position: 'absolute',
  },
  modalTitle: {
    position: 'absolute',
    width: 181,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    left: 65,
    top: 24,
  },
  optionPosition: {
    top: 70,
    marginHorizontal: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  option: {
    width: '100%',
    borderRadius: 8,
    height: 55,
    justifyContent: 'center',
    // backgroundColor: 'pink',
  },
  commodityScrollView: {
    backgroundColor: 'white',
    width: '100%',
    zIndex: 1,
    position: 'absolute',
    top: '105%',
    // left: '5%',
    height: 253,
    borderWidth: 0.5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 5, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
