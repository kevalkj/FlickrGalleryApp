import { Image, StyleSheet, Text, View } from "react-native";

function LastTripCard(){
    return(
        <View  style={styles.container}>
            <View style={styles.icon}>
                <Image source={require('../assets/locationIcon.png')}/>
            </View>
            <View style={styles.innerView}>
                <Text style={styles.place}>Mcdonald</Text>
                <Text style={styles.address}>Unit No 1/1A, Ground Floor, NOB Building, Blue Ridge Approach Road</Text>
            </View>
        </View>
    )
}
export default LastTripCard;

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        marginHorizontal:15,
        borderBottomWidth:1,
        paddingBottom:15,
        marginBottom:10,
        borderColor:'rgba(223,223,223,0.7)',
        
    },
    innerView:{
        marginHorizontal:10,
        justifyContent:'center',
    },
    icon:{
        justifyContent:'center',
        alignItems:'center',
    },
    place:{
        fontSize:16,
        fontFamily:'Inter',
        fontWeight:'700',
        color:'#121323'
    },
    address:{
        fontSize:12,
        fontFamily:'Inter',
        fontWeight:'400',
        color:'#808080'
    }

})