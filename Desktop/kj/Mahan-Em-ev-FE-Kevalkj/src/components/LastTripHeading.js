import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";

function LastTripHeading(){
    const navigation = useNavigation();

    function allTrips(){
        navigation.navigate('YourLastTrip')
    }
    return(
        <View style={styles.container}>
            <Text style={styles.heading}>
                Your last trip 
            </Text>
            <Pressable onPress={allTrips} >
                <Text style={styles.btn}>See All</Text>
            </Pressable>
        </View>
    )
}
export default LastTripHeading;

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'flex-end',
        width:'100%',
        marginVertical:20,
    },
    heading:{
        fontSize:18,
        fontFamily:'Inter',
        fontWeight:'700',
        color:'#121323'
    },
    btn:{
        fontSize:12,
        fontFamily:'Inter',
        fontWeight:'400',
        color:'#0F6DDC'
    }
})