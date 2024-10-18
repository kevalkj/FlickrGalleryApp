import { useState, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import CustomButton from "../CustomButton";
import YellowOutlineButton from "../YellowOutlineButton";

function AddEmergencyContactModal({ showModal, closeModal }) {
  const [contactName, setContactName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [errors, setErrors] = useState({
    contactName: "",
    relationship: "",
    phoneNumber: "",
  });

  useEffect(() => {
    validateFields()
    
    if (showModal) {
      setContactName("");
      setRelationship("");
      setPhoneNumber("");
      setErrors({
        contactName: "",
        relationship: "",
        phoneNumber: "",
      });
    }
  }, [showModal]);

  const validateFields = () => {
    let valid = true;
    let tempErrors = { contactName: "", relationship: "", phoneNumber: "" };

    if (contactName.trim() === "") {
      tempErrors.contactName = "Contact name is required.";
      valid = false;
    }

    if (relationship.trim() === "") {
      tempErrors.relationship = "Relationship is required.";
      valid = false;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (phoneNumber.trim() === "") {
      tempErrors.phoneNumber = "Phone number is required.";
      valid = false;
    } else if (!phoneRegex.test(phoneNumber)) {
      tempErrors.phoneNumber = "Phone number must be 10 digits.";
      valid = false;
    }

    setErrors(tempErrors);
    return valid;
  };

  useEffect(() => {
    validateFields()
  }, [contactName, relationship, phoneNumber]);

  const handleAddContact = () => {
    if (validateFields()) {
        console.log(contactName)
        console.log(relationship)
        console.log(phoneNumber)
      closeModal(); 
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={showModal}>
      <View style={styles.modal}>
        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView contentContainerStyle={styles.scrollView} keyboardShouldPersistTaps="handled">
            <View style={styles.modalContainer}>
              <Text style={styles.heading}>Add Emergency Contact</Text>

              {/* Contact Name Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Select Contact</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Raj Kumar"
                  placeholderTextColor="#888"
                  value={contactName}
                  onChangeText={setContactName}
                />
                {errors.contactName ? (
                  <Text style={styles.errorText}>{errors.contactName}</Text>
                ) : null}
              </View>

              {/* Relationship Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Relationship</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Father"
                  placeholderTextColor="#888"
                  value={relationship}
                  onChangeText={setRelationship}
                />
                {errors.relationship ? (
                  <Text style={styles.errorText}>{errors.relationship}</Text>
                ) : null}
              </View>

              {/* Phone Number Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="1234567890"
                  placeholderTextColor="#888"
                  keyboardType="numeric"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                />
                {errors.phoneNumber ? (
                  <Text style={styles.errorText}>{errors.phoneNumber}</Text>
                ) : null}
              </View>

              <View style={styles.btnBox}>
                <View style={styles.cancelBtn}>
                  <YellowOutlineButton title={"Cancel"} onPress={closeModal} />
                </View>
                <View style={styles.AddBtn}>
                  <CustomButton title={"Add Contact"} onPress={handleAddContact} />
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

export default AddEmergencyContactModal;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  modalContainer: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 25,
    paddingVertical: 30,
  },
  heading: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "Inter",
    color: "#121323",
    marginVertical: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 10,
    fontSize: 14,
    color: "#000",
    fontFamily: "Inter",
    fontWeight: "400",
  },
  textInput: {
    height: 40,
    borderColor: "#9F9F9F",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    color: "#000",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  btnBox: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
  },
  cancelBtn: {
    width: "50%",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  AddBtn: {
    width: "50%",
  },
});