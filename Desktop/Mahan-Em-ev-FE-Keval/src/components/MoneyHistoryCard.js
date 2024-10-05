import { Image, StyleSheet, Text, View } from "react-native";
const image = require('../assets/RupeeSymbol.png')

function MoneyHistoryCard({Partner,time,date,amount}){
    return(
        <>
        <View style={styles.container}>
            <Image style={styles.image} source={image} resizeMode="contain" />
            <View style={styles.Partnerinfo}>
                <Text style={styles.Partner}>Money added from {Partner}</Text>
                <View style={styles.details}>
                    <Text style={styles.date}>{date}</Text>
                    <Text style={styles.time}>{time}</Text>
                </View>
            </View>
            <Text style={styles.amount}>+  ₹ {amount}</Text>
        </View>
        <View style={styles.line}/>
        </>
        
    )
}
export default MoneyHistoryCard;

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        paddingVertical:15,
        width:'100%',
        justifyContent:'space-between',
        alignItems:'center',
        
    },
    details:{
        flexDirection:'row',
        alignItems:'center',
        
    },
    image:{
       
    },
    Partnerinfo:{
       width:"65%",
    },
    Partner:{
        fontSize:14,
        fontWeight:'700',
        fontFamily:'Inter',
        color:'#121323',
        paddingBottom:2,
    },
    date:{
        fontSize:12,
        fontWeight:'400',
        fontFamily:'Inter',
        color:'#979797',
        borderRightWidth:1,
        borderColor:'#979797',
        paddingRight:5,
        marginRight:5
    },
    time:{
        fontSize:12,
        fontWeight:'400',
        fontFamily:'Inter',
        color:'#979797'
    },
    amount:{
        fontSize:15,
        fontWeight:'800',
        fontFamily:'Inter',
        color:'#2BBD7E'
    },
    line:{
        height:1,
        width:'100%',
        borderBottomWidth:1,
        borderColor:'#979797',
        marginLeft:55
    }
});