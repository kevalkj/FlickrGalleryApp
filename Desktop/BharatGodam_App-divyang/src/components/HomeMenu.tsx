import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ViewStyle,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import React, {ReactNode, useState} from 'react';
import User from '../assets/User';
import Cross from '../assets/Cross';
import MyBookings from '../assets/MyBookings';
import Loan from '../assets/Loan';
import WishList from '../assets/WishList';
import Invoices from '../assets/Invoices';
import Language from '../assets/Language';
import Logout from '../assets/Logout';
import Documents from '../assets/Documents';
import WeightBridge from '../assets/WeightBrigde';
import BookWarehouse from '../assets/BookWarehouse';
import Add from '../assets/Add';
import Deposite from '../assets/Deposite';
import Comodities from '../assets/Commodities';
import Dropdown from '../assets/Dropdown';
import Withdrawal from '../assets/Withdrawal';
import TransactionHistory from '../assets/TransactionHistory';
import WeightVerification from '../assets/WeigthVerification';
import AddManager from '../assets/AddManager';
import DashBoard from '../assets/DashBoard';
import {removeToken} from '../utils/auth';
import {useDispatch, useSelector} from 'react-redux';
import {setToken, setRole} from '../redux/slices/user';
import {updateLoggedIn} from '../redux/slices/user';
import {RootState} from '../redux/store';
import {useNavigation, NavigationProp} from '@react-navigation/native';

interface HomeMenuProps {
  exitCallBack: () => void;
}
interface TextStyle {
  fontFamily: string;
  color: string;
}

type voidFunction = () => void;
type MenuOption = [
  string,
  ReactNode?,
  ViewStyle?,
  TextStyle?,
  boolean?,
  string[]?,
  voidFunction[]?,
];
const {height} = Dimensions.get('window');
export default function HomeMenu(props: HomeMenuProps) {
  const dispatch = useDispatch();
  const variant = useSelector((state: RootState) => state.user.role);
  const name = useSelector((state: RootState) => state.user.name);
  const navigation = useNavigation<NavigationProp<Record<string, object>>>();
  const handleNavigation = async (route: any) => {
    props.exitCallBack();
    if (route === 'Log out') {
      await removeToken();
      dispatch(setToken(''));
      dispatch(setRole(''));
      dispatch(updateLoggedIn(false));
      navigation.navigate('LoginAs', {});
      return;
    }
    if (route === 'Withdrawal' && variant !== 'user') {
      console.log(1001);
      navigation.navigate('WithdrawalData', {});
      return;
    }

    if (route === 'Add warehouse') {
      navigation.navigate('AddWarehouse', {});
      return;
    }

    // if(route==='Book warehouse'){
    //   navigation.navigate('AddWarehouse',{});
    //   return;
    // }

    navigation.navigate(route, {});
  };

  const MenuOptions: MenuOption[] = [
    ['My Bookings', <MyBookings />, styles.shift1],
    ['Loan', <Loan />, styles.shift1],
    ['Wishlist', <WishList />, styles.shift1],
    ['Withdrawal', <Withdrawal />, styles.shift1],
    ['Invoices', <Invoices />, styles.shift2],
    ['Language', <Language />, styles.shift2],
    ['Log out', <Logout />, {}, styles.menuLogout],
  ];
  const MenuOwnerOptions: MenuOption[] = [
    ['Add warehouse', <Add />],
    ['Add Manager', <AddManager />, styles.shift2],
    ['Book warehouse', <BookWarehouse />, {}],
    ['Commodities', <Comodities />, {}],
    [
      'Weighbridge data',
      <WeightBridge />,
      {},
      {fontFamily: '', color: ''},
      true,
      ['New weighbridge data', 'Weighbridge details'],
    ],
    [
      'Deposit',
      <Deposite />,
      styles.shift2,
      {fontFamily: '', color: ''},
      true,
      ['New deposit', 'Pending transactions', 'Grading and expiry details'],
    ],
    ['Owner Dashboard', <DashBoard />, styles.shift1],
    //['Weight Verification',<WeightVerification/>,styles.shift1],
    ['Transition history', <TransactionHistory />, styles.shift2],
    ['Withdrawal', <Withdrawal />, styles.shift1],
    ['Invoices', <Invoices />, styles.shift2],
    ['Documents', <Documents />, styles.shift2],
    ['Log out', <Logout />, {}, styles.menuLogout],
  ];

  const MenuManagerOptions: MenuOption[] = [
    // ['Add warehouse', <Add />, {}],
    ['Book warehouse', <BookWarehouse />, {}],
    ['Commodities', <Comodities />, {}],
    [
      'Weighbridge data',
      <WeightBridge />,
      {},
      {fontFamily: '', color: ''},
      true,
      ['New weighbridge data', 'Weighbridge details'],
    ],
    [
      'Deposit',
      <Deposite />,
      styles.shift2,
      {fontFamily: '', color: ''},
      true,
      ['New deposit', 'Pending transactions', 'Grading and expiry details'],
    ],
    ['Owner Dashboard', <DashBoard />, styles.shift1],
    //['Weight Verification',<WeightVerification/>,styles.shift1],
    ['Withdrawal', <Withdrawal />, styles.shift1],
    ['Invoices', <Invoices />, styles.shift2],
    ['Documents', <Documents />, styles.shift2],
    ['Log out', <Logout />, {}, styles.menuLogout],
  ];
  return (
    <SafeAreaView style={styles.menuContainer}>
      <View style={styles.menu}>
        {variant === 'user' && (
          <>
            <View style={styles.menuHeaderContainer}>
              <View style={styles.menuHeader}>
                <View style={styles.menuHeaderButton}>
                  <User />
                  <Text style={styles.menuHeaderText}>{name}</Text>
                </View>
                <TouchableOpacity onPress={props.exitCallBack}>
                  <Cross />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.menus}>
              {MenuOptions.map(item => {
                const logout =
                  item[3] === styles.menuLogout ? styles.menuLogout : {};
                return (
                  <>
                    <TouchableOpacity
                      style={[styles.menuOptions, item[2]]}
                      onPress={() => handleNavigation(item[0])}>
                      {item[1]}
                      <Text style={[styles.menuOptionText, logout]}>
                        {item[0]}
                      </Text>
                    </TouchableOpacity>
                  </>
                );
              })}
            </View>
          </>
        )}
        {variant === 'owner' && (
          <>
            <View style={styles.menuHeaderOwner}>
              <TouchableOpacity onPress={props.exitCallBack}>
                <Cross width={32} height={32} />
              </TouchableOpacity>
            </View>

            <View style={styles.ownerNamePhotoContainer}>
              <View style={styles.ownerPhotoContainer} />
              <Text style={styles.ownerName}>{name}</Text>
            </View>
            <ScrollView contentContainerStyle={styles.menus}>
              {MenuOwnerOptions.map(item => {
                const logout =
                  item[3] == styles.menuLogout ? styles.menuLogout : {};
                const [visible, setVisible] = useState<boolean>(false);

                return (
                  <>
                    <TouchableOpacity
                      style={[styles.menuOptions, item[2]]}
                      onPress={() => {
                        setVisible(!visible);
                        !item[4] && handleNavigation(item[0]);
                      }}>
                      {item[1]}
                      <Text style={[styles.menuOptionText, logout]}>
                        {item[0]}
                      </Text>
                      {item[4] && <Dropdown />}
                    </TouchableOpacity>
                    {visible &&
                      item[4] &&
                      item[5]?.map(item => (
                        <TouchableOpacity
                          style={styles.dropDownOption}
                          onPress={() => handleNavigation(item)}>
                          <Text style={[styles.menuOptionText, {flexGrow: 0}]}>
                            {item}
                          </Text>
                        </TouchableOpacity>
                      ))}
                  </>
                );
              })}
            </ScrollView>
          </>
        )}

        {variant === 'manager' && (
          <>
            <View style={styles.menuHeaderOwner}>
              <TouchableOpacity onPress={props.exitCallBack}>
                <Cross width={32} height={32} />
              </TouchableOpacity>
            </View>

            <View style={styles.ownerNamePhotoContainer}>
              <View style={styles.ownerPhotoContainer} />
              <Text style={styles.ownerName}>{name}</Text>
            </View>
            <ScrollView contentContainerStyle={styles.menus}>
              {MenuManagerOptions.map(item => {
                const logout =
                  item[3] == styles.menuLogout ? styles.menuLogout : {};
                const [visible, setVisible] = useState<boolean>(false);

                return (
                  <>
                    <TouchableOpacity
                      style={[styles.menuOptions, item[2]]}
                      onPress={() => {
                        setVisible(!visible);
                        !item[4] && handleNavigation(item[0]);
                      }}>
                      {item[1]}
                      <Text style={[styles.menuOptionText, logout]}>
                        {item[0]}
                      </Text>
                      {item[4] && <Dropdown />}
                    </TouchableOpacity>
                    {visible &&
                      item[4] &&
                      item[5]?.map(item => (
                        <TouchableOpacity
                          style={styles.dropDownOption}
                          onPress={() => handleNavigation(item)}>
                          <Text style={[styles.menuOptionText, {flexGrow: 0}]}>
                            {item}
                          </Text>
                        </TouchableOpacity>
                      ))}
                  </>
                );
              })}
            </ScrollView>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    flex: 1,
  },
  menu: {
    backgroundColor: 'white',
    height: '100%',
    width: '75%',
  },
  menuHeaderContainer: {
    width: '100%',
    height: '10%',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuHeader: {
    width: '90%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuHeaderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
  },
  menuHeaderText: {
    flex: 1,
    fontFamily: 'NotoSerif-Regular',
    color: 'black',
    textAlign: 'center',
    alignSelf: 'center',
  },
  menus: {
    alignItems: 'center',
    paddingTop: '8%',
  },
  menuOptions: {
    width: '80%',
    height: height * 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '3%',
  },
  menuLogout: {
    fontFamily: 'NotoSerif-Regular',
    color: '#CC0000',
  },
  menuOptionText: {
    fontFamily: 'NotoSerif-Regular',
    color: 'black',
    paddingLeft: '5%',
    paddingRight: '10%',
    flexGrow: 1,
  },
  shift1: {
    paddingLeft: '1%',
  },
  shift2: {
    paddingLeft: '1.5%',
  },
  menuHeaderOwner: {
    width: '100%',
    height: '5%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingTop: '5%',
  },
  ownerNamePhotoContainer: {
    width: '80%',
    height: '13%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  ownerPhotoContainer: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 100,
    backgroundColor: 'black',
    marginRight: '5%',
  },
  ownerName: {
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
  },
  dropDownOption: {
    width: '78%',
    height: height * 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '3%',
    borderLeftWidth: 1,
    borderColor: 'grey',
    marginLeft: '10%',
  },
});
