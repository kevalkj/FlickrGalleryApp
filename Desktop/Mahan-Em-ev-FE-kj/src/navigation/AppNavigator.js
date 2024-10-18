import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Splash from '../screens/Splash';
import Intro from '../screens/Intro';
import Login from '../screens/Login';
import OTPScreen from '../screens/OTPScreen';
import PinScreen from '../screens/PinScreen';
import Homepage from '../screens/Homepage';
import ChooseLocation from '../screens/ChooseLocation';
import ChooseVehicle from '../screens/ChooseVehicle';
import AddMoney from '../screens/AddMoney';
import Wallet from '../screens/Wallet';
import SOSContacts from '../screens/SOSContacts';
import YourLastTrip from '../screens/YourLastTrip';
import ChatScreen from '../components/ChatScreen';
import CallScreen from '../components/CallScreen';
import DriverDetails from '../components/DriverDetails';
import EmergencyScreen from '../components/EmergencyScreen';
import SafetyAlert from '../components/AlertScreen';

import TrackingScreen from '../components/TrackingScreen';
import FeedBack from '../components/FeedBack';
import LocationAccess from '../screens/LocationAccess';
import MyProfile from '../screens/MyProfile';
import MyRides from '../screens/MyRides';
import CustomDrawer from './CustomeDrawer';
import Help from '../screens/Help';
import About from '../screens/About';
import LoadingScreen from '../components/LoadingScreen';
import DriverIdentifierScreen from '../components/DriverIdentifierScreen';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const DrawerScreens = () => (
  <Drawer.Navigator
    drawerContent={props => <CustomDrawer {...props} />}
    screenOptions={{
      headerShown: false,
      drawerPosition: 'right',
      drawerStyle: {
        backgroundColor: '#ffffff',
        width: '60%',
      },
    }}>
    <Drawer.Screen name="Home" component={Homepage} />
    <Drawer.Screen name="MyProfile" component={MyProfile} />
    <Drawer.Screen name="MyRides" component={MyRides} />
    <Drawer.Screen name="Wallet" component={Wallet} />
    <Drawer.Screen name="SOSContacts" component={SOSContacts} />
    <Drawer.Screen name="HelpSupport" component={FeedBack} />
    <Stack.Screen name="PinScreen" component={PinScreen} />
  </Drawer.Navigator>
);

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Intro"
          component={Intro}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LoadingScreen"
          component={LoadingScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DriverIdentifierScreen"
          component={DriverIdentifierScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OTPScreen"
          component={OTPScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PinScreen"
          component={PinScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LocationAccess"
          component={LocationAccess}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Drawer"
          component={DrawerScreens}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Help"
          component={Help}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="About"
          component={About}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Homepage"
          component={Homepage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChooseLocation"
          component={ChooseLocation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="YourLastTrip"
          component={YourLastTrip}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChooseVehicle"
          component={ChooseVehicle}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddMoney"
          component={AddMoney}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CallScreen"
          component={CallScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DriverDetails"
          component={DriverDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EmergencyScreen"
          component={EmergencyScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TrackingScreen"
          component={TrackingScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
