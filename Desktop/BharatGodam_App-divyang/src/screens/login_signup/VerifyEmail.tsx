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
import {convertDate} from '../../utils/date';
import Layout from '../../layouts/layout';
import { AxiosError } from 'axios';
import Toast from 'react-native-toast-message';

const CELL_COUNT = 5;

const VerifyEmail = ({route}) => {
  const {token} = route?.params;
  const {email} = route?.params;
  const [isVisible, setisVisible] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp<Record<string, object>>>();
  const [code, setCode] = useState('');
  console.log(code);
  const ref = useBlurOnFulfill({value: code, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  const handleVerifyEmail = async () => {
    // navigation.navigate('FinishCreatingAccountEmail', { email: email })

    try {
      setisVisible(true);
      // Call the verifyOtpByEmail function
      const response = await authApi.verifyOtpByEmail(code, token);
      if (response.data) {
        console.log(response.data, 14);
        // If verification is successful, navigate to the next screen
        navigation.navigate('FinishCreatingAccountEmail', {
          token: response.data.token,
          email: email,
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
        <HeaderComponent title="Verify email" />
        <View style={styles.container}>
          <Text style={[textStyles.bodyB3, styles.instructionText]}>
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
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
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
            text="Verify email"
            bgcolor="#0C447D"
            txtcolor="#FFFFFF"
            borderColor="#0C447D"
            onPress={() => handleVerifyEmail()}
            disabled={code.length < 5}
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
  cell: {
    width: 57,
    height: 68,
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

export default VerifyEmail;
