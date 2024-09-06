// UserStack.tsx
import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SearchWarehouse from '../warehouseFarmer/SearchWarehouse';
import SearchResult from '../warehouseFarmer/SearchResult';
import WarehouseDetails from '../warehouseFarmer/WarehouseDetails';
import Filter from '../warehouseFarmer/Filter';
import KycFarmer from '../warehouseFarmer/KycFarmer';
import Profile from '../warehouseFarmer/Profile';
import BookWarehouse from '../warehouseFarmer/BookWarehouse';
import MyBooking from '../warehouseFarmer/MyBooking';
import CancelBooking from '../warehouseFarmer/CancelBooking';
import AcceptedBookingDetails from '../warehouseFarmer/AcceptedBookingDetails';
import RejectedBookingDetails from '../warehouseFarmer/RejectedBookingDetails';
import Dashboard from '../warehouseFarmer/Dashboard';
import WarehouseDetailsOwner from '../WarehouseOwner/WarehouseDetailsOwner';
import Warehouse from '../WarehouseOwner/Warehouse';
import KycOwner from '../WarehouseOwner/KycOwner';
import AddWarehouse from '../WarehouseOwner/AddWarehouse';
import ParentComponent from '../Test';
import ViewDetail from '../WarehouseOwner/ViewDetail';
import WOBookWarehouse from '../WarehouseOwner/WOBookWarehouse';
import Bookings from '../WarehouseOwner/Bookings';
import Action from '../WarehouseOwner/Action';
import Reasons from '../WarehouseOwner/Reasons';
import {RootStackParamList} from '../../types/navigationTypes';
import {getName, getRole, getToken} from '../../utils/auth';
import {ActivityIndicator} from 'react-native-paper';
import NewDeposit from '../WarehouseOwner/NewDeposit';
import PendingTransitions from '../WarehouseOwner/PendingTransitions';
import Grading from '../WarehouseOwner/Grading';
import GradingDetails from '../WarehouseOwner/GradingDetails';
import WithdrawalData from '../WarehouseOwner/WithdrawalData';
import WeighbridgeDetails from '../WarehouseOwner/WeighbridgeDetails';
import {
  updateLoggedIn,
  setRole,
  setToken,
  setName,
} from '../../redux/slices/user';
import {useDispatch} from 'react-redux';
import WarehouseOwner from '../WarehouseOwner/OwnerDashboard';
import WeightVerification from '../WarehouseOwner/WeightVerification';
import WeightBridgeData from '../WarehouseOwner/WeightBridgeData';
import Search from '../../assets/Search';
import Withdrawal from '../warehouseFarmer/Withdrawal';
import EditManager from '../WarehouseOwner/EditManager';
import ListManager from '../WarehouseOwner/ListManager';
import TransitionScreen from '../warehouseFarmer/TransitionScreen';
import CommodityDetails from '../WarehouseOwner/Commodities';
import Languages from '../warehouseFarmer/Languages';
import Loan from '../warehouseFarmer/PostHarvestLoanFacility/Loan';
import ApplyLoan from '../warehouseFarmer/PostHarvestLoanFacility/ApplyLoan';
import LoanSummary from '../warehouseFarmer/PostHarvestLoanFacility/LoanSummary';
import LoanStatus from '../warehouseFarmer/PostHarvestLoanFacility/LoanStatus';

const Stack = createStackNavigator<RootStackParamList>();

const UserStack = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const role = await getRole();
        const token = await getToken();
        const name = await getName();
        dispatch(updateLoggedIn(true));
        dispatch(setRole(role));
        dispatch(setToken(token));
        dispatch(setName(name));
      } catch (error) {
        console.error('Error fetching data', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    // Render a loading indicator or any placeholder while waiting for initialRoute
    return <ActivityIndicator style={{flex: 1}} />;
  }

  return (
    <Stack.Navigator
      initialRouteName={'Dashboard'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="SearchWarehouse" component={SearchWarehouse} />
      <Stack.Screen name="SearchResult" component={SearchResult} />
      <Stack.Screen name="WarehouseDetails" component={WarehouseDetails} />
      <Stack.Screen name="Warehouse" component={Warehouse} />
      <Stack.Screen
        name="WarehouseDetailOwner"
        component={WarehouseDetailsOwner}
      />
      <Stack.Screen name="Filter" component={Filter} />
      <Stack.Screen name="KycFarmer" component={KycFarmer} />
      <Stack.Screen name="KycOwner" component={KycOwner} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="BookWarehouse" component={BookWarehouse} />
      <Stack.Screen name="WOBookWarehouse" component={WOBookWarehouse} />
      <Stack.Screen name="MyBooking" component={MyBooking} />
      <Stack.Screen name="CancelBooking" component={CancelBooking} />
      <Stack.Screen
        name="AcceptedBookingDetails"
        component={AcceptedBookingDetails}
      />
      <Stack.Screen
        name="RejectedBookingDetails"
        component={RejectedBookingDetails}
      />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="AddWarehouse" component={AddWarehouse} />
      <Stack.Screen name="ViewDetails" component={ViewDetail} />
      <Stack.Screen name="Test" component={ParentComponent} />
      <Stack.Screen name="Bookings" component={Bookings} />
      <Stack.Screen name="Action" component={Action} />
      <Stack.Screen name="Reasons" component={Reasons} />
      <Stack.Screen name="New deposit" component={NewDeposit} />
      <Stack.Screen
        name="Pending transactions"
        component={PendingTransitions}
      />
      <Stack.Screen name="Grading" component={Grading} />
      <Stack.Screen
        name="Grading and expiry details"
        component={GradingDetails}
      />
      <Stack.Screen name="Withdrawal" component={Withdrawal} />
      <Stack.Screen name="WithdrawalData" component={WithdrawalData} />
      <Stack.Screen name="Weighbridge details" component={WeighbridgeDetails} />
      <Stack.Screen name="New weighbridge data" component={WeightBridgeData} />
      {/* <Stack.Screen name="Owner Dashboard" component={WarehouseOwner} /> */}
      <Stack.Screen name="Weight Verification" component={WeightVerification} />
      <Stack.Screen name="Add Manager" component={EditManager} />
      <Stack.Screen name="ListManager" component={ListManager} />
      <Stack.Screen name="Transition history" component={TransitionScreen} />
      <Stack.Screen name="Commodities" component={CommodityDetails} />
      <Stack.Screen name="Language" component={Languages} />
      <Stack.Screen name="Loan" component={Loan} />
      <Stack.Screen name="ApplyLoan" component={ApplyLoan} />
      <Stack.Screen name="LoanStatus" component={LoanStatus} />
      <Stack.Screen name="LoanSummary" component={LoanSummary} />
    </Stack.Navigator>
  );
};

export default UserStack;
