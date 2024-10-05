import { Pressable, StyleSheet, Text, View } from "react-native";

function CustomButton({title,onPress}){
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
export default CustomButton;

const styles = StyleSheet.create({
    conatiner:{
        backgroundColor:"#fff",
        paddingVertical:15
    },
    btn:{
        justifyContent:"center",
        alignItems:"center",
        height:56,
        borderRadius:50,
        marginHorizontal:15,
        backgroundColor:"#F8C218"
    },
    title:{
        fontSize:16,
        fontWeight:"700",
        color:'#1B1501'
    }
});