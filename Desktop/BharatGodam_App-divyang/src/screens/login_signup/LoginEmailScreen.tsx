import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import HeaderComponent from '../../components/Header';
import CustomButton from '../../components/CustomButton';
import PasswordInput from '../../components/PasswordInput';
import textStyles from '../../components/textStyles';
import CustomInputText from '../../components/CustomInputText';
import Layout from '../../layouts/layout';
import {authApi} from '../../service/api';
import {RootState} from '../../redux/store';
import {
  updateLoggedIn,
  setRole,
  setToken,
  setName,
} from '../../redux/slices/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from 'react-native-paper';
import CustomModal from '../../components/LoadingModal';
import {storeRole, storeToken, storeName} from '../../utils/auth';
import IPhone from '../../assets/Phone';
import Google from '../../assets/Google';
import {AxiosError} from 'axios';
import Toast from 'react-native-toast-message';
import {
  cacheNotifications,
  fetchNotificationsFromAPI,
} from '../../utils/Notification';

const Home = () => {
  const {width, height} = Dimensions.get('window');
  const [Pass, setPass] = useState<string>('');
  const [Email, setEmail] = useState<string>('');
  const [isVisible, setisVisible] = useState<boolean>(false);
  const [err, setErr] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<Record<string, object>>>();

  const isValidEmail = (email: string) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+\.)+com$/;
    return emailPattern.test(email);
  };

  const handleValidation = (text: string) => {
    if (isValidEmail(text)) {
      setEmail(text);
      setErr(''); // Clear error message if email is valid
    } else {
      setErr('Please enter a valid email id');
    }
  };

  const handleLogin = async () => {
    setisVisible(true);
    try {
      let email = Email.toLowerCase();
      const response = await authApi.LOGIN_WITH_EMAIL(email, Pass);
      if (response.data) {
        const role =
          response.data.data.role === 'Farmer'
            ? 'user'
            : response.data.data.role === 'manager'
            ? 'manager'
            : 'owner';
        const name =
          response.data.data.role === 'manager'
            ? response.data.data.name
            : response.data.data.firstName;
        const token = response.data.token;
        console.log('Token in login screen', token);

        console.log(role);

        await storeRole(role);
        await storeToken(token);
        await storeName(name);
        dispatch(updateLoggedIn(true));
        dispatch(setRole(role));
        dispatch(setToken(token));
        dispatch(setName(name));
      }
    } catch (error) {
      console.error('error.response.data', error.response.data);
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
      <View style={styles.container}>
        <SafeAreaProvider>
          <HeaderComponent title="Log in" />
          <View style={{gap: 24, marginHorizontal: 10}}>
            <View>
              <View
                style={[
                  styles.inputContainer,
                  {
                    borderColor:
                      err == null || err == '' ? '#707371' : '#CC0000',
                  },
                ]}>
                <CustomInputText
                  PlaceHolder="Email"
                  onTextChange={handleValidation}
                  color={err == null || err == '' ? '#707371' : '#CC0000'}
                  keyboard="email-address"
                />
              </View>
              {err == null || err == '' ? null : (
                <Text
                  style={[
                    textStyles.bodyB3,
                    {color: err == null || err == '' ? 'black' : '#CC0000'},
                  ]}>
                  {err}
                </Text>
              )}
            </View>
            <PasswordInput
              onTextChange={text => setPass(text)}
              PlaceHolder="Password"
            />
          </View>
          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() => navigation.navigate('ResetPassword', {Email})}>
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </TouchableOpacity>
          <View style={styles.loginButton}>
            <CustomButton
              role="iButton"
              text="Log in"
              txtcolor="#FFFFFF"
              bgcolor="#0C447D"
              borderColor="#0C447D"
              onPress={handleLogin}
              disabled={err != '' || err == null || Pass == ''}
            />
          </View>
          <View style={styles.signUpContainer}>
            <Text style={[styles.signUpText, textStyles.bodyB3]}>
              Don’t have an account?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignupEmail', {})}>
              <Text style={[styles.signUpLink, textStyles.buttonTextUnderline]}>
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={[styles.dividerText, textStyles.bodyB3]}>
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
              onPress={() => navigation.navigate('LoginMob', {})}
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
        </SafeAreaProvider>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#707371',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  forgotPassword: {
    padding: 8,
    marginVertical: 10,
    marginHorizontal: 4,
  },
  forgotPasswordText: {
    fontSize: 14,
    lineHeight: 14,
    color: '#0C447D',
    fontWeight: '600',
    textDecorationLine: 'underline',
    fontFamily: 'Noto Serif',
  },
  loginButton: {
    padding: 10,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 5,
    marginLeft: 7,
  },
  signUpText: {
    fontSize: 14,
    color: '#1C1C1C',
  },
  signUpLink: {
    fontSize: 14,
    color: '#0C447D',
    textDecorationLine: 'underline',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginTop: '10%',
  },
  divider: {
    borderTopWidth: 1,
    flex: 1,
    height: 1,
    borderColor: '#E0E1E1',
  },
  dividerText: {
    fontSize: 14,
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
