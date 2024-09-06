import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Profile from '../assets/Profile';
import Warehouse from '../assets/Warehouse';
import Home from '../assets/Home';
import MyBookings from '../assets/MyBookings';
import DashBoard from '../assets/DashBoard';
import {RootState} from '../redux/store';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {useSelector} from 'react-redux';

interface NavBarProps {
  current: string;
}

export default function NavBar(props: NavBarProps) {
  const variant = useSelector((state: RootState) => state.user.role);
  const navigation = useNavigation<NavigationProp<Record<string, object>>>();
  const handleNavigation = (route: any) => {
    console.log(route);
    if (route === 'Home' && variant === 'user') {
      navigation.navigate('Dashboard', {});
      return;
    }
    if (route === 'Warehouse' && variant === 'user') {
      navigation.navigate('SearchWarehouse', {});
      return;
    }
    navigation.navigate(route, {});
  };
  const returnNavigationFunction = (route: string) => {
    console.log(route);
    if (props.current !== route) {
      return handleNavigation(route);
    }
  };
  const navElements = [
    variant === 'user' ? [Home, 'Home'] : [DashBoard, 'Dashboard'],
    [Warehouse, 'Warehouse'],
    variant === 'user' ? [MyBookings, 'MyBooking'] : [MyBookings, 'Bookings'],
    [Profile, 'Profile'],
  ];
  const renderNavBar = (navElement: any) => {
    const Icon = navElement[0];
    const condition = props.current == navElement[1];
    return (
      <TouchableOpacity
        style={styles.navbarElement}
        disabled={condition}
        onPress={() => returnNavigationFunction(navElement[1])}>
        <Icon selected={condition} filled={condition} />
        <Text style={condition ? styles.navTextCurrent : styles.navText}>
          {navElement[1]}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.navbarContainer}>
      {navElements.map(item => renderNavBar(item))}
    </View>
  );
}

const styles = StyleSheet.create({
  navbarContainer: {
    width: '100%',
    height: '10%',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ECECEC',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navbarElement: {
    flex: 1,
    height: '65%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navTextCurrent: {
    color: '#0C447D',
    fontFamily: 'NotoSerif-Regular',
  },
  navText: {
    color: '#545554',
    fontFamily: 'NotoSerif-Regular',
  },
});
