import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import HeaderComponent from '../../components/Header';
import CustomButton from '../../components/CustomButton';
import textStyles from '../../components/textStyles';
import {authApi} from '../../service/api';
import {storeName, storeRole, storeToken} from '../../utils/auth';
import {
  updateLoggedIn,
  setRole,
  setToken,
  setName,
} from '../../redux/slices/user';
import CustomModal from '../../components/LoadingModal';
import Toast from 'react-native-toast-message';
import {AxiosError} from 'axios';
import {
  cacheNotifications,
  fetchNotificationsFromAPI,
} from '../../utils/Notification';

const CELL_COUNT = 4;

const Otp = ({route}) => {
  const {token, mobile} = route?.params;
  const [isVisible, setisVisible] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp<Record<string, object>>>();
  const [code, setCode] = useState('');
  const [authtoken, setAuthToken] = useState(token);
  const ref = useBlurOnFulfill({value: code, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });
  const dispatch = useDispatch();

  const [seconds, setSeconds] = useState<number>(60);
  const [canResend, setCanResend] = useState<boolean>(false);

  // const resendOtp = async()=>{
  //   await authApi.RESET_PASSWORD(Email)
  //   .then(response => {
  //       console.log(response, 99)
  //       if (response.data) {
  //           console.log(response.data.token, 11)
  //           setToken(response?.data?.token)
  //           //navigation.navigate('ResetOtp', { token: response.data.token, Email: email })
  //       }
  //   })
  //   .catch(error => {
  //       console.error(error);
  //   });
  // }

  useEffect(() => {
    if (seconds === 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setSeconds(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  const handleResendClick = useCallback(() => {
    // Call your resend function here
    setisVisible(true);
    // navigation.navigate('VerifyMob', { mobile: mobile })
    authApi
      .LOGIN_WITH_PHONE(mobile)
      .then(async response => {
        console.log(response, 99);
        if (response.data) {
          console.log(response.data.token, 11);
          setAuthToken(response.data.token);
        }
      })
      .catch(error => {
        if (error instanceof AxiosError) {
          Toast.show({
            type: 'error',
            text1: 'An error occurred',
            text2: error?.response?.data.error,
          });
        } else {
          console.error(error);
        }
      });
    setisVisible(false);
    // Reset timer
    setSeconds(60);
    setCanResend(false);
  }, []);

  const handleVerifyPhone = async () => {
    try {
      setisVisible(true);
      const response = await authApi.VERIFY_OTP_LOGIN_PHONE(code, authtoken);
      if (response.data) {
        const role =
          response.data.data.role === 'Warehouse owner' ? 'owner' : 'user';
        const token = response.data.token;
        const name = response.data.data.firstName;
        await storeRole(role);
        await storeToken(token);
        await storeName(name);
        dispatch(updateLoggedIn(true));
        dispatch(setRole(role));
        dispatch(setToken(token));
        dispatch(setName(name));
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        Toast.show({
          type: 'error',
          text1: 'An error occurred',
          text2: error?.response?.data.error,
        });
      } else {
        console.error(error);
      }
    } finally {
      setisVisible(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent title="Verify OTP" />
      <View style={styles.content}>
        <Text style={[textStyles.bodyB3, styles.infoText]}>
          Enter the 4 digit code sent in sms
        </Text>
        <CodeField
          ref={ref}
          {...props}
          value={code}
          onChangeText={setCode}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <View style={styles.inputCell}>
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
          )}
        />
        <Text style={[textStyles.bodyB3, styles.resendText]}>
          You didn't receive the code?{' '}
          {canResend ? (
            <Text
              onPress={handleResendClick}
              style={{
                color: '#0C447D',
                fontWeight: 'bold',
                textDecorationLine: 'underline',
              }}>
              Resend
            </Text>
          ) : (
            <Text>{`Resend in ${seconds} secs`}</Text>
          )}
        </Text>
        <CustomButton
          role="iButton"
          text="Verify OTP"
          bgcolor="#0C447D"
          txtcolor="#FFFFFF"
          borderColor="#0C447D"
          onPress={handleVerifyPhone}
          disabled={code.length !== 4}
        />
      </View>
      <CustomModal isVisible={isVisible} setIsVisible={setisVisible} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
    backgroundColor: 'white',
    flex: 1,
  },
  infoText: {
    color: 'black',
  },
  codeFieldRoot: {
    marginTop: 20,
  },
  inputCell: {
    backgroundColor: '#CEDAE5',
    borderRadius: 4,
    // width: 64,
    height: 72,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
  },
  cell: {
    // width: 64,
    // height: 72,
    color: '#1C1C1C',
    lineHeight: 69,
    fontSize: 24,
    textAlign: 'center',
    // backgroundColor: '#CEDAE5',
    // borderRadius: 10,
  },
  focusCell: {
    borderColor: '#000',
  },
  resendText: {
    color: 'black',
    marginTop: '8%',
    marginBottom: '8%',
  },
  resendTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 20,
    // marginLeft: 8,
  },
  resendBtnUnderline: {
    color: '#07294B',
  },
});

export default Otp;
