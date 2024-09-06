import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import HeaderComponent from '../../components/Header';
import EmailInput from '../../components/EmailInput';
import CustomButton from '../../components/CustomButton';
import Google from '../../assets/Google';
import IPhone from '../../assets/Phone';
import textStyles from '../../components/textStyles';
import CustomInputText from '../../components/CustomInputText';
import {authApi} from '../../service/api';
import CustomModal from '../../components/LoadingModal';
import Layout from '../../layouts/layout';
import Toast from 'react-native-toast-message';
import { AxiosError } from 'axios';

const Home = () => {
  const [isVisible, setisVisible] = useState<boolean>(false);
  const [countryCode, setCountryCode] = useState('+91');
  const [email, setEmail] = useState<string>('');
  const [err, setErr] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp<Record<string, object>>>();

  const isValidEmail = (email: string) => {
    // Regular expression to match the pattern
    const emailPattern = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+\.)+com$/;
    return emailPattern.test(email);
  };

  const handleValidation = (text: string) => {
    setEmail(text);
    if (isValidEmail(text)) {
      setErr(''); // Clear error message if email is valid
    } else {
      setErr('Please enter a valid email id');
    }
  };

  const handleSignup = async () => {
    setisVisible(true);
    // navigation.navigate('VerifyEmail', { email: email })
    await authApi
      .signupByEmail(email)
      .then(response => {
        console.log(response, 99);
        if (response.data) {
          console.log(response.data.token, 11);
          navigation.navigate('VerifyEmail', {
            token: response.data.token,
            email: email,
          });
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
  };

  return (
    <Layout>
      <View style={styles.container}>
        <SafeAreaProvider>
          <View style={styles.innerContainer}>
            <HeaderComponent title="Create account" />
            <View
              style={[
                styles.inputContainer,
                {borderColor: err == null || err == '' ? '#707371' : '#CC0000'},
              ]}>
              <CustomInputText
                PlaceHolder="Email"
                onTextChange={handleValidation}
                color={err == null || err == '' ? '#707371' : '#CC0000'}
              />
            </View>
            <View style={styles.verificationTextContainer}>
              <Text
                style={[
                  textStyles.bodyB3,
                  {color: err == null || err == '' ? 'black' : '#CC0000'},
                ]}>
                {err == null || err == ''
                  ? 'Verification code will be sent to confirm your mobile number'
                  : err}
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <CustomButton
                role="iButton"
                text="Continue"
                txtcolor="#FFFFFF"
                bgcolor="#0C447D"
                borderColor="#0C447D"
                onPress={() => handleSignup()}
                disabled={err != '' || err == null}
              />
            </View>
            <View style={styles.loginContainer}>
              <Text style={[textStyles.bodyB3, styles.loginText]}>
                Already have an account?{' '}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('LoginEmail', {})}>
                <Text
                  style={[
                    textStyles.buttonTextUnderline,
                    styles.loginBtnUnderline,
                  ]}>
                  Log in
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={[textStyles.bodyB3, styles.dividerText]}>
                or continue with
              </Text>
              <View style={styles.divider} />
            </View>
            <View style={styles.socialButtonsContainer}>
              <CustomButton
                role="iButton"
                text="   Mobile number"
                borderColor="#0A3664"
                txtcolor="#1C1C1C"
                onPress={() => navigation.navigate('SignupMob', {})}
                component={() => <IPhone />}
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
  container: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
  },
  innerContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 10,
    marginBottom: 16,
    borderColor: '#707371',
  },
  verificationTextContainer: {
    paddingHorizontal: 14,
    paddingBottom: 10,
  },
  buttonContainer: {
    padding: 10,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 5,
    marginLeft: 10,
  },
  loginBtnUnderline: {
    color: '#07294B',
  },
  loginText: {
    color: '#1c1c1c',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginTop: '10%',
  },
  divider: {
    borderWidth: 0.2,
    flex: 1,
    height: 1,
    borderColor: '#D3D3D3',
  },
  dividerText: {
    color: '#1C1C1C',
  },
  socialButtonsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
    marginTop: '9%',
    justifyContent: 'center',
  },
});

export default Home;
