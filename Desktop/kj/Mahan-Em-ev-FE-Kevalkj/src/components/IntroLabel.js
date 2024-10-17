import { StyleSheet, Text, View } from "react-native";

function IntroLabel({text1,text2}){
    return(
        <View>
            <Text style={styles.text1}>
                {text1}
            </Text>
            <Text style={styles.text2}>
                {text2}
            </Text>
        </View>
    )
}
export default IntroLabel;

const styles = StyleSheet.create({
text1:{
        fontSize:24,
        fontFamily:'Inter',
        fontWeight:"800",
        color:'#1B1501',
        textAlign:'center',
        marginHorizontal:10
    },
    text2:{
        fontSize:12,
        fontFamily:'Inter',
        fontWeight:"400",
        color:'#808080',
        textAlign:'center',
        paddingHorizontal:20,
        paddingTop:15
    },
})