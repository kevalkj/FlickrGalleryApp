import { StyleSheet, View } from "react-native";
import CustomHeader from "../components/CustomHeader";
import { FlatList } from "react-native-gesture-handler";
import MyRideCard from "../components/cards/MyRideCard";
const image = require('../assets/profileImage.jpeg')
function MyRides(){
    const data=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    return(
        <View style={styles.container}>
            <CustomHeader title={'My Rides'}/>
            <FlatList 
                data={data}
                renderItem={(item)=><MyRideCard image={image} name={'Samay Raina'} date={'May 01'} time={'03:20 PM'} status={'Complete'}/>}
            />
        </View>
    )
}
export default MyRides;

const styles  = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        paddingHorizontal:20,
        flex:1
    },
})