import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderComponent from '../../components/Header';
import CustomButton from '../../components/CustomButton';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import CustomInputText from '../../components/CustomInputText';
import EmailInput from '../../components/EmailInput';
import PhoneInput from '../../components/PhoneInput';
import Dropdown from '../../components/Dropdown';
import statesOfIndia from '../../components/State';
import textStyles from '../../components/textStyles';
import ButtonWithAutoWidth from '../../components/ButtonWithAutoWidth';
import ArrowUpload from '../../assets/ArrowUpload';
import CheckBox from '../../components/CheckBox';
import PasswordInput from '../../components/PasswordInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dissmiss from '../../assets/Dissmiss';
import DocumentPicker from 'react-native-document-picker';
import {warehouseApi} from '../../service/api';
import MapComponent, {Address} from '../../components/MapComponent';
import {Warehouse} from '../../types/entities';
import Layout from '../../layouts/layout';
import Toast from 'react-native-toast-message';
import {AxiosError} from 'axios';
import DropdownArrow from '../../assets/Dropdown';

const {width, height} = Dimensions.get('window');

interface Document {
  fileCopyUri: string | null;
  name: string;
  size: number;
  type: string;
  uri: string;
}

const AddWarehouse = ({route}) => {
  const data = route.params ? route.params.data : [];
  console.log(data, 44);

  const [isClickedUnit, setIsClickedUnit] = useState<boolean | undefined>(
    false,
  );
  const [SelectedUnit, setSelectedUnit] = useState<string>('');
  const [isClicked, setIsClicked] = useState<boolean | undefined>(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [menu, setMenu] = useState<number>(0);
  const [doc3, setDoc3] = useState<Document | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [Address, setAddress] = useState<Address | null | undefined>(null);
  const navigation = useNavigation<NavigationProp<Record<string, object>>>();
  const [warehouseId, setWarehouseId] = useState<string>('');
  const mappingFunction = (item: {name: any; id: any}) => `${item.name}`;
  const [inputs, setInputs] = useState<{[key: string]: string | number}>({
    warehouse_name: '',
    warehouse_id: '',
    locality_area: '',
    pincode: '',
    city: '',
    mobile_number: '',
    total_capacity: '',
    filled_capacity: '',
  });
  const [inputs1, setInputs1] = useState<{[key: string]: string}>({
    managerName: '',
    email: '',
    password: '',
  });
  const [WDRARegister, setWDRARegister] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  const toggleSwitch = () => setWDRARegister(previousState => !previousState);

  const Unit = [{unit: 'MT'}, {unit: 'QT'}];

  const selectDoc = async (
    setDoc: React.Dispatch<React.SetStateAction<Document | null>>,
    setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>,
  ) => {
    try {
      const doc = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf],
      });
      const maxSizeInBytes = 10 * 1024 * 1024;
      if (doc?.size && doc.size > maxSizeInBytes) {
        setErrorMessage('Document size exceeds the limit (10 MB)');
        return;
      }
      setDoc(doc as Document);
      setErrorMessage(null);
      console.log('Selected document:', doc);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the upload', err);
      } else {
        console.error('Document selection failed:', err);
        setErrorMessage('An error occurred while selecting the document');
      }
    }
  };

  const handleSelectDoc = () => {
    selectDoc(setSelectedDoc, setErrorMessage);
  };

  const handleTextChange = (key: string) => (text: string, num?: boolean) => {
    setInputs(prevInputs => ({
      ...prevInputs,
      [key]: num ? Number(text) : text,
    }));
  };
  const handleTextChange1 = (key: string) => (text: string) => {
    setInputs1(prevInputs => ({
      ...prevInputs,
      [key]: text,
    }));
  };

  useEffect(() => {
    if (Address) {
      setInputs(prevInputs => ({
        ...prevInputs,
        locality_area: Address.locality_area,
        landmark: Address.landmark,
        pincode: Address.pincode,
        city: Address.city,
        state: Address.State,
      }));
    }
  }, [Address]);
  const handleAddWarehouse = async () => {
    try {
      console.log(inputs, 100);
      const response = await warehouseApi.addWarehouse(inputs);
      // console.log(response.data, 100);
      if (response.data) {
        Toast.show({
          text1: 'Success!',
          text2: 'Warehouse added successfully',
        });
        console.log('Added_Warehouse : ', response.data.data);
        setWarehouseId((response.data.data as Warehouse)._id);
        setMenu(1);
      }
    } catch (error: any) {
      console.error(error);
      if (error instanceof AxiosError) {
        console.log(error?.response?.data.error);
        Toast.show({
          type: 'error',
          text1: 'Error!',
          text2: error?.response?.data.error,
        });
        //setErrorMessage(error?.response?.data.error);
      } else {
        console.error(error);
        Toast.show({
          text1: 'Error!',
          text2: 'An error occurred',
        });
        //setErrorMessage("An error occurred");
      }
    }
  };

  const handleNavigation = () => {
    const temp = data;
    temp.push(inputs);
    navigation.navigate('Warehouse', {});
  };
  useEffect(() => {
    console.log('Items list updated:', inputs);
  }, [inputs]);
  useEffect(() => {
    console.log('Items list updated:', inputs1);
  }, [inputs1]);

  const allFieldsFilled =
    // Object.values(inputs).every(input => input !== '') &&
    inputs.warehouse_name !== '' &&
    inputs.warehouse_id !== '' &&
    inputs.locality_area !== '' &&
    inputs.pincode !== '' &&
    inputs.city !== '' &&
    inputs.mobile_number !== '' &&
    selectedItem !== null &&
    SelectedUnit !== '';

  return (
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      <Layout>
        <HeaderComponent title={'Add warehouse'} />
        <View style={{marginHorizontal: 16, flex: 1}}>
          {menu == 0 ? (
            <>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View
                  style={{
                    width: '48%',
                    height: 6,
                    borderRadius: 4,
                    backgroundColor: '#0038FF',
                  }}
                />
                <View
                  style={{
                    width: '48%',
                    height: 6,
                    borderRadius: 4,
                    backgroundColor: '#CEDAE5',
                  }}
                />
                {/* <View
                style={{
                  width: 100,
                  height: 6,
                  borderRadius: 4,
                  backgroundColor: '#CEDAE5',
                }}></View> */}
              </View>
              <Text
                style={[
                  textStyles.headingH6_5,
                  {color: '#1c1c1c', marginTop: 24, marginBottom: 6},
                ]}>
                Warehouse details
              </Text>
              <ScrollView scrollEnabled={!isClicked}>
                <View style={{marginBottom: 12}}>
                  <View
                    style={{
                      marginVertical: '2%',
                      borderWidth: 1,
                      borderRadius: 7,
                    }}>
                    <CustomInputText
                      PlaceHolder="Warehouse name"
                      onTextChange={handleTextChange('warehouse_name')}
                    />
                  </View>
                  <View
                    style={{
                      marginVertical: '2%',
                      borderWidth: 1,
                      borderRadius: 7,
                    }}>
                    <CustomInputText
                      PlaceHolder="Warehouse ID"
                      onTextChange={handleTextChange('warehouse_id')}
                    />
                  </View>

                  <View
                    style={{
                      marginVertical: '2%',
                      height: 250,
                      zIndex: 1,
                      borderWidth: 1,
                      borderRadius: 7,
                    }}>
                    <MapComponent
                      onAddressSelected={address => {
                        setAddress(address);

                        console.log(address);
                      }}
                    />
                  </View>

                  <View
                    style={{
                      marginVertical: '2%',
                      borderWidth: 1,
                      borderRadius: 7,
                    }}>
                    <CustomInputText
                      PlaceHolder="Locality / Area / Street "
                      txt={Address?.locality_area || ''}
                      onTextChange={handleTextChange('locality_area')}
                    />
                  </View>
                  <View
                    style={{
                      marginVertical: '2%',
                      borderWidth: 1,
                      borderRadius: 7,
                    }}>
                    <CustomInputText PlaceHolder="Landmark (optional)" />
                  </View>
                  <View
                    style={{
                      marginVertical: '2%',
                      borderWidth: 1,
                      borderRadius: 7,
                      zIndex: -1,
                    }}>
                    <CustomInputText
                      PlaceHolder="Pin code"
                      txt={Address?.pincode || ''}
                      onTextChange={handleTextChange('pincode')}
                      keyboard="numeric"
                    />
                  </View>
                  <View
                    style={{
                      marginVertical: '2%',
                      borderWidth: 1,
                      borderRadius: 7,
                    }}>
                    <CustomInputText
                      PlaceHolder="City"
                      txt={Address?.city || ''}
                      onTextChange={handleTextChange('city')}
                    />
                  </View>
                  {isClicked ? (
                    <View>
                      <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={styles.ScrollView}>
                        {statesOfIndia.map((item, index) => (
                          <TouchableOpacity
                            key={index}
                            style={{
                              width: '100%',
                              borderRadius: 8,
                              height: 50,
                              justifyContent: 'center',
                            }}
                            onPress={() => {
                              setSelectedItem(item);
                              setIsClicked(false);
                            }}>
                            <Text
                              style={{
                                fontWeight: 'bold',
                                paddingLeft: 20,
                                color: 'black',
                              }}>
                              {mappingFunction(item)}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  ) : null}
                  <TouchableOpacity
                    style={{
                      width: '100%',
                      marginVertical: '2%',
                      height: 55,
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderRadius: 7,
                    }}
                    onPress={() => {
                      setIsClicked(!isClicked);
                    }}>
                    <View
                      style={{
                        height: '100%',
                        justifyContent: 'space-evenly',
                        paddingHorizontal: 12,
                        position: 'absolute',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          width: '100%',
                        }}>
                        <View>
                          {selectedItem == null ? null : (
                            <Text style={textStyles.bodyB4}>State</Text>
                          )}
                          <Text
                            style={
                              selectedItem == null
                                ? textStyles.bodyB3
                                : [textStyles.headingH8, {color: 'black'}]
                            }>
                            {selectedItem == null
                              ? 'State'
                              : mappingFunction(selectedItem)}
                          </Text>
                        </View>
                        <DropdownArrow />
                      </View>
                    </View>
                  </TouchableOpacity>
                  <View
                    style={{
                      marginVertical: '2%',
                      borderWidth: 1,
                      borderRadius: 7,
                    }}>
                    <CustomInputText
                      PlaceHolder="Mobile number"
                      onTextChange={handleTextChange('mobile_number')}
                      keyboard="phone-pad"
                      maxLength={10}
                    />
                  </View>
                  {/* <View style={{ marginVertical: '2%', }}>
                                    <PhoneInput />
                                </View> */}
                  <View
                    style={{
                      marginVertical: '2%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{width: '60%', borderWidth: 1, borderRadius: 7}}>
                      <CustomInputText
                        PlaceHolder="Total capacity"
                        onTextChange={handleTextChange('total_capacity', true)}
                        keyboard="numeric"
                      />
                    </View>
                    <TouchableOpacity
                      style={{
                        width: '35%',
                        borderWidth: 1,
                        borderRadius: 8,
                        paddingLeft: 12,
                        justifyContent: 'center',
                      }}
                      onPress={() => setIsClickedUnit(!isClickedUnit)}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
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
                        <View style={{marginRight: 12}}>
                          <DropdownArrow />
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      marginVertical: '2%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{width: '60%', borderWidth: 1, borderRadius: 7}}>
                      <CustomInputText
                        PlaceHolder="Filled capacity"
                        onTextChange={handleTextChange('filled_capacity', true)}
                        keyboard="numeric"
                      />
                    </View>
                    <TouchableOpacity
                      style={{
                        width: '35%',
                        borderWidth: 1,
                        borderRadius: 8,
                        paddingLeft: 12,
                        justifyContent: 'center',
                      }}
                      onPress={() => setIsClickedUnit(!isClickedUnit)}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
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
                        <View style={{marginRight: 12}}>
                          <DropdownArrow />
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
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

                <CustomButton
                  text="Save and continue"
                  txtcolor="#FFFFFF"
                  bgcolor="#0C447D"
                  borderColor="#0C447D"
                  role="iButton"
                  onPress={() => handleAddWarehouse()}
                  disabled={!allFieldsFilled}
                />
              </ScrollView>
            </>
          ) : (
            <></>
          )}
          {menu == 1 ? (
            <>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View
                  style={{
                    width: '48%',
                    height: 6,
                    borderRadius: 4,
                    backgroundColor: '#CEDAE5',
                  }}
                />
                <View
                  style={{
                    width: '48%',
                    height: 6,
                    borderRadius: 4,
                    backgroundColor: '#0038FF',
                  }}
                />
                {/* <View
                style={{
                  width: 100,
                  height: 6,
                  borderRadius: 4,
                  backgroundColor: '#CEDAE5',
                }}></View> */}
              </View>
              <Text
                style={[
                  textStyles.headingH6_5,
                  {color: '#1c1c1c', marginTop: 24, marginBottom: 16},
                ]}>
                WDRA and warehouse facilities
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: 17,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={[textStyles.headingH7, {color: '#1c1c1c'}]}>
                  Are you WDRA registered?
                </Text>
                <Switch
                  value={WDRARegister}
                  onValueChange={toggleSwitch}
                  trackColor={{false: '#E6E6E6', true: '#E6E6E6'}}
                  thumbColor={WDRARegister ? '#0C447D' : '#707371'}
                />
              </View>
              {selectedDoc == null ? (
                <View
                  style={{
                    alignItems: 'center',
                    // height: 137,
                    gap: 12,
                    paddingHorizontal: 12,
                    paddingVertical: 26,
                    borderStyle: 'dashed',
                    borderWidth: 1,
                    borderColor: '#86A2BE',
                    borderRadius: 8,
                    backgroundColor: '#F7F7F7',
                  }}>
                  <Text
                    style={[
                      textStyles.headingH7,
                      {
                        color: 'black',
                      },
                    ]}>
                    WDRA certificate
                  </Text>
                  <Text
                    style={[
                      textStyles.bodyB3,
                      {
                        color: '#707371',
                      },
                    ]}>
                    File format : Pdf
                  </Text>
                  <View style={{width: '42%'}}>
                    <ButtonWithAutoWidth
                      text="  Upload"
                      role="iButton"
                      component={() => <ArrowUpload />}
                      txtcolor="#FFFFFF"
                      bgcolor="#0C447D"
                      borderColor="#0C447D"
                      disabled={!WDRARegister}
                      onPress={handleSelectDoc}
                    />
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    // marginHorizontal: '5%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 16,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 12,
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../../assets/images/wdra.png')}
                      style={{width: 72, height: 72, borderRadius: 8}}
                      resizeMode="contain"
                    />
                    <View style={{gap: 8}}>
                      <Text
                        style={{
                          fontWeight: '500',
                          color: 'black',
                          fontSize: 16,
                          lineHeight: 19.2,
                        }}>
                        WDRA certificate
                      </Text>
                      {/* <Text style={[textStyles.bodyB3, {color: '#545554'}]}>
                        {(selectedDoc.size / 1000 / 1000).toFixed(2)}MB
                      </Text> */}
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => setSelectedDoc(null)}
                    style={{
                      width: 26,
                      height: 26,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#C1C4C2',
                      borderRadius: 12,
                    }}>
                    <Dissmiss />
                  </TouchableOpacity>
                </View>
              )}
              <View style={{gap: 8, marginVertical: 16}}>
                <Text style={[textStyles.headingH7, {color: '#1c1c1c'}]}>
                  Facilities
                </Text>
                <Text style={[textStyles.bodyB3, {color: '#1c1c1c'}]}>
                  Add the facilities that your warehouse has
                </Text>
                <View style={{gap: 10}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                    }}>
                    <CheckBox />
                    <Text style={[textStyles.bodyB3, {color: '#1c1c1c'}]}>
                      24 x 7 security
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                    }}>
                    <CheckBox />
                    <Text style={[textStyles.bodyB3, {color: '#1c1c1c'}]}>
                      Cold storage
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                    }}>
                    <CheckBox />
                    <Text style={[textStyles.bodyB3, {color: '#1c1c1c'}]}>
                      Dry storage
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                    }}>
                    <CheckBox />
                    <Text style={[textStyles.bodyB3, {color: '#1c1c1c'}]}>
                      Bank loan
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                    }}>
                    <CheckBox />
                    <Text style={[textStyles.bodyB3, {color: '#1c1c1c'}]}>
                      license
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                    }}>
                    <CheckBox />
                    <Text style={[textStyles.bodyB3, {color: '#1c1c1c'}]}>
                      Logistics
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                    }}>
                    <CheckBox />
                    <Text style={[textStyles.bodyB3, {color: '#1c1c1c'}]}>
                      Climate control
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                    }}>
                    <CheckBox />
                    <Text style={[textStyles.bodyB3, {color: '#1c1c1c'}]}>
                      Fire safety
                    </Text>
                  </View>
                </View>
              </View>
              <CustomButton
                text="Save and continue"
                txtcolor="#FFFFFF"
                bgcolor="#0C447D"
                borderColor="#0C447D"
                role="iButton"
                onPress={() => {
                  setMenu(0);
                  handleNavigation();
                }}
              />
            </>
          ) : (
            <></>
          )}
          {/* {menu == 2 ? (
          <>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View
                style={{
                  width: 100,
                  height: 6,
                  borderRadius: 4,
                  backgroundColor: '#CEDAE5',
                }}></View>
              <View
                style={{
                  width: 100,
                  height: 6,
                  borderRadius: 4,
                  backgroundColor: '#CEDAE5',
                }}></View>
              <View
                style={{
                  width: 100,
                  height: 6,
                  borderRadius: 4,
                  backgroundColor: '#0038FF',
                }}></View>
            </View>
            <Text
              style={[
                textStyles.headingH6_5,
                { color: '#1c1c1c', marginTop: 24, marginBottom: 14 },
              ]}>
              Manager details
            </Text>
            <View
              style={{ marginVertical: '2%', borderWidth: 1, borderRadius: 7 }}>
              <CustomInputText
                PlaceHolder="Manager name"
                onTextChange={handleTextChange1('managerName')}
              />
            </View>
            <View
              style={{ marginVertical: '2%', borderWidth: 1, borderRadius: 7 }}>
              <CustomInputText
                PlaceHolder="Manager email id"
                onTextChange={handleTextChange1('email')}
              />
            </View>
            <View style={{ marginVertical: '2%', borderRadius: 7 }}>
              <PasswordInput
                onTextChange={handleTextChange1('password')}
                PlaceHolder="Create password"
              />
            </View>
            <Text
              style={[textStyles.bodyB4, { color: '#707371', marginBottom: 16 }]}>
              Use 6 or more characters
            </Text>
            <CustomButton
              text="Register"
              txtcolor="#FFFFFF"
              bgcolor="#0C447D"
              borderColor="#0C447D"
              role="iButton"
              onPress={() => {
                handleAddManager();
                setMenu(0);
                handleNavigation();
              }}
              disabled={!allFieldsFilled1}
            />
          </>
        ) : (
          <></>
        )} */}
        </View>
      </Layout>
    </View>
  );
};

export default AddWarehouse;

const styles = StyleSheet.create({
  ScrollView: {
    backgroundColor: 'white',
    width: '100%',
    zIndex: 2,
    position: 'absolute',
    top: -300,
    // left: '5%',
    height: 300,
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
    top: '86%',
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
});
