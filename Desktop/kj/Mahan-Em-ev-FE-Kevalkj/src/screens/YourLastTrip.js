import { FlatList, StyleSheet, Text, View } from "react-native";
import CustomHeader from "../components/CustomHeader";
import LastTripHeading from "../components/LastTripHeading";
import LastTripCard from "../components/LastTripCard";

function YourLastTrip(){
    const data=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    return(
        <>
        <View style={styles.container}>
            <CustomHeader />
            <Text style={styles.heading}>Your last trip</Text>
        </View>
        <FlatList 
                style={styles.list}
                data={data}
                renderItem={(item)=><LastTripCard />}
            />
        </>
    )
}
export default YourLastTrip;

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        paddingHorizontal:20,
    },
    heading:{
        fontSize:18,
        fontFamily:'Inter',
        fontWeight:'700',
        color:'#121323',
        paddingBottom:20
    },
    list:{
        backgroundColor:'#fff'
    }
})