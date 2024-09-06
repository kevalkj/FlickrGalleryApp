import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native-gesture-handler';
// Assuming you're using Ionicons for the back button

import LoginMain from '../login_signup/LoginMain';
import LoginMobScreen from '../login_signup/LoginMobScreen';
import LoginOTPScreen from '../login_signup/LoginOTPScreen';
import LoginScreen from '../login_signup/LoginEmailScreen';
import SignUpMob from '../login_signup/SignUpMob';
import Register from '../login_signup/Finish_creating_account';

// Define the type for navigation props
type RootStackParamList = {
  SignupMob: undefined;
  LoginAs: undefined;
  LoginMob: undefined;
  LoginOTP: undefined;
  Login: undefined;
  FinishCreatingAccount: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const LoginNavigation: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="LoginOTP">
      <Stack.Screen
        name="SignupMob"
        component={SignUpMob}
        options={{
          headerTitle: 'Create Account',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                console.log('go back');
              }}>
              {/* <Ionicons name="arrow-back" size={24} color="black" /> */}
            </TouchableOpacity>
          ),
        }}
      />
      {/* Add similar styling options for other screens */}
      <Stack.Screen name="LoginAs" component={LoginMain} />
      <Stack.Screen name="LoginMob" component={LoginMobScreen} />
      <Stack.Screen name="LoginOTP" component={LoginOTPScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="FinishCreatingAccount" component={Register} />
    </Stack.Navigator>
  );
};

export default LoginNavigation;
