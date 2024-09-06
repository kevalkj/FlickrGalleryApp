import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Image, Text, TextStyle, Touchable, TouchableOpacity, Modal, TouchableHighlight } from 'react-native';
import Arrow from '../assets/Arrow';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import CustomButton from './CustomButton';
import Or from '../assets/Or';

const { width, height } = Dimensions.get('window');

interface CustomComponentProps {
    visibility: boolean;
}

const LoginBtn: React.FC<CustomComponentProps> = ({ visibility }) => {
    const [isVisible, setIsVisible] = useState(visibility);

    const handleLogin = (method: string) => {
        console.log(`Logging in with ${method}`);
        // You can implement your login logic here
        // After successful login, you might want to close the modal
        setIsVisible(false);
    };

    const openModal = () => {
        setIsVisible(true);
    };

    const navigation = useNavigation<NavigationProp<Record<string, object>>>();

    return (
        <>
            {/* <TouchableOpacity style={[styles.container, { top, }]} onPress={openModal}>
                <View style={[styles.box]}>
                    <Image source={imageUrl} style={styles.image} />
                    <Text style={styles.text}>{text}</Text>
                </View>
                <Arrow />
            </TouchableOpacity> */}

            {/* login as pop up model */}

            <Modal
                animationType="fade"
                transparent={true}
                visible={isVisible}
                onRequestClose={() => setIsVisible(false)}
            >
                <TouchableOpacity style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', width: width, height: height }} onPress={() => setIsVisible(false)}>
                </TouchableOpacity>
                <View style={[styles.modalContainer]}>
                    <Text style={styles.textmodal}>Choose a log in method</Text>
                    <View>
                        <CustomButton text='Sign up with phone number' bgcolor='#999999' txtcolor='#FFFFFF' onPress={() => { navigation.navigate({ name: "Login", params: {} }),  setIsVisible(false) }}></CustomButton>
                        <Or />
                        <CustomButton text='Sign up with email' bgcolor='white' txtcolor='#2B2B2B' onPress={() => { navigation.navigate({ name: "Login", params: {} }), setIsVisible(false) }}></CustomButton>
                    </View>
                </View>

            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        width: width * 0.9,
        height: height * 0.12,
        position: 'absolute',
        left: '5%',
        paddingVertical: '4%',
        paddingHorizontal: '4%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#909090',
        opacity: 1,
    },
    box: {
        // position: 'absolute',
        // width: width * 0.5,
        // left: '5%',
        // paddingVertical: '3%', 
        // paddingHorizontal: '3%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // borderRadius: 8,
        // borderWidth: 1,
        // borderColor: '#909090',
        // opacity: 1,
    },
    image: {
        width: 68,
        height: 60,
        // borderRadius: 25,
    },
    text: {
        marginLeft: '5%',
        fontFamily: 'Poppins',
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: 19.2,
        textAlign: 'center',
        color: '#626262',
    } as TextStyle,
    textmodal: {
        fontFamily: 'Poppins',
        fontSize: 20,
        fontWeight: 'bold',
        lineHeight: 24,
        textAlign: 'center',
        color: '#626262',
    } as TextStyle,
    modalContainer: {
        width: width,
        height: height * 0.48,
        top: height * 0.48,
        borderRadius: 24,
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        position: 'absolute',
    },
});

export default LoginBtn;
