// AuthStack.tsx
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginMobScreen from '../login_signup/LoginMobScreen';
import LoginOTPScreen from '../login_signup/LoginOTPScreen';
import LoginScreen from '../login_signup/LoginEmailScreen';
import WelcomeBGScreen from '../login_signup/WelcomeBGScreen';
import SignUpMob from '../login_signup/SignUpMob';
import Register from '../login_signup/Finish_creating_account';
import ChooseRoleScreen from '../login_signup/Select_role';
import SignUpEmail from '../login_signup/SignUpEmail';
import VerifyEmail from '../login_signup/VerifyEmail';
import FinishWithEmail from '../login_signup/FinishCreatingAccountEmail';
import VerifyMob from '../login_signup/VerifyMob';
import ResetOtp from '../login_signup/ResetOtp';
import ResetPassword from '../login_signup/ResetPassword';
import ResetAndLogin from '../login_signup/ResetAndLogin';
import Dashboard from '../warehouseFarmer/Dashboard';

import {RootStackParamList} from '../../types/navigationTypes';

const Stack = createStackNavigator<RootStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="LoginAs"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="LoginAs" component={WelcomeBGScreen} />
      <Stack.Screen name="LoginMob" component={LoginMobScreen} />
      <Stack.Screen name="LoginOTP" component={LoginOTPScreen} />
      <Stack.Screen name="LoginEmail" component={LoginScreen} />
      <Stack.Screen name="FinishCreatingAccountPhone" component={Register} />
      <Stack.Screen
        name="FinishCreatingAccountEmail"
        component={FinishWithEmail}
      />
      <Stack.Screen name="SelectRole" component={ChooseRoleScreen} />
      <Stack.Screen name="SignupMob" component={SignUpMob} />
      <Stack.Screen name="SignupEmail" component={SignUpEmail} />
      <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
      <Stack.Screen name="VerifyMob" component={VerifyMob} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="ResetOtp" component={ResetOtp} />
      <Stack.Screen name="ResetAndLogin" component={ResetAndLogin} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
    </Stack.Navigator>
  );
};

export default AuthStack;
