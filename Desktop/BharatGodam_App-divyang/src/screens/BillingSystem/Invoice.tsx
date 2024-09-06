import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {FC} from 'react';
import HeaderComponent from '../../components/Header';
import CustomButton from '../../components/CustomButton';

const {width, height} = Dimensions.get('window');

interface BookingPaymentDetail {
  name: string;
  price: string;
}

const Invoice: FC = () => {
  const handlePrintInvoice = async (): Promise<void> => {
    // Implement the print invoice functionality here
  };

  const bookingPaymentDetails: BookingPaymentDetail[] = [
    {
      name: 'Storage cost : 30 days (April 21 - May 21) for 10 MT / 400 (25 kg bag)',
      price: '₹ 3,660',
    },
    {
      name: 'Transportation charge for 30 km',
      price: '₹ 100',
    },
    {
      name: 'Service cost',
      price: '₹ 200',
    },
    {
      name: 'Fumigation/grading charges',
      price: '₹ 100',
    },
    {
      name: 'Expiry date monitoring changes',
      price: '₹ 400',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderComponent title="Invoice" />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.invoiceContainer}>
            <View style={styles.rowSpaceBetween}>
              <View>
                <Text style={styles.sectionTitle}>INVOICE #0076</Text>
                <Text style={styles.regularText}>
                  Invoice date: 10 March 2024
                </Text>
              </View>
              <Image
                source={require('../../assets/images/company.png')}
                style={styles.image}
              />
            </View>
            <View style={styles.addressContainer}>
              <Text style={styles.header5}>From</Text>
              <Text style={styles.regularText}>
                {
                  'Anand, Gujarat-388001 \nIndia \n+91 9082994158 \nbharatgodam.techsolutions@gmail.com'
                }
              </Text>
            </View>
            <View style={styles.addressContainer}>
              <Text style={styles.header5}>Bill to</Text>
              <Text style={styles.regularText}>
                {'Preshika Kumar \nresho1767@gmail.com \n+91 866379999'}
              </Text>
            </View>
            <View style={styles.bookingDetailsHeader}>
              <Text style={styles.header3}>Booking payment details</Text>
            </View>
            <View style={styles.paymentDetailsContainer}>
              {bookingPaymentDetails.map((booking, index) => (
                <View key={index} style={styles.paymentDetailRow}>
                  <View style={styles.paymentDetailName}>
                    <Text style={styles.paymentDetailText}>{booking.name}</Text>
                  </View>
                  <View>
                    <Text style={styles.paymentDetailPrice}>
                      {booking.price}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
            <View style={styles.separatorLine} />
            <View style={styles.totalPaidContainer}>
              <View style={styles.twoColRow}>
                <Text style={styles.header3}>Total paid</Text>
                <Text style={styles.header3}> ₹ 4460 </Text>
              </View>
            </View>
            <View style={styles.additionalInfoContainer}>
              <View style={styles.twoColRow}>
                <Text style={styles.additionalInfoLabel}>
                  Estimated truck arrival date
                </Text>
                <Text style={styles.additionalInfoValue}>18 Mar, Thurs</Text>
              </View>
              <View style={styles.twoColRow}>
                <Text style={styles.additionalInfoLabel}>Tracking ID</Text>
                <Text style={styles.additionalInfoValue}>LP-12345-628-110</Text>
              </View>
            </View>
          </View>
          <CustomButton
            role="iButton"
            text="Print invoice"
            txtcolor="#FFFFFF"
            bgcolor="#0C447D"
            borderColor="#0C447D"
            onPress={handlePrintInvoice}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Invoice;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  invoiceContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderColor: '#C1C4C2',
    borderWidth: 1,
    width: width * 0.91,
    paddingHorizontal: 14,
    paddingVertical: 32,
    marginBottom: 32,
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    color: '#1C1C1C',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    lineHeight: 24,
    marginVertical: 6,
  },
  regularText: {
    color: '#1C1C1C',
    fontFamily: 'NotoSerif-Regular',
    fontSize: 12,
    lineHeight: 18,
  },
  header3: {
    color: '#1C1C1C',
    fontSize: 18,
    lineHeight: 21.6,
    fontFamily: 'Poppins-SemiBold',
  },
  header5: {
    color: '#1C1C1C',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    lineHeight: 16.8,
    marginVertical: 6,
  },
  twoColRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  separatorLine: {
    width: '100%',
    borderColor: '#E0E1E1',
    borderWidth: 1,
    marginVertical: 16,
  },
  paymentDetailsContainer: {
    marginVertical: 12,
  },
  paymentDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  paymentDetailName: {
    flex: 1,
    marginRight: 10,
  },
  paymentDetailText: {
    color: '#1C1C1C',
    fontFamily: 'NotoSerif-Regular',
    fontSize: 14,
    lineHeight: 21,
    marginVertical: 6,
  },
  paymentDetailPrice: {
    color: '#1C1C1C',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    lineHeight: 16.8,
    marginVertical: 6,
  },
  totalPaidContainer: {
    marginVertical: 8,
  },
  additionalInfoContainer: {
    marginTop: 28,
  },
  additionalInfoLabel: {
    color: '#1C1C1C',
    fontFamily: 'NotoSerif-Regular',
    fontSize: 14,
    lineHeight: 21,
  },
  additionalInfoValue: {
    color: '#1C1C1C',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    lineHeight: 22,
  },
  image: {
    width: 106,
    height: 70,
  },
  addressContainer: {
    marginVertical: 12,
  },
  bookingDetailsHeader: {
    marginTop: 32,
    marginBottom: 12,
    alignItems: 'center',
  },
});
