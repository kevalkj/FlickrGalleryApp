import { Image, StyleSheet, Text, View } from "react-native";

function ChooseVehicleCard({image,vehicle,time,person,amount}){
    return(
        <View style={styles.container}>
            <Image style={styles.image} source={image} resizeMode="contain" />
            <View style={styles.vehicleinfo}>
                <Text style={styles.vehicle}>{vehicle}</Text>
                <View style={styles.details}>
                    <Text style={styles.info}>{time}</Text>
                    <View style={styles.dot}/>
                    <Text style={styles.info}>{person}</Text>
                </View>
            </View>
            <Text style={styles.amount}>₹ {amount}</Text>
        </View>
    )
}
export default ChooseVehicleCard;

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        paddingVertical:15,
        width:'100%',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:10
    },
    details:{
        flexDirection:'row',
        alignItems:'center',
        
    },
    image:{
        width:60,
    },
    dot:{
        height:5,
        width:5,
        borderRadius:2.5,
        backgroundColor:'#000',
        marginHorizontal:5,
        marginLeft:10,
    },
    vehicleinfo:{
       width:"60%",
       paddingLeft:10
    },
    vehicle:{
        fontSize:16,
        fontWeight:'700',
        fontFamily:'Inter',
        color:'#121323'
    },
    info:{
        fontSize:12,
        fontWeight:'400',
        fontFamily:'Inter',
        color:'#979797'
    },
    amount:{
        fontSize:15,
        fontWeight:'800',
        fontFamily:'Inter',
        color:'#121323'
    }
});