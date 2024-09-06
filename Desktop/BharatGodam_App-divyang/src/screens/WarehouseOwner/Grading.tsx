import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderComponent from '../../components/Header';
import textStyles from '../../components/textStyles';
import CustomInputText from '../../components/CustomInputText';
import Layout from '../../layouts/ScrollLayout';
import {TouchableOpacity} from 'react-native';
import Calender from '../../assets/Calender';
import {Calendar} from 'react-native-calendars';
import Dissmiss from '../../assets/Dissmiss';
import ButtonWithAutoWidth from '../../components/ButtonWithAutoWidth';
import ArrowUpload from '../../assets/ArrowUpload';
import DocumentPicker from 'react-native-document-picker';
import {Image} from 'react-native';
import CheckBox from '../../components/CheckBox';
import CustomButton from '../../components/CustomButton';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native';
import Dropdown from '../../assets/Dropdown';
import {GradeAndDeposit} from '../../service/api';
import Toast from 'react-native-toast-message';

interface DateObject {
  dateString: string;
  day: number;
  month: number;
  timestamp: number;
  year: number;
}

interface Document {
  fileCopyUri: string | null;
  name: string;
  size: number;
  type: string;
  uri: string;
}

const Grading = ({route}) => {
  const {id} = route?.params;
  console.log(id, 99);
  const [isClickedCommodity, setIsClickedCommodity] = useState<
    boolean | undefined
  >(false);
  const [SelectedCommodity, setSelectedCommodity] = useState<string>('');
  const [SelectedGrade, setSelectedGrade] = useState<string>('');
  const [Data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [ExpiryDate, setExpiryDate] = useState<DateObject | null>(null);
  const [doc1, setDoc1] = useState<Document | null>(null);
  const [showCalender, setshowCalender] = useState<boolean>(false);
  const [isCheckBox, setCheckBox] = useState<boolean>(false);
  const [inputs, setInputs] = useState<{[key: string]: string}>({
    'Assayer name': '',
    'Foreign matter (%  by weight)': '',
    'Other food grains (% by  weight)': '',
    'Other wheat (% by  weight)': '',
    'Damaged grains (% by  weight)': '',
    'Immature and shrivelled grains (% by  weight)': '',
    'Weevilled grains (% by  weight)': '',
  });

  const Overall_grade = [
    {Grade: 'Grade I', backend: 'grade-I'},
    {Grade: 'Grade II', backend: 'grade-II'},
    {Grade: 'Grade III', backend: 'grade-III'},
  ];

  const navigation = useNavigation<NavigationProp<Record<string, object>>>();

  const handleTextChange = (key: string) => (text: string) => {
    setInputs(prevInputs => ({
      ...prevInputs,
      [key]: text,
    }));
  };

  const handleChangeDate = (date: DateObject) => {
    setshowCalender(false);
    setExpiryDate(date);
  };

  const handlePressedExpiryDate = () => {
    // if (ModalType === 'Deposit date' || ModalType === 'Revalidation date') {
    //     setModalType('Expiry date');
    //     setshowCalender(true);
    // } else {
    setshowCalender(!showCalender);
    //     setModalType('Expiry date');
    // }
  };

  const hendleSubmit = async () => {
    try {
      await GradeAndDeposit.add_grade(
        id,
        inputs['Assayer name'],
        ExpiryDate?.dateString,
        inputs['Foreign matter (%  by weight)'],
        inputs['Other food grains (% by  weight)'],
        inputs['Other wheat (% by  weight)'],
        inputs['Damaged grains (% by  weight)'],
        inputs['Immature and shrivelled grains (% by  weight)'],
        inputs['Weevilled grains (% by  weight)'],
        SelectedGrade,
      );
      navigation.navigate('Dashboard', {});
    } catch (error) {
      console.error(error.response?.data.error);
      Toast.show({
        text1: 'AN errror occured',
        text2: error.response?.data?.error,
        type: 'error',
        visibilityTime: 4000,
      });
    }
  };
  useEffect(() => {
    const getbooking = async () => {
      try {
        const response = await GradeAndDeposit.get_deposit_by_deposit_Id(id);
        console.log(response, 99);
        if (response.data) {
          console.log(response.data.data, 10189897987);
          setData(response.data.data);
        }
      } catch (error) {
        console.error(error.response.data);
      }
    };
    getbooking();
  }, []);

  const selectDoc = async (
    setDoc: React.Dispatch<React.SetStateAction<Document | null>>,
  ) => {
    try {
      const doc = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf], // You can add more types if needed
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

  const allFieldsFilled =
    Object.values(inputs).every(input => input !== '') &&
    ExpiryDate !== null &&
    SelectedCommodity !== '' &&
    isCheckBox == true;

  return (
    <View style={styles.container}>
      <HeaderComponent title={'Grading'} />
      <Layout>
        <View style={styles.content}>
          <Text style={[textStyles.bodyB3, {color: '#1C1C1C'}]}>
            Enter grading information for the{' '}
            <Text style={[textStyles.headingH7]}>deposit ID {Data._id}</Text>
          </Text>
          <Text style={[textStyles.bodyB2, {color: '#1C1C1C'}]}>
            Commodity :{' '}
            <Text style={[textStyles.headingH7]}>{Data.commodityName}</Text>
          </Text>
          <View
            style={{borderWidth: 1, borderRadius: 7, borderColor: '#707371'}}>
            <CustomInputText
              PlaceHolder="Assayer name"
              onTextChange={handleTextChange('Assayer name')}
            />
          </View>
          <View
            style={{
              width: '100%',
              height: 56,
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              onPress={handlePressedExpiryDate}
              style={{
                width: '100%',
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
                {ExpiryDate == null ? null : (
                  <Text style={textStyles.bodyB4}>Assaying date</Text>
                )}
                {/* <Text style={textStyles.bodyB4}>End date</Text> */}
                <Text
                  style={
                    ExpiryDate == null
                      ? textStyles.bodyB3
                      : [textStyles.headingH8, {color: 'black'}]
                  }>
                  {ExpiryDate == null ? 'Assaying date' : ExpiryDate.dateString}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {showCalender ? (
            <View style={styles.calender}>
              <Calendar
                style={{borderRadius: 8, elevation: 4}}
                onDayPress={handleChangeDate}
                markedDates={{
                  [ExpiryDate?.dateString || 'defaultExpiryDate']: {
                    selected: true,
                    selectedColor: '#0C447D',
                    selectedTextColor: '#FFFFFF',
                  },
                }}
                hideExtraDays={true}
              />
            </View>
          ) : (
            <></>
          )}
          {doc1 == null ? (
            <View>
              <View
                style={{
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  height: 137,
                  borderStyle: 'dashed',
                  borderWidth: 1,
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
                  Upload photo/file{' '}
                  <Text style={[textStyles.bodyB3, {color: '#989E9A'}]}>
                    {'(Not mandatory)'}
                  </Text>
                </Text>
                <Text
                  style={{
                    fontWeight: '400',
                    color: '#707371',
                    fontSize: 14,
                    lineHeight: 21,
                  }}>
                  File format : PNG, JPG, pdf
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
              <View style={{}}>
                <Text
                  style={[
                    textStyles.bodyB3,
                    {
                      color: errorMessage ? 'red' : '#707371',
                    },
                  ]}>
                  {errorMessage
                    ? errorMessage
                    : 'File size should not exceed 10MB'}
                </Text>
              </View>
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 16,
              }}>
              <View
                style={{flexDirection: 'row', gap: 12, alignItems: 'center'}}>
                <Image
                  source={{
                    uri: 'https://s3-alpha-sig.figma.com/img/e258/39d6/1ea963e0ed243328dbed0f21ed53730f?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DFT3Y85efZqOUYfCKtOkrWspSUojFS~~ZeTw2xuh9WYVuWu5VzsaTnomOM2JTyXKoy2tEjtzxLirXY3yBYsgReymLhbfeko63-jR5pGrOpnznlvbjdJpvXjtRBTtXaeAvB5SunzpwPEGcciZ5edrhdag1kMX2jtkNnePZFGdGCcWfhjMFXad8s~xd1egOn9Mxb~21UYLEIB1P~BYtSJDOHiv-EJmJxWBngGY7h0B6EMWaG~soTmaHv9~ip4N0gzYWSMxPXxpBNSRU-Zl2S-3UPMUbT6UAIIjBuwjeokFjVmGYOcJmORN8zh0lNuyoOIVPDzVk6fk5gtLd7NJEzFA1g__',
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
                    Photo
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
          <View
            style={{borderWidth: 1, borderRadius: 7, borderColor: '#707371'}}>
            <CustomInputText
              keyboard="numeric"
              PlaceHolder="Foreign matter (%  by weight)"
              onTextChange={handleTextChange('Foreign matter (%  by weight)')}
            />
          </View>
          <View
            style={{borderWidth: 1, borderRadius: 7, borderColor: '#707371'}}>
            <CustomInputText
              keyboard="numeric"
              PlaceHolder="Other food grains (% by  weight)"
              onTextChange={handleTextChange(
                'Other food grains (% by  weight)',
              )}
            />
          </View>
          <View
            style={{borderWidth: 1, borderRadius: 7, borderColor: '#707371'}}>
            <CustomInputText
              keyboard="numeric"
              PlaceHolder="Other wheat (% by  weight)"
              onTextChange={handleTextChange('Other wheat (% by  weight)')}
            />
          </View>
          <View
            style={{borderWidth: 1, borderRadius: 7, borderColor: '#707371'}}>
            <CustomInputText
              keyboard="numeric"
              PlaceHolder="Damaged grains (% by  weight)"
              onTextChange={handleTextChange('Damaged grains (% by  weight)')}
            />
          </View>
          <View
            style={{borderWidth: 1, borderRadius: 7, borderColor: '#707371'}}>
            <CustomInputText
              keyboard="numeric"
              PlaceHolder="Immature and shrivelled grains (% by  weight)"
              onTextChange={handleTextChange(
                'Immature and shrivelled grains (% by  weight)',
              )}
            />
          </View>
          <View
            style={{borderWidth: 1, borderRadius: 7, borderColor: '#707371'}}>
            <CustomInputText
              keyboard="numeric"
              PlaceHolder="Weevilled grains (% by  weight) "
              onTextChange={handleTextChange('Weevilled grains (% by  weight)')}
            />
          </View>
          <TouchableOpacity
            style={{
              borderWidth: 0.5,
              width: '100%',
              borderRadius: 8,
              height: 56,
              paddingLeft: 12,
              paddingRight: 25,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => {
              setIsClickedCommodity(!isClickedCommodity);
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                justifyContent: 'space-between',
              }}>
              <View>
                {SelectedCommodity == '' ? null : (
                  <Text style={textStyles.bodyB4}>Overall grade</Text>
                )}
                <Text
                  style={
                    SelectedCommodity == ''
                      ? textStyles.bodyB3
                      : [textStyles.headingH8, {color: 'black'}]
                  }>
                  {SelectedCommodity == ''
                    ? 'Overall grade'
                    : SelectedCommodity}
                </Text>
              </View>
              <Dropdown />
            </View>
          </TouchableOpacity>
          {isClickedCommodity ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.commodityScrollView}>
              {Overall_grade.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    width: '100%',
                    borderRadius: 8,
                    height: 50,
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    setSelectedCommodity(item.Grade);
                    setSelectedGrade(item.backend);
                    setIsClickedCommodity(!isClickedCommodity);
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      paddingLeft: 20,
                      color: 'black',
                    }}>
                    {item.Grade}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          ) : (
            <></>
          )}
          <View style={{flexDirection: 'row', gap: 8, alignItems: 'center'}}>
            <CheckBox onPress={() => setCheckBox(!isCheckBox)} />
            <Text style={[textStyles.bodyB3, {color: '#1C1C1C'}]}>
              The above details are as per assayer’s report
            </Text>
          </View>
          <Text style={[textStyles.bodyB3, {color: '#1C1C1C'}]}>
            The above mentioned information will be sent to the
            farmer/trader/FPOs for acknowledgement.
          </Text>
          <CustomButton
            text="Save deposit"
            txtcolor="#FFFFFF"
            bgcolor="#0C447D"
            borderColor="#0C447D"
            role="iButton"
            onPress={() => hendleSubmit()}
            disabled={!allFieldsFilled}
          />
        </View>
      </Layout>
    </View>
  );
};

export default Grading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  content: {
    paddingHorizontal: 14.5,
    gap: 24,
  },
  calender: {
    backgroundColor: 'white',
    width: '100%',
    zIndex: 1,
    position: 'absolute',
    top: '34%',
    left: '4.4%',
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
    top: '85%',
    left: '4.4%',
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
