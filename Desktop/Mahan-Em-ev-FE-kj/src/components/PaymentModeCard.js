import { Image, StyleSheet, Text, View } from "react-native";

function PaymentModeCard({label, isSelected, image}){
    return(
        <View style={styles.conatiner}>
            <View style={{flexDirection:'row', alignItems: "center", gap: 30}}>
                <Image source={image} resizeMode="contain" />
                <Text style={styles.text}>Add by {label}</Text>
            </View>
            <View style={styles.radioBtn}>
                <View style={[isSelected && styles.innerCircle]} />
            </View>
        </View>
    )
}
export default PaymentModeCard;

const styles = StyleSheet.create({
    conatiner:{
        flexDirection:'row',
        width:'100%',
        alignItems:'center',
        marginVertical:10,
        justifyContent: "space-between"
    },
    text:{
        fontSize:14,
        fontWeight:'700',
        color:'#000000',
        fontFamily:'Inter',
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
    }
});