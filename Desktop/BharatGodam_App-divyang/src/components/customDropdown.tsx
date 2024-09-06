import React, {ReactNode, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import textStyles from './textStyles';
import Dropdown from '../assets/Dropdown';

const sharedScrollViewStyle: ViewStyle = {
  backgroundColor: 'white',
  width: '100%',
  zIndex: 100,
  position: 'absolute',
  top: '108%',
  height: 'auto',
  borderWidth: 0.5,
  borderRadius: 8,
  shadowColor: '#000',
  shadowOffset: {width: 5, height: 2},
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
};

interface DropdownInputProps {
  selectedValue: string;
  setSelectedValue: (value: string) => void;
  items: string[];
  label: string;
  placeholder: string;
  scrollViewStyle?: StyleProp<ViewStyle>;
  onpress?: () => void;
  icon?: ReactNode;
  width?: string | number; // Allow both string (percentage) and number (pixels) types
  height?: string | number;
}

const DropdownInput: React.FC<DropdownInputProps> = ({
  selectedValue,
  setSelectedValue,
  items,
  label,
  placeholder,
  scrollViewStyle,
  onpress,
  width = '100%', // Default width to 100%
  icon,
  height = 60,
}) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <View
      style={{
        width: width as any, // Use the width prop here
        borderWidth: 0.5,
        borderRadius: 8,
        height: height as any,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 12,
        position: 'relative',
        zIndex: isClicked ? -1 : 0,
      }}>
      <TouchableOpacity
        onPress={() => {
          setIsClicked(!isClicked);
          onpress && onpress();
        }}
        style={{
          flex: 1,
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        {icon && <View style={{marginRight: 10}}>{icon}</View>}
        <View
          style={{
            flex: 1,
          }}>
          {selectedValue === '' ? null : (
            <Text style={textStyles.bodyB4}>{label}</Text>
          )}
          <Text
            style={
              selectedValue === ''
                ? (textStyles.bodyB3 as StyleProp<TextStyle>)
                : [textStyles.headingH8, {color: 'black'}]
            }>
            {selectedValue === '' ? placeholder : selectedValue}
          </Text>
        </View>
        <View style={{marginHorizontal: 10}}>
          <Dropdown />
        </View>
      </TouchableOpacity>
      {isClicked && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[sharedScrollViewStyle, scrollViewStyle]}>
          {items.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{
                width: '100%',
                borderRadius: 8,
                height: 50,
                justifyContent: 'center',
                //marginVertical: 9,
              }}
              onPress={() => {
                setSelectedValue(item);
                setIsClicked(false);
              }}>
              <Text
                style={{fontWeight: 'bold', paddingLeft: 20, color: 'black'}}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default DropdownInput;
