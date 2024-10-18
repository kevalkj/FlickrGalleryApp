import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import CustomButton from '../CustomButton';
import { useEffect, useState } from 'react';
import DatePicker from 'react-native-date-picker';

function ScheduleRideModal({showScheduleModal,closeScheduleModal}){

    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [openDatePicker, setOpenDatePicker] = useState(false);
    const [openTimePicker, setOpenTimePicker] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    useEffect(() => {
        setCurrentDate(new Date(new Date().getTime() + 1000*60*60));
        setDate(new Date(new Date().getTime() + 1000*60*60));
        setTime(new Date(new Date().getTime() + 1000*60*60));
    }, []);

    const formatAMPM = (date) => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        const strTime = (hours<10? '0'+hours : hours) + ':' + minutes + ' ' + ampm;
        return strTime;
    };

    const formatDate = (date) => {
        const options = { weekday: 'long', day: 'numeric', month: 'long' };
        return date.toLocaleDateString('en-US', options);
    };

    return(
        <Modal
        animationType="slide"
        transparent={true}
        visible={showScheduleModal}
        >
            <View style={styles.modal}>
                <View style={styles.modalContainer}>
                    <View style={styles.closebtn}/>
                    <Text style={styles.heading}>Schedule a ride</Text>
                    <Pressable 
                        onPress={() => setOpenDatePicker(true)}  
                        style={styles.label}
                    >
                        <Text style={styles.input}>{formatDate(date)}</Text>
                        <Image style={styles.calenderIcon} source={require('../../assets/calender.png')} resizeMode="contain"/>
                    </Pressable>

                    <Pressable 
                        onPress={() => setOpenTimePicker(true)}
                        style={styles.label}
                    >
                        <Text style={styles.input}>{formatAMPM(time)}</Text>
                    </Pressable>
                </View>
                <CustomButton title={'Set Pic-Up'} onPress={closeScheduleModal} />
            </View>
            <DatePicker
                modal
                open={openDatePicker}
                date={date}
                minimumDate={currentDate}
                mode="date"
                onConfirm={(selectedDate) => {
                setOpenDatePicker(false);
                setDate(selectedDate);
                }}
                onCancel={() => {
                setOpenDatePicker(false);
                }}
            />

            <DatePicker
                modal
                open={openTimePicker}
                date={time}
                mode="time"
                minimumDate={currentDate}
                is12hourSource="locale"
                onConfirm={(selectedTime) => {
                setOpenTimePicker(false);
                setTime(selectedTime);
                }}
                onCancel={() => {
                setOpenTimePicker(false);
                }}
            />
        </Modal>
    )
}
export default ScheduleRideModal;


const  styles = StyleSheet.create({
    modal:{
        flex:1,
        backgroundColor:'rgba(0,0,0,0.7)',
        justifyContent:'flex-end'
    },
    modalContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
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
        marginBottom:20
      },
      label:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%',
        height:40,
        borderRadius:27,
        paddingHorizontal:25,
        borderWidth:1,
        borderColor:'#9F9F9F',
        marginBottom:15
      },
      heading:{
        fontSize:20,
        fontWeight:'700',
        fontFamily:'Inter',
        color:'#121323',
        marginBottom:25
      },
      input:{
        fontSize:14,
        fontWeight:'400',
        fontFamily:'Inter',
        color:'#121323',
        textAlign:'center',
        width:'100%'
      },
      calenderIcon:{
        height:17,
        width:15,
        //marginRight:5
      },
      
});