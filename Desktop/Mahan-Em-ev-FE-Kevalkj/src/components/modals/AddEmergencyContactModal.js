import { Modal, StyleSheet, Text, TextInput, View } from "react-native";
import CustomButton from "../CustomButton";
import YellowOutlineButton from "../YellowOutlineButton";

function AddEmergencyContactModal({showModal,closeModal}){
    
    return(
        <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        >
            <View style={styles.modal}>
                <View style={styles.modalContainer}>
                    <Text style={styles.heading}>Add Emergency Contact</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Select Contact</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Raj Kumar"
                            placeholderTextColor="#888"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Relationship</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Father"
                            placeholderTextColor="#888"
                        />
                    </View>
                </View>
                <View style={styles.btnBox}>
                    <View style={styles.cancelBtn}>
                        <YellowOutlineButton title={'Cancel'} onPress={closeModal}/>
                    </View>
                    <View style={styles.AddBtn}>
                        <CustomButton title={'Add Contact'} onPress={closeModal}/>
                    </View>
                </View>
            </View>
            
        </Modal>
    )
}
export default AddEmergencyContactModal;


const  styles = StyleSheet.create({
    modal:{
        flex:1,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
        flex:1,
        justifyContent: 'flex-start',
        //alignItems: 'center',
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 25,
        marginTop:410
      },      
      heading:{
        fontSize:18,
        fontWeight:'700',
        fontFamily:'Inter',
        color:'#121323',
        marginVertical:20,
        textAlign:'center'
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
    btnBox:{
        flexDirection:'row',
        width:"100%",
        backgroundColor:'#fff',
        paddingHorizontal:15
    },
    cancelBtn:{
        width:'50%',
        alignItems:'center',
        paddingVertical:15,
        paddingHorizontal:15
    },
    AddBtn:{
        width:'50%'
    }
});
