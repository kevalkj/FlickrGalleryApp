import { Image, StyleSheet, TextInput, View, Text, Alert } from "react-native";
import IntroLabel from "../components/IntroLabel";
import CustomButton from "../components/CustomButton";
import { useState } from "react";
import {useLogin} from "../API/services/users/authApi";

function Login({ navigation }) {

    const [phoneNumber, setPhoneNumber] = useState('');
    const [isValid, setIsValid] = useState(true);
    const loginApi = useLogin();
    async function gotoOTP() {
        // console.log(phoneNumber);
        loginApi(phoneNumber).then((data) => {
            navigation.navigate('OTPScreen', { phoneNo: phoneNumber });
        }).catch((error) => {
            setIsValid(false);
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageBox}>
                <Image style={styles.img} source={require('../assets/phone.png')} resizeMode="contain" />
            </View>
            <View style={styles.lable}>
                <IntroLabel
                    text1={'Enter Mobile Number'}
                    text2={'We will send a one-time password for verification to this mobile number.'}
                />
                <TextInput
                    keyboardType="number-pad"
                    style={[styles.input, !isValid ? { borderColor: '#EA0000' } : { borderColor: '#979797' }]}
                    cursorColor={"#000"}
                    maxLength={10}
                    value={phoneNumber}
                    onChangeText={txt => {
                        setPhoneNumber(txt);
                        setIsValid(true);
                    }}
                />
                {!isValid && <Text style={styles.text1}>Please enter a valid number</Text>}
            </View>
            <CustomButton title={'Get OTP'} onPress={gotoOTP} />
        </View>
    )
}
export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    imageBox: {
        flex: 0.6,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginBottom: 30
    },
    img: {
        width: 264,
        height: 274,

    },
    lable: {
        flex: 0.4
    },
    input: {
        borderBottomWidth: 1.5,
        marginHorizontal: 90,
        borderColor: '#979797',
        padding: 0,
        marginTop: 50,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
        color: 'black'

    },
    text1: {
        fontSize: 12,
        fontFamily: 'Inter',
        fontWeight: "400",
        color: '#EA0000',
        textAlign: 'center',
        paddingTop: 20
    },
})
