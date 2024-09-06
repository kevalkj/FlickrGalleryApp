import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Menu from '../assets/Menu';
import SvgComponent from '../assets/Notification';
import MobileLogo from '../assets/MobileLogo';

interface HeaderProps {
  menuCallBack: () => void;
  notificationCallBack: () => void;
  occupy?: true;
}
const HomeHeader = (props: HeaderProps) => {
  return (
    <View style={[styles.container, {height: props.occupy ? '25%' : '5%'}]}>
      <TouchableOpacity onPress={props.menuCallBack}>
        <Menu />
      </TouchableOpacity>
      <MobileLogo />
      <TouchableOpacity onPress={props.notificationCallBack}>
        <SvgComponent />
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    margin: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '3%',
    alignItems: 'center',
  },
});
