import {
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
import * as Imagepicker from 'react-native-image-picker';
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
import {warehouseApi} from '../../service/api';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../../types/navigationTypes';
import {AddCommodity, Manager} from '../../types/entities';
import Toast from 'react-native-toast-message';
import Edit from '../../assets/Edit';
import {FileType, UploadMultipleFiles} from '../../service/fileupload';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import CustomCheckBox from '../../components/customCheckBox';
import DropdownInput from '../../components/customDropdown';

type DetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'WarehouseDetailOwner'
>;

interface WeightPrice {
  weight: number;
  price_perday: string;
}

interface Commodity {
  name: string;
  weightsAndPrices: WeightPrice[];
}
const WarehouseDetailsOwner: React.FC<DetailsScreenProps> = ({
  navigation,
  route,
}) => {
  const {warehouse} = route.params;
  console.log(warehouse?._id);
  const [menu, setMenu] = useState<boolean>(false);
  const [notification, setNotification] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean | undefined>(false);
  const [isClickedCommodity, setIsClickedCommodity] = useState<
    boolean | undefined
  >(false);
  const [SelectedCommodity, setSelectedCommodity] = useState<string>('');
  const [SelectedWeight, setSelectedWeight] = useState<number>(0);
  const [SelectedPriceperDay, setSelectedPriceperDay] = useState<number>(0);
  const [Manager, setManager] = useState<Manager>();
  const [weightsAndPrices, setWeightsAndPrices] = useState<WeightPrice[]>([]);
  const [commodities, setCommodities] = useState<Commodity[]>([]);
  const [mainPhotos, setMainPhotos] = useState<FileType[]>([]);
  const [otherPhotos, setOtherPhotos] = useState<FileType[]>([]);
  const [wdraCertificate, setWdraCertificate] = useState<FileType[]>([]);

  const pickImage = async (
    setImages: React.Dispatch<React.SetStateAction<FileType[]>>,
  ) => {
    let result = await Imagepicker.launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 5,
    });

    if (!result.didCancel && result.assets) {
      const files = result.assets.map(asset => ({
        uri: asset.uri || '',
        type: asset.type || '',
        name: asset.fileName || '',
        height: 720,
        width: 720,
      }));
      //console.log(files);
      setImages(files);
    }
  };

  const handleUpload = async () => {
    const files = {
      main_photo: mainPhotos,
      other_photo: otherPhotos,
      wdra_certificate: wdraCertificate,
    };

    await UploadMultipleFiles(warehouse?._id || '', files);
  };

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
  }, []);

  const Commodities = [
    {commodity: 'Bajra', code: 'BJ1', iso: 'BJF1'},
    {commodity: 'Wheat', code: 'WH1', iso: 'WHF1'},
    {commodity: 'Ajwain', code: 'AJ1', iso: 'AJF1'},
    {commodity: 'Rice', code: 'RC1', iso: 'RCF1'},
    {commodity: 'Jowar', code: 'JW1', iso: 'JWF1'},
  ];

  const handleMenu = () => {
    setMenu(!menu);
  };

  const handleWeightChange = (weight: number, checked: boolean) => {
    if (checked) {
      setWeightsAndPrices(prev => [...prev, {weight, price_perday: ''}]);
      console.log(weightsAndPrices);
    } else {
      setWeightsAndPrices(prev => prev.filter(wp => wp.weight !== weight));
    }
  };

  const handlePriceChange = (weight: number, price: string) => {
    setWeightsAndPrices(prev =>
      prev.map(wp =>
        wp.weight === weight ? {...wp, price_perday: price} : wp,
      ),
    );
    console.log(weightsAndPrices);
  };

  const addCommodity = () => {
    setCommodities(prev => [
      ...prev,
      {
        name: SelectedCommodity,
        weightsAndPrices,
      },
    ]);
    console.log(commodities);

    setSelectedCommodity('');
    setWeightsAndPrices([]);
  };

  const handleBulkAddCommodities = async () => {
    try {
      for (const wp of weightsAndPrices) {
        const payload = {
          name: SelectedCommodity,
          weight: wp.weight.toString(),
          price_perday: parseFloat(wp.price_perday),
          isActive: true,
          isArchived: false,
        };
        const response = await warehouseApi.updateItemsInWarehouse(
          payload,
          warehouse?._id || '',
        );
        if (response) {
          console.log(
            `Added ${SelectedCommodity} with weight ${wp.weight} and price ${wp.price_perday}`,
          );
        }
      }

      if (commodities.length < 1) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Commodities added successfully',
        });
        navigation.goBack();
      }
    } catch (error: any) {
      console.error(error);
    }
    if (commodities.length >= 1) {
      try {
        for (const commodity of commodities) {
          for (const wp of commodity.weightsAndPrices) {
            const payload = {
              name: commodity.name,
              weight: wp.weight.toString(),
              price_perday: parseFloat(wp.price_perday),
              isActive: true,
              isArchived: false,
            };
            const response = await warehouseApi.updateItemsInWarehouse(
              payload,
              warehouse?._id || '',
            );
            if (response) {
              console.log(
                `Added ${commodity.name} with weight ${wp.weight} and price ${wp.price_perday}`,
              );
            }
          }
        }
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Commodities added successfully',
        });
        navigation.goBack();
      } catch (error: any) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    console.log('otherPhotos updated:', otherPhotos);
  }, [otherPhotos]);

  useEffect(() => {
    console.log('MainPhotos updated:', mainPhotos);
  }, [otherPhotos]);

  const handleNotification = () => {
    setNotification(!notification);
  };

  const role = useSelector((state: RootState) => state.user.role);

  return (
    <SafeAreaView style={{flex: 1}}>
      <HeaderComponent title={'Add warehouse details'} />
      <ScrollView scrollEnabled={!isClickedCommodity}>
        <View style={{marginHorizontal: 16}}>
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
                <Text style={[textStyles.bodyB3, {color: 'black'}]}>{`${
                  warehouse?.locality_area
                } ${warehouse?.State || warehouse?.city}`}</Text>
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
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginRight: 12,
              }}>
              <Text
                style={[textStyles.bodyB2, {color: 'black', marginRight: 12}]}>
                {Manager?.name || '+'}
              </Text>
              {role === 'manager' ? null : (
                <TouchableOpacity
                  style={
                    {
                      // marginRight:20
                    }
                  }
                  onPress={() => {
                    navigation.navigate('ListManager', {
                      warehouse: warehouse,
                    });
                  }}>
                  <Edit />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View
            style={{
              gap: 24,
              flexDirection: 'row',
              marginTop: 24,
              // marginHorizontal: 14,
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
                style={[textStyles.bodyTable, {color: '#1C1C1C', width: 70}]}>
                Total capacity
              </Text>
              <Text style={[textStyles.headingH7, {color: '#1C1C1C'}]}>
                {warehouse?.total_capacity}
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
                style={[textStyles.bodyTable, {color: '#1C1C1C', width: 65}]}>
                Filled capacity
              </Text>
              <Text style={[textStyles.headingH7, {color: '#1C1C1C'}]}>
                {warehouse?.filled_capacity}
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
                style={[textStyles.bodyTable, {color: '#1C1C1C', width: 78}]}>
                Remaining capacity
              </Text>
              <Text style={[textStyles.headingH7, {color: '#1C1C1C'}]}>
                {warehouse?.remainingCapacity}
              </Text>
            </View>
          </View>
          <ScrollView style={{gap: 16, marginTop: 24}}>
            <Text style={[textStyles.headingH6_5, {color: '#1C1C1C'}]}>
              warehouse photos
            </Text>
            <View
              style={{
                alignItems: 'center',
                height: 137,
                gap: 8,
                paddingHorizontal: 12,
                paddingVertical: 16,
                borderStyle: 'dashed',
                borderWidth: 1,
                borderColor: '#86A2BE',
                borderRadius: 8,
                backgroundColor: '#F7F7F7',
                marginTop: 16,
              }}>
              <Text
                style={[
                  textStyles.headingH7,
                  {
                    color: 'black',
                  },
                ]}>
                Main photos
              </Text>
              <Text
                style={[
                  textStyles.bodyB3,
                  {
                    color: '#707371',
                  },
                ]}>
                File format : JPG, PNG
              </Text>
              <View style={{width: '42%'}}>
                <ButtonWithAutoWidth
                  text="  Upload"
                  role="iButton"
                  component={() => <ArrowUpload />}
                  txtcolor="#FFFFFF"
                  bgcolor="#0C447D"
                  borderColor="#0C447D"
                  onPress={() => pickImage(setMainPhotos)}
                />
              </View>
              <View
                style={{
                  display: 'flex',
                  padding: 10,
                  flexDirection: 'row',
                }}>
                {/* {mainPhotos.map((photo, index) => (
                                <Image key={index} source={{ uri: photo.uri }} style={{ width: 100, height: 100 }} />
                            ))} */}
              </View>
            </View>
            <View
              style={{
                alignItems: 'center',
                height: 137,
                gap: 8,
                paddingHorizontal: 12,
                paddingVertical: 16,
                borderStyle: 'dashed',
                borderWidth: 1,
                borderColor: '#86A2BE',
                borderRadius: 8,
                backgroundColor: '#F7F7F7',
                marginTop: 16,
              }}>
              <Text
                style={[
                  textStyles.headingH7,
                  {
                    color: 'black',
                  },
                ]}>
                Other photos
              </Text>
              <Text
                style={[
                  textStyles.bodyB3,
                  {
                    color: '#707371',
                  },
                ]}>
                File format : JPG, PNG
              </Text>
              <View style={{width: '42%'}}>
                <ButtonWithAutoWidth
                  text="  Upload"
                  role="iButton"
                  component={() => <ArrowUpload />}
                  txtcolor="#FFFFFF"
                  bgcolor="#0C447D"
                  borderColor="#0C447D"
                  onPress={() => {
                    pickImage(setOtherPhotos);
                    //console.log("otherPhotos:",otherPhotos);
                  }}
                />
              </View>

              {/* <View style={{ width: '42%' }}>
                                <ButtonWithAutoWidth
                                    text="  Upload"
                                    role="iButton"
                                    component={() => <ArrowUpload />}
                                    txtcolor="#FFFFFF"
                                    bgcolor="#0C447D"
                                    borderColor="#0C447D"
                                    onPress={() => {
                                        pickImage(setOtherPhotos);
                                        //console.log("otherPhotos:",otherPhotos);
                                    }}
                                />
                            </View> */}
            </View>
          </ScrollView>
          <View style={{width: '100%', marginVertical: 16}}>
            <ButtonWithAutoWidth
              text="  Upload"
              role="iButton"
              component={() => <ArrowUpload />}
              txtcolor="#FFFFFF"
              bgcolor="#0C447D"
              borderColor="#0C447D"
              onPress={() => {
                handleUpload();
                //pickImage(setOtherPhotos);
                //console.log("otherPhotos:",otherPhotos);
              }}
            />
          </View>
          <View style={{gap: 16}}>
            <Text
              style={[textStyles.headingH6, {color: '#1C1C1C', marginTop: 15}]}>
              Add new commodity
            </Text>
            <View style={{}}>
              <DropdownInput
                selectedValue={SelectedCommodity}
                setSelectedValue={setSelectedCommodity}
                items={Commodities.map(c => c.commodity)}
                label="Commodity"
                placeholder="Select commodity"
                icon={<Commodity />}
              />
            </View>

            <View style={{gap: 4, zIndex: -2}}>
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
                    width: 80,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {/* <CheckBox/> */}
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
                        width: 90,
                        height: 41,
                        textAlign: 'center',
                      },
                    ]}>
                    Set price per day
                  </Text>
                </View>
              </View>
              {[25, 50, 75, 100].map(weight => {
                const isChecked = weightsAndPrices.some(
                  wp => wp.weight === weight,
                );
                return (
                  <View
                    key={weight}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderBottomWidth: 1,
                      borderColor: '#E0E1E1',
                      height: 62,
                      // alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        paddingHorizontal: 8,
                        paddingVertical: 25,
                        gap: 16,
                        width: 80,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <CustomCheckBox
                        value={isChecked}
                        disabled={!SelectedCommodity}
                        onPress={() => {
                          setSelectedWeight(weight);
                          handleWeightChange(weight, !isChecked);
                        }}
                      />
                    </View>
                    <View
                      style={{
                        paddingHorizontal: 8,
                        paddingVertical: 25,
                        gap: 16,
                        width: 175,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          color: '#000000',
                          width: '100%',
                          height: 21,
                          textAlign: 'center',
                        }}>
                        {weight} kg
                      </Text>
                    </View>
                    <View
                      style={{
                        paddingHorizontal: 8,
                        paddingVertical: 25,
                        gap: 16,
                        width: 124,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: 10,
                      }}>
                      <TextInput
                        keyboardType="decimal-pad"
                        value={
                          weightsAndPrices
                            .find(wp => wp.weight === weight)
                            ?.price_perday.toString() || ''
                        }
                        onChangeText={text => {
                          handlePriceChange(weight, text);
                          //setSelectedPriceperDay(parseFloat(text))
                        }}
                        readOnly={!isChecked}
                        style={{
                          borderWidth: 2,
                          width: 56,
                          height: 40,
                          borderRadius: 4,
                          borderColor: '#86A2BE',
                          textAlign: 'center',
                          color: 'black',
                        }}
                      />
                    </View>
                  </View>
                );
              })}
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}>
              <TouchableOpacity
                onPress={() => {
                  console.log(commodities);
                  addCommodity();
                  Toast.show({
                    type: 'info',
                    text1: 'Add another commodity',
                  });
                  setIsClickedCommodity(true);
                }}
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: '#0C447D',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 24,
                }}>
                <Plus props={undefined} color={'#fff'} />
              </TouchableOpacity>
              <Text style={[textStyles.headingH6_5, {color: 'black'}]}>
                {'Add another commodity'}
              </Text>
            </View>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{width: '48%'}}>
                <ButtonWithAutoWidth
                  role="iButton"
                  text="Cancel"
                  borderColor="#07294B"
                  txtcolor="#07294B"
                  onPress={() => navigation.goBack()}
                />
              </View>
              <View style={{width: '48%'}}>
                <ButtonWithAutoWidth
                  role="iButton"
                  text="Save"
                  bgcolor="#0C447D"
                  borderColor="#0C447D"
                  txtcolor="#FFFFFF"
                  onPress={handleBulkAddCommodities}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
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
    </SafeAreaView>
  );
};

export default WarehouseDetailsOwner;

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
    zIndex: 7,
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
