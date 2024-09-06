import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';

interface PhoneInputProps {
  onPhoneNumberChange?: (phoneNumber: string) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({onPhoneNumberChange}) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleTextChange = (input: string) => {
    setPhoneNumber(input);
    if (onPhoneNumberChange) {
      onPhoneNumberChange(input); // Notify parent component of the text change
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.phoneContainer}>
        <Text style={styles.countryCode}>+91</Text>
        <View style={styles.separator} />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor="#707371"
          keyboardType="phone-pad"
          onChangeText={handleTextChange}
          value={phoneNumber}
          maxLength={10}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 10,
    // marginVertical: 15
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: 'gray',
  },
  countryCode: {
    fontSize: 16,
    color: '#1C1C1C',
    marginHorizontal: 10,
    fontFamily: 'Poppins',
    fontWeight: '400',
  },
  separator: {
    width: 1,
    height: '100%',
    backgroundColor: 'gray',
    marginHorizontal: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: 'black',
    paddingVertical: 18,
    fontFamily: 'NotoSerif-Regular',
  },
});

export default PhoneInput;
