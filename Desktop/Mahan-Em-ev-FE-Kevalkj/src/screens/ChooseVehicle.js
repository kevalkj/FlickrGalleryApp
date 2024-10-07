import { Image, StatusBar, StyleSheet, View } from "react-native";
import ChooseVehicleModal from "../components/modals/ChooseVehicleModal";
import PaymentModal from "../components/modals/PaymentModal";

function ChooseVehicle(){  
    return(
        <View style={styles.container}>
           
            <Image source={require('../assets/map.png')} />
            <ChooseVehicleModal />
        </View>
    )
}
export default ChooseVehicle;

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})