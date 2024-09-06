import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Back from '../../assets/Back';
import CheckButton from '../../components/CheckButton';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {Booking} from '../../service/api';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function Reasons({route}) {
  const navigation = useNavigation<NavigationProp<Record<string, object>>>();
  const {id} = route.params;
  const token = useSelector((state: RootState) => state.user.token);
  const [reason, setReason] = useState<string>();
  const [other, setOther] = useState<string>();
  const handleReason = (value: string) => {
    setReason(value);
  };
  const handleReject = async () => {
    const reasonToReject = reason === 'other' ? other : reason;
    Booking.reject_booking(id, '6656040dac1a462e67827c39', reasonToReject);
    navigation.navigate('Bookings', {variant: 'requests'});
  };
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Back />
          <Text style={styles.heading}>Reasons to Reject </Text>
        </View>
        <Text style={styles.desc}>
          Please select a reason or mention the reasons to reject the booking.
        </Text>
        <View>
          {[
            'Missing Information',
            'Incomplete application',
            'Duplicate application',
            'other',
          ].map(item => {
            return (
              <View style={styles.option}>
                <CheckButton
                  onPress={() => handleReason(item)}
                  single={true}
                  value={reason === item}
                />
                <Text style={styles.optionText}>{item}</Text>
              </View>
            );
          })}
        </View>
        {reason === 'other' && (
          <TextInput
            style={styles.textBox}
            placeholder="eg. missing information"
            placeholderTextColor="#989E9A"
            textAlignVertical="top"
            multiline={true}
            onChangeText={text => setOther(text)}
          />
        )}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.Back}
            onPress={() => navigation.goBack()}>
            <Text style={styles.BackText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Send} onPress={handleReject}>
            <Text style={styles.SendText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    paddingHorizontal: '5%',
  },
  header: {
    height: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    flexGrow: 1,
    textAlign: 'center',
  },
  desc: {
    color: 'black',
    fontFamily: 'NotoSerif-Regular',
    fontSize: 14,
    marginTop: 8,
    marginBottom: 22,
  },
  option: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  optionText: {
    color: 'black',
    fontFamily: 'NotoSerif-Regular',
    fontSize: 14,
  },
  textBox: {
    width: '100%',
    height: 138,
    borderColor: '#989E9A',
    borderWidth: 1,
    borderRadius: 8,
    padding: '2%',
    color: 'black',
    textAlignVertical: 'top',
    marginVertical: 8,
  },
  buttonContainer: {
    height: '7%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  Back: {
    width: '47%',
    borderColor: '#07294B',
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  BackText: {
    color: '#07294B',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  Send: {
    width: '47%',
    backgroundColor: '#07294B',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  SendText: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
});
