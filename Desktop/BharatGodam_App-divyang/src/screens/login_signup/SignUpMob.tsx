import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import HeaderComponent from '../../components/Header';
import PhoneInput from '../../components/PhoneInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../../components/CustomButton';
import Email from '../../assets/Email';
import Google from '../../assets/Google';
import textStyles from '../../components/textStyles';
import {authApi} from '../../service/api';
import IEmail from '../../assets/Email';
import CustomModal from '../../components/LoadingModal';
import Layout from '../../layouts/layout';
import Toast from 'react-native-toast-message';
import { AxiosError } from 'axios';

const Home = () => {
  const [isVisible, setisVisible] = useState<boolean>(false);
  const [countryCode, setCountryCode] = useState('+91');
  const [mobile, setMobile] = useState<string>('');
  const navigation = useNavigation<NavigationProp<Record<string, object>>>();

  useEffect(() => {
    console.log('Items list updated:', mobile);
  }, [mobile]);

  const handleSignup = async () => {
    setisVisible(true);
    // navigation.navigate('VerifyMob', { mobile: mobile })
    await authApi
      .signupByPhone(mobile)
      .then(response => {
        console.log(response, 99);
        if (response.data) {
          console.log(response.data.token, 11);
          navigation.navigate('VerifyMob', {
            token: response.data.token,
            mobile: mobile,
          });
        }
      })
      .catch(error => {
        console.error(error);
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
  };

  return (
    <Layout>
      <View style={styles.wrapper}>
        <SafeAreaProvider>
          <View style={styles.container}>
            <HeaderComponent title="Create account" />
            <View style={styles.phoneInputWrapper}>
              <PhoneInput onPhoneNumberChange={text => setMobile(text)} />
            </View>
            <View style={styles.otpTextWrapper}>
              <Text style={[textStyles.bodyB3, styles.otpText]}>
                OTP will be sent to confirm your mobile number
              </Text>
            </View>
            <View style={styles.continueButtonWrapper}>
              <CustomButton
                role="iButton"
                text="Continue"
                bgcolor="#0C447D"
                txtcolor="#FFFFFF"
                borderColor="#0C447D"
                onPress={() => handleSignup()}
                disabled={mobile.length < 10}
              />
            </View>
            <View style={styles.loginTextWrapper}>
              <Text style={[textStyles.bodyB3, styles.loginText]}>
                Already have an account?{' '}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('LoginMob', {});
                }}>
                <Text
                  style={[
                    textStyles.buttonTextUnderline,
                    styles.loginBtnUnderline,
                  ]}>
                  Log in
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.continueWithWrapper}>
              <View style={styles.line} />
              <Text style={[textStyles.bodyB3, styles.continueWithText]}>
                or continue with
              </Text>
              <View style={styles.line} />
            </View>
            <View style={styles.socialButtonsWrapper}>
              <CustomButton
                role="iButton"
                text="   Email"
                borderColor="#0A3664"
                txtcolor="#1C1C1C"
                onPress={() => navigation.navigate('SignupEmail', {})}
                component={() => <IEmail />}
              />
              <CustomButton
                role="iButton"
                text="   Google"
                borderColor="#0A3664"
                txtcolor="#1C1C1C"
                component={() => <Google />}
              />
            </View>
            <CustomModal isVisible={isVisible} setIsVisible={setisVisible} />
          </View>
        </SafeAreaProvider>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  phoneInputWrapper: {
    paddingHorizontal: 15,
  },
  otpTextWrapper: {
    padding: 16,
    paddingHorizontal: 15,
  },
  otpText: {
    color: '#1C1C1C',
    marginVertical: 4,
  },
  continueButtonWrapper: {
    paddingHorizontal: 10,
  },
  loginTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 12,
    marginLeft: 16,
  },
  loginText: {
    color: '#1C1C1C',
  },
  loginBtnUnderline: {
    color: '#07294B',
  },
  continueWithWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginTop: '10%',
  },
  line: {
    borderWidth: 0.2,
    flex: 1,
    height: 1,
    borderColor: '#D3D3D3',
  },
  continueWithText: {
    color: '#1C1C1C',
  },
  socialButtonsWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
    marginTop: '9%',
    justifyContent: 'center',
  },
});

export default Home;
