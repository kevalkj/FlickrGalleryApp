import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Back from '../../assets/Back';
import Crop from '../../assets/Crop';
import LeftArrow from '../../assets/LeftArrow';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../../types/navigationTypes';
import {GradeAndDeposit, Withdrawalapi} from '../../service/api';
import {WithdrawalDetails} from '../../types/entities';
import {convertDate} from '../../utils/date';

type WithdrawalProps = NativeStackScreenProps<RootStackParamList, 'Withdrawal'>;

const height = Dimensions.get('window').height;

const Withdrawal: React.FC<WithdrawalProps> = ({navigation}) => {
  const [data, setData] = useState<WithdrawalDetails[]>([]);
  const renderItem = (data: WithdrawalDetails) => {
    return (
      <TouchableOpacity
        style={styles.withdrawal}
        onPress={() => handleNavigation(data)}>
        <View style={styles.withdrawalLeft}>
          <Crop />
        </View>
        <View style={styles.withdrawalCenter}>
          <Text style={styles.id}>
            {data.bookingId._id}
            {}
          </Text>
          <Text style={styles.warehouseValues}>{data.warehouseName}</Text>
          <View style={styles.commodityContainer}>
            <Text style={styles.warehouseValues}>
              {data.bookingId.Commodity[0].name}{' '}
            </Text>
            <View style={styles.dot} />
            <Text style={styles.warehouseValues}> {data.totalWeight} MT</Text>
          </View>
        </View>
        <View style={styles.withdrawalRight}>
          <LeftArrow />
        </View>
      </TouchableOpacity>
    );
  };

  const handleNavigation = (data: WithdrawalDetails) => {
    console.log(data.bookingId);

    navigation.navigate('WithdrawalData', {
      data: [
        data.warehouseName,
        data.bookingId.Commodity[0].name,
        convertDate(data.bookingId.fromDate),
        convertDate(data.bookingId.toDate),
        data.bookingId.totalWeight + ' MT',
        data.bookingId.totalWeight + ' MT',
        data.bookingId.noOfBags,
        data.bookingId.bagSize,
      ],
      payload: {
        driverName: 'TN-12-9955',
        truckNumber: 'Riyaz Khan',
        commodity: data.bookingId.Commodity.map(item => ({
          itemName: item.name,
          quantity: data.bookingId.totalWeight,
        })),
        totalBags: data.noOfBags,
      },
      params: {
        warehouse_id: data.bookingId.warehouse,
        booking_id: data.bookingId._id,
      },
    });
  };

  useEffect(() => {
    const getData = async () => {
      let temp = await GradeAndDeposit.get_deposit_farmer();
      temp = temp.filter(
        item =>
          !item.bookingId.isBookingWithdrawn &&
          item.bookingId._id !== '668afdf206968386e060dbe2',
      );
      console.log(temp[0], 19);
      setData(temp);
    };
    getData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Back />
        </TouchableOpacity>
        <Text style={styles.heading}>Withdrawal</Text>
        <View style={{width: '10%'}} />
      </View>
      <Text style={styles.desc}>These IDs are scheduled for withdrawal</Text>
      <FlatList data={data} renderItem={({item}) => renderItem(item)} />
    </SafeAreaView>
  );
};

export default Withdrawal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3%',
    marginBottom: 24,
  },
  heading: {
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    flexGrow: 1,
    textAlign: 'center',
  },
  desc: {
    fontFamily: 'NotoSerif-Regular',
    fontSize: 14,
    color: 'black',
    paddingHorizontal: '5%',
  },
  withdrawal: {
    backgroundColor: '#F6F5EB',
    width: '90%',
    height: height * 0.15,
    padding: '5%',
    alignSelf: 'center',
    flexDirection: 'row',
    borderColor: '#E0E1E1',
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 14,
  },
  withdrawalLeft: {flex: 2.5},
  withdrawalCenter: {flex: 6.5},
  withdrawalRight: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  commodityContainer: {flexDirection: 'row'},
  dot: {
    width: 4,
    height: 4,
    backgroundColor: '#C1C4C2',
    borderRadius: 100,
    alignSelf: 'center',
  },
  id: {
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
  },
  warehouseValues: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: 'black',
  },
});
