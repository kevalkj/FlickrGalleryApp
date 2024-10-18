import { Image, Modal, StyleSheet, Text, View } from "react-native";
import CustomButton from "../CustomButton";

function CancelSuccessfulModal({showModal,closeModal}){
    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={showModal}
        >
            <View style={styles.modal}>
                <View style={styles.modalContainer2}>
                    <Image source={require('../../assets/cancelRide.png')} />
                    <Text style={styles.heading}>Booking Cancelled Successfully!</Text>
                    <Text style={styles.subheading}>Your booking has been cancelled successfully.</Text>
                </View>
            </View>
            <CustomButton title={'Got it'} onPress={closeModal}/>
        </Modal>
    )
}
export default CancelSuccessfulModal;

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