import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Back from '../../assets/Back';
import Dropdown from '../../assets/Dropdown';
import Calender from '../../assets/Calender';
import {Calendar} from 'react-native-calendars';
import ChevronLeft from '../../assets/ChevronLeft';
import ChevronRight from '../../assets/ChevronRight';
import CalendarModal from '../../components/Calendar';
import CustomInputText from '../../components/CustomInputText';
import Cross from '../../assets/Cross';
import Layout from '../../layouts/layout';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../../types/navigationTypes';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {
  Withdrawalapi,
  authApi,
  GradeAndDeposit,
  Booking,
} from '../../service/api';
import Deposite from '../../assets/Deposite';
import {
  WithdrawalDetails,
  addShipping,
  addShippingParams,
} from '../../types/entities';
import {convertDate} from '../../utils/date';
import {set} from '../../utils/auth';
import Toast from 'react-native-toast-message';

type WithdrawalDataProps = NativeStackScreenProps<
  RootStackParamList,
  'WithdrawalData'
>;

const {width, height} = Dimensions.get('window');

const WithdrawalData: React.FC<WithdrawalDataProps> = ({navigation, route}) => {
  const variant = useSelector((state: RootState) => state.user.role);
  const today = new Date();
  const month = today.toLocaleString('default', {month: 'short'});
  const day = today.getDate();
  const year = today.getFullYear();
  const date = `${day} ${month} ${year}`;
  const [data, setData] = useState(route.params.data ? route.params.data : []);
  const [payload, setPayload] = useState<addShipping>(
    route.params.payload ? route.params.payload : ({} as addShipping),
  );
  const [params, setParams] = useState<addShippingParams>(
    route.params.params ? route.params.params : ({} as addShippingParams),
  );
  const [toggleDeposite, setToggleDeposite] = useState(false);
  const [toggleWithdrawal, setToggleWithdrawal] = useState(false);
  const [toggleCalendar, setToggleCalendar] = useState(false);
  const [toggleOTP, setToggleOTP] = useState(false);
  const [phone, setPhone] = useState('');
  const [searchID, setSearchID] = useState('');
  const [depositId, setDepositId] = useState<string[]>([]);
  const [StaticData, setStaticData] = useState<WithdrawalDetails[]>([]);
  const [withdrawal, setWithdrawal] = useState('');
  const [tentative, setTentative] = useState('');
  const [withdrawalValue, setWithdrawalValue] = useState('');
  const [otp, setOtp] = useState(false);
  const [verifyOtp, setVerifyOtp] = useState(false);
  const [error, setError] = useState(false);
  const [condition, setCondition] = useState(false);
  const heading = [
    'Name',
    'Email id',
    'Warehouse name',
    'Commodity',
    'Start date',
    'End date',
    'Total weight',
    'Total actual weight',
    'Total no of bags',
    'Bag size',
  ];
  const [code, setCode] = useState('');
  const ref = useBlurOnFulfill({value: code, cellCount: 4});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });
  const renderText = (item: string, index: number) => {
    console.log(index);
    return (
      <View style={styles.requestTextContainer}>
        <Text style={styles.desc}>{item}</Text>
        <Text style={styles.value}>{data[index]}</Text>
      </View>
    );
  };

  const handleToggleDeposite = () => {
    setToggleDeposite(!toggleDeposite);
  };
  const handleToggleWithdrawal = () => {
    setToggleWithdrawal(!toggleWithdrawal);
  };
  const handleSearch = async (option: string) => {
    setToggleDeposite(!toggleDeposite);
    setSearchID(option);
    const tempy: WithdrawalDetails = StaticData[depositId.indexOf(option)];
    //console.log(tempy,22)
    const temp: WithdrawalDetails = await Booking.get_bookings_by_booking_id(
      tempy.bookingId._id,
    );
    const user_id = tempy.bookingId.user;
    console.log('condition : ', user_id === tempy.User);
    setCondition(user_id === tempy.User);
    console.log('variant : ', variant !== 'user');

    // console.log(user_id,102)
    const userDetails = await authApi.getUser(user_id);
    // console.log(userDetails)
    setPhone(userDetails.phone);
    setData([
      userDetails.firstName,
      userDetails.email,
      temp.warehouse.warehouse_name,
      temp.Commodity[0].name,
      convertDate(temp.fromDate),
      convertDate(temp.toDate),
      parseFloat(temp.totalWeight).toFixed(2) + ' MT',
      parseFloat(temp.totalWeight).toFixed(2) + ' MT',
      //(temp.totalWeight) + ' MT',
      temp.noOfBags,
      temp.bagSize,
    ]);

    setPayload({
      driverName: 'TN-12-9955',
      truckNumber: 'Riyaz Khan',
      commodity: tempy.bookingId.Commodity.map(item => ({
        itemName: item.name,
        quantity: item.totalWeight,
      })),
      totalBags: tempy.noOfBags,
    });

    setParams({
      warehouse_id: tempy.bookingId.warehouse,
      booking_id: tempy.bookingId._id,
    });

    console.log(100);
  };
  const handleWithdrawal = (option: string) => {
    setToggleWithdrawal(!toggleWithdrawal);
    setWithdrawal(option);
  };
  const handleToggleCalendar = () => {
    setToggleCalendar(!toggleCalendar);
    setError(false);
  };
  const handleValue = (value: string) => {
    setWithdrawalValue(value);
  };
  const handleWithdrawalRequest = async () => {
    console.log('Payload :', payload);
    const payloadWithWithdrawalStatus = {
      ...payload,
      commodity: payload.commodity.map(item => ({
        ...item,
        quantity:
          withdrawal === 'Partial withdrawal'
            ? withdrawalValue
            : variant !== 'user' || condition
            ? data[7].split(' ')[0]
            : data[4].split(' ')[0],
      })),
      withdrawlStatus: withdrawal === 'Partial withdrawal' ? 'partial' : 'full',
    };
    await Withdrawalapi.add_shipping(payloadWithWithdrawalStatus, params);
    navigation.navigate('Dashboard');
    Toast.show({
      type: 'success',
      text1: 'Withdrawal is done',
    });
  };
  const handleotp = async () => {
    setOtp(!otp);
    await Withdrawalapi.sendOTP(phone);
  };
  const handleverifyotp = async () => {
    console.log(code, 1110);
    const response = await Withdrawalapi.verifyOTP(code, phone);
    setCode('');
    if (response) {
      const payloadWithWithdrawalStatus = {
        ...payload,
        commodity: payload.commodity.map(item => ({
          ...item,
          quantity:
            withdrawal === 'Partial withdrawal'
              ? withdrawalValue
              : variant !== 'user'
              ? data[7].split(' ')[0]
              : data[4].split(' ')[0],
        })),
        withdrawlStatus:
          withdrawal === 'Partial withdrawal' ? 'partial' : 'full',
      };
      await Withdrawalapi.add_shipping(payloadWithWithdrawalStatus, params);
    }
    setVerifyOtp(!verifyOtp);
    navigation.navigate('Dashboard');
    Toast.show({
      type: 'success',
      text1: 'Withdrawal is done',
    });
  };
  const withdrawalOptions = ['Partial withdrawal', 'Full withdrawal'];
  const renderDropdownOptions = (option: string, deposite?: boolean) => {
    return (
      <TouchableOpacity
        style={[styles.dropDownOptions, deposite && {height: height * 0.07}]}
        onPress={() =>
          deposite ? handleSearch(option) : handleWithdrawal(option)
        }>
        <Text style={styles.dropDownText}>{option}</Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    const getData = async () => {
      if (data.length > 0) {
        return;
      }
      let temp = await GradeAndDeposit.get_deposit();
      temp = temp.filter(item => !item.bookingId.isBookingWithdrawn);
      console.log(temp.map(item => item._id));
      setDepositId(temp.map(item => item._id));
      setStaticData(temp);

      // console.log(temp[0],222)
    };
    getData();
  }, []);

  return (
    <Layout>
      <ScrollView
        // style={styles.container}
        scrollEnabled={!toggleDeposite}
        contentContainerStyle={{alignItems: 'center'}}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Back />
          </TouchableOpacity>
          <Text style={styles.heading}>Withdrawal data</Text>
        </View>
        {variant !== 'user' && (
          <TouchableOpacity
            style={styles.sortby}
            onPress={handleToggleDeposite}>
            <View
              style={{
                justifyContent: searchID ? 'space-between' : 'center',
                height: '70%',
              }}>
              <Text style={searchID ? styles.sortText1 : styles.sortText2}>
                Deposite ID
              </Text>
              {searchID && <Text style={styles.selectedText}>{searchID}</Text>}
            </View>
            <Dropdown />
          </TouchableOpacity>
        )}
        {toggleDeposite && (
          <ScrollView
            style={[
              styles.dropDownOptionsContainerDeposite,
              {top: searchID ? '18%' : '36%'},
            ]}
            contentContainerStyle={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {depositId.map(option => renderDropdownOptions(option, true))}
          </ScrollView>
        )}
        {(searchID || data.length > 0) && (
          <View style={styles.requestContainer}>
            {variant !== 'user' &&
              heading.map((item, index) => renderText(item, index))}
            {variant === 'user' &&
              heading.slice(2).map((item, index) => renderText(item, index))}
          </View>
        )}
        <View style={styles.inputContainer}>
          <View style={styles.input}>
            <Calender />
            <View
              style={{
                justifyContent: withdrawal ? 'space-between' : 'center',
                height: '70%',
                width: '75%',
              }}>
              <Text style={styles.sortText1}>Initial Date</Text>
              <Text style={styles.selectedText}>{date}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.input} onPress={handleToggleCalendar}>
            <Calender />
            <View
              style={{
                justifyContent: tentative ? 'space-between' : 'center',
                height: '70%',
                width: '75%',
              }}>
              <Text style={tentative ? styles.sortText1 : styles.sortText2}>
                Tentative wi...
              </Text>
              {tentative && (
                <Text style={styles.selectedText}>{tentative}</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.sortby}
          onPress={handleToggleWithdrawal}
          disabled={!searchID && data.length === 0}>
          <View
            style={{
              justifyContent: withdrawal ? 'space-between' : 'center',
              height: '70%',
            }}>
            <Text style={withdrawal ? styles.sortText1 : styles.sortText2}>
              Withdrawal
            </Text>
            {withdrawal && (
              <Text style={styles.selectedText}>{withdrawal}</Text>
            )}
          </View>
          <Dropdown />
        </TouchableOpacity>
        {toggleWithdrawal && (
          <View
            style={[
              styles.dropDownOptionsContainerWithdrawal,
              {top: variant !== 'user' ? '88%' : '62%'},
            ]}>
            {withdrawalOptions.map(option => renderDropdownOptions(option))}
          </View>
        )}
        {withdrawal === 'Partial withdrawal' && (
          <View style={[styles.sortby, {marginTop: 16}]}>
            <CustomInputText
              PlaceHolder="Weight to be withdrawn"
              onTextChange={handleValue}
              keyboard="numeric"
              metric={
                variant !== 'user'
                  ? data[7].split(' ')[1]
                  : data[4].split(' ')[1]
              }
            />
          </View>
        )}
        {withdrawal === 'Full withdrawal' && (
          <View style={styles.fullWithdrawal}>
            <View
              style={{
                justifyContent: withdrawal ? 'space-between' : 'center',
                height: '70%',
                width: '100%',
              }}>
              <Text style={styles.sortText1}>Weight to be withdrawn</Text>
              <Text style={styles.selectedText}>
                {variant === 'user' ? data[4] : data[7]}
              </Text>
            </View>
          </View>
        )}
        {(searchID || data) &&
        (withdrawal === 'Full withdrawal' || withdrawalValue) &&
        tentative ? (
          <TouchableOpacity
            style={styles.withdrawButton}
            onPress={
              variant !== 'user' && !condition
                ? handleotp
                : handleWithdrawalRequest
            }>
            <Text style={[styles.selectedText, {color: 'white'}]}>
              Withdraw
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.withdrawButtonIdle} disabled={true}>
            <Text style={styles.selectedText}>Withdraw</Text>
          </TouchableOpacity>
        )}
        <CalendarModal
          toggleCalendar={toggleCalendar}
          handleToggleCalendar={handleToggleCalendar}
          setDate={setTentative}
        />
        <Modal transparent={true} visible={otp}>
          <TouchableOpacity
            style={styles.modalContainer}
            onPress={() => setOtp(!otp)}>
            <View style={styles.modalInnerContainer}>
              <TouchableOpacity
                style={{alignItems: 'flex-end'}}
                onPress={() => setOtp(!otp)}>
                <Cross />
              </TouchableOpacity>
              <Text style={[styles.selectedText, {textAlign: 'center'}]}>
                Verify the OTP sent to the farmer/{'\n'}trader/FPOs
              </Text>
              <View style={styles.buttonModalContainer}>
                <TouchableOpacity
                  style={styles.reject}
                  onPress={() => setOtp(!otp)}>
                  <Text style={styles.rejectText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.accept}>
                  <Text
                    style={styles.acceptText}
                    onPress={() => {
                      setVerifyOtp(!verifyOtp);
                      setOtp(!otp);
                    }}>
                    Verify OTP
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
        <Modal transparent={true} visible={verifyOtp}>
          <TouchableOpacity
            style={styles.modalContainer}
            onPress={() => setVerifyOtp(!verifyOtp)}>
            <View style={[styles.modalInnerContainer, {height: '40%'}]}>
              <TouchableOpacity
                style={{alignItems: 'flex-end'}}
                onPress={() => setVerifyOtp(!verifyOtp)}>
                <Cross />
              </TouchableOpacity>
              <Text style={[styles.selectedText, {textAlign: 'center'}]}>
                Verify OTP
              </Text>
              <Text style={styles.otpPrompt}>
                Enter the 4 digit code sent to farmer/trader/FPOs in sms
              </Text>
              <CodeField
                ref={ref}
                {...props}
                value={code}
                onChangeText={setCode}
                cellCount={4}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({index, symbol, isFocused}) => (
                  <Text
                    key={index}
                    style={[styles.cell, isFocused && styles.focusCell]}
                    onLayout={getCellOnLayoutHandler(index)}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                )}
              />
              {code.length === 4 ? (
                <TouchableOpacity style={styles.OTPButton}>
                  <Text style={styles.acceptText} onPress={handleverifyotp}>
                    Verify OTP
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[styles.OTPButton, {backgroundColor: '#989E9A'}]}>
                  <Text style={[styles.rejectText, {color: 'black'}]} disabled>
                    Verify OTP
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>
        </Modal>
      </ScrollView>
    </Layout>
  );
};

export default WithdrawalData;

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
    // marginBottom: 24,
  },
  heading: {
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    flexGrow: 1,
    textAlign: 'center',
  },
  selectedText: {color: 'black', fontFamily: 'Poppins-SemiBold', fontSize: 16},
  inputContainer: {
    width: '90%',
    height: height * 0.08,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 24,
  },
  input: {
    width: '47%',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '2%',
    borderRadius: 8,
  },
  sortby: {
    width: '90%',
    height: height * 0.08,
    paddingHorizontal: '3%',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#707371',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    opacity: 1,
    marginBottom: 14,
  },
  sortText1: {
    color: '#707371',
    fontFamily: 'NotoSerif-Regular',
    fontSize: 12,
    marginRight: 5,
  },
  sortText2: {
    color: '#707371',
    fontFamily: 'NotoSerif-Regular',
    fontSize: 14,
    marginRight: 5,
  },
  dropDownOptions: {height: '50%', width: '80%', justifyContent: 'center'},
  dropDownText: {
    fontFamily: 'NotoSerif-Regular',
    color: 'black',
    fontSize: 14,
    marginRight: 8,
  },
  dropDownOptionsContainerDeposite: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    width: '90%',
    zIndex: 1,
    position: 'absolute',
    height: height * 0.3,
    paddingVertical: '1%',
    borderColor: '#989E9A',
    borderWidth: 1,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 5, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  requestContainer: {
    width: '90%',
    height: 'auto',
    alignSelf: 'center',
    borderColor: '#C1C4C2',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: '5%',
    paddingVertical: '5%',
    // marginTop: 24,
  },
  requestTextContainer: {
    height: height * 0.045,
    flexDirection: 'row',
  },
  desc: {
    fontFamily: 'NotoSerif-Regular',
    color: 'black',
    fontSize: 12,
    flex: 1,
  },
  value: {
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
    fontSize: 11,
    flex: 1,
  },
  dropDownOptionsContainerWithdrawal: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    width: '90%',
    zIndex: 1,
    position: 'absolute',
    height: height * 0.12,
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
  buttonModalContainer: {
    height: '35%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  reject: {
    width: '47%',
    borderColor: '#07294B',
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rejectText: {
    color: '#07294B',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  accept: {
    width: '47%',
    backgroundColor: '#07294B',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptText: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  codeFieldRoot: {
    marginTop: 20,
  },
  cell: {
    width: 64,
    height: 72,
    color: '#1C1C1C',
    lineHeight: 69,
    fontSize: 24,
    textAlign: 'center',
    backgroundColor: '#CEDAE5',
    borderRadius: 10,
  },
  focusCell: {
    borderColor: '#000',
  },
  fullWithdrawal: {
    width: '90%',
    height: height * 0.08,
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '2%',
    borderRadius: 8,
    backgroundColor: '#CEDAE5',
  },
  withdrawButton: {
    width: '80%',
    height: height * 0.08,
    backgroundColor: '#0C447D',
    marginTop: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  withdrawButtonIdle: {
    width: '80%',
    height: height * 0.08,
    backgroundColor: '#989E9A',
    marginTop: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalInnerContainer: {
    width: '90%',
    height: '25%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    padding: '5%',
  },
  otpPrompt: {color: 'black', fontSize: 14, fontFamily: 'NotoSerif-Regular'},
  OTPButton: {
    width: '50%',
    height: '20%',
    backgroundColor: '#07294B',
    alignSelf: 'center',
    marginTop: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
