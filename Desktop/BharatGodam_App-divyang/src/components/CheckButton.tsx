import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

interface CheckButtonProps {
  onPress?: () => void;
  single?: boolean;
  value?: boolean;
}
export default function CheckButton(props: CheckButtonProps) {
  const [selected, setSelected] = useState<boolean | undefined>(false);
  return (
    <TouchableOpacity
      style={
        props.single
          ? props.value
            ? styles.checkButtonSelected
            : styles.checkButtonUnSelected
          : selected
          ? styles.checkButtonSelected
          : styles.checkButtonUnSelected
      }
      onPress={() => {
        !props.single && setSelected(!selected);
        props.onPress && props.onPress();
      }}>
      {selected ||
        (props.value && <View style={styles.checkButtonFill}></View>)}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  checkButtonSelected: {
    width: 18,
    aspectRatio: 1,
    borderRadius: 100,
    borderColor: '#0C447D',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '2%',
  },
  checkButtonFill: {
    width: '75%',
    aspectRatio: 1,
    borderRadius: 100,
    backgroundColor: '#0C447D',
  },
  checkButtonUnSelected: {
    width: 18,
    aspectRatio: 1,
    borderRadius: 100,
    borderColor: '#939CA3',
    borderWidth: 1,
    marginRight: '2%',
  },
});
