import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import HeaderComponent from '../../components/Header';
import PhoneInput from '../../components/PhoneInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../../components/CustomButton';
import Email from '../../assets/Email';
import IEmail from '../../assets/Email';
import Google from '../../assets/Google';
import Layout from '../../layouts/layout';
import textStyles from '../../components/textStyles';
import {authApi} from '../../service/api';
import CustomModal from '../../components/LoadingModal';
import {AxiosError} from 'axios';
import Toast from 'react-native-toast-message';

const Home = () => {
  const [countryCode, setcountryCode] = useState('+91');
  const [isVisible, setisVisible] = useState<boolean>(false);
  const [mobile, setMobile] = useState<string>('');
  const navigation = useNavigation<NavigationProp<Record<string, object>>>();

  const handleLogin = async () => {
    setisVisible(true);
    // navigation.navigate('VerifyMob', { mobile: mobile })
    await authApi
      .LOGIN_WITH_PHONE(mobile)
      .then(async response => {
        console.log(response, 99);
        if (response.data) {
          console.log(response.data.token, 11);
          navigation.navigate('LoginOTP', {
            token: response.data.token,
            mobile: mobile,
          });
          // navigation.navigate('VerifyMob', { token: response.data.token, mobile: mobile })
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
      <View style={styles.container}>
        <SafeAreaProvider>
          <HeaderComponent title="Log in" />
          <View style={styles.phoneInputWrapper}>
            <PhoneInput onPhoneNumberChange={text => setMobile(text)} />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={[textStyles.bodyB3, styles.infoText]}>
              OTP will be send to confirm your mobile number
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <CustomButton
              role="iButton"
              text="Continue"
              txtcolor="#FFFFFF"
              bgcolor="#0C447D"
              borderColor="#0C447D"
              onPress={() => handleLogin()}
              disabled={mobile.length < 10}
            />
          </View>
          <View style={styles.signUpContainer}>
            <Text style={[textStyles.bodyB3, styles.signUpText]}>
              Don’t have an account?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignupMob', {})}>
              <Text
                style={[
                  textStyles.buttonTextUnderline,
                  styles.loginBtnUnderline,
                ]}>
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.separatorContainer}>
            <View style={styles.separator} />
            <Text style={[textStyles.bodyB3, styles.separatorText]}>
              or continue with
            </Text>
            <View style={styles.separator} />
          </View>
          <View style={styles.socialButtonContainer}>
            <CustomButton
              role="iButton"
              text="   Email"
              borderColor="#0A3664"
              txtcolor="#1C1C1C"
              onPress={() => navigation.navigate('LoginEmail', {})}
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
        </SafeAreaProvider>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  infoTextContainer: {
    padding: 8,
  },
  infoText: {
    color: 'black',
  },
  buttonContainer: {
    padding: 10,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 5,
    marginLeft: 7,
  },
  signUpText: {
    color: '#1C1C1C',
  },
  signUpLink: {
    fontSize: 14,
    color: '#0C447D',
    textDecorationLine: 'underline',
  },
  separatorContainer: {
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '10%',
  },
  separator: {
    borderBottomWidth: 1,
    flex: 1,
    height: 1,
    borderColor: '#D3D3D3',
  },
  separatorText: {
    color: '#1C1C1C',
  },
  socialButtonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '9%',
    justifyContent: 'center',
    gap: 20,
  },
  phoneInputWrapper: {
    paddingHorizontal: 8,
  },
  loginBtnUnderline: {
    color: '#07294B',
  },
});

export default Home;
