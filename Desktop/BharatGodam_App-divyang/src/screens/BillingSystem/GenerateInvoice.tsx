import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import HeaderComponent from '../../components/Header';
import CustomInputText from '../../components/CustomInputText';

const {width, height} = Dimensions.get('window');

const GenerateInvoice = () => {
  const [servicecost, setServicecost] = useState('');
  const [fumigationCharge, setFumigationCharge] = useState('');
  const [expiryDateMonitoringChange, setExpiryDateMonitoringChange] =
    useState('');
  const handleGenerateInvoice = async () => {};

  const invoiceData = [
    {
      key: 'Customer name',
      value: 'Preshika Kumar',
    },
    {
      key: 'Commodity',
      value: 'Wheat',
    },
    {
      key: 'Requested capacity',
      value: '10 MT',
    },
    {
      key: 'Start date',
      value: '21 Mar, Mon',
    },
    {
      key: 'End date',
      value: '21 Mar, Mon',
    },
    {
      key: 'Storage duration',
      value: '30 days',
    },
    {
      key: 'Storage cost',
      value: '₹ 3,660',
    },
    {
      key: 'Transportation charge',
      value: '₹ 100',
    },
    {
      key: 'Past payment',
      value: '₹ 2,500',
    },
    {
      key: 'Pending amount',
      value: '₹ 2,500',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent title={'Generate invoice'} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flexContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled">
          <View style={styles.contentWrapper}>
            <View style={styles.bookingIdContainer}>
              <Text style={styles.bookingIdText}>Booking ID</Text>
              <Text style={styles.bookingId}>#244465</Text>
            </View>
            <View style={styles.invoiceContainer}>
              <View style={{marginVertical: 12}}>
                {invoiceData.map((invoice, index) => (
                  <View key={index} style={styles.invoiceRow}>
                    <View style={{flex: 1, width: '100%', marginRight: 26}}>
                      <Text style={styles.invoice}>{invoice.key}</Text>
                    </View>
                    <View style={{flex: 1, width: '100%'}}>
                      <Text
                        style={[
                          styles.invoice,
                          {fontFamily: 'Poppins-SemiBold'},
                        ]}>
                        {invoice.value}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.inputWrapper}>
              <CustomInputText
                PlaceHolder="Service cost"
                txt={servicecost}
                onTextChange={setServicecost}
                keyboard="numeric"
              />
            </View>
            <View style={styles.inputWrapper}>
              <CustomInputText
                PlaceHolder="Fumigation charge"
                txt={fumigationCharge}
                onTextChange={setFumigationCharge}
                keyboard="numeric"
              />
            </View>
            <View style={styles.inputWrapper}>
              <CustomInputText
                PlaceHolder="Expiry date monitoring charge"
                txt={expiryDateMonitoringChange}
                onTextChange={setExpiryDateMonitoringChange}
                keyboard="numeric"
              />
            </View>

            <View style={styles.buttonModalContainer}>
              <TouchableOpacity
                style={[styles.reject, {borderColor: '#989E9A'}]}
                activeOpacity={0.7}>
                <Text style={[styles.rejectText, {color: '#07294B'}]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.accept, {backgroundColor: '#0C447D'}]}
                activeOpacity={0.7}>
                <Text style={[styles.acceptText, {color: '#FFFFFF'}]}>
                  Generate invoice
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default GenerateInvoice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flexContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  contentWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  bookingIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width / 2,
    marginBottom: 14,
  },
  bookingIdText: {
    color: '#1C1C1C',
    fontFamily: 'NotoSerif-Regular',
    fontSize: 16,
    lineHeight: 24,
    marginVertical: 6,
  },
  bookingId: {
    color: '#1C1C1C',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    lineHeight: 19.2,
    marginVertical: 6,
  },
  invoiceContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderColor: '#C1C4C2',
    borderWidth: 1,
    width: width * 0.91,
    paddingHorizontal: 14,
    paddingVertical: 2,
    marginBottom: 18,
  },
  invoiceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginVertical: 4,
    width: '100%',
  },
  invoice: {
    color: '#1C1C1C',
    fontFamily: 'NotoSerif-Regular',
    fontSize: 14,
    lineHeight: 16.8,
    marginVertical: 6,
  },
  inputWrapper: {
    marginVertical: '2%',
    borderWidth: 1,
    borderRadius: 7,
    zIndex: -1,
    borderColor: '#707371',
  },
  buttonModalContainer: {
    // height: '7%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.91,
    marginBottom: 20,
    marginTop: 18,
  },
  reject: {
    width: '47%',
    borderColor: '#07294B',
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
  },
  rejectText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#07294B',
    fontSize: 16,
  },
  accept: {
    width: '47%',
    backgroundColor: '#0C447D',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
  },
  acceptText: {
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
    fontSize: 16,
  },
});
