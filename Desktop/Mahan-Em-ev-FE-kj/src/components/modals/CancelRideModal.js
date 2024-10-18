import { Image, Modal, Pressable, StyleSheet, Text, Vibration, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import CustomButton from "../CustomButton";
import { TextInput } from "react-native-gesture-handler";
import CancelSuccessfulModal from "./CancelSuccessfulModal";

function CancelRideModal(){
    const navigation = useNavigation();

    const [showModal,setShowModal] = useState(false);
    const [showModalCancel,setShowModalCancel] = useState(false);
    const [isSelected,setIsSelected] = useState('');


    function selectedVehicle(vehicle){
        console.log(vehicle)
            setIsSelected(vehicle);        
    }

    function cancelRide(){
      setShowModal(false);
      setShowModalCancel(true);
    }

    function cancelRideSuccess(){
        setShowModalCancel(false);
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
                <Text style={styles.heading}>Choice vehicle</Text>
                <Text style={styles.subheading}>Please select the reason for cancellations</Text>
                <Pressable onPress={()=>selectedVehicle('Schedule Change')} style={[styles.item ]}>
                    <View style={styles.radioBtn}>
                        <View style={[isSelected=='Schedule Change' && styles.innerCircle]} />
                    </View>
                    <Text style={styles.label}>Schedule Change</Text>
                </Pressable>
                <Pressable onPress={()=>selectedVehicle('Book Another Cab')}  style={[styles.item ]}>
                    <View style={styles.radioBtn}>
                        <View style={[isSelected=='Book Another Cab' && styles.innerCircle]} />
                    </View>
                    <Text style={styles.label}>Book Another Cab</Text>
                </Pressable>
                <Pressable onPress={()=>selectedVehicle('Found a better alternative')}  style={[styles.item ]}>
                    <View style={styles.radioBtn}>
                        <View style={[isSelected=='Found a better alternative' && styles.innerCircle]} />
                    </View>   
                    <Text style={styles.label}>Found a better alternative</Text>
                </Pressable>
                <Pressable onPress={()=>selectedVehicle('Driver is taking too long')} style={[styles.item ]}>
                    <View style={styles.radioBtn}>
                        <View style={[isSelected=='Driver is taking too long' && styles.innerCircle]} />
                    </View>
                    <Text style={styles.label}>Driver is taking too long</Text>
                </Pressable>
                <Pressable onPress={()=>selectedVehicle('My Reason is not listed')}  style={[styles.item ]}>
                    <View style={styles.radioBtn}>
                        <View style={[isSelected=='My Reason is not listed' && styles.innerCircle]} />
                    </View>
                    <Text style={styles.label}>My Reason is not listed</Text>
                </Pressable>
                <Pressable onPress={()=>selectedVehicle('Other')}  style={[styles.item ]}>
                    <View style={styles.radioBtn}>
                        <View style={[isSelected=='Other' && styles.innerCircle]} />
                    </View> 
                    <Text style={styles.label}>Other</Text>  
                </Pressable>
                {   isSelected=='Other'
                    &&
                    <TextInput 
                        multiline={true}
                        numberOfLines={4}
                        placeholder="Write your Reason"
                        style={styles.textInput}
                        placeholderTextColor={'#808080'}
                    >

                    </TextInput>
                }
            </View>
            
            <CustomButton title={'Cancle Ride'} onPress={cancelRide}/>
            
        </View>
        </Modal>
        <CancelSuccessfulModal showModal={showModalCancel} closeModal={cancelRideSuccess}/>
        </>
    )
}
export default CancelRideModal;


const  styles = StyleSheet.create({
    modal:{
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalContainer: {
        justifyContent: 'flex-start',
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 25,
    },     
    heading:{
        fontSize:18,
        fontWeight:'700',
        fontFamily:'Inter',
        color:'#121323',
        marginVertical:20
    },
    subheading:{
        fontSize:14,
        fontWeight:'400',
        fontFamily:'Inter',
        color:'#808080',
        marginBottom:10
    },
    item:{
        flexDirection:'row',
        marginVertical:5,
        alignItems:'center',
        gap:10        
    },
    label:{
        fontSize:14,
        fontWeight:'600',
        fontFamily:'Inter',
        color:'#121323',
    },
    radioBtn:{
        width:14,
        height:14,
        borderRadius:7,
        borderColor:'#0F6DDC',
        borderWidth:1,
        justifyContent:'center',
        alignItems:'center'
    },
    innerCircle:{
        backgroundColor:'#0F6DDC',
        width:8,
        height:8,
        borderRadius:4
    },
    textInput:{
        borderWidth:0.5,
        borderRadius:5,
        borderColor:'#808080',
        color:'#121323',
        textAlignVertical: 'top',
        padding: 10,
        marginVertical:10,
        backgroundColor:'#fff'
    },
    
});