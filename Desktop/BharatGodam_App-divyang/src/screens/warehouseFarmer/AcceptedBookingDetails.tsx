import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import HeaderComponent from '../../components/Header';
import textStyles from '../../components/textStyles';
import Location from '../../assets/Location';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../../types/navigationTypes';
import {convertDate} from '../../utils/date';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import Dropdown from '../../assets/Dropdown';
import Dropup from '../../assets/Dropup';

type AcceptedScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'AcceptedBookingDetails'
>;

interface DetailRowProps {
  label: string;
  value: string;
  isGrading?: boolean;
  isDropdown?: boolean;
}

export const convertExpiryDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  };
  return date.toLocaleDateString('en-GB', options);
};

const AcceptedBookingDetails: React.FC<AcceptedScreenProps> = ({
  navigation,
  route,
}) => {
  const {booking, warehouse} = route.params;
  //console.log(booking);
  const [Isdropdown, setIsdropdown] = useState(false);

  const DetailRow = ({label, value, isGrading = false}: DetailRowProps) => (
    <View style={styles.detailRow}>
      <View style={styles.detailLabel}>
        <Text style={[textStyles.bodyTable, styles.detailText]}>{label}</Text>
      </View>
      <View
        style={[styles.detailValue, isGrading && {backgroundColor: '#C8FFF5'}]}>
        <Text style={[textStyles.headingH8, styles.detailText]}>{value}</Text>
        {isGrading && (
          <TouchableOpacity
            onPress={() => {
              setIsdropdown(!Isdropdown);
            }}>
            {Isdropdown ? (
              <Dropdown height={20} width={20} />
            ) : (
              <Dropup height={20} width={20} />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const bookingDetails: DetailRowProps[] = [
    {label: 'Booking ID', value: booking?.bookingId || booking?._id || 'N/A'},
    {label: 'Commodity', value: booking?.Commodity[0]?.name || 'N/A'},
    {label: 'Requested capacity', value: `${booking?.totalWeight || 'N/A'} MT`},
    {label: 'Start date', value: convertDate(booking?.fromDate) || 'N/A'},
    {label: 'End date', value: convertDate(booking?.toDate) || 'N/A'},
    {label: 'Truck type', value: '10 MT capacity truck'},
    {label: 'Truck Arrival Time', value: convertDate(booking?.fromDate + 1)},
  ];

  const grade = [
    {
      label: 'Overall grade',
      value: booking?.gradeDetails?.grade || 'N/A',
      isGrading: true,
    },
  ];
  const DepositDetails = [
    {
      label: 'Expiry date',
      value: booking?.expiryDateOfDeposit
        ? convertExpiryDate(new Date(booking.expiryDateOfDeposit))
        : 'Not Deposited',
    },
    {
      label: 'Total actual weight',
      value: `${booking?.totalWeight || 'N/A'} MT`,
    },
    {label: 'Total no of bags', value: booking?.noOfBags?.toString() || 'N/A'},
    {label: 'Bag size', value: `${booking?.bagSize || 'N/A'} bag`},
    {label: 'Deposit ID', value: booking?.depositId || 'Not Deposited'},
  ];

  const GradeDetails = [
    {
      label: 'Foreign matter (% by weight)',
      value: booking?.gradeDetails?.foreignMatter || 'N/A',
    },
    {
      label: 'Other food grains (% by weight)',
      value: booking?.gradeDetails?.otherFoodGrain || 'N/A',
    },
    {
      label: 'Other wheat(% by weight)',
      value: booking?.gradeDetails?.other || 'N/A',
    },
    {
      label: 'Immature and shrivelled grains (% by weight)',
      value: booking?.gradeDetails?.weevilledGrain || 'Not Deposited',
    },
    {
      label: 'Damaged grain(% by weight)',
      value: booking?.gradeDetails?.damagedGrain || 'N/A',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderComponent title="Booking accepted" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={[textStyles.headingH6_5, styles.warehouseName]}>
          {warehouse?.warehouse_name}
        </Text>
        <View style={styles.locationContainer}>
          <Location style={styles.locationIcon} />
          <Text style={[textStyles.bodyB3, styles.locationText]}>
            {`  ${warehouse?.locality_area}, ${warehouse?.city}`}
          </Text>
        </View>
        <Image
          source={{uri: warehouse?.main_photo[0]}}
          style={styles.warehouseImage}
        />
        <Text style={[textStyles.bodyB3, styles.bookingDetailsText]}>
          Your warehouse booking is accepted and the booking details are
        </Text>
        <View style={styles.detailsContainer}>
          {bookingDetails.map((detail, index) => (
            <DetailRow
              key={index}
              label={detail.label}
              value={detail.value}
              isGrading={detail.isGrading}
            />
          ))}
          {booking?.isBookingGraded &&
            grade.map((detail, index) => (
              <DetailRow
                key={index}
                label={detail.label}
                value={detail.value}
                isGrading={detail.isGrading}
              />
            ))}
          {Isdropdown &&
            GradeDetails.map((detail, index) => (
              <View style={{marginVertical: 5}}>
                <DetailRow
                  key={index}
                  label={detail.label}
                  value={detail.value}
                />
              </View>
            ))}
          {booking?.isBookingDeposited &&
            DepositDetails.map((detail, index) => (
              <DetailRow
                key={index}
                label={detail.label}
                value={detail.value}
              />
            ))}
        </View>
        <Text style={[textStyles.bodyB3, styles.updateText]}>
          You will receive updates on your tracking ID by mail or message.
        </Text>
        <Text style={[textStyles.bodyB3, styles.cancelText]}>
          If you want to cancel the booking, you can cancel within 7 days{' '}
          <Text
            style={textStyles.buttonTextUnderline}
            onPress={() => {
              navigation.navigate('CancelBooking', {
                bookingId: booking?._id || '',
                warehouse: warehouse,
              });
            }}>
            Cancel booking
          </Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AcceptedBookingDetails;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  warehouseName: {
    color: 'black',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    padding: 5,
  },
  locationText: {
    color: 'black',
  },
  warehouseImage: {
    width: '92%',
    height: 130,
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 24,
  },
  bookingDetailsText: {
    color: '#1C1C1C',
    width: '92%',
  },
  detailsContainer: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
    gap: 8,
    backgroundColor: '#FFFFFF',
    borderColor: '#C1C4C2',
    marginTop: 16,
    width: '92%',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 24,
  },
  detailLabel: {
    width: '50%',
    height: 24,
    paddingVertical: 4,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  detailValue: {
    width: '40%',
    height: 24,
    paddingVertical: 4,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailText: {
    color: '#1C1C1C',
    textAlign: 'left',
  },
  commodityValue: {
    backgroundColor: 'green',
  },
  updateText: {
    color: '#1C1C1C',
    marginVertical: 16,
    width: '92%',
  },
  cancelText: {
    color: '#1C1C1C',
    width: '92%',
  },
});
