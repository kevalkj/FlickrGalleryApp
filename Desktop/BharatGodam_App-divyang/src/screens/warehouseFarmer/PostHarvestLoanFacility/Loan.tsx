import {
  Dimensions,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import HomeHeader from '../../../components/HomeHeader';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import HomeMenu from '../../../components/HomeMenu';
import HomeNotification from '../../../components/HomeNotification';
import {Image} from 'react-native';
import ApplyLoan from '../../../assets/applyloan';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const Loan = () => {
  const navigation = useNavigation();
  const [menu, setMenu] = useState<boolean>(false);
  const [notification, setNotification] = useState<boolean>(false);
  const appliedForLoan = true;
  const handleMenu = () => {
    setMenu(!menu);
  };
  const handleNotification = () => {
    setNotification(!notification);
  };

  const tabsData = [
    {
      title: 'Apply loan',
      desc: 'Fast and easy loan application',
      icon: <ApplyLoan />,
      image: '',
      bgColor: '#E1EEFF',
      navigateTo: 'ApplyLoan',
    },
    {
      title: 'Loan summary',
      desc: 'Loan installment details',
      icon: <ApplyLoan />,
      image: '',
      bgColor: '#FFF4BF',
      navigateTo: 'LoanSummary',
    },
    {
      title: 'Loan status',
      desc: 'Track your loan',
      icon: <ApplyLoan />,
      image: '',
      bgColor: '#E3CAFF',
      navigateTo: 'LoanStatus',
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        <LinearGradient
          colors={['#F1D2FF', '#D4FAFF']}
          style={styles.headContainer}>
          {Platform.OS === 'ios' && (
            <View
              style={{
                height: 30,
                width: '100%',
              }}
            />
          )}
          <HomeHeader
            menuCallBack={handleMenu}
            notificationCallBack={handleNotification}
            occupy={true}
          />
          <>
            {!appliedForLoan ? (
              <View
                style={[
                  styles.applyLoanContainer,
                  {backgroundColor: 'transparent'},
                ]}>
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.bodyBoldB2}>
                    {
                      '"Apply for an agricultural \nloan with a low interest \nrate."'
                    }
                  </Text>
                  <TouchableOpacity
                    style={styles.applyLoanButton}
                    onPress={() => {
                      navigation.navigate('ApplyLoan');
                    }}>
                    <Text style={styles.buttonText}>Apply loan</Text>
                  </TouchableOpacity>
                </View>
                <Image source={require('../../../assets/images/loan1.png')} />
              </View>
            ) : (
              <>
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={[styles.tabTitle, {fontSize: 20, lineHeight: 24}]}>
                    ₹ 2,000
                  </Text>
                  <Text style={styles.bodyText}>
                    {
                      'You have to pay the loan amount \nbefore 5th of this month'
                    }
                  </Text>
                  <TouchableOpacity
                    style={styles.applyLoanButton}
                    onPress={() => {
                      navigation.navigate('LoanSummary');
                    }}>
                    <Text style={styles.buttonText}>View details</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </>
        </LinearGradient>

        <View style={styles.tabsContainer}>
          {tabsData.map(tab => (
            <TouchableOpacity
              activeOpacity={0.2}
              style={[styles.tabs, {backgroundColor: tab.bgColor}]}
              onPress={() => navigation.navigate(tab.navigateTo)}>
              <ApplyLoan />
              <Text style={styles.tabTitle}>{tab.title}</Text>
              <Text style={styles.bodyText}>{tab.desc}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <Modal visible={menu} transparent={true}>
        <HomeMenu exitCallBack={handleMenu} />
      </Modal>
      <Modal visible={notification} transparent={true}>
        <HomeNotification exitCallBack={handleNotification} Notification={[]} />
      </Modal>
    </View>
  );
};

export default Loan;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
  },
  buttonText: {
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
    fontSize: 16,
  },
  applyLoanButton: {
    width: 152,
    height: 48,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0C447D',
    borderRadius: 10,
    marginTop: 24,
  },
  dropDownText: {
    fontFamily: 'NotoSerif-Regular',
    color: 'black',
    fontSize: 14,
    marginRight: 8,
  },
  applyLoanContainer: {
    // padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    width: '80%',
  },
  headContainer: {
    width: '100%',
    height: height * 0.4,
    alignItems: 'center',
    // marginBottom: height * 0.16,
    overflow: 'visible',
  },
  bodyBoldB2: {
    fontFamily: 'NotoSerif-Regular',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabs: {
    width: '46%',
    height: '55%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#C1C4C2',
  },
  tabsContainer: {
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    paddingVertical: 30,
    justifyContent: 'space-between',
  },
  tabTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 16.8,
    letterSpacing: -0.02,
    textAlign: 'left',
  },
  bodyText: {
    fontFamily: 'NotoSerif-Regular',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    textAlign: 'left',
  },
});
