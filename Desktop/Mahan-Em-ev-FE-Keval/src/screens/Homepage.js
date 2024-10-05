import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import HomepageModal from "../components/modals/HomepageModal";
import React,{ useEffect, useState } from "react";
import ScheduleRideModal from "../components/modals/ScheduleRideModal";
import ScheduleStatusModal from "../components/modals/ScheduleStatusModal";
import CancelRideModal from "../components/modals/CancelRideModal";
import { useFocusEffect } from "@react-navigation/native";
// import  MapmyIndiaIntouch  from  'mapmyindia-intouch-react-native-sdk';

function Homepage({navigation}){

  const [showModal,setShowModal] = useState(true);
  const [showScheduleStatusModal,setShowScheduleStatusModal] = useState(false);

  function closeModal(){
    setShowModal(false);
  }
   
 return(
    <View style={styles.connatiner}>
        <Image source={require('../assets/map.png')} />
        <Pressable 
          onPress={() => { 
            console.log("open drawer")
            navigation.openDrawer()}}
          style={styles.icon} 
        >
          <Image source={require('../assets/personIcon.png')} />
        </Pressable>
        
        <HomepageModal closeModal={closeModal} />

        <ScheduleStatusModal showScheduleStatusModal={showScheduleStatusModal} />
       
    </View>
 )
}
export default Homepage;

const styles = StyleSheet.create({
  connatiner:{
    flex:1
  },
    icon:{
      width:40,
      height:40,
      position:'absolute',
      left:'auto',
      right:15,
      top:15,
    }
});