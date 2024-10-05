import { Alert, Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import ChooseVehicleCard from "../ChooseVehicleCard";
import CustomButton from "../CustomButton";
import YellowOutlineButton from "../YellowOutlineButton";
import { useNavigation } from "@react-navigation/native";
import PaymentSuccessfulModal from "./PaymentSuccessfulModal";
import { useRide } from "../../API/services/users/rideApi";
function PaymentModal ({showModal,closeModal}){
    const rideApi = useRide();
    const [showSuccessModal,setShowSuccessModal] = useState(false);
    const [isSelected,setIsSelected] = useState('');

    const navigation = useNavigation();
    
    function gotoAddMoney(){
      navigation.navigate('AddMoney');
      closeModal()
    }

    function MakePayment(){
      console.log("Start Ride");
      rideApi().then((data) => {
        console.log(data);
        console.log("Ride Requested");
        closeModal()
        setShowSuccessModal(true);
      }).catch((error) => {
        console.log("got a error",error);
        Alert.alert('Error', error.message);
      });
    }
    function PaymentSuccessful(){
      navigation.navigate('LoadingScreen');
      setShowSuccessModal(false);  
    }

    return(
      <>
        <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        >
          <View style={styles.modal}>
            <View style={styles.modalContainer}>
                <View style={styles.closebtn}/>
                <Text style={styles.price}>₹ 110.5</Text>
                <Text style={styles.time}>May 31, 2024 at 8:36pm</Text>
                <View style={styles.balanceBox}>
                    <Text style={styles.time}>Available balance </Text>
                    <Text style={styles.balance}>₹350.5</Text>
                </View>
                <YellowOutlineButton title={'Add money'} onPress={gotoAddMoney}/>
            </View>
          </View>
            <CustomButton title={'Continue'} onPress={MakePayment}/>
        </Modal>
        <PaymentSuccessfulModal showModal={showSuccessModal} closeModal={PaymentSuccessful}/>
      </>
    )
}
export default PaymentModal;


const  styles = StyleSheet.create({
  modal:{
    flex: 1,
    justifyContent: 'flex-end',
},
    modalContainer: {
        // flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 25,
        paddingBottom:1,
      },
      closebtn:{
        height:5,
        width:30,
        borderWidth:1,
        borderRadius:5,
        marginTop:10,
        backgroundColor:'#000000',
        marginBottom:20,
        marginHorizontal:'auto'
      },
      
      price:{
        fontSize:45,
        fontWeight:'700',
        fontFamily:'Inter',
        color:'#121323',
      },

      time:{
        fontSize:12,
        fontWeight:'500',
        fontFamily:'Inter',
        color:'#808080',
        marginBottom:30,
      },
      balanceBox:{
        flexDirection:'row',
      },
      balance:{
        fontSize:12,
        fontWeight:'700',
        fontFamily:'Inter',
        color:'#0F6DDC',
        marginBottom:10,
      }
});