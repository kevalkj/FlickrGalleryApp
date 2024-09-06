import React, {useRef, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardTypeOptions,
  TextInputProps,
} from 'react-native';
import textStyles from './textStyles';

interface PhoneInputProps extends TextInputProps {
  onTextChange?: (text: string) => void;
  PlaceHolder?: string;
  color?: string;
  txt?: string;
  component?: React.FC;
  keyboard?: KeyboardTypeOptions;
  metric?: string;
  triggerClear?: boolean;
  readonly?: boolean;
}

const CustomInputText: React.FC<PhoneInputProps> = ({
  onTextChange,
  component: Component,
  PlaceHolder,
  color,
  txt,
  keyboard,
  metric,
  readonly = false,
  triggerClear,
  ...props
}) => {
  const metrics = metric ? metric : '';
  const [text, setText] = useState(txt == undefined ? '' : txt);
  const [isFocus, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);
  if (triggerClear) {
    console.log(1);
    setText('');
  }
  const handleTextChange = (input: string) => {
    setText(input);
    if (onTextChange) {
      onTextChange(input); // Notify parent component of the text change
    }
  };

  const handlePress = () => {
    inputRef.current?.focus();
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      {Component && <Component />}
      <View style={styles.inputContainer}>
        {text !== '' && (
          <Text style={[textStyles.bodyB4, styles.text]}>{PlaceHolder}</Text>
        )}
        <TextInput
          readOnly={readonly}
          ref={inputRef}
          style={[
            text === '' ? textStyles.bodyB3 : textStyles.headingH8,
            {color: 'black', paddingVertical: 4},
          ]}
          placeholder={PlaceHolder}
          onFocus={() => setIsFocused(true)}
          keyboardType={keyboard}
          placeholderTextColor="gray"
          onChangeText={handleTextChange}
          value={text || txt}
          {...props}
        />
      </View>
      {metrics && text !== '' && <Text style={styles.metrics}>{metrics}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 55,
    flexDirection: 'row',
  },
  inputContainer: {
    width: '90%',
    height: '100%',
    flexDirection: 'column',
    paddingLeft: 11.5,
    justifyContent: 'center',
  },
  text: {
    fontSize: 12,
    color: '#696969',
    lineHeight: 33,
    padding: 0,
    margin: 0,
    height: 25,
  },
  metrics: {
    alignSelf: 'center',
    color: '#696969',
    fontWeight: 'bold',
  },
});

export default CustomInputText;
