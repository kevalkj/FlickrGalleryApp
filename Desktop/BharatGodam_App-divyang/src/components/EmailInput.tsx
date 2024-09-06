import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';

interface PhoneInputProps {
  onPhoneNumberChange?: (phoneNumber: string) => void;
}

const EmailInput: React.FC<PhoneInputProps> = ({onPhoneNumberChange}) => {
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
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="gray"
          inputMode="email"
          // keyboardType="phone-pad"
          onChangeText={handleTextChange}
          value={phoneNumber}
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
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});

export default EmailInput;
