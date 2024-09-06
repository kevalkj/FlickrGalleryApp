import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import HeaderComponent from '../../components/Header';
import EmailInput from '../../components/EmailInput';
import CustomButton from '../../components/CustomButton';
import textStyles from '../../components/textStyles';
import CustomInputText from '../../components/CustomInputText';
import {authApi} from '../../service/api';
import CustomModal from '../../components/LoadingModal';
import Layout from '../../layouts/layout';

const ResetPassword = ({route}) => {
  const {Email} = route?.params;
  console.log(Email);
  const [isVisible, setisVisible] = useState<boolean>(false);
  const [countryCode, setCountryCode] = useState('+91');
  const [email, setEmail] = useState<string>(Email);
  const [err, setErr] = useState<string | null>(null);
  const [mobile, setMobile] = useState('');
  const navigation = useNavigation<NavigationProp<Record<string, object>>>();

  const isValidEmail = (email: string) => {
    // Regular expression to match the pattern
    const emailPattern = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+\.)+com$/;
    return emailPattern.test(email);
  };
  useEffect(() => {
    if (Email != '') handleValidation(Email);
  }, []);
  const handleValidation = (text: string) => {
    if (isValidEmail(text)) {
      setEmail(text);
      setErr(''); // Clear error message if email is valid
    } else {
      setErr('Please enter a valid email id');
    }
  };

  const hendleResetPassword = async () => {
    setisVisible(true);
    // navigation.navigate('VerifyEmail', { email: email })
    await authApi
      .RESET_PASSWORD(email)
      .then(response => {
        console.log(response, 99);
        if (response.data) {
          console.log(response.data.token, 11);
          navigation.navigate('ResetOtp', {
            token: response.data.token,
            Email: email,
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
    setisVisible(false);
  };

  return (
    <Layout>
      <View style={styles.container}>
        <SafeAreaProvider>
          <HeaderComponent title="Reset password" />
          <View style={styles.wraping}>
            <View style={styles.descriptionContainer}>
              <Text style={[textStyles.bodyB3, styles.descriptionText]}>
                Enter your email address, we will send you a confirmation code.
              </Text>
            </View>
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
                  txt={Email}
                  onTextChange={handleValidation}
                  color={err == null || err == '' ? '#707371' : '#CC0000'}
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
            <View style={styles.buttonContainer}>
              <CustomButton
                role="iButton"
                text="Send"
                txtcolor="#FFFFFF"
                bgcolor="#0C447D"
                borderColor="#0C447D"
                onPress={() => hendleResetPassword()}
                disabled={err != '' || err == null}
              />
            </View>
          </View>
          <CustomModal isVisible={isVisible} setIsVisible={setisVisible} />
        </SafeAreaProvider>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  wraping: {
    paddingHorizontal: 16,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#707371',
  },
  descriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 24,
  },
  descriptionText: {
    color: '#1C1C1C',
  },
  buttonContainer: {
    marginTop: 24,
  },
});

export default ResetPassword;
