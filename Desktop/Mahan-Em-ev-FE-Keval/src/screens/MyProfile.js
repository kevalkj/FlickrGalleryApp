import { Image, ImageBackground, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import CustomHeader from "../components/CustomHeader";
import { useState } from "react";
import CustomButton from "../components/CustomButton";

function MyProfile(){

    const [selected, setSelected] = useState(null);

    const handlePress = (box) => {
      setSelected(box);
    };

    return(
        <>
        <View style={styles.container}>
            <CustomHeader title={'My Profile'} />
            <View style={styles.imagebox}>
                <ImageBackground 
                    style={styles.image} 
                    source={require('../assets/profileImage.jpeg')}
                    imageStyle={styles.imageStyle}
                >
                    <View style={styles.pencil} />
                </ImageBackground>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Rahul Sharma"
                    placeholderTextColor="#888"
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Phone</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="1234567890"
                    placeholderTextColor="#888"
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                style={styles.textInput}
                placeholder="rahul@gmail.com"
                placeholderTextColor="#888"
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Gender</Text>
                <View style={styles.genderBox}>
                    <Pressable
                        style={[
                        styles.box,
                        selected === 'male' && styles.selectedBox,
                        ]}
                        onPress={() => handlePress('male')}
                    >
                        <Text style={[
                        styles.text,
                        selected === 'male' && {color:'#000'},
                        ]}>Male</Text>
                    </Pressable>

                    <Pressable
                        style={[
                        styles.box,
                        selected === 'female' && styles.selectedBox,
                        ]}
                        onPress={() => handlePress('female')}
                    >
                        <Text style={[
                        styles.text,
                        selected === 'female' && {color:'#000'},
                        ]}>Female</Text>
                    </Pressable>

                    <Pressable
                        style={[
                        styles.box,
                        selected === 'others' && styles.selectedBox,
                        ]}
                        onPress={() => handlePress('others')}
                    >
                        <Text style={[
                        styles.text,
                        selected === 'others' && {color:'#000'},
                        ]}>Other</Text>
                    </Pressable>
                </View>
            </View>
            
        </View>
        <CustomButton title={'Update'} onPress={()=>{}}/>
        </>
    )
}
export default MyProfile;

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:15,
        backgroundColor:'#fff'
    },
    imagebox:{
        justifyContent:'center',
        alignItems:'center',
        marginVertical:30,
    },
    image:{
        width:100,
        height:100,
        borderRadius:50,
    },
    imageStyle: {
        borderRadius: 100, // Ensures the image itself is rounded
    },
    pencil:{
        width:20,
        height:20,
        borderRadius:10,
        backgroundColor:'#0F6DDC',
        position:'absolute',
        top:70,
        left:'auto',
        right:4,
        borderColor:'#fff',
        borderWidth:1.5
    }, 
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        marginBottom: 5,
        fontSize: 14,
        color: '#000',
        fontFamily:'Inter',
        fontWeight:'400',
    },
    textInput: {
        height: 40,
        borderColor: '#9F9F9F',
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        color:'#9F9F9F'
    },
    genderBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width:'100%'
    },
    box: {
        width: 100,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#9F9F9F',
        borderRadius: 4,
    },
    selectedBox: {
        backgroundColor: '#FCE9AC',
        color:'#000'
    },
    text: {
        fontSize: 14,
        color: '#9F9F9F',
    },
})