import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import HeaderComponent from '../../components/Header';
import CustomButton from '../../components/CustomButton';
import textStyles from '../../components/textStyles';
import {authApi} from '../../service/api';
import CustomModal from '../../components/LoadingModal';
import {AxiosError} from 'axios';
import Toast from 'react-native-toast-message';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Layout from '../../layouts/layout';

const CELL_COUNT = 5;

const ResetOtp = ({route}) => {
  //const { token } = route?.params
  const {Email} = route?.params;
  const [isVisible, setisVisible] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp<Record<string, object>>>();
  const [code, setCode] = useState('');
  const [token, setToken] = useState(route?.params.token);
  const ref = useBlurOnFulfill({value: code, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });
  const [seconds, setSeconds] = useState<number>(60);
  const [canResend, setCanResend] = useState<boolean>(false);

  const resendOtp = async () => {
    await authApi
      .RESET_PASSWORD(Email)
      .then(response => {
        console.log(response, 99);
        if (response.data) {
          console.log(response.data.token, 11);
          setToken(response?.data?.token);
          //navigation.navigate('ResetOtp', { token: response.data.token, Email: email })
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

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
    resendOtp();

    // Reset timer
    setSeconds(60);
    setCanResend(false);
  }, []);

  const handleVerifyOtp = async () => {
    // navigation.navigate('FinishCreatingAccountEmail', { email: email })

    try {
      setisVisible(true);
      // Call the verifyOtpByEmail function
      const response = await authApi.VERIFY_OTP_PASSWORD(code, token);
      if (response.data) {
        console.log(response.data, 14);
        // If verification is successful, navigate to the next screen
        navigation.navigate('ResetAndLogin', {
          token: response.data.token,
          Email: Email,
        });
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
      // Handle error if verification fails
      // console.error('Verification failed:', error);
    } finally {
      setisVisible(false);
    }
  };

  return (
    <Layout>
      <View style={styles.container}>
        <HeaderComponent title="Reset password" />
        <View style={styles.content}>
          <Text style={[textStyles.bodyB3, styles.enterCodeText]}>
            Enter the 5 digit code sent in the email
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
          <Text style={[textStyles.bodyB3, styles.resendCodeText]}>
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
            text="Reset password"
            txtcolor="#ffffff"
            borderColor="#0C447D"
            bgcolor="#0C447D"
            onPress={() => handleVerifyOtp()}
            disabled={code.length !== 5}
          />
        </View>
        <CustomModal isVisible={isVisible} setIsVisible={setisVisible} />
      </View>
    </Layout>
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
  enterCodeText: {
    color: 'black',
  },
  resendCodeText: {
    color: 'black',
    marginVertical: '8%',
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
    width: 57,
    height: 68,
    color: '#1C1C1C',
    lineHeight: 69,
    fontSize: 24,
    textAlign: 'center',
    // backgroundColor: '#CEDAE5',
    // borderRadius: 6,
  },
  focusCell: {
    borderColor: '#000',
  },
});

export default ResetOtp;
