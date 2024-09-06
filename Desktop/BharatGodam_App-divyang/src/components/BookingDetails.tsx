import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FarmerBooking } from '../types/entities';

interface BookingDetailsProps {
  booking: FarmerBooking;
}

const formatDate = (dateNumber: number): string => {
  const dateString = dateNumber.toString();
  const year = dateString.substring(0, 4);
  const month = dateString.substring(4, 6);
  const day = dateString.substring(6, 8);
  const date = new Date(`${year}-${month}-${day}`);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
};

const BookingDetails: React.FC<BookingDetailsProps> = ({ booking }) => {
  return (
    <View style={styles.container}>
      <DetailRow label="Commodity" value={booking.Commodity[0]?.name || ""} />
      <DetailRow label="Start Date" value={formatDate(booking.fromDate)} />
      <DetailRow label="End Date" value={formatDate(booking.toDate)} />
      <DetailRow label="Price" value={`₹${booking.total_price.toLocaleString()}`} />
    </View>
  );
};

const DetailRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <View style={styles.detailRow}>
    <View style={styles.labelContainer}>
      <Text style={[styles.bodyTable, styles.labelText]}>{label}</Text>
    </View>
    <View style={styles.valueContainer}>
      <Text style={[styles.headingH8, styles.valueText]}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 8,
    backgroundColor: '#FFFFFF',
    borderColor: '#C1C4C2',
    marginTop: 16,
  },
  detailRow: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  labelContainer: {
    width: 144,
    paddingVertical: 4,
  },
  valueContainer: {
    width: 144,
    paddingVertical: 4,
  },
  labelText: {
    color: '#1C1C1C',
    textAlign: 'left',
  },
  valueText: {
    color: '#1C1C1C',
  },
  bodyTable: {
    fontSize: 14,
  },
  headingH8: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BookingDetails;
