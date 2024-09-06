import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Back from '../../assets/Back';
import Searching from '../../assets/Searching';
import Sort from '../../assets/Sort';
import Table from '../../components/Table';
import Next from '../../assets/Next';
import Prev from '../../assets/Prev';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../../types/navigationTypes';
import {Booking, GradeAndDeposit} from '../../service/api';
import {convertDate} from '../../utils/date';
import Layout from '../../layouts/layout';
import CustomModal from '../../components/LoadingModal';

type GradingDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  'Grading and expiry details'
>;

const height = Dimensions.get('window').height;
// convert date should be placed in utils

const GradingDetails: React.FC<GradingDetailsProps> = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [toggleSort, setToggleSort] = useState(false);
  const [back, setBack] = useState(false);
  const [front, setFront] = useState(true);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const rangeOptions = [
    'Start date',
    'End date',
    'commodity type',
    'Customer name : A to Z',
    'Customer name : Z to A',
    'Total weight : Low to high',
    'Total weight : High to low',
    'Accepted',
    'Rejected',
  ];
  const heading = [
    'Deposit ID',
    'Commodity',
    'Deposit date',
    'Slot no.',
    'Revalidation date',
    'Expiry date',
    'Foreign\nmatters in %',
    'Other food\ngrains in %',
    'Other\nWheat in %',
    'Damaged\ngrains in %',
    'Immature and\nshrivelled grains in %',
    'Weevilled\ngrains in %',
    'Grade',
  ];
  const [Staticdata, setStaticData] = useState<string[][]>([]);
  const [data, setData] = useState<string[][]>([]);

  // handle search logic here
  const handleSearch = () => {};
  // handle sort logic here
  const handleSort = (option: string) => {};
  const handleToggleSort = () => {
    setToggleSort(!toggleSort);
  };
  const renderDropdownOptions = (option: string) => {
    return (
      <TouchableOpacity
        style={styles.dropDownOptions}
        onPress={() => handleSort(option)}>
        <Text style={styles.dropDownText}>{option}</Text>
      </TouchableOpacity>
    );
  };
  const handleNext = () => {
    if (max + 10 > Staticdata.length) {
      if (max + 1 <= Staticdata.length) {
        setMin(max);
        setMax(max + (Staticdata.length % 10));
        setFront(false);
        setBack(true);
        setData(Staticdata.slice(max, max + (Staticdata.length % 10)));
        return;
      }
      return;
    }
    if (max + 10 === Staticdata.length) {
      setMin(max);
      setMax(max + 10);
      setFront(false);
      setBack(true);
      setData(Staticdata.slice(max, max + 10));
      return;
    }
    setMin(max);
    setMax(max + 10);
    setBack(true);
    setFront(true);
    setData(Staticdata.slice(max, max + 10));
  };
  const handlePrev = () => {
    if (max % 10 > 1) {
      setMax(max - (max % 10));
      setMin(min - 10);
      setData(Staticdata.slice(min - 10, max - (max % 10)));
      setBack(true);
      setFront(true);
      return;
    }
    if (min - 10 === 0) {
      setMax(max - 10);
      setMin(min - 10);
      setData(Staticdata.slice(min - 10, max - 10));
      setBack(false);
      setFront(true);
      return;
    }

    setMax(max - 10);
    setMin(min - 10);
    setData(Staticdata.slice(min - 10, max - 10));
  };

  const fetchBooking = async (BookingId: string) => {
    console.log(BookingId);

    let booking;
    try {
      booking = await Booking.get_bookings_by_booking_id(BookingId);
    } catch (WarehouseError: any) {
      console.error('Error ', WarehouseError?.response?.data.error);
    }

    return booking;
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      try {
        let temp = await GradeAndDeposit.get_grading();
        temp = temp.filter(
          item =>
            item && item.bookingId && item.depositDate && item.expiraryDate,
        );
        const bookingPromises = temp.map(async item => {
          const booking = await fetchBooking(item.bookingId);
          return {
            item,
            booking: booking,
          };
        });

        const results = await Promise.all(bookingPromises);

        const tempy = results.map(({item, booking}) => {
          //console.log(booking);

          return [
            item._id,
            booking?.Commodity[0]?.name || '',
            convertDate(item.depositDate.replaceAll('-', '').slice(0, 8)),
            item.slotNumber,
            item.revalidationDate
              ? convertDate(
                  item.revalidationDate.replaceAll('-', '').slice(0, 8),
                )
              : 'Exchange',
            convertDate(item.expiraryDate.replaceAll('-', '').slice(0, 8)),
            item.foreignMatter,
            item.otherFoodGrain,
            item.other,
            item.damagedGrain,
            item.immatureGrain,
            item.weevilledGrain,
            item.grade,
            '',
          ];
        });

        const max = temp.length >= 10 ? 10 : tempy.length;
        const condition = temp.length >= 10;

        setFront(condition);
        setMax(max);
        setData(tempy.slice(min, max));
        setStaticData(tempy);
      } catch (error) {
        console.error('Error fetching grading data:', error);
        setError(true); // Set error state if there's an error
      } finally {
        setLoading(false); // Set loading to false when fetching ends
      }
    };
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Layout>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{alignItems: 'center'}}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Back />
            </TouchableOpacity>
            <Text style={styles.heading}>
              Grading & expiry date{'\n'}details
            </Text>
          </View>
          <View style={styles.filterContainer}>
            <View style={styles.searchContainer}>
              <Searching />
              <TextInput
                style={styles.search}
                placeholder="Search"
                placeholderTextColor={'#707371'}
                onChangeText={text => setSearch(text)}
                onSubmitEditing={handleSearch}
              />
            </View>

            <TouchableOpacity style={styles.sortby} onPress={handleToggleSort}>
              <Text style={styles.sortText}>Sort by</Text>
              <Sort />
            </TouchableOpacity>
            {toggleSort && (
              <View style={styles.dropDownOptionsContainer}>
                {rangeOptions.map(option => renderDropdownOptions(option))}
              </View>
            )}
          </View>
          <CustomModal isVisible={loading} setIsVisible={setLoading}/>
          <Table
            height={height}
            heading={heading}
            data={data}
            expiry={5}
            grading={12}
          />
          <View style={styles.navigationContainer}>
            <TouchableOpacity
              style={[
                {
                  backgroundColor: back ? '#0C447D' : '#E0E1E1',
                },
                styles.navButton,
              ]}
              disabled={!back}
              onPress={handlePrev}>
              <Prev color={back && 'white'} />
            </TouchableOpacity>
            <Text style={styles.navText}>
              Showing {min + 1} to {max} of {Staticdata.length}
            </Text>
            <TouchableOpacity
              style={[
                {
                  backgroundColor: front ? '#0C447D' : '#E0E1E1',
                },
                styles.navButton,
              ]}
              disabled={!front}
              onPress={handleNext}>
              <Next color={!front && '#C1C4C2'} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Layout>
    </View>
  );
};

export default GradingDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: height * 0.1,
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
  sortText: {
    color: '#707371',
    fontFamily: 'NotoSerif-Regular',
    fontSize: 14,
    marginRight: 5,
  },
  dropDownOptions: {height: '10%', width: '80%', justifyContent: 'center'},
  dropDownText: {
    fontFamily: 'NotoSerif-Regular',
    color: 'black',
    fontSize: 14,
    marginRight: 8,
  },
  dropDownOptionsContainer: {
    backgroundColor: 'white',
    width: '72%',
    zIndex: 2,
    position: 'absolute',
    top: '110%',
    height: '850%',
    right: 0,
    marginRight: 10,
    paddingVertical: '1%',
    borderColor: '#989E9A',
    borderWidth: 1,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 5, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterContainer: {
    height: height * 0.06,
    width: '90%',
    marginVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchContainer: {
    width: '60%',
    height: '100%',
    borderWidth: 1,
    borderColor: '#707371',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  search: {
    width: '70%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    color: '#707371',
  },
  sortby: {
    width: '30%',
    height: '100%',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#707371',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  navigationContainer: {
    width: '90%',
    height: height * 0.15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: -2,
  },
  navButton: {
    width: '10%',
    aspectRatio: 1,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    flexGrow: 1,
    textAlign: 'center',
    color: 'black',
  },
});
