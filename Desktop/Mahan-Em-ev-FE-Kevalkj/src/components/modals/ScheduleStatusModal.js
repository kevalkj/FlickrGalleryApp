import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import YellowOutlineButton from '../YellowOutlineButton';
import CustomButton from '../CustomButton';

function ScheduleStatusModal({showScheduleStatusModal,}){
    const [isModalVisible, setModalVisible] = useState(false);
  const [isContentVisible, setContentVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setContentVisible(false); // Reset content visibility when modal is closed
  };

  const handleSwipeUp = () => {
    setContentVisible(true);
  };

  const handleSwipeDown = () => {
    setContentVisible(false);
    setModalVisible(false); // Close modal when content is swiped down
  };

  useEffect(()=>{
    setModalVisible(showScheduleStatusModal);
  },[showScheduleStatusModal])

  return (
    <View style={styles.container}>
      <Button title="Show Modal" onPress={toggleModal} />

      <Modal
        isVisible={isModalVisible}
        swipeDirection={['down', 'up']} // Allow swiping up and down
        onSwipeComplete={handleSwipeDown}
        onSwipeMove={(swipeDirection) => {
          if (swipeDirection >0.3) {
            handleSwipeUp();
          }
        }}
        swipeThreshold={300} // Adjust as needed
        onBackdropPress={toggleModal}
        style={styles.modal}
        backdropOpacity={0} 
        propagateSwipe={true} // Allow swipe propagation
      >
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.handle} />
          {isContentVisible && (
            <>
                <Text style={styles.heading}>Your ride has been scheduled</Text>
                <View style={{flexDirection:'row',marginVertical:5}}>
                <Text style={styles.date}>Friday, 31 May @ </Text>
                <Text style={styles.time}>12:30 PM</Text>

                </View>
                <View style={styles.locationBox}>
                    <View style={styles.dots}>
                        <View style={styles.outterCircle}>
                            <View style={styles.innerCircle}/>
                        </View>
                        <View style={styles.dottedLine}></View>
                        <View style={[styles.outterCircle,{borderColor:'#0F6DDC'}]}>
                            <View style={[styles.innerCircle, {backgroundColor:'#0F6DDC'}]} />
                        </View>
                    </View>
                    <View style={styles.inputs}>
                        <View>
                            <Text style={styles.locationTxt}>Your Location</Text>
                            <Text style={styles.locationLable}>Unit No 1/1A, Ground Floor, NOB Building, Blue Ridge Approach Road, Township, Pune...............</Text> 
                            <Text style={styles.tripTime}>54 min trip</Text>
                        </View>
                        <View>
                            <Text style={styles.locationTxt}>Drop Location</Text>
                            <Text style={styles.locationLable}>Unit No 1/1A, Ground Floor, NOB Building, Blue Ridge Approach Road, Township, Pune...............</Text> 
                        </View>
                    </View>
                </View>
                <View style={styles.totalpay}>
                    <Text style={styles.totalpayTxt}>Total pay:</Text>
                    <Text style={styles.price}>₹ 110.50</Text>
                </View>
                <View style={styles.btnBox}>
                    <View style={styles.cancelBtn}>
                        <YellowOutlineButton title={'Cancel'} onPress={''}/>
                    </View>
                    <View style={styles.AddBtn}>
                        <CustomButton title={'Got it'} onPress={handleSwipeDown}/>
                    </View>
                </View>
            </>
          )}
        </View>
      </Modal>
    </View>
  );
}
export default ScheduleStatusModal;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        backgroundColor: 'white',
        paddingHorizontal:20,
        paddingVertical:10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
    },
    handle: {
        width: 40,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#000',
        alignSelf: 'center',
        marginBottom: 30,
    },
    heading:{
        fontSize:18,
        fontFamily:'Inter',
        fontWeight:'700',
        color:'#121323',
    },
    date:{
        fontSize:14,
        fontFamily:'Inter',
        fontWeight:'400',
        color:'#808080',
    },
    time:{
        fontSize:14,
        fontFamily:'Inter',
        fontWeight:'700',
        color:'#0F6DDC',
    },
    locationBox:{
        width:'100%',
        paddingVertical:15,
        flexDirection:'row',
        gap:20,
        borderTopWidth:1,
        borderBottomWidth:1,
        borderColor:'#979797',
        marginVertical:15
    },
    locationLable:{
        fontSize:14,
        fontFamily:'Inter',
        fontWeight:'400',
        color:'#606060',
    },
    locationTxt:{
        fontSize:14,
        fontFamily:'Inter',
        fontWeight:'700',
        color:'#121323',
        padding:0
    },
    tripTime:{
        fontSize:12,
        fontFamily:'Inter',
        fontWeight:'700',
        color:'#0F6DDC',
    },
    dots:{
      // justifyContent:'center',
      marginTop:5
    },
    outterCircle:{
        borderWidth:1,
        borderColor:'#BFBFBF',
        borderRadius:7,
        height:14,
        width:14,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center'
    },
    innerCircle:{
        borderWidth:1,
        borderColor:'#BFBFBF',
        borderRadius:7,
        height:8,
        width:8,
        backgroundColor:'#000'
    },
    dottedLine:{
        height:75,
        width:0,
        borderWidth:0.7,
        borderStyle:"dashed",
        marginLeft:6.5,
        borderColor:'#BFBFBF'
        
    },
    inputs:{
        gap:20
    },
    placeholderTxt:{
        fontSize:10,
        fontWeight:'500',
        fontFamily:'Inter',
        color:'#808080'
    },
    btnBox:{
        flexDirection:'row',
        width:"100%",
        backgroundColor:'#fff',
    },
    cancelBtn:{
        width:'50%',
        alignItems:'center',
        paddingVertical:15,
        paddingHorizontal:15
    },
    AddBtn:{
        width:'50%'
    },
    totalpay:{
        flexDirection:'row',
        width:'100%'
    },
    price:{
        fontSize:15,
        fontWeight:'800',
        fontFamily:'Inter',
        color:'#121323',
        textAlign:'right',
        paddingHorizontal:4
    },
    totalpayTxt:{
        fontSize:12,
        fontWeight:'600',
        fontFamily:'Inter',
        color:'#979797'
    }
  });