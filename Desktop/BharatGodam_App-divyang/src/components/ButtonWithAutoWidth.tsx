import {
  Dimensions,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const {width, height} = Dimensions.get('window');

interface CustomButtonProps {
  text?: string;
  onPress?: () => void;
  bgcolor?: string;
  borderColor?: string;
  txtcolor?: string;
  marginT?: number;
  marginB?: number;
  role?: string;
  component?: React.FC;
  disabled?: boolean;
}

const ButtonWithAutoWidth: React.FC<CustomButtonProps> = ({
  text,
  onPress,
  bgcolor,
  txtcolor,
  marginT,
  marginB,
  borderColor,
  role,
  component: Component,
  disabled,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: bgcolor,
          marginTop: marginT,
          marginBottom: marginB,
          borderColor: borderColor,
        },
        disabled && styles.disabledContainer,
      ]}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}>
      {Component && <Component />}
      <Text style={[styles.text, {color: txtcolor}]}>
        {text}
        {(() => {
          if (role == 'phone') {
            return ' with mobile number';
          }
          if (role == 'iButton') {
            return '';
          } else {
            return ' with email';
          }
        })()}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonWithAutoWidth;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: height * 0.06,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    // opacity: 1,
  },
  disabledContainer: {
    backgroundColor: '#989E9A',
    borderColor: '#989E9A',
  },
  text: {
    fontFamily: 'Poppins',
    fontSize: height * 0.02,
    fontWeight: 'bold',
    lineHeight: 19.2,
    textAlign: 'center',
    color: '#626262',
  } as TextStyle,
});
