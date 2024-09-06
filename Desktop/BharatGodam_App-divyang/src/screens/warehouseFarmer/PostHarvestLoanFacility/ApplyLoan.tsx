import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import HeaderComponent from '../../../components/Header';
import textStyles from '../../../components/textStyles';
import {Checkbox} from 'react-native-paper';
import CustomInputText from '../../../components/CustomInputText';
import CustomButton from '../../../components/CustomButton';

const {width, height} = Dimensions.get('window');

const ApplyLoan = () => {
  const [isClickedBookingId, setIsClickedBookingId] = useState<
    boolean | undefined
  >(false);
  const [SelectedBookingId, setSelectedBookingId] = useState<string>('');
  const [selectedBanks, setSelectedBanks] = useState<string[]>([]);
  const [estimatedLoanAmount, setEstimatedLoanAmount] = useState('');

  const heading = [
    'Warehouse name',
    'Commodity',
    'Start date',
    'End date',
    'Total weight',
    'Total actual weight',
    'Total no of bags',
    'Bag size',
    'KYC verification',
  ];
  const banks = [
    {id: '1', name: 'State Bank of India (SBI)'},
    {id: '2', name: 'Bank of Baroda'},
    {id: '3', name: 'Punjab National Bank (PNB)'},
    {id: '4', name: 'Bank of Maharashtra'},
    {id: '5', name: 'Canara Bank'},
    {id: '6', name: 'ICICI Bank'},
    {id: '7', name: 'Bank of India'},
    {id: '8', name: 'Central Bank of India'},
  ];
  const handleSelected = async (item: string) => {
    setSelectedBookingId(item);
    setIsClickedBookingId(!isClickedBookingId);
  };
  const handleSelectBank = (bankName: string) => {
    setSelectedBanks(prevSelectedBanks => {
      if (prevSelectedBanks.includes(bankName)) {
        // Remove bank if already selected
        return prevSelectedBanks.filter(name => name !== bankName);
      } else {
        // Add bank to selected list
        return [...prevSelectedBanks, bankName];
      }
    });
    console.log(selectedBanks);
  };
  const Booking_ID = [
    {booking_ID: '#78877'},
    {booking_ID: '#78878'},
    {booking_ID: '#78879'},
    {booking_ID: '#78880'},
    {booking_ID: '#88877'},
    {booking_ID: '#18877'},
    {booking_ID: '#68877'},
  ];

  const renderText = (item: string, index: number) => {
    return (
      <View style={styles.requestTextContainer}>
        <Text style={styles.desc}>{item}</Text>
        <Text style={styles.value}>hello</Text>
      </View>
    );
  };

  const allFieldsFilled =
    SelectedBookingId !== '' &&
    selectedBanks.length > 0 &&
    estimatedLoanAmount !== '';

  const handleSendRequest = () => {};

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderComponent title="Apply loan" />
      <View style={{gap: 24, paddingHorizontal: 16}}>
        <View>
          <TouchableOpacity
            style={{
              borderWidth: 0.5,
              width: '100%',
              borderRadius: 8,
              height: 56,
              paddingLeft: 9.5,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => {
              setIsClickedBookingId(!isClickedBookingId);
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 6,
              }}>
              <View>
                {SelectedBookingId == '' ? null : (
                  <Text style={textStyles.bodyB4}>Booking ID</Text>
                )}
                <Text
                  style={
                    SelectedBookingId == ''
                      ? textStyles.bodyB3
                      : [textStyles.headingH8, {color: 'black'}]
                  }>
                  {SelectedBookingId == '' ? 'Booking ID' : SelectedBookingId}
                </Text>
              </View>
              <View
                style={{
                  marginRight: 6,
                }}>
                <Image
                  source={require('../../../assets/images/DropDown.png')}
                />
              </View>
            </View>
          </TouchableOpacity>
          {isClickedBookingId ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.commodityScrollView}>
              {Booking_ID.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    width: '100%',
                    borderRadius: 8,
                    height: 50,
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    handleSelected(item.booking_ID);
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      paddingLeft: 20,
                      color: 'black',
                    }}>
                    {item.booking_ID}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          ) : (
            <></>
          )}
        </View>
        {/* {bookingDetails.length > 0 && (
          <View style={styles.requestContainer}>
            {heading.map((item, index) => renderText(item, index))}
          </View>
        )} */}
        <Text style={[textStyles.headingH7, {color: '#1C1C1C', zIndex: -5}]}>
          Select pledge
        </Text>
        <View style={styles.container}>
          <ScrollView>
            {banks.map(bank => (
              <View key={bank.id} style={styles.bankContainer}>
                <Checkbox
                  status={
                    selectedBanks.includes(bank.name) ? 'checked' : 'unchecked'
                  }
                  onPress={() => handleSelectBank(bank.name)}
                />
                <Text style={[textStyles.bodyB3, {color: '#08090A'}]}>
                  {bank.name}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={styles.inputWrapper}>
          <CustomInputText
            PlaceHolder="Estimated loan amount"
            txt={estimatedLoanAmount}
            onTextChange={setEstimatedLoanAmount}
            keyboard="numeric"
          />
        </View>
        <CustomButton
          role="iButton"
          text="Send request"
          txtcolor="#FFFFFF"
          bgcolor="#0C447D"
          borderColor="#0C447D"
          onPress={handleSendRequest}
          disabled={!allFieldsFilled}
        />
      </View>
    </SafeAreaView>
  );
};

export default ApplyLoan;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  commodityScrollView: {
    backgroundColor: 'white',
    width: '100%',
    zIndex: 10,
    position: 'absolute',
    top: '105%',
    // left: '4.8%',
    // height: 228,
    borderWidth: 0.5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 5, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  container: {
    paddingHorizontal: 12,
    zIndex: -5,
  },
  bankContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  inputWrapper: {
    marginVertical: '2%',
    borderWidth: 1,
    borderRadius: 7,
    borderColor: '#707371',
    zIndex: -5,
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
  },
  value: {
    fontFamily: 'Poppins-SemiBold',
    color: '#1C1C1C',
    fontSize: 14,
    flex: 1,
    lineHeight: 16.8,
  },
});
