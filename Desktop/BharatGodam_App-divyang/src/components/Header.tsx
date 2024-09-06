import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Back from '../assets/Back';
import {NavigationProp, useNavigation} from '@react-navigation/native';

interface HeaderComponentProps {
  component?: React.FC;
  title: string;
  onPressBack?: () => void;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({
  title,
  onPressBack,
  component: Component,
}) => {
  const navigation = useNavigation<NavigationProp<Record<string, object>>>();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          navigation.goBack();
        }}>
        <Back />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      {Component && <Component />}
      {/* Add any additional header content here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomColor: 'lightgray',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    top: '100%',
    transform: [{translateY: -12}], // Center vertically
  },
  title: {
    fontSize: 20,
    color: '#1C1C1C',
    fontWeight: 'bold',
    lineHeight: 24,
    letterSpacing: -1,
    fontFamily: 'Poppins',
  },
});

export default HeaderComponent;
