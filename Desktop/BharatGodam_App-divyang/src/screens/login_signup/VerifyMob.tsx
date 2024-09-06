import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
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
import Layout from '../../layouts/layout';
import {AxiosError} from 'axios';
import Toast from 'react-native-toast-message';

const CELL_COUNT = 4;

const VerifyMob = ({route}) => {
  const {mobile} = route?.params;
  const {token} = route?.params;
  const [isVisible, setisVisible] = useState<boolean>(false);
  console.log(token, 98);
  const navigation = useNavigation<NavigationProp<Record<string, object>>>();
  const [code, setCode] = useState('');
  const ref = useBlurOnFulfill({value: code, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  const handleVerifyEmail = async () => {
    try {
      setisVisible(true);
      // Call the verifyOtpByEmail function
      const response = await authApi.verifyOtpForPhone(code, token);
      if (response.data) {
        console.log(response.data, 14);
        // If verification is successful, navigate to the next screen
        navigation.navigate('FinishCreatingAccountPhone', {
          token: response.data.token,
          mobile: mobile,
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
    } finally {
      setisVisible(false);
    }
  };

  return (
    <Layout>
      <View style={styles.wrapper}>
        <HeaderComponent title="Verify OTP" />
        <View style={styles.container}>
          <Text style={[textStyles.bodyB3, styles.instructionText]}>
            Enter the 4 digit code sent in SMS
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
          <View style={styles.resendTextWrapper}>
            <Text style={[textStyles.bodyB3, styles.resendText]}>
              You didn't receive the code?{' '}
            </Text>
            <TouchableOpacity>
              <Text
                style={[
                  textStyles.buttonTextUnderline,
                  styles.resendBtnUnderline,
                ]}>
                Resend OTP
              </Text>
            </TouchableOpacity>
          </View>
          <CustomButton
            role="iButton"
            text="Verify OTP"
            bgcolor="#0C447D"
            txtcolor="#FFFFFF"
            borderColor="#0C447D"
            onPress={() => handleVerifyEmail()}
          />
          <CustomModal isVisible={isVisible} setIsVisible={setisVisible} />
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 20,
    backgroundColor: 'white',
    flex: 1,
  },
  instructionText: {
    color: '#1C1C1C',
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
    lineHeight: 24,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
    // backgroundColor: '#CEDAE5',
    // borderRadius: 10,
  },
  focusCell: {
    borderColor: '#000',
  },
  resendBtnUnderline: {
    color: '#07294B',
  },
  resendText: {
    color: '#1C1C1C',
  },
  resendTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 20,
    // marginLeft: 8,
  },
});

export default VerifyMob;
