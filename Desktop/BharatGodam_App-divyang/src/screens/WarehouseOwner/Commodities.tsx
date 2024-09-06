import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import Table from '../../components/Table';
import HomeMenu from '../../components/HomeMenu';
import HomeNotification from '../../components/HomeNotification';
import Sort from '../../assets/Sort';
import Searching from '../../assets/Searching';
import {ScrollView} from 'react-native-gesture-handler';
import Next from '../../assets/Next';
import Prev from '../../assets/Prev';
import Back from '../../assets/Back';
import {Weighbridge} from '../../service/api';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../../types/navigationTypes';
import CustomModal from '../../components/LoadingModal';
import {convertDate, convertToReadableTime} from '../../utils/date';
import HeaderComponent from '../../components/Header';
import Plus from '../../assets/Plus';
import {SafeAreaView} from 'react-native-safe-area-context';

type WeighbridgeDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  'Commodities'
>;

const height = Dimensions.get('window').height;

const CommodityDetails: React.FC<WeighbridgeDetailsProps> = ({
  route,
  navigation,
}) => {
  const variant = 'outbound';
  const [menu, setMenu] = useState<boolean>(false);
  const [notification, setNotification] = useState<boolean>(false);
  const [search, setSearch] = useState('');
  const [toggleSort, setToggleSort] = useState(false);
  const [back, setBack] = useState(false);
  const [front, setFront] = useState(true);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(10);
  const [reload, setReload] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  let heading = ['Commodity', 'Bags', 'Added by', 'Archived', 'Active'];
  const [Staticdata, setStaticData] = useState<
    (string | boolean | undefined)[][]
  >([]);
  const [data, setData] = useState<(string | boolean | undefined)[][]>([]);
  const handleMenu = () => {
    setMenu(!menu);
  };
  const handleNotification = () => {
    setNotification(!notification);
  };
  // handle search logic here
  const handleSearch = () => {};
  // handle sort logic here

  const handleToggleSort = () => {
    setToggleSort(!toggleSort);
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
      setBack(false);
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

  const getData = async () => {
    setLoading(true);
    setError(null);
    try {
      let temp = await Weighbridge.get_all_details();
      console.log('Initial data:', temp);

      temp = temp.filter(item => item && item.booking_id);
      console.log('After filtering null and missing booking IDs:', temp);

      temp = temp.filter(item => !item.booking_id.isItemInWarehouse);

      console.log('After filtering based on variant:', temp);

      const tempy = temp.map(item => {
        //console.log(item.booking_id.Commodity[0]);

        return [
          item.booking_id.Commodity[0].name,
          '25kg 50kg 75kg',
          'my Warehouse',
          'No',
          'yes',
          1,
        ];
      });
      console.log('Mapped data (tempy):', tempy);

      const max = tempy.length >= 10 ? 10 : tempy.length;
      const condition = tempy.length >= 10;

      setFront(condition);
      setMax(max);
      setStaticData(tempy);
      setData(tempy.slice(min, max));
    } catch (error) {
      console.error(error);
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
      setReload(false);
      console.log(reload, 1);
    }
  };

  useEffect(() => {
    getData();
    //setTimeout(getData, 500);
  }, [route.params]);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent title="Commodities" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{alignItems: 'center'}}>
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

          {/* <TouchableOpacity style={styles.sortby} onPress={handleToggleSort}>
            <Plus props={undefined} color={'white'} />
            <Text style={styles.sortText}>Add commodity</Text>
          </TouchableOpacity> */}
        </View>
        <CustomModal isVisible={loading} setIsVisible={setLoading} />
        <Table
          height={height}
          heading={heading}
          data={data}
          commodity={4}
          //weight={7}
          //action={false}
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
        <Modal visible={menu} transparent={true}>
          <HomeMenu exitCallBack={handleMenu} />
        </Modal>
        <Modal visible={notification} transparent={true}>
          <HomeNotification
            exitCallBack={handleNotification}
            Notification={[]}
          />
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CommodityDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  sortText: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    marginLeft: 5,
  },

  filterContainer: {
    height: height * 0.06,
    width: '90%',
    marginVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchContainer: {
    width: '45%',
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
    width: '50%',
    height: '100%',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#707371',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#0C447D',
  },
  navigationContainer: {
    width: '90%',
    height: height * 0.15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
