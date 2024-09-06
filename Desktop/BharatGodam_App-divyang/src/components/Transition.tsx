import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ticked from '../assets/Ticked';



interface OrderTrackingProps {
  isBookingAccepted: boolean;
  isWeighbridgeData: boolean;
  isDeposit: boolean;
  isGrading: boolean;
  isWithdrawal: boolean;
  isCompleted: boolean;
}

const OrderTracking: React.FC<OrderTrackingProps> = ({ 
  isBookingAccepted, 
  isWeighbridgeData, 
  isDeposit, 
  isGrading, 
  isWithdrawal, 
  isCompleted 
}) => {
  const getStatuses = () => [
    { label: 'Booking accepted', completed: isBookingAccepted },
    { label: 'Weighbridge data', completed: isWeighbridgeData },
    { label: 'Deposit', completed: isDeposit },
    { label: 'Grading', completed: isGrading },
    { label: 'Withdrawal', completed: isWithdrawal },
    { label: 'Completed', completed: isCompleted },
  ];

  const statuses = getStatuses();

  return (
    <View style={styles.container}>
      {statuses.map((status, index) => {
        const isLastCompleted = status.completed && (index === statuses.length - 1 || !statuses[index + 1].completed);

        return (
          <View style={styles.statusContainer} key={index}>
            <View style={[styles.circle, status.completed && styles.circleCompleted]}>
              {status.completed && <Ticked size={20}/>}
            </View>
            <Text style={[
              styles.statusText,
              status.completed && styles.statusTextCompleted,
              isLastCompleted && styles.statusTextActive
            ]}>
              {status.label}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  circle: {
    width: 25,
    height: 25,
    borderRadius: 999,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleCompleted: {
    backgroundColor: '#00A241',
  },
  statusText: {
    marginLeft: 10,
    color: 'black',
    fontSize:18,
    fontWeight:'700'
  },
  statusTextCompleted: {
    color:'#1C1C1C',
  },
  statusTextActive: {
    color: '#00A241',
  },
});

export default OrderTracking;
