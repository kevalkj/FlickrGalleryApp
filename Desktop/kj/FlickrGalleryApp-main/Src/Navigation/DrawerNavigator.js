import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../Screens/HomeScreen';
import SearchScreen from '../Screens/SearchScreen';
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Search" component={SearchScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default DrawerNavigator;
