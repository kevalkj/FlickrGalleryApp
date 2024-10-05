import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "../screens/Splash";
import Intro from "../screens/Intro";
import Login from "../screens/Login";
import OTPScreen from "../screens/OTPScreen";
import PinScreen from "../screens/PinScreen";
import Homepage from "../screens/Homepage";
import ChooseLocation from "../screens/ChooseLocation";
import ChooseVehicle from "../screens/ChooseVehicle";
import AddMoney from "../screens/AddMoney";
import Wallet from "../screens/Wallet";
import MyProfile from "../screens/MyProfile";
import SOSContacts from "../screens/SOSContacts";
import YourLastTrip from "../screens/YourLastTrip";
import MyRides from "../screens/MyRides";
import LocationAccess from "../screens/LocationAccess";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import ChatScreen from "../components/ChatScreen";
import LoadingScreen from "../components/LoadingScreen";
import CallScreen from "../components/CallScreen";
import DriverDetails from "../components/DriverDetails";
import DriverIdentifierScreen from "../components/DriverIdentifierScreen";
import StartRideScreen from "../components/StartRideScreen";
import TrackingScreen from "../components/TrackingScreen";
import FeedBack from "../components/FeedBack";
import EmergencyScreen from "../components/EmergencyScreen";
import SafetyAlert from "../components/AlertScreen";


const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    );
  };
  

function DrawerNavigator(){
        return(
            <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            drawerPosition="right"  
            >
                <Drawer.Screen name="Homepage" component={Homepage}  options={{headerShown:false}} />
                <Drawer.Screen name="StartRideScreen" component={StartRideScreen}  options={{headerShown:false}} />
                <Drawer.Screen name="DriverIdentifierScreen" component={DriverIdentifierScreen}  options={{headerShown:false}} />
                <Drawer.Screen name="FeedBack" component={FeedBack}  options={{headerShown:false,drawerLabel: () => null}} />
                <Drawer.Screen name="TrackingScreen" component={TrackingScreen}  options={{headerShown:false}} />
                <Drawer.Screen name="LoadingScreen" component={LoadingScreen}  options={{headerShown:false}} />
                <Drawer.Screen name="My Profile" component={MyProfile} options={{headerShown:false}}/>
                <Stack.Screen name={'Wallet'}   component={Wallet} options={{headerShown:false}}/>
                <Stack.Screen name={'MyRides'}   component={MyRides} options={{headerShown:false}}/>
                <Stack.Screen name={'SOSContacts'}   component={SOSContacts} options={{headerShown:false}}/>
            </Drawer.Navigator>
        )
    }

const AppNavigator = () => {

    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={'Splash'}   component={Splash} options={{headerShown:false}}/>
                <Stack.Screen name={'Intro'}   component={Intro} options={{headerShown:false}}/>
                <Stack.Screen name={'Login'}   component={Login} options={{headerShown:false}}/>
                <Stack.Screen name={'OTPScreen'}   component={OTPScreen} options={{headerShown:false}}/>
                <Stack.Screen name={'PinScreen'}   component={PinScreen} options={{headerShown:false}}/>
                <Stack.Screen name={'LocationAccess'}   component={LocationAccess} options={{headerShown:false}}/>
                <Stack.Screen name={'Drawer'}   component={DrawerNavigator} options={{headerShown:false}}/>
                {/* <Stack.Screen name={'Homepage'}   component={Homepage} options={{headerShown:false}}/> */}
                <Stack.Screen name={'ChooseLocation'}   component={ChooseLocation} options={{headerShown:false}}/>
                <Stack.Screen name={'YourLastTrip'}   component={YourLastTrip} options={{headerShown:false}}/>
                <Stack.Screen name={'ChooseVehicle'}   component={ChooseVehicle} options={{headerShown:false}}/>
                <Stack.Screen name={'AddMoney'}   component={AddMoney} options={{headerShown:false}}/>                
                <Stack.Screen name={'SOSContacts'}   component={SOSContacts} options={{headerShown:false}}/>
                <Stack.Screen name={'ChatScreen'} component={ChatScreen} options={{ headerShown: false }} />
                <Stack.Screen name={'CallScreen'} component={CallScreen} options={{ headerShown: false }} />
                <Stack.Screen name={'DriverDetails'} component={DriverDetails} options={{ headerShown: false }} />
                <Stack.Screen name={'EmergencyScreen'} component={EmergencyScreen} options={{ headerShown: false }} />
                <Stack.Screen name={'FeedBack'} component={FeedBack} options={{ headerShown: false }} />
                <Stack.Screen name={'SafetyAlert'} component={SafetyAlert} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator;