import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  Image,
} from "react-native";
import IntroLabel from "../components/IntroLabel";
import CustomButton from "../components/CustomButton";
import { useVerification } from "../API/services/users/authApi";
import { useSelector } from "react-redux";
import OtpInput from "../components/CustomOtp";

const OtpScreen = ({ navigation }) => {
  const inputRefs = useRef([]);
  const verifyApi = useVerification();
  const phoneNo = useSelector((state) => state.user.phoneNo);
  const [verificationCode, setVerificationCode] = useState(Array(4).fill(""));
  const [timer, setTimer] = useState(30);
  const [isRetryVisible, setIsRetryVisible] = useState(false);
  const [isValid, setIsValid] = useState(true);

  console.log("otp==", verificationCode);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(countdown);
          setIsRetryVisible(true);
          return 0;
        } else {
          return prevTimer - 1;
        }
      });
    }, 1000);

    return () => clearInterval(countdown); 
  }, []);

  const handleInputChange = (text, index) => {
    // Only allow numeric input
    if (!/^\d+$/.test(text) && text !== "") return;

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
    } else if (
      index < 3 &&
      verificationCode[index] !== "" &&
      e.nativeEvent.key !== "Backspace"
    ) {
      inputRefs.current[index + 1].focus();
    }
  };

  const validateOTP = () => {
    const OTP = verificationCode.join("");
    if (OTP.length === 4) {
      setIsValid(true);
      return true;
    } else {
      setIsValid(false);
      // Alert.alert("Invalid OTP", "Please enter the complete 4-digit OTP.");
      return false;
    }
  };

  const gotoPinScreen = async () => {
    if (validateOTP()) {
      try {
        // Call the API or proceed to the next screen
        navigation.navigate("PinScreen");
      } catch (error) {
        setIsValid(false);
        Alert.alert("Error", "Invalid OTP. Please try again.");
      }
    }
  };

  const handleResendOtp = () => {
    Alert.alert("OTP Resent");
    setTimer(30);
    setIsRetryVisible(false); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageBox}>
        <Image
          style={styles.img}
          source={require("../assets/otp.png")}
          resizeMode="contain"
        />
      </View>
      <View style={styles.lable}>
        <IntroLabel
          text1={"OTP Verification"}
          text2={`Enter the OTP sent to ${phoneNo}`}
        />
        <View style={styles.otpContainer}>
          {[0, 1, 2, 3].map((index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={[
                styles.otpInput,
                !isValid ? { borderColor: "#EA0000" } : { borderColor: "#979797" },
              ]}
              maxLength={1}
              keyboardType="numeric"
              value={verificationCode[index]}
              onChangeText={(text) => handleInputChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
            />
          ))}
        </View>
        <OtpInput
        value={verificationCode}
        onChange={setVerificationCode}
        inputStyle={styles.otpContainer}
      />
        <View style={styles.resendTxt}>
          {!isValid && <Text style={styles.text3}>Invalid OTP</Text>}
          {isValid && <Text style={styles.text1}>Didn't receive the OTP? </Text>}
          {isRetryVisible ? (
            <TouchableOpacity onPress={handleResendOtp}>
              <Text style={styles.text2}>Resend OTP</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.text2}>{timer}s</Text>
          )}
        </View>
      </View>
      <CustomButton title={"Verify OTP"} onPress={gotoPinScreen} />
    </View>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageBox: {
    flex: 0.6,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 30,
  },
  img: {
    width: 264,
    height: 274,
  },
  lable: {
    flex: 0.4,
    alignItems: "center",
  },
  otpContainer: {
    width: "50%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 50,
  },
  otpInput: {
    width: 30,
    height: 40,
    borderBottomWidth: 1.5,
    borderColor: "#979797",
    textAlign: "center",
    color: "#101010",
    fontSize: 20,
    padding: 0,
  },
  resendTxt: {
    flexDirection: "row",
    justifyContent: "center",
  },
  text1: {
    fontSize: 12,
    fontFamily: "Inter",
    fontWeight: "400",
    color: "#808080",
    textAlign: "center",
    paddingTop: 20,
  },
  text2: {
    fontSize: 12,
    fontFamily: "Inter",
    fontWeight: "400",
    color: "#0F6DDC",
    textAlign: "center",
    paddingTop: 20,
  },
  text3: {
    fontSize: 12,
    fontFamily: "Inter",
    fontWeight: "400",
    color: "#EA0000",
    textAlign: "center",
    paddingTop: 20,
  },
});
