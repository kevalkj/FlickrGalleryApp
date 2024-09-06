import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {RadioButton} from 'react-native-paper';

interface CustomRadioButtonProps {
  value: string;
  label: string;
  checked: string;
  onPress: () => void;
}

const CustomRadioButton: FC<CustomRadioButtonProps> = ({
  value,
  label,
  checked,
  onPress,
}) => (
  <View style={styles.radioButton}>
    {checked === value ? (
      <RadioButton value={value} status="checked" onPress={onPress} />
    ) : (
      <TouchableOpacity style={styles.uncheckedBox} onPress={onPress}>
        <View style={styles.innerUncheckedBox} />
      </TouchableOpacity>
    )}
    <Text style={styles.radioButtonText}>{label}</Text>
  </View>
);

export default CustomRadioButton;

const styles = StyleSheet.create({
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1C',
  },
  uncheckedBox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#0C447D',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
    marginVertical: 6,
  },
  innerUncheckedBox: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'white',
  },
});
