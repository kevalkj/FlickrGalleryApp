import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import IntroLabel from '../components/IntroLabel';
import CustomButton from '../components/CustomButton';
import { useState, useRef, useEffect } from 'react';
import { useSetUpPin } from '../API/services/users/authApi';
import OtpInput from '../components/CustomOtp';

function PinScreen({ navigation }) {
  const inputRefs = useRef([]);
  const [verificationCode, setVerificationCode] = useState(Array(4).fill(""));
  const [isPinValid, setIsPinValid] = useState(false); 
  const setUpPinApi = useSetUpPin();

  const handleInputChange = (text, index) => {
    const newCode = [...verificationCode];
    newCode[index] = text;
    setVerificationCode(newCode);

    if (text !== "" && index < 3 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    } else if (text === "" && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (
      e.nativeEvent.key === "Backspace" &&
      verificationCode[index] === "" &&
      index > 0
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  const getPin = () => {
    return verificationCode.join("");
  };

  async function submitPin() {
    const pin = getPin();
    console.log(pin);
    if (pin.length !== 4) {
      ToastAndroid.show('Please enter a valid 4-digit pin', ToastAndroid.SHORT);
      return;
    }

    navigation.navigate('LocationAccess');
    // Uncomment this to call the API
    // setUpPinApi(pin)
    //   .then(data => {
    //     ToastAndroid.show('Pin Set Up', ToastAndroid.SHORT);
    //     navigation.navigate('LocationAccess');
    //   })
    //   .catch(error => {
    //     ToastAndroid.show('Something Occurred', ToastAndroid.SHORT);
    //     console.log(error);
    //   });
  }

  useEffect(() => {
    const isComplete = verificationCode.every((digit) => digit !== "");
    setIsPinValid(isComplete);
  }, [verificationCode]);

  return (
    <View style={styles.container}>
      <View style={styles.imageBox}>
        <Image
          style={styles.img}
          source={require('../assets/Pin.png')}
          resizeMode="contain"
        />
      </View>
      <View style={styles.lable}>
        <IntroLabel
          text1={'Set your PIN'}
          text2={'You will be asked for this PIN when you want to start the ride.'}
        />
         <OtpInput
        value={verificationCode}
        onChange={setVerificationCode}
        inputStyle={styles.inputView}
        activeStyle={styles.activeBox}
      />
      </View>
      <CustomButton
        title={'Set PIN'}
        onPress={submitPin}
        disabled={!isPinValid} 
      />
    </View>
  );
}
export default PinScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 100,
    justifyContent: 'flex-end',
  },
  imageBox: {
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
    alignItems: 'center',
    marginBottom: 70,
  },
  otpView: {
    width: '60%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 50,
  },
  inputView: {
    width: 45,
    height: 45,
    borderRadius: 5,
    backgroundColor: '#D9D9D9',
    textAlign: 'center',
    color: '#101010',
    fontSize: 20,
    padding: 0,
  },
  activeBox: {
    borderColor: '#0F6DDC',
    backgroundColor: '#fff',
    borderWidth: 1,
  },
});
