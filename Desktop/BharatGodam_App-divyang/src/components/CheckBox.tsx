import React, {useState} from 'react';
import {
  DimensionValue,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import CheckMark from '../assets/CheckMark';

type CheckBoxProps = {
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  //value?:boolean
};

const CheckBox: React.FC<CheckBoxProps> = ({disabled, style,onPress}) => {
  let width: DimensionValue | undefined = undefined;
  let height: DimensionValue | undefined = undefined;
  let [selected, setSelected] = useState<boolean>(false);
  if (style) {
    const {width: w, height: h} = StyleSheet.flatten(style);
    width = w;
    height = h;
  }
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        {
          width: 18,
          height: 18,
        },
        style,
      ]}
      onPress={() => {
        setSelected(!selected);
        if (onPress) {
          onPress();
        }
      }}>
      {selected ? (
        <View
          style={{
            width: '100%',
            height: '100%',
            borderColor: '#0C447D',
            borderWidth: 1,
            borderRadius: 3,
          }}>
          <CheckMark
            width="90%"
            height="100%"
            fill={disabled ? '#EBEDF0' : undefined}
          />
        </View>
      ) : (
        <View
          style={{
            width: '100%',
            height: '100%',
            borderColor: '#939CA3',
            borderWidth: 1,
            borderRadius: 3,
          }}></View>
      )}
    </TouchableOpacity>
  );
};

export default CheckBox;
