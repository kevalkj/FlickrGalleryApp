import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import HomeHeader from '../../components/HomeHeader';
import NavBar from '../../components/NavBar';
import HomeMenu from '../../components/HomeMenu';
import HomeNotification from '../../components/HomeNotification';
import Dropdown from '../../assets/Dropdown';
import {BarChart} from 'react-native-gifted-charts';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../../types/navigationTypes';
import {DashboardData} from '../../service/api';
import Toast from 'react-native-toast-message';
import Layout from '../../layouts/layout';

const height = Dimensions.get('window').height;
type DashboardProps = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

// Bar should be config based on api response
const Dashboard: React.FC<DashboardProps> = ({navigation}) => {
  const variant = useSelector((state: RootState) => state.user.role);
  const width = Dimensions.get('window').width;
  const [data, setData] = useState([]);
  const [graphData, setGraphData] = useState([
    {value: 10},
    {value: 30},
    {value: 57},
  ]);
  const [menu, setMenu] = useState<boolean>(false);
  const [notification, setNotification] = useState<boolean>(false);
  const [range, setRange] = useState('Last 3 months');
  const [toggleRange, setToggleRange] = useState(false);
  const rangeOptions = [
    'Today',
    'This week',
    'This month',
    'Last 3 months',
    'Last 6 months',
    'Last 1 year',
  ];
  const dashboardOptions = [
    ['Current\nbookings', '#FFE4F2'],
    ['Total\nbookings', '#C8FFF5'],
    ['Total\ngoods', '#FFE3AC'],
    ['Pending\nrequests', '#FFE4F2'],
    ['Approved\nrequests', '#C8FFF5'],
    ['Rejected\nrequests', '#FFE3AC'],
  ];
  const handleMenu = () => {
    setMenu(!menu);
  };
  const handleNotification = () => {
    setNotification(!notification);
  };
  const handleToggleRange = () => {
    setToggleRange(!toggleRange);
  };
  // changing the content based on range functionality here
  const handleRange = (newRange: string) => {
    setRange(newRange);
    setToggleRange(!toggleRange);
  };
  const handleBookings = () => {
    navigation.navigate('MyBooking');
  };
  const renderDropdownOptions = (option: string) => {
    return (
      <TouchableOpacity
        style={styles.dropDownOptions}
        onPress={() => handleRange(option)}>
        <Text style={styles.dropDownText}>{option}</Text>
      </TouchableOpacity>
    );
  };
  const renderDashboardOptions = (options: string[], index: number) => {
    return (
      <View style={[styles.dashboardOption, {backgroundColor: options[1]}]}>
        <Text style={styles.dashboardOptionText}>{options[0]}</Text>
        <Text style={styles.dashboardOptionNumber}>{data[index]}</Text>
      </View>
    );
  };
  useEffect(() => {
    const getData = async () => {
      const temp = await DashboardData(range);
      setData(temp);
    };
    getData();
  }, [range]);
  return (
    <View style={styles.container}>
      <Layout>
        <ScrollView style={styles.container}>
          {variant === 'manager' && (
            <View style={styles.managerHeadContainer}>
              <HomeHeader
                menuCallBack={handleMenu}
                notificationCallBack={handleNotification}
                occupy={true}
              />
            </View>
          )}

          {variant === 'owner' && (
            <LinearGradient
              colors={['#E2FFD4', '#FFFAD2']}
              style={styles.ownerHeadContainer}>
              <HomeHeader
                menuCallBack={handleMenu}
                notificationCallBack={handleNotification}
                occupy={true}
              />
              <View style={styles.addWarehouseContainer}>
                <Text
                  style={[
                    {
                      textAlign: 'center',
                    },
                    styles.dropDownText,
                  ]}>
                  Adding 10 warehouses at once unlocks greater efficiency and
                  saves you 20% on your monthly plan.
                </Text>
                <TouchableOpacity
                  style={styles.addWarehouseButton}
                  onPress={() => {
                    navigation.navigate('AddWarehouse');
                  }}>
                  <Text style={styles.buttonText}>Add warehouse</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          )}

          <View style={styles.dashboardContainer}>
            {variant === 'user' && (
              <>
                <HomeHeader
                  menuCallBack={handleMenu}
                  notificationCallBack={handleNotification}
                />
                <Text style={styles.heading}>My bookings</Text>
              </>
            )}

            <View style={styles.dropDownContainer}>
              <Text style={styles.bookings}>Bookings</Text>
              <TouchableOpacity
                onPress={handleToggleRange}
                style={styles.dropDownButton}>
                <Text style={styles.dropDownText}>{range}</Text>
                <Dropdown />
              </TouchableOpacity>
              {toggleRange && (
                <View style={styles.dropDownOptionsContainer}>
                  {rangeOptions.map(option => renderDropdownOptions(option))}
                </View>
              )}
            </View>
            <View style={styles.dashboardOptionsContainer}>
              <View style={styles.dashboardOptionRowContainer}>
                {dashboardOptions
                  .splice(0, 3)
                  .map((option, index) =>
                    renderDashboardOptions(option, index),
                  )}
              </View>
              <View style={styles.dashboardOptionRowContainer}>
                {dashboardOptions
                  .splice(0, 3)
                  .map((option, index) =>
                    renderDashboardOptions(option, index + 3),
                  )}
              </View>
            </View>

            <View style={styles.graphContainer}>
              <BarChart
                data={graphData}
                height={height * 0.23}
                width={width * 0.7}
                rulesLength={width * 0.65}
                xAxisLabelTexts={['Feb', 'Mar', 'Apr']}
                xAxisLabelTextStyle={{color: 'black'}}
                xAxisColor={'transparent'}
                yAxisColor={'transparent'}
                noOfSections={6}
                yAxisTextStyle={{color: 'black'}}
                spacing={width * 0.15}
                barWidth={width * 0.06}
                frontColor={'#6AC1FF'}
                barBorderRadius={7}
                rulesType={'dashed'}
                disableScroll={true}
                disablePress={true}
                showValuesAsTopLabel={true}
                topLabelTextStyle={{color: 'black', fontSize: 10}}
                topLabelContainerStyle={{
                  width: 20,
                  aspectRatio: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              />
              <View style={styles.colorIndicator}>
                <View style={styles.colorIndicatorText}></View>
                <Text style={styles.dashboardOptionText}>Bookings in MT</Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <Modal visible={menu} transparent={true}>
          <HomeMenu exitCallBack={handleMenu} />
        </Modal>
        <Modal visible={notification} transparent={true}>
          <HomeNotification
            exitCallBack={handleNotification}
            Notification={[]}
          />
        </Modal>
      </Layout>
      <NavBar current={variant === 'user' ? 'Home' : 'Dashboard'} />
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {backgroundColor: 'white', height: '100%'},
  ownerHeadContainer: {
    width: '100%',
    height: height * 0.2,
    alignItems: 'center',
    marginBottom: height * 0.16,
    overflow: 'visible',
  },

  managerHeadContainer: {
    width: '100%',
    height: height * 0.2,
    alignItems: 'center',
    marginBottom: height * 0.01,
  },
  addWarehouseContainer: {
    borderWidth: 1,
    borderColor: 'rgba(206, 218, 229, 1)',
    width: '90%',
    height: '120%',
    zIndex: 200, // button
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10%',
    borderRadius: 10,
  },
  addWarehouseButton: {
    width: '60%',
    height: '40%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0C447D',
    borderRadius: 10,
    marginTop: 24,
  },
  heading: {
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
    fontSize: 20,
  },
  navigationButtonContainer: {
    flexDirection: 'row',
    width: '100%',
    height: height * 0.055,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  focusButton: {
    width: '47%',
    height: '100%',
    backgroundColor: '#0038FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  idleButton: {
    width: '47%',
    height: '100%',
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
    fontSize: 16,
  },
  buttonTextIdle: {
    fontFamily: 'Poppins-Regular',
    color: '#989E9A',
    fontSize: 16,
  },
  bookings: {color: 'black', fontSize: 18, fontFamily: 'Poppins-SemiBold'},
  dashboardContainer: {
    flexGrow: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  dropDownContainer: {
    height: height * 0.04,
    width: '100%',
    marginTop: 14,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
    paddingHorizontal: '4%',
    // zIndex: 100, // dropdown
  },
  dropDownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropDownText: {
    fontFamily: 'NotoSerif-Regular',
    color: 'black',
    fontSize: 14,
    marginRight: 8,
  },
  dropDownOptionsContainer: {
    backgroundColor: 'white',
    width: '50%',
    zIndex: 2,
    position: 'absolute',
    top: '110%',
    height: '760%',
    right: 0,
    marginRight: 10,
    paddingVertical: '5%',
    borderColor: '#989E9A',
    borderWidth: 1,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 5, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropDownOptions: {height: '16.66%', width: '80%', justifyContent: 'center'},
  dashboardOptionsContainer: {
    width: '100%',
    height: height * 0.3,
    paddingHorizontal: '4%',
    justifyContent: 'space-between',
    marginTop: 24,
    zIndex: -1,
  },
  dashboardOptionRowContainer: {
    width: '100%',
    height: '46%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dashboardOption: {
    width: '28.66%',
    height: '100%',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dashboardOptionText: {
    fontFamily: 'NotoSerif-Regular',
    color: 'black',
    fontSize: 14,
    textAlign: 'center',
  },
  dashboardOptionNumber: {
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
    fontSize: 16,
  },
  graphContainer: {
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#E0E1E1',
    width: '90%',
    padding: '5%',
    borderRadius: 10,
    marginBottom: 10,
  },
  colorIndicator: {
    flexDirection: 'row',
    width: '60%',
    alignItems: 'center',
    paddingHorizontal: '4%',
    marginTop: 3,
  },
  colorIndicatorText: {
    width: 16,
    aspectRatio: 1,
    backgroundColor: '#6AC1FF',
    marginRight: 5,
    borderRadius: 4,
  },
});
