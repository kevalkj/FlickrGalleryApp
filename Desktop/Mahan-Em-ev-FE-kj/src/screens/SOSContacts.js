import { StyleSheet, Text, View } from "react-native";
import CustomHeader from "../components/CustomHeader";
import SOSContactCard from "../components/cards/SOSContactCard";
import YellowOutlineButton from "../components/YellowOutlineButton";
import CustomButton from "../components/CustomButton";
import { useState } from "react";
import JustifiedText from 'react-native-text';
import AddEmergencyContactModal from "../components/modals/AddEmergencyContactModal";

function SOSContacts(){

    const [showModal,setShowModal] = useState(false);

    function addContact(){
        setShowModal(true);
    }

    function closeModal(){
        setShowModal(false);
    }
    return(
        <>
        <View style={styles.container}>
            <CustomHeader title={'SOS'} />
            <View style={styles.topConatiner}>
                <JustifiedText style={styles.info}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'sLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                </JustifiedText>
            </View>
            <View style={styles.headingView}>
                <Text style={styles.heading}>Add Emergency Contact </Text>
                <Text style={styles.txtBlue}>(only 4)</Text>
            </View>
            
            <SOSContactCard name={'Raj Kumar'} number={'9876543210'} relation={'Father'} />
            <SOSContactCard name={'Raj Kumar'} number={'9876543210'} relation={'Father'} />
            <SOSContactCard name={'Raj Kumar'} number={'9876543210'} relation={'Father'} />
        </View>
        <View style={{paddingHorizontal:15, backgroundColor:'#fff'}}>
            <YellowOutlineButton title={'Add Emergency Contact'} onPress={addContact}/>
            <AddEmergencyContactModal showModal={showModal} closeModal={closeModal}/>
        </View>
        <CustomButton title={'Save'} />
        </>
    )
}
export default SOSContacts;

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding : 20,
        backgroundColor:'#fff'
    },
    topConatiner:{
        marginVertical:20,
        width:'100%',
    },
    info:{
        fontFamily:'Inter',
        fontWeight:'500',
        fontSize:12,
        textAlign: 'justify',
        color:'#404040',
        lineHeight:16.2
    },
    headingView:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'flex-end',
        marginVertical:15
    },
    heading:{
        fontWeight:'700',
        fontFamily:'Inter',
        fontSize:18,
        color:'#1B1501',
        lineHeight:24.3
    },
    txtBlue:{
        fontWeight:'400',
        fontFamily:'Inter',
        fontSize:12,
        color:'#0F6DDC',
        lineHeight:16.2
    }
})