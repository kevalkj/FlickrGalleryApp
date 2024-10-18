import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import DeleteContactModal from "../modals/DeleteContactModal";
import { useState } from "react";

function SOSContactCard({image,name,relation,number}){

    const [showModal,setShowModal] = useState(false);

    function deleteContact(){
        setShowModal(true);
    }

    function closeModal(){
        setShowModal(false);
    }

    return(
        <View style={styles.container}>
            <View style={styles.circle}>
                {image && <Image source={image}/>}
            </View>
            <View style={styles.details}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.number}>Mobile +91-{number}</Text>
                <Text style={styles.relation}>{relation}</Text>
            </View>
            <Pressable style={styles.delete} onPress={deleteContact}>
                <Image source={require('../../assets/trash.png')} />
            </Pressable>
            <DeleteContactModal showModal={showModal} closeModal={closeModal} />
        </View>
    )
}
export default SOSContactCard;

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        marginVertical:10,
        marginHorizontal:10,
        justifyContent: "space-between"
    },
    circle:{
        width:45,
        height:45,
        borderRadius:23,
        backgroundColor:'#808080',
    },
    details:{
        marginHorizontal:10,
        width:'65%',
        justifyContent:'center',
    },
    name:{
        fontFamily:'Inter',
        fontWeight:'700',
        fontSize:14,
        color:'#121323',
        lineHeight:18.9
    },
    number:{
        fontFamily:'Inter',
        fontWeight:'400',
        fontSize:12,
        color:'#808080',
        lineHeight:16.2
    },
    relation:{
        fontFamily:'Inter',
        fontWeight:'400',
        fontSize:12,
        color:'#0F6DDC',
        lineHeight:16.2
    },
    delete:{
        padding:5
    }
})