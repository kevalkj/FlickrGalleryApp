import { Modal, StyleSheet, Text, View } from "react-native";
import CustomButton from "../CustomButton";
import YellowOutlineButton from "../YellowOutlineButton";

function DeleteContactModal({showModal,closeModal}){
    return(
        <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        >
            <View style={styles.modal}>
                <View style={styles.modalContainer}>
                    <Text style={styles.heading}>Are you sure you want to delete?</Text>
                <View style={styles.btnBox}>
                    <View style={styles.AddBtn}>
                        <CustomButton title={'Yes'} onPress={closeModal}/>
                    </View>
                    <View style={styles.cancelBtn}>
                        <YellowOutlineButton title={'No'} onPress={closeModal}/>
                    </View>
                </View>
                </View>
            </View>
            
        </Modal>
    );
}
export default DeleteContactModal;


const  styles = StyleSheet.create({
    modal:{
        flex:1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderRadius:10,
        paddingHorizontal: 25,
        marginHorizontal:20,
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
