import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import HeaderComponent from '../../components/Header';
import KycPersonalDetail from '../../components/KycPersonalDetail';
import CustomButton from '../../components/CustomButton';
import ButtonWithAutoWidth from '../../components/ButtonWithAutoWidth';
import ArrowUpload from '../../assets/ArrowUpload';
import Dissmiss from '../../assets/Dissmiss';
import CheckBox from '../../components/CheckBox';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import statesOfIndia from '../../components/State';
import CustomInputText from '../../components/CustomInputText';
import PhoneInput from '../../components/PhoneInput';
import EmailInput from '../../components/EmailInput';
import textStyles from '../../components/textStyles';
import DocumentPicker from 'react-native-document-picker';
import Layout from '../../layouts/layout';

interface Document {
  fileCopyUri: string | null;
  name: string;
  size: number;
  type: string;
  uri: string;
}

const KycOwner = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [kycStatus, setKycStatus] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [doc1, setDoc1] = useState<Document | null>(null);
  const [doc2, setDoc2] = useState<Document | null>(null);
  const [doc3, setDoc3] = useState<Document | null>(null);
  const [isClickedContinue, setIsClickedContinue] = useState<
    boolean | undefined
  >(false);
  const [isVisible, setIsVisible] = useState<boolean | undefined>(false);
  const navigation = useNavigation<NavigationProp<Record<string, object>>>();
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const mappingFunction = (item: {name: any; id: any}) => `${item.name}`;

  const allFieldsFilled = doc1 !== null && doc2 !== null && doc3 !== null;

  const saveKycStatus = async status => {
    try {
      await AsyncStorage.setItem('@kyc_status', JSON.stringify(status));
      setKycStatus(status);
    } catch (e) {
      // handle error
      console.error(e);
    }
  };

  const selectDoc = async (
    setDoc: React.Dispatch<React.SetStateAction<Document | null>>,
  ) => {
    try {
      const doc = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf], // You can add more types if needed
      });
      const maxSizeInBytes = 10 * 1024 * 1024; // 10 MB in bytes
      if (doc.size > maxSizeInBytes) {
        setErrorMessage('Document size exceeds the limit (10 MB)');
        return;
      } else {
        setDoc(doc as Document);
        setErrorMessage(null);
        console.log(doc);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the upload', err);
      } else {
        console.log(err);
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* <Text>KycOwner</Text> */}
      <Layout>
        <HeaderComponent title={'Profile'} />
        {!isClickedContinue ? (
          // Personal details and address container
          <View style={styles.container}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: '5%',
              }}>
              <View
                style={{
                  width: '48%',
                  height: 6,
                  backgroundColor: '#0038FF',
                  borderRadius: 4,
                }}
              />
              <View
                style={{
                  width: '48%',
                  height: 6,
                  backgroundColor: '#CEDAE5',
                  borderRadius: 4,
                }}
              />
            </View>
            <View style={{margin: '5%'}}>
              <Text
                style={{
                  fontSize: 18,
                  lineHeight: 21.6,
                  color: '#1C1C1C',
                  fontWeight: 'bold',
                }}>
                Personal details and address
              </Text>
            </View>
            <ScrollView
              scrollEnabled={!isClicked}
              style={{height: '70%', width: '100%'}}>
              <View>
                {/* <Text>KycPersonalDetail</Text> */}
                <View
                  style={{
                    marginHorizontal: '5%',
                    marginVertical: '2%',
                    borderWidth: 1,
                    borderRadius: 7,
                  }}>
                  <CustomInputText PlaceHolder="First Name" />

                  <View style={{borderTopWidth: 1, width: '100%'}} />

                  <CustomInputText PlaceHolder="Last Name" />
                </View>
                <View style={{marginHorizontal: '5%', marginVertical: '2%'}}>
                  <EmailInput />
                </View>
                <View style={{marginHorizontal: '5%', marginVertical: '2%'}}>
                  <PhoneInput />
                </View>
                <View
                  style={{
                    marginHorizontal: '5%',
                    marginVertical: '2%',
                    borderWidth: 1,
                    borderRadius: 7,
                  }}>
                  <CustomInputText PlaceHolder="Flat no / Building name" />
                </View>
                <View
                  style={{
                    marginHorizontal: '5%',
                    marginVertical: '2%',
                    borderWidth: 1,
                    borderRadius: 7,
                  }}>
                  <CustomInputText PlaceHolder="Locality / Area / Street " />
                </View>
                <View
                  style={{
                    marginHorizontal: '5%',
                    marginVertical: '2%',
                    borderWidth: 1,
                    borderRadius: 7,
                  }}>
                  <CustomInputText PlaceHolder="Landmark (optional)" />
                </View>
                <View
                  style={{
                    marginHorizontal: '5%',
                    marginVertical: '2%',
                    borderWidth: 1,
                    borderRadius: 7,
                    zIndex: -1,
                  }}>
                  <CustomInputText PlaceHolder="Pin code" />
                </View>
                <View
                  style={{
                    marginHorizontal: '5%',
                    marginVertical: '2%',
                    borderWidth: 1,
                    borderRadius: 7,
                  }}>
                  <CustomInputText PlaceHolder="City" />
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
                          <Text style={{fontWeight: 'bold', paddingLeft: 20}}>
                            {mappingFunction(item)}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                ) : null}
                <TouchableOpacity
                  style={{
                    marginHorizontal: '5%',
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
                </TouchableOpacity>
              </View>
              <View
                style={{
                  marginHorizontal: '5%',
                  marginVertical: '2%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: '7%',
                }}>
                <View style={{width: '48%', zIndex: -1}}>
                  <ButtonWithAutoWidth
                    role="iButton"
                    text="Cancel"
                    borderColor="#07294B"
                    txtcolor="#07294B"
                    onPress={() => navigation.goBack()}
                  />
                </View>
                <View style={{width: '48%', zIndex: -1}}>
                  <ButtonWithAutoWidth
                    role="iButton"
                    text="Continue"
                    bgcolor="#0C447D"
                    borderColor="#0C447D"
                    txtcolor="#FFFFFF"
                    onPress={() => setIsClickedContinue(true)}
                  />
                </View>
              </View>
            </ScrollView>
          </View>
        ) : (
          // Upload document container
          <View style={styles.container}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: '5%',
              }}>
              <View
                style={{
                  width: '48%',
                  height: 6,
                  backgroundColor: '#CEDAE5',
                  borderRadius: 4,
                }}
              />
              <View
                style={{
                  width: '48%',
                  height: 6,
                  backgroundColor: '#0038FF',
                  borderRadius: 4,
                }}
              />
            </View>
            <View style={{margin: '5%', marginBottom: 0}}>
              <Text
                style={{
                  fontSize: 18,
                  lineHeight: 21.6,
                  color: '#1C1C1C',
                  fontWeight: 'bold',
                }}>
                Upload documents
              </Text>
            </View>
            <ScrollView style={{height: '70%', width: '100%', marginTop: 16}}>
              {/* Aadhar card  upload container */}
              {doc1 == null ? (
                <View>
                  <View
                    style={{
                      justifyContent: 'space-evenly',
                      alignItems: 'center',
                      height: 137,
                      borderStyle: 'dashed',
                      borderWidth: 1,
                      marginHorizontal: '5%',
                      borderColor: '#86A2BE',
                      borderRadius: 8,
                      backgroundColor: 'UI',
                    }}>
                    <Text
                      style={{
                        fontWeight: '500',
                        color: 'black',
                        fontSize: 16,
                        lineHeight: 19.2,
                      }}>
                      Aadhar card
                    </Text>
                    <Text
                      style={{
                        fontWeight: '400',
                        color: '#707371',
                        fontSize: 14,
                        lineHeight: 21,
                      }}>
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
                        onPress={() => selectDoc(setDoc1)}
                      />
                    </View>
                  </View>
                  <View style={{marginHorizontal: '5%', marginBottom: 16}}>
                    <Text
                      style={{
                        fontSize: 14,
                        lineHeight: 21,
                        color: errorMessage ? 'red' : '#707371',
                        fontWeight: '400',
                      }}>
                      {errorMessage
                        ? errorMessage
                        : 'File size should not exceed 10MB'}
                    </Text>
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    marginHorizontal: '5%',
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
                      source={{
                        uri: 'https://s3-alpha-sig.figma.com/img/0af4/ff66/e5f7f0b633066aff72813f330abb6255?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ew0ZYhWtGQJOejr1pIl6YM1PqIJ3Qx4~tMzqGVvwzoClJQMsk2iXTgV9U4jFeYDtnrZRfNXtAg39O52b2fm3gHgtmyXjrf0thB56CJFEqHoYNsnpovDgbAuPoYhPdXtSZ-mDOIn2IUbe1jYH4ZOF7TSDoxAmQNXDHYaRxp7~VdnYwIEKQGq~I5E0B-zNE703Ufaf97zcSnWJfmkKtCkQ4YSzn35ZqDT9PhBdOqpn4Unr5yqkSivbYbTLwJoP1YUqNp~zQNeZckadza992QfJXLEiXt~ohQ3aNrSvNNYV~g7duk7fgP3IhbIdIq8nmClGpgUiN8GY4TskSUSARA2T1g__',
                      }}
                      style={{width: 72, height: 72, borderRadius: 8}}
                    />
                    <View style={{gap: 8}}>
                      <Text
                        style={{
                          fontWeight: '500',
                          color: 'black',
                          fontSize: 16,
                          lineHeight: 19.2,
                        }}>
                        Aadhar card
                      </Text>
                      <Text style={[textStyles.bodyB3, {color: '#545554'}]}>
                        {(doc1.size / 1000 / 1000).toFixed(2)}MB
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => setDoc1(null)}
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
              {/*PAN card upload container */}
              {doc2 == null ? (
                <View>
                  <View
                    style={{
                      justifyContent: 'space-evenly',
                      alignItems: 'center',
                      height: 137,
                      borderStyle: 'dashed',
                      borderWidth: 1,
                      marginHorizontal: '5%',
                      borderColor: '#86A2BE',
                      borderRadius: 8,
                      backgroundColor: 'UI',
                    }}>
                    <Text
                      style={{
                        fontWeight: '500',
                        color: 'black',
                        fontSize: 16,
                        lineHeight: 19.2,
                      }}>
                      PAN card{' '}
                    </Text>
                    <Text
                      style={{
                        fontWeight: '400',
                        color: '#707371',
                        fontSize: 14,
                        lineHeight: 21,
                      }}>
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
                        onPress={() => selectDoc(setDoc2)}
                      />
                    </View>
                  </View>
                  <View style={{marginHorizontal: '5%', marginBottom: 16}}>
                    <Text
                      style={{
                        fontSize: 14,
                        lineHeight: 21,
                        color: errorMessage ? 'red' : '#707371',
                        fontWeight: '400',
                      }}>
                      {errorMessage
                        ? errorMessage
                        : 'File size should not exceed 10MB'}
                    </Text>
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    marginHorizontal: '5%',
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
                      source={{
                        uri: 'https://s3-alpha-sig.figma.com/img/6d3c/d455/ca330fd7ce1d884704bedbeea57e394b?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=j3DWtweZu66eBswr3vwXPthv4EmOaoA9WfOEK2jTSHG8KBdptgdwOG6JPdwj8ovPwpONksazHUo1mx7R~rrLS982miU~e2BrvV8AGhA2lAS7fSVfsk6K5FKDEyu3gxt9jz40pRUZWa7RQ6RZgSbxjMd4~G3k36kwFBd5i54sfP9t~P2lF58Mjl9SOIpH-L-QZGFe5WInfZm56~k70~WrxQ5PeGqzcanQpC40~oxJzqZF5y210a7cKrANmL6~tSXeQF1dczRzAAK7NL7RlyJA~6evYz4tM2ov99wKFfKkb0z2V2Z0k2EW2Bl0V-tcEQ5uz5nq-c~R-30WWY5YOfb6ng__',
                      }}
                      style={{width: 72, height: 72, borderRadius: 8}}
                      resizeMode="stretch"
                    />
                    <View style={{gap: 8}}>
                      <Text
                        style={{
                          fontWeight: '500',
                          color: 'black',
                          fontSize: 16,
                          lineHeight: 19.2,
                        }}>
                        PAN card
                      </Text>
                      <Text style={[textStyles.bodyB3, {color: '#545554'}]}>
                        {(doc2.size / 1000 / 1000).toFixed(2)}MB
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => setDoc2(null)}
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
              {/*Goods and Service task (GST) upload container */}
              {doc3 == null ? (
                <View>
                  <View
                    style={{
                      justifyContent: 'space-evenly',
                      alignItems: 'center',
                      height: 137,
                      borderStyle: 'dashed',
                      borderWidth: 1,
                      marginHorizontal: '5%',
                      borderColor: '#86A2BE',
                      borderRadius: 8,
                      backgroundColor: 'UI',
                    }}>
                    <Text
                      style={{
                        fontWeight: '500',
                        color: 'black',
                        fontSize: 16,
                        lineHeight: 19.2,
                      }}>
                      {'7/12 Agreement'}
                    </Text>
                    <Text
                      style={{
                        fontWeight: '400',
                        color: '#707371',
                        fontSize: 14,
                        lineHeight: 21,
                      }}>
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
                        onPress={() => selectDoc(setDoc3)}
                      />
                    </View>
                  </View>
                  <View style={{marginHorizontal: '5%', marginBottom: 16}}>
                    <Text
                      style={{
                        fontSize: 14,
                        lineHeight: 21,
                        color: errorMessage ? 'red' : '#707371',
                        fontWeight: '400',
                      }}>
                      {errorMessage
                        ? errorMessage
                        : 'File size should not exceed 10MB'}
                    </Text>
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    marginHorizontal: '5%',
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
                      source={{
                        uri: 'https://s3-alpha-sig.figma.com/img/eaea/4d95/6675cc6e3106b5cd5f2ab6ec8315d225?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ed-oB-Wod~qYVKV5O0jB3ZmsIA4MlpYn87WQy6UGCc3cCwr2fHJIxFCzMScphr13v~-kNjk9kVF5GrxPJyl5ED9IyM~Ob4RAkWxyKoQF1SdLk-3fEucK~X8eBv5wC0c6dC0klaIhatvwUFuQLMiYMtq6saH7VHvVwLf5gNmPR2rj3tLbSIp3HTNqt8WWDbRAMBGOJR69bHuQvYNV1TMEdwa2tywe4KPcxvgW2vns4QoHAnt061iRgseI~OUmUtraXYLvzYE3vMiSU2NIyeR93IBTGSGvDdpqlJV7CEPLVNSccdsucWLSVpNZ9dZ8H7VmGWmtCe7aofEH0f6N0NDCHw__',
                      }}
                      style={{width: 72, height: 72, borderRadius: 8}}
                    />
                    <View style={{gap: 8}}>
                      <Text
                        style={{
                          fontWeight: '500',
                          color: 'black',
                          fontSize: 16,
                          lineHeight: 19.2,
                        }}>
                        PAN card
                      </Text>
                      <Text style={[textStyles.bodyB3, {color: '#545554'}]}>
                        {(doc3.size / 1000 / 1000).toFixed(2)}MB
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => setDoc3(null)}
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
              <View
                style={{
                  marginHorizontal: '5%',
                  marginBottom: 16,
                  flexDirection: 'row',
                }}>
                <CheckBox />
                <View style={{marginLeft: '2%'}}>
                  <Text style={styles.terms}>
                    1. I hereby declare that the details furnished above are
                    true and correct to the best of my knowledge and belief and
                    I undertake to inform you of any changes therein,
                    immediately. In case any of the above information is found
                    to be false or untrue or misleading or misrepresenting, I am
                    aware that I may be held liable for it.
                  </Text>
                  <Text style={styles.terms}>
                    2. I hereby declare that I will not be using this
                    application for the purpose of contravention of any Act,
                    Rules, Regulations or any statute of legislation or any
                    notifications/directions issued by any governmental or
                    statutory authority from time to time
                  </Text>
                  <Text style={styles.terms}>
                    3. I hereby consent to receiving information from Central
                    KYC Registry through SMS/Email on the above-registered
                    number/email address and to download the information from
                    CKYCR
                  </Text>
                  <Text style={styles.terms}>
                    4. I am providing the consent to UIDAI/MORTH/NIC registered
                    intermediary to share this KYC data / applicable Aadhaar
                    XMLdata with BharatGodam Solutions LLP and share the data
                    with other participating intermediaries as mandated by
                    government rules and guidelines.
                  </Text>
                </View>
              </View>
              {/* submit button */}
            </ScrollView>
            <View
              style={{
                marginHorizontal: '5%',
                marginVertical: '2%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: '7%',
              }}>
              <View style={{width: '48%'}}>
                <ButtonWithAutoWidth
                  role="iButton"
                  text="Cancel"
                  borderColor="#07294B"
                  txtcolor="#07294B"
                  onPress={() => setIsClickedContinue(false)}
                />
              </View>
              <View style={{width: '48%'}}>
                <ButtonWithAutoWidth
                  role="iButton"
                  text="Submit"
                  bgcolor="#0C447D"
                  borderColor="#0C447D"
                  txtcolor="#FFFFFF"
                  onPress={() => {
                    navigation.navigate('Warehouse', {});
                    saveKycStatus(true);
                  }}
                  disabled={!allFieldsFilled}
                />
              </View>
            </View>
          </View>
        )}
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
              style={{
                fontWeight: 'bold',
                fontSize: 20,
                lineHeight: 24,
                alignItems: 'center',
                color: '#1C1C1C',
              }}>
              Select documents
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setIsVisible(false)}
            style={styles.DissmissBotton}>
            <Dissmiss />
          </TouchableOpacity>
          <View style={styles.optionPosition}>
            <TouchableOpacity style={styles.option} onPress={() => {}}>
              <Text style={{fontWeight: '600'}}>Gallery</Text>
              <Text style={{fontWeight: '600'}}>Choose an existing file</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={() => {}}>
              <Text style={{fontWeight: '600'}}>Camera</Text>
              <Text style={{fontWeight: '600'}}>Take a picture</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default KycOwner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  terms: {
    fontFamily: 'NotoSerif-Regular',
    color: 'black',
  },
  ScrollView: {
    backgroundColor: 'white',
    // width: '100%',
    marginHorizontal: '5%',
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
});
