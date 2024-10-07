import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  ToastAndroid,
} from 'react-native';
import IntroLabel from '../components/IntroLabel';
import CustomButton from '../components/CustomButton';
import {useState, useRef} from 'react';
import {useVerification} from '../API/services/users/authApi';
import {useSelector} from 'react-redux';
function OTPScreen({navigation, route}) {
  const verifyApi = useVerification();

  const {phoneNo} = useSelector(state => state.user.phone);
  const [isValid, setIsValid] = useState(true);
  const [OTP, setOTP] = useState('');
  const [count, setCount] = useState(60);
  const [t1, setT1] = useState();
  const [t2, setT2] = useState();
  const [t3, setT3] = useState();
  const [t4, setT4] = useState();

  const et1 = useRef();
  const et2 = useRef();
  const et3 = useRef();
  const et4 = useRef();

  const CompleteOTP = t1 + t2 + t3 + t4;

  function gotoPinScreen() {
    if (CompleteOTP.length === 4) {
      // Make API call to verify OTP
      console.log('OTP', OTP);
      verifyApi(OTP)
        .then(data => {
          navigation.navigate('PinScreen');
        })
        .catch(error => {
          setIsValid(false);
        });
    } else {
      setIsValid(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageBox}>
        <Image
          style={styles.img}
          source={require('../assets/otp.png')}
          resizeMode="contain"
        />
      </View>
      <View style={styles.lable}>
        <IntroLabel
          text1={'OTP Verification'}
          text2={'Enter the OTP sent to ' + phoneNo}
        />
        <View style={styles.otpView}>
          <TextInput
            ref={et1}
            style={[
              styles.inputView,
              !isValid ? {borderColor: '#EA0000'} : {borderColor: '#979797'},
            ]}
            keyboardType="phone-pad"
            maxLength={1}
            autoFocus={true}
            value={t1}
            cursorColor={'#979797'}
            onChangeText={txt => {
              setT1(txt);
              if (txt.length >= 1) et2.current.focus();
            }}
          />
          <TextInput
            ref={et2}
            style={[
              styles.inputView,
              !isValid ? {borderColor: '#EA0000'} : {borderColor: '#979797'},
            ]}
            keyboardType="phone-pad"
            maxLength={1}
            value={t2}
            cursorColor={'#979797'}
            onChangeText={txt => {
              setT2(txt);
              if (txt.length >= 1) et3.current.focus();
              else if (txt.length < 1) et1.current.focus();
            }}
          />
          <TextInput
            ref={et3}
            style={[
              styles.inputView,
              !isValid ? {borderColor: '#EA0000'} : {borderColor: '#979797'},
            ]}
            keyboardType="phone-pad"
            maxLength={1}
            value={t3}
            cursorColor={'#979797'}
            onChangeText={txt => {
              setT3(txt);
              if (txt.length >= 1) et4.current.focus();
              else if (txt.length < 1) et2.current.focus();
            }}
          />
          <TextInput
            ref={et4}
            style={[
              styles.inputView,
              !isValid ? {borderColor: '#EA0000'} : {borderColor: '#979797'},
            ]}
            keyboardType="phone-pad"
            maxLength={1}
            value={t4}
            cursorColor={'#979797'}
            onChangeText={txt => {
              setT4(txt);
              setIsValid(true);
              if (txt.length >= 1) setOTP(t1 + t2 + t3 + txt);
              else if (txt.length < 1) et3.current.focus();
            }}
          />
        </View>
        <View style={styles.resendTxt}>
          {!isValid && (
            <Text style={styles.text3}>Please enter a valid OTP</Text>
          )}
          {isValid && (
            <Text style={styles.text1}>Didn't you receive the OTP? </Text>
          )}
          {isValid && <Text style={styles.text2}> Resend OTP</Text>}
        </View>
      </View>
      <CustomButton
        title={'Verify OTP'}
        onPress={() => {
          navigation.navigate('PinScreen');
        }}
      />
    </View>
  );
}
export default OTPScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageBox: {
    flex: 0.6,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 30,
  },
  img: {
    width: 264,
    height: 274,
  },
  lable: {
    flex: 0.4,
    alignItems: 'center',
  },
  otpView: {
    width: '50%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 50,
  },
  inputView: {
    width: 30,
    height: 40,
    borderBottomWidth: 1.5,
    borderColor: '#979797',
    textAlign: 'center',
    color: '#101010',
    fontSize: 20,
    padding: 0,
  },
  resendTxt: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text1: {
    fontSize: 12,
    fontFamily: 'Inter',
    fontWeight: '400',
    color: '#808080',
    textAlign: 'center',
    paddingTop: 20,
  },
  text2: {
    fontSize: 12,
    fontFamily: 'Inter',
    fontWeight: '400',
    color: '#0F6DDC',
    textAlign: 'center',
    paddingTop: 20,
  },
  text3: {
    fontSize: 12,
    fontFamily: 'Inter',
    fontWeight: '400',
    color: '#EA0000',
    textAlign: 'center',
    paddingTop: 20,
  },
});
