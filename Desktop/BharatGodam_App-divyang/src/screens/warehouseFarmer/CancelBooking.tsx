import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import HeaderComponent from '../../components/Header';
import textStyles from '../../components/textStyles';
import Location from '../../assets/Location';
import {RadioButton} from 'react-native-paper';
import {TextInput} from 'react-native';
import ButtonWithAutoWidth from '../../components/ButtonWithAutoWidth';
// import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../types/navigationTypes';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {Booking} from '../../service/api';
import {SafeAreaView} from 'react-native-safe-area-context';
import {convertDate} from '../../utils/date';

type CancelScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'CancelBooking'
>;
const CancelBooking: React.FC<CancelScreenProps> = ({navigation, route}) => {
  const {booking, warehouse} = route.params;
  const [checked, setChecked] = useState('');
  const [text, setText] = useState('');

  const handlecancelBooking = async () => {
    console.log('Reason for rejection : ', text || checked);
    try {
      const canceled_booking = await Booking.cancel_booking(
        booking._id,
        text || checked,
      );
      console.log(canceled_booking, 100);
      navigation.goBack();
    } catch (error) {
      console.log('Error in booking : ', error);
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F7F7F7'}}>
      <HeaderComponent title={'Cancel booking'} />
      <ScrollView>
        <View style={{alignItems: 'center'}}>
          <View>
            <Text style={[textStyles.headingH6_5, {color: 'black'}]}>
              {warehouse?.warehouse_name}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{padding: 5}}>
              <Location />
            </View>
            <Text style={[textStyles.bodyB3, {color: 'black'}]}>
              {warehouse?.locality_area},{warehouse?.city}
            </Text>
          </View>
          <Text
            style={[
              textStyles.headingH8,
              {color: '#1C1C1C', width: '90%', marginVertical: 26},
            ]}>
            Are you sure you want to cancel your warehouse booking?
          </Text>
          <View style={{gap: 8, marginHorizontal: 16}}>
            <View style={{flexDirection: 'row'}}>
              <View style={{width: 164, height: 24}}>
                <Text
                  style={[
                    textStyles.bodyTable,
                    {color: '#1C1C1C', textAlign: 'left'},
                  ]}>
                  Booking ID
                </Text>
              </View>
              <View style={{width: 164, height: 24}}>
                <Text style={[textStyles.headingH8, {color: '#1C1C1C'}]}>
                  {booking?.bookingId || booking?._id || '123'}
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={{width: 164, height: 24}}>
                <Text
                  style={[
                    textStyles.bodyTable,
                    {color: '#1C1C1C', textAlign: 'left'},
                  ]}>
                  Start Date
                </Text>
              </View>
              <View style={{width: 164, height: 24}}>
                <Text style={[textStyles.headingH8, {color: '#1C1C1C'}]}>
                  {convertDate(booking?.fromDate)}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              width: '90%',
              backgroundColor: '#fff',
              marginTop: 16,
              borderRadius: 8,
              paddingVertical: 12,
              paddingHorizontal: 14,
              gap: 12,
            }}>
            <Text style={[textStyles.bodyB3, {color: '#1C1C1C'}]}>
              Please select a reason or mention the reasons to cancel the
              booking.
            </Text>
            <View style={{gap: -4}}>
              <View style={styles.radioButton}>
                <RadioButton
                  value="Change in plans"
                  status={
                    checked === 'Change in plans' ? 'checked' : 'unchecked'
                  }
                  onPress={() => setChecked('Change in plans')}
                />
                <Text style={[textStyles.bodyB3, {color: '#151515'}]}>
                  Change in plans
                </Text>
              </View>
              <View style={styles.radioButton}>
                <RadioButton
                  value="No longer required"
                  status={
                    checked === 'No longer required' ? 'checked' : 'unchecked'
                  }
                  onPress={() => setChecked('No longer required')}
                />
                <Text style={[textStyles.bodyB3, {color: '#151515'}]}>
                  No longer required
                </Text>
              </View>
              <View style={styles.radioButton}>
                <RadioButton
                  value="Found a better alternative"
                  status={
                    checked === 'Found a better alternative'
                      ? 'checked'
                      : 'unchecked'
                  }
                  onPress={() => setChecked('Found a better alternative')}
                />
                <Text style={[textStyles.bodyB3, {color: '#151515'}]}>
                  Found a better alternative
                </Text>
              </View>
              <View style={styles.radioButton}>
                <RadioButton
                  value="other"
                  status={checked === 'other' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('other')}
                />
                <Text style={[textStyles.bodyB3, {color: '#151515'}]}>
                  other
                </Text>
              </View>
            </View>
            <TextInput
              multiline={true}
              placeholder="eg. Change in plans"
              placeholderTextColor={'#CCCCCC'}
              style={[
                text === '' ? textStyles.bodyB3 : textStyles.headingH8,
                {
                  width: '100%',
                  height: 120,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: '#9F9F9F',
                  color: 'black',
                  padding: 16,
                  flex: 1,
                  textAlignVertical: 'top',
                  justifyContent: 'flex-start',
                  backgroundColor: 'white',
                },
              ]}
              onChangeText={text => setText(text)}
              value={text}
            />
          </View>
        </View>
        <View
          style={{
            marginHorizontal: '5%',
            marginVertical: '4%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: '7%',
          }}>
          <View style={{width: '48%'}}>
            <ButtonWithAutoWidth
              role="iButton"
              text="Back"
              borderColor="#07294B"
              txtcolor="#07294B"
              onPress={() => navigation.goBack()}
            />
          </View>
          <View style={{width: '48%'}}>
            <ButtonWithAutoWidth
              role="iButton"
              text="Cancel booking"
              bgcolor="#0C447D"
              borderColor="#0C447D"
              txtcolor="#FFFFFF"
              onPress={handlecancelBooking}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CancelBooking;

const styles = StyleSheet.create({
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
