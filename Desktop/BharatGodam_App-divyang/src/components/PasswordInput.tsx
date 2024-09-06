import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Text, Alert} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import EyeOff from '../assets/EyeOff';
import textStyles from './textStyles';

interface PhoneInputProps {
  onTextChange?: (text: string) => void;
  PlaceHolder?: string;
}

const PasswordInput: React.FC<PhoneInputProps> = ({
  onTextChange,
  PlaceHolder,
}) => {
  const [text, setText] = useState('');
  const [Border, setBorder] = useState('gray');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [secureText, setSecureText] = useState(true);

  const handleTextChange = (input: string) => {
    if (input.length < 5) {
      setBorder('red');
      //Alert.alert("Password should be at least 6 characters long");
      //return;
    }
    setText(input);
    if (onTextChange) {
      onTextChange(input); // Notify parent component of the text change
    }
  };

  // const handlePhoneNumberChange = (text: string) => {
  //     // Remove non-numeric characters from the input
  //     // const formattedPhoneNumber = text.replace(/[^\d]/g, '');

  //     // Limit input to 10 digits
  //     // if (formattedPhoneNumber.length <= 10) {
  //     //     setPhoneNumber(formattedPhoneNumber);
  //     //     //   onPhoneNumberChange(formattedPhoneNumber); // Notify parent component of the phone number change
  //     // }
  // };

  return (
    <View style={styles.container}>
      <View style={[styles.phoneContainer, {borderColor: Border}]}>
        <TextInput
          style={[styles.input, textStyles.bodyB3]}
          placeholder={PlaceHolder || 'Password'} //"Password"
          placeholderTextColor="#707371"
          // keyboardType="phone-pad"
          secureTextEntry={secureText}
          onChangeText={handleTextChange}
          value={text}
        />
        <TouchableOpacity
          style={{marginRight: 10}}
          onPressIn={() => setSecureText(false)}
          onPressOut={() => setSecureText(true)}>
          <EyeOff />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: 'gray',
  },
  countryCode: {
    fontSize: 16,
    marginHorizontal: 8,
  },
  separator: {
    width: 1,
    height: '100%',
    backgroundColor: 'gray',
    marginHorizontal: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    paddingHorizontal: 12,
    paddingVertical: 16,
    color: '#707371',
  },
});

export default PasswordInput;
