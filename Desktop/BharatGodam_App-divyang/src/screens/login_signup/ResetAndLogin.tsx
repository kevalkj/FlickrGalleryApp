import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import HeaderComponent from '../../components/Header';
import EmailInput from '../../components/EmailInput';
import PasswordInput from '../../components/PasswordInput';
import CustomButton from '../../components/CustomButton';
import textStyles from '../../components/textStyles';
import CustomInputText from '../../components/CustomInputText';
import {authApi} from '../../service/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  setName,
  setRole,
  setToken,
  updateLoggedIn,
} from '../../redux/slices/user';
import {useDispatch} from 'react-redux';
import CustomModal from '../../components/LoadingModal';
import {storeName, storeRole, storeToken} from '../../utils/auth';
import Toast from 'react-native-toast-message';
import {AxiosError} from 'axios';
import Layout from '../../layouts/layout';
import {
  cacheNotifications,
  fetchNotificationsFromAPI,
} from '../../utils/Notification';

const ResetAndLogin = ({route}) => {
  // const { email } = route?.params
  const {token, Email} = route?.params;
  const [isVisible, setisVisible] = useState<boolean>(false);
  const [countryCode, setcountryCode] = useState('+91');
  const [Pass1, setPass1] = useState<string | null>('');
  const [Pass, setPass] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [err, setErr] = useState<string | null>(null);
  const [mobile, setMobile] = useState<string>('');
  const dispatch = useDispatch();
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

  const handleUpdatePassword = async () => {
    setisVisible(true);
    try {
      const response1 = await authApi.UPDATE_PASSWORD(Email, Pass);
      const response = await authApi.LOGIN_WITH_EMAIL(Email, Pass);
      console.log('data in forgot pass :', response.data);

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
      if (error instanceof AxiosError) {
        console.error('Axios error: ', error.message);
        console.error('Response data: ', error.response?.data);
        console.error('Status: ', error.response?.status);
        Toast.show({
          type: 'error',
          text1: 'An error occured !',
          text2: error.response?.data?.error,
        });
      } else {
        console.error('Unknown error: ', error);
        Toast.show({
          type: 'error',
          text1: 'An error occured !',
          //text2:error.response?.data?.error
        });
      }
    } finally {
      setisVisible(false);
    }
  };

  return (
    <Layout>
      <View style={styles.container}>
        <SafeAreaProvider>
          <HeaderComponent title="Reset password and login" />
          <View style={styles.inputContainer}>
            <Text style={[textStyles.bodyB4, styles.text]}>Email</Text>
            <Text
              style={[textStyles.headingH8, styles.text1, {color: '#222222'}]}>
              {Email}
            </Text>
          </View>
          {err == null || err == '' ? null : (
            <Text
              style={[
                textStyles.bodyB3,
                styles.passs,
                {color: err == null || err == '' ? 'black' : '#CC0000'},
              ]}>
              {err}
            </Text>
          )}
          <View style={styles.passs1}>
            <PasswordInput
              onTextChange={txt => setPass(txt)}
              PlaceHolder="Create new password"
            />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoText}>Use 6 or more characters</Text>
          </View>
          <View style={styles.passs}>
            <PasswordInput
              onTextChange={txt => setPass1(txt)}
              PlaceHolder="Confirm password"
            />
          </View>
          <View style={styles.buttonContainer}>
            <CustomButton
              role="iButton"
              text="Reset password and login"
              txtcolor="#FFFFFF"
              bgcolor="#0C447D"
              borderColor="#0C447D"
              onPress={() => handleUpdatePassword()}
              disabled={
                Pass == '' || Pass1 == '' || Pass != Pass1 || Pass.length < 6
              }
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
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 10,
    marginLeft: 12,
  },
  infoText: {
    ...textStyles.bodyB4,
  },
  buttonContainer: {
    padding: 10,
    marginTop: 12,
  },
  inputContainer: {
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 10,
    gap: 4,
    borderColor: '#707371',
  },
  text: {
    paddingTop: '2%',
  },
  text1: {
    // paddingTop: "2%",
    paddingBottom: '2%',
  },
  passs: {
    marginHorizontal: '2.5%',
    marginTop: 12,
  },
  passs1: {
    marginHorizontal: '2.5%',
    marginTop: 24,
  },
});

export default ResetAndLogin;
