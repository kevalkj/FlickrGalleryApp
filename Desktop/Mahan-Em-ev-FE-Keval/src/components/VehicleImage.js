import { Image, StyleSheet, View } from "react-native";

function VehicleImage({image}){
    return(
        <View style={styles.container}>
            <Image source={image} resizeMode="contain" />
        </View>
    )
}
export default  VehicleImage;

const styles = StyleSheet.create({
    container:{
        backgroundColor:'rgba(223, 223, 223, 0.5)',
        borderRadius:5,
        justifyContent:'center',
        alignItems:'center',
        padding:10,
        width:100,
        height:77,
    }
})