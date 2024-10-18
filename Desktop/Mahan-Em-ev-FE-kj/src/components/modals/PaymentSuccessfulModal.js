import { Image, Modal, StyleSheet, Text, View } from "react-native";
import CustomButton from "../CustomButton";
import { useNavigation } from "@react-navigation/native";
import LoadingModal from "./LoadingModal";
import { useState } from "react";



function PaymentSuccessfulModal({showModal,closeModal}){

    const navigation = useNavigation();
    
    const [showLoadingModal,setshowLoadingModal] = useState(false);
   
    function PaymentSuccessful(){
        closeModal();
        console.log("opennig...")
        setshowLoadingModal(true);
    };

    function closeLoadingModal(){
        setshowLoadingModal(false);
    }
   
    return(
        <>
        <Modal
            animationType="slide"
            transparent={true}
            visible={showModal}
        >
            <View style={styles.modal}>
                <View style={styles.modalContainer2}>
                    <Image source={require('../../assets/Done.png')} />
                    <Text style={styles.heading}>Payment Done Successfully!</Text>
                    <Text style={styles.subheading}>Your Payment has been done successfully.</Text>
                </View>
            </View>
            <CustomButton title={'Got it'} onPress={PaymentSuccessful}/>
        </Modal>
        <LoadingModal  showModal={showLoadingModal}  closeModal={closeLoadingModal}/>
        </>
    )
}
export default PaymentSuccessfulModal;

const styles = StyleSheet.create({
    modal:{
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalContainer2: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 25,
        height:250
    },
    heading:{
        fontSize:18,
        fontWeight:'700',
        fontFamily:'Inter',
        color:'#121323',
        marginTop:30,
        marginBottom:10
    },
    subheading:{
        fontSize:14,
        fontWeight:'400',
        fontFamily:'Inter',
        color:'#808080',
       
        textAlign:'center',
        width:210,
    }, 
    
})