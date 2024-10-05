import { Modal, Pressable, StyleSheet, Text, View ,TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import ChooseVehicleCard from "../ChooseVehicleCard";
import CustomButton from "../CustomButton";
import PaymentModal from "./PaymentModal";
import { useDispatch, useSelector } from "react-redux";
import { setVehicle } from "../../redux/slices/ride";
import Clock from "../../assets/icons/Clock.svg"
import ScheduleRideModal from "./ScheduleRideModal";

function ChooseVehicleModal(){
    const navigation = useNavigation();
    const vehicle = useSelector(state=>state.ride.vehicle);
    const dispatch = useDispatch() ;
    const [showModal,setShowModal] = useState(true);
    const [showPaymentModal,setShowPaymentModal] = useState(false);
    const [isSelected,setIsSelected] = useState('');
    const [RideType,SetRideType]= useState('Rides');
    const [showScheduleModal,setShowScheduleModal] = useState(false);

  useEffect(()=>{
    console.log('selected vehicle',isSelected);
    dispatch(setVehicle(isSelected));
  
  },[isSelected])
    function selectedVehicle(vehicle){
      setIsSelected(vehicle);        
    }

    function openPaymentModal(){
      console.log("OPEN PAYMENT MODAL");
      if(!vehicle){
        Alert.alert('Error','Please select a vehicle');
        return;
      }
      setShowModal(false);
      setShowPaymentModal(true);
    }

    function closePaymentModal(){
      setShowPaymentModal(false);
    }
    const openScheduleModal = () => {
      console.log("OPEN SCHEDULE MODAL");
      setShowModal(false);
      setShowScheduleModal(true);
    }
    const closeScheduleModal = () => {
      console.log("CLOSE SCHEDULE MODAL");
      setShowScheduleModal(false);
      setShowModal(true);
    }
    function TypeOfRide(){
      if(RideType=='Rides')
        SetRideType('Delivery')
      else
        SetRideType('Rides')
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
                <Text style={styles.heading}>Choice vehicle</Text>
                <View style={styles.type}>
                  <Pressable onPress={TypeOfRide}>
                    <Text style={[styles.typeText, RideType=='Rides' && {borderBottomWidth:2}]}>Rides</Text>
                  </Pressable>
                  <Pressable onPress={TypeOfRide}>
                    <Text style={[styles.typeText, RideType=='Delivery' && {borderBottomWidth:2}]}>Delivery</Text>
                  </Pressable>
                </View>
                { RideType=='Rides' &&
                <View>
                  <Pressable onPress={()=>selectedVehicle('Two wheeler')} style={[isSelected==='Two wheeler' && styles.selected ]}>
                      <ChooseVehicleCard 
                          image={require('../../assets/scooter.png')} 
                          amount={"75.5"} 
                          vehicle={'Two-wheeler'} 
                          time={'3 - 8 min'} 
                          person={'1 person'}
                      />
                  </Pressable>
                  <Pressable onPress={()=>selectedVehicle('Three wheeler')}  style={[isSelected=='Three wheeler' && styles.selected ]}>
                      <ChooseVehicleCard 
                          image={require('../../assets/auto.png')} 
                          amount={"110.5"} 
                          vehicle={'Three-wheeler'} 
                          time={'3 - 10 min'} 
                          person={'3 person'}
                      />
                  </Pressable>
                  <Pressable onPress={()=>selectedVehicle('Four wheeler')}  style={[isSelected=='Four wheeler' && styles.selected ]}>
                      <ChooseVehicleCard 
                          image={require('../../assets/car.png')} 
                          amount={"250.7"} 
                          vehicle={'Four wheeler'} 
                          time={'5 - 15 min'} 
                          person={'4 person'}
                      />
                  </Pressable>
                </View>
                }
                { RideType=='Delivery' &&
                <View>
                  <Pressable onPress={()=>selectedVehicle('two')} style={[isSelected=='two' && styles.selected ]}>
                      <ChooseVehicleCard 
                          image={require('../../assets/deliverybike.png')} 
                          amount={"75.5"} 
                          vehicle={'Two-wheeler'} 
                          time={'3 - 8 min'} 
                          person={'1 person'}
                      />
                  </Pressable>
                  <Pressable onPress={()=>selectedVehicle('three')}  style={[isSelected=='three' && styles.selected ]}>
                      <ChooseVehicleCard 
                          image={require('../../assets/auto.png')} 
                          amount={"110.5"} 
                          vehicle={'Three-wheeler'} 
                          time={'3 - 10 min'} 
                          person={'3 person'}
                      />
                  </Pressable>
                  <Pressable onPress={()=>selectedVehicle('four')}  style={[isSelected=='four' && styles.selected ]}>
                      <ChooseVehicleCard 
                          image={require('../../assets/truck.png')} 
                          amount={"250.7"} 
                          vehicle={'Four wheeler'} 
                          time={'5 - 15 min'} 
                          person={'4 person'}
                      />
                  </Pressable>
                </View>
                }
                
            </View>
          </View>
          <View className = "flex-row w-full bg-white justify-center items-center px-4" >
            <View className = "flex-1">
            <CustomButton title={'Payment'} onPress={openPaymentModal}/> 
            </View>
            <TouchableOpacity className= "w-14 h-14 rounded-full bg-[#F8C218] items-center justify-center " onPress={openScheduleModal}>
              <Clock/>
            </TouchableOpacity>
          </View>
        </Modal>
        <PaymentModal showModal={showPaymentModal} closeModal={closePaymentModal} />
        <ScheduleRideModal showScheduleModal={showScheduleModal} closeScheduleModal={closeScheduleModal}/>
        
        </>
    )
}
export default ChooseVehicleModal;


const  styles = StyleSheet.create({
  modal:{
    flex:1,
    justifyContent: 'flex-end',
  },
    modalContainer: {
        
        justifyContent: 'flex-end',
        //alignItems: 'center',
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 25,
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
      
      heading:{
        fontSize:18,
        fontWeight:'700',
        fontFamily:'Inter',
        color:'#121323',
        marginBottom:10
      },
     type:{
      flexDirection:'row',
      gap:20,
      marginVertical:5
     },
     typeText:{
      fontSize:13,
      fontWeight:'600',
      fontFamily:'Inter',
      color:'#808080',
      lineHeight:13,
      borderColor:"#808080",
      paddingBottom:2
     },
      vehicleContainer:{
        flexDirection:'row',
        gap:10,
        marginTop:10
      },
      selected:{
        borderWidth:1,
        borderRadius:12,
        backgroundColor:'rgba(223, 223, 223, 0.5)',
        borderColor:'#808080',
        
      }
});