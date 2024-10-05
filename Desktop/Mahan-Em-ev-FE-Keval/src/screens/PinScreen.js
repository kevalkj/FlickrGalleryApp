import { Image, StyleSheet, Text, TextInput, ToastAndroid, View } from "react-native";
import IntroLabel from "../components/IntroLabel";
import CustomButton from "../components/CustomButton";
import { useState, useRef } from "react";
import { useSetUpPin } from "../API/services/users/authApi";

function PinScreen({ navigation }) {

    const [phone, setPhone] = useState();
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

    const setUpPinApi = useSetUpPin();
    const getPin = () => {
        if(t1 && t2 && t3 && t4){
            return t1 + t2 + t3 + t4;
        }
        ToastAndroid.show("Please enter a valid pin", ToastAndroid.SHORT);
        return '';
    }
    async function submitPin() {
        const pin = getPin();
        console.log(pin)
        if(pin.length  !== 4){
            return;
        }
        setUpPinApi(pin).then((data) => {
            ToastAndroid.show("Pin Set Up", ToastAndroid.SHORT);
            navigation.navigate('LocationAccess');
        }).catch((error) => {
            ToastAndroid.show("Something Occurred", ToastAndroid.SHORT);
            console.log(error);
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageBox}>
                <Image style={styles.img} source={require('../assets/Pin.png')} resizeMode="contain" />
            </View>
            <View style={styles.lable}>
                <IntroLabel
                    text1={'Set your PIN'}
                    text2={'You will be asked for this PIN when you want to start the ride.'}
                />
                <View style={styles.otpView}>
                    <TextInput
                        ref={et1}
                        style={[styles.inputView, t1 && styles.activeBox]}
                        keyboardType="phone-pad"
                        maxLength={1}
                        autoFocus={true}
                        value={t1}
                        cursorColor={'#979797'}
                        onChangeText={txt => {
                            setT1(txt);
                            if (txt.length >= 1)
                                et2.current.focus();
                        }}
                    />
                    <TextInput
                        ref={et2}
                        style={[styles.inputView, t2 && styles.activeBox]}
                        keyboardType="phone-pad"
                        maxLength={1}
                        value={t2}
                        cursorColor={'#979797'}
                        onChangeText={txt => {
                            setT2(txt);
                            if (txt.length >= 1)
                                et3.current.focus();
                            else if (txt.length < 1)
                                et1.current.focus();
                        }}
                    />
                    <TextInput
                        ref={et3}
                        style={[styles.inputView, t3 && styles.activeBox]}
                        keyboardType="phone-pad"
                        maxLength={1}
                        value={t3}
                        cursorColor={'#979797'}
                        onChangeText={txt => {
                            setT3(txt);
                            if (txt.length >= 1)
                                et4.current.focus();
                            else if (txt.length < 1)
                                et2.current.focus();
                        }}

                    />
                    <TextInput
                        ref={et4}
                        style={[styles.inputView, t4 && styles.activeBox]}
                        keyboardType="phone-pad"
                        maxLength={1}
                        value={t4}
                        cursorColor={'#979797'}
                        onChangeText={txt => {
                            setT4(txt);
                            if (txt.length >= 1)
                                setOTP(t1 + t2 + t3 + txt);
                            else if (txt.length < 1)
                                et3.current.focus();
                        }}
                    />
                </View>
            </View>
            <CustomButton title={'Set PIN'} onPress={submitPin} />
        </View>
    )
}
export default PinScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 100,
        justifyContent: 'flex-end'
    },
    imageBox: {

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
        alignItems: 'center',
        marginBottom: 70
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
        backgroundColor: "#D9D9D9",
        textAlign: 'center',
        color: '#101010',
        fontSize: 20,
        padding: 0
    },
    activeBox: {
        borderColor: '#0F6DDC',
        backgroundColor: '#fff',
        borderWidth: 1
    }
})
