import { Pressable, StyleSheet, Text, View } from "react-native";

function YellowOutlineButton({title,onPress}){
    return(
        <View style={styles.conatiner}>
            <Pressable  onPress={onPress} style={styles.btn}>
                <Text style={styles.title}>
                    {title}
                </Text>
           </Pressable>
        </View>
    )
}
export default YellowOutlineButton;

const styles = StyleSheet.create({
    conatiner:{
        backgroundColor:"#fff",
        width:'100%'
    },
    btn:{
        justifyContent:"center",
        alignItems:"center",
        height:56,
        borderRadius:50,
        borderColor:"#F8C218",
        borderWidth:1,

    },
    title:{
        fontSize:16,
        fontWeight:"700",
        color:'#F8C218'
    }
});