import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import CustomHeader from "../components/CustomHeader";
import CustomButton from "../components/CustomButton";
import PaymentModeCard from "../components/PaymentModeCard";
import YellowOutlineButton from "../components/YellowOutlineButton";
import { useNavigation } from "@react-navigation/native";
import MoneyHistoryCard from "../components/MoneyHistoryCard";

function Wallet(){

    const navigation = useNavigation();

    const history =[1,2,3,4,5,6,7,8,9]
    
    function gotoAddMoney(){
      navigation.navigate('AddMoney');
    }


    return(
        <>
        <View style={styles.conatiner}>
            <CustomHeader />
            <View style={styles.topConatiner}>
                <Text style={styles.heading}>Total Available balance</Text>
                <Text style={styles.rupee}>₹350.5</Text>
                <Text style={styles.text1}>Its fast, safe and secure</Text>
                <YellowOutlineButton title={'Add Money'} onPress={gotoAddMoney}/>
            </View>
            <Text style={styles.heading}>Add Money History</Text>
            <FlatList 
                data={history}
                renderItem={()=><MoneyHistoryCard Partner={'PhonePe'} time={'02.30 PM'} date={'06 JUN 2024'} amount={35}/>}
            />
        </View>
        </>
    )
}
export default Wallet;

const styles = StyleSheet.create({
  conatiner:{
    flex:1,
    backgroundColor:'#fff',
    paddingHorizontal:15
  },
  topConatiner:{
    justifyContent:'center',
    alignItems:'center',
    paddingTop:10,
    paddingBottom:30,
    borderBottomWidth:0.5,
    borderColor:'#979797',
    marginBottom:20,
 },
  heading:{
    fontSize:18,
    fontFamily:'Inter',
    fontWeight:'700',
    color:'#121323',
    marginBottom:30,
  },
  
  rupee:{
    fontSize:50,
    fontFamily:'Inter',
    fontWeight:'700',
    color:'#000',
  },
  text1:{
    fontSize:12,
    fontFamily:'Inter',
    fontWeight:'500',
    color:'#000000',
    marginBottom:30
  },
 

})
