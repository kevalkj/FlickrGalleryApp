import { useNavigation } from '@react-navigation/native';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

function CustomHeader({onPress, title}){

    const navigation = useNavigation();

    function goBack(){
        navigation.goBack();
    }
 return(
    <View style={styles.container}>
    <Pressable style={styles.header} onPress={goBack}>
        <Image source={require('../assets/ArrowBack.png')} resizeMode="cover"/>
    </Pressable>
    <Text style={styles.heading}>{title}</Text>
    </View>
 )
}
export default CustomHeader;


const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center'
    },
    header:{
        paddingVertical:20,
    },
    heading:{
        width:'90%',
        textAlign:'center',
        fontWeight:'700',
        fontFamily:'Inter',
        fontSize:18,
        color:'#1B1501',
        lineHeight:24.3
    }
});