import React, {useRef, useEffect} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

const OtpInput = ({
  length = 4,
  value,
  onChange,
  onKeyPress,
  inputStyle,
  activeStyle,
}) => {
  const inputRefs = useRef([]);

  const handleInputChange = (text, index) => {
    const newCode = [...value];
    newCode[index] = text;
    onChange(newCode);

    if (text !== '' && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    } else if (text === '' && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && value[index] === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
    onKeyPress && onKeyPress(e, index);
  };

  return (
    <View style={styles.otpView}>
      {Array(length)
        .fill()
        .map((_, index) => (
          <TextInput
            key={index}
            ref={ref => (inputRefs.current[index] = ref)}
            style={[inputStyle, value[index] && activeStyle]}
            cursorColor={'#979797'}
            maxLength={1}
            keyboardType="numeric"
            value={value[index]}
            onChangeText={text => handleInputChange(text, index)}
            onKeyPress={e => handleKeyPress(e, index)}
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  otpView: {
    width: '60%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 50,
  },
});

export default OtpInput;
