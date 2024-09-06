import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import HeaderComponent from '../../../components/Header';
const {width, height} = Dimensions.get('window');

const LoanSummary = () => {
  const summaryData = [
    {
      desc: 'Loan ID',
      value: 'ABC12345',
    },
    {
      desc: 'Loan type',
      value: 'Crop loan',
    },
    {
      desc: 'Loan amount',
      value: '₹ 30,000',
    },
    {
      desc: 'Interest rate',
      value: '10%',
    },
    {
      desc: 'Loan term',
      value: '15 months',
    },
    {
      desc: 'Total amount',
      value: '₹ 38,000',
    },
    {
      desc: 'Disbursement date',
      value: '9 May 2024',
    },
    {
      desc: 'Maturity date',
      value: '9 Aug 2025',
    },
    {
      desc: 'Borrower name',
      value: 'Preshika Kumar',
    },
  ];
  const renderComponent = ({ item }: { item: { desc: string, value: string } }) => {
    return (
      <View style={styles.requestTextContainer}>
        <Text style={styles.desc}>{item.desc}</Text>
        <Text style={styles.value}>{item.value}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderComponent title="Loan summary" />
      <View style={{gap: 24, paddingHorizontal: 16}}>
        <View style={styles.requestContainer}>
          <FlatList
            data={summaryData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderComponent}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoanSummary;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  requestContainer: {
    width: '100%',
    height: 'auto',
    alignSelf: 'center',
    // borderColor: '#C1C4C2',
    // borderWidth: 1,
    borderRadius: 8,
    paddingLeft: '5%',
    paddingTop: '5%',
    zIndex: -2,
    backgroundColor: '#F7F7F7',
    // marginTop: 24,
  },
  requestTextContainer: {
    height: height * 0.045,
    flexDirection: 'row',
  },
  desc: {
    fontFamily: 'NotoSerif-Regular',
    color: '#1C1C1C',
    fontSize: 14,
    flex: 1,
    lineHeight: 16.8,
    width: '50%',
  },
  value: {
    fontFamily: 'Poppins-SemiBold',
    color: '#1C1C1C',
    fontSize: 14,
    flex: 1,
    lineHeight: 16.8,
    width: '50%',
  },
});
