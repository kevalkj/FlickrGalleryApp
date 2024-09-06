import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import CustomInput from './CustomInputText';
import DropdownInput from './customDropdown';
import CustomButton from './CustomButton';
import textStyles from './textStyles';
import {Warehouse} from '../types/entities'; // Import your types
import Weight from '../assets/Weight';
import Commodity from '../assets/Commodity';
import Calender from '../assets/Calender';
import Search from '../assets/Search';
import Bag from '../assets/Bag';
import {warehouseApi} from '../service/api';
import Cross from '../assets/Cross';

interface SearchWarehouseModalProps {
  visible: boolean;
  onClose: () => void;
  addr: string;
  onSearch: (data: {warehouse_s: any; bookingData: any}) => void;
}

interface DateObject {
  dateString: string;
  day: number;
  month: number;
  timestamp: number;
  year: number;
}

const Commodities = [
  {commodity: 'Bajra', code: 'BJ1', iso: 'BJF1'},
  {commodity: 'Wheat', code: 'WH1', iso: 'WHF1'},
  {commodity: 'Ajwain', code: 'AJ1', iso: 'AJF1'},
  {commodity: 'Rice', code: 'RC1', iso: 'RCF1'},
  {commodity: 'Jowar', code: 'JW1', iso: 'JWF1'},
];
const Unit = [{unit: 'MT'}, {unit: 'QT'}];
const BagSize = [
  {BagSize: '25 kg bag'},
  {BagSize: '50 kg bag'},
  {BagSize: '75 kg bag'},
  {BagSize: '100 kg bag'},
];

const SearchWarehouseModal: React.FC<SearchWarehouseModalProps> = ({
  visible,
  onClose,
  addr,
  onSearch,
}) => {
  const [warehouse, setWarehouse] = useState<Warehouse[] | null>(null);
  const [isClickedCommodity, setIsClickedCommodity] = useState(false);
  const [showCalender, setShowCalender] = useState(false);
  const [modalType, setModalType] = useState<string>('');
  const [selectedCommodity, setSelectedCommodity] = useState<string>('');
  const [selectedUnit, setSelectedUnit] = useState<string>('');
  const [selectedBagsize, setSelectedBagsize] = useState<string>('');
  const [startDate, setStartDate] = useState<DateObject | null>(null);
  const [endDate, setEndDate] = useState<DateObject | null>(null);
  const [weight, setWeight] = useState<string>('');
  const [allFieldsFilled, setAllFieldsFilled] = useState<boolean>(false);

  const minDate =
    startDate?.dateString || new Date().toISOString().split('T')[0];

  useEffect(() => {
    setAllFieldsFilled(
      selectedCommodity !== '' &&
        selectedUnit !== '' &&
        selectedBagsize !== '' &&
        startDate !== null &&
        endDate !== null &&
        weight !== '',
    );
  }, [
    selectedCommodity,
    selectedUnit,
    selectedBagsize,
    startDate,
    endDate,
    weight,
  ]);

  const getNoOfBags = (bagsize: string, weight: string) => {
    const Bag = parseInt(bagsize.split(' ')[0]);
    const Weight = parseInt(weight);
    const Bags = Weight / Bag;

    return selectedUnit === 'MT'
      ? Math.round(Bags * 1000).toString()
      : Math.round(Bags * 100).toString();
  };

  const handleChangeDate = (date: DateObject) => {
    setShowCalender(false);
    modalType === 'START_DATE' ? setStartDate(date) : setEndDate(date);
    setModalType('');
  };

  const handlePressedStartDate = () => {
    setModalType('START_DATE');
    setShowCalender(true);
  };

  const handlePressedEndDate = () => {
    setModalType('END_DATE');
    setShowCalender(true);
  };

  const handleSearch = async () => {
    const data = {
      SelectedBagsize: selectedBagsize,
      SelectedCommodity: selectedCommodity,
      selectedUnit,
      endDate,
      startDate,
      weight: weight || '',
      numberOfBags: parseInt(getNoOfBags(selectedBagsize, weight)),
    };

    onSearch({
      warehouse_s: warehouse,
      //addr: `${addr.city}, ${addr.state}`,
      bookingData: data,
    });
    onClose();
  };

  useEffect(() => {
    if (addr) {
      const searchWarehouses = async () => {
        const temp = await warehouseApi.searchWarehouses({
          city: addr,
          commodity_name: selectedCommodity,
        });
        setWarehouse(temp);
      };
      searchWarehouses();
    }
  }, [addr, selectedCommodity]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      transparent={true}>
      <View style={styles.modalWrapper}>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
              marginHorizontal: 8,
              marginTop: 24,
            }}>
            <TouchableOpacity onPress={onClose}>
              <Cross />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: 8,
            }}>
            <Text
              style={[
                textStyles.headingH7,
                {
                  marginTop: 20,
                  marginBottom: 5,
                  fontWeight: 'bold',
                  color: 'black',
                },
              ]}>
              Change dates, commodity & weight
            </Text>
          </View>
          <ScrollView scrollEnabled={!isClickedCommodity}>
            <View style={styles.content}>
              <View style={styles.SearchContainer}>
                <View
                  style={{
                    width: '100%',
                    height: '15%',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity
                    onPress={handlePressedStartDate}
                    style={{
                      width: '48%',
                      borderWidth: 0.5,
                      height: '100%',
                      borderRadius: 8,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        justifyContent: 'center',
                        marginLeft: 14,
                        marginRight: 9.5,
                      }}>
                      <Calender />
                    </View>
                    <View>
                      {startDate == null ? null : (
                        <Text style={textStyles.bodyB4}>Start Date</Text>
                      )}
                      <Text
                        style={
                          startDate == null
                            ? textStyles.bodyB3
                            : [textStyles.headingH8, {color: 'black'}]
                        }>
                        {startDate == null
                          ? 'Start Date'
                          : startDate.dateString}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handlePressedEndDate}
                    style={{
                      width: '48%',
                      borderWidth: 0.5,
                      height: '100%',
                      borderRadius: 8,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        justifyContent: 'center',
                        marginLeft: 14,
                        marginRight: 9.5,
                      }}>
                      <Calender />
                    </View>
                    <View>
                      {endDate == null ? null : (
                        <Text style={textStyles.bodyB4}>End date</Text>
                      )}
                      {/* <Text style={textStyles.bodyB4}>End date</Text> */}
                      <Text
                        style={
                          endDate == null
                            ? textStyles.bodyB3
                            : [textStyles.headingH8, {color: 'black'}]
                        }>
                        {endDate == null ? 'End date' : endDate.dateString}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                {showCalender ? (
                  <View style={styles.calender}>
                    <Calendar
                      hideArrows={false}
                      minDate={minDate}
                      style={{borderRadius: 8, elevation: 4}}
                      onDayPress={handleChangeDate}
                      markedDates={{
                        [modalType === 'START_DATE'
                          ? startDate?.dateString || 'defaultStartDate'
                          : endDate?.dateString || 'defaultEndDate']: {
                          selected: true,
                          // selectedColor: '#0C447D',
                          // selectedTextColor: '#FFFFFF',
                        },
                      }}
                      theme={{
                        todayTextColor: '#00adf5',
                        arrowColor: 'blue',
                        disabledArrowColor: '#d9e1e8',
                      }}
                      hideExtraDays={true}
                    />
                  </View>
                ) : (
                  <></>
                )}
                <DropdownInput
                  selectedValue={selectedCommodity}
                  setSelectedValue={setSelectedCommodity}
                  items={Commodities.map(c => c.commodity)}
                  label="Commodity"
                  placeholder="Commodity"
                  icon={<Commodity />}
                />
                <View
                  style={{
                    width: '100%',
                    height: '15%',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    zIndex: -4,
                  }}>
                  <View
                    style={{
                      width: '60%',
                      height: '100%',
                      borderWidth: 0.5,
                      borderRadius: 8,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View style={{justifyContent: 'center', marginLeft: 14}}>
                      <Weight />
                    </View>
                    <CustomInput
                      PlaceHolder="Weight"
                      onTextChange={value => setWeight(value)}
                      keyboard="numeric"
                    />
                  </View>
                  <DropdownInput
                    selectedValue={selectedUnit}
                    setSelectedValue={setSelectedUnit}
                    items={Unit.map(u => u.unit)}
                    label="Unit"
                    placeholder="Unit"
                    height="100%"
                    width="35%" // Specify the width here
                  />
                </View>
                <View
                  style={{
                    width: '100%',
                    height: '15%',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    zIndex: -6,
                  }}>
                  <View
                    style={{
                      width: '60%',
                      height: '100%',
                      borderWidth: 0.5,
                      borderRadius: 8,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View style={{justifyContent: 'center', marginLeft: 14}}>
                      <Bag />
                    </View>
                    <CustomInput
                      PlaceHolder="No. of bags"
                      txt={
                        weight && selectedUnit && selectedBagsize
                          ? getNoOfBags(selectedBagsize, weight)
                          : ''
                      }
                    />
                  </View>
                  <DropdownInput
                    selectedValue={selectedBagsize}
                    setSelectedValue={setSelectedBagsize}
                    items={BagSize.map(b => b.BagSize)}
                    label="Bag size"
                    placeholder="Bag size"
                    height="100%"
                    width="35%" // Specify the width here
                  />
                </View>
                <CustomButton
                  role="iButton"
                  disabled={!allFieldsFilled}
                  text="Modify search"
                  txtcolor="#FFFFFF"
                  bgcolor="#0C447D"
                  borderColor="#0C447D"
                  onPress={handleSearch}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default SearchWarehouseModal;

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    justifyContent: 'flex-end', // This will make the modal stick to the bottom
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: Add a background overlay
  },
  container: {
    height: '60%',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: '1.5%', // Optional: Add padding
  },

  content: {
    margin: '4.5%',
    flex: 1,
    width: '92.5%',
    marginBottom: '30%',
    // backgroundColor: 'blue',
    justifyContent: 'space-between',
  },
  SearchContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '110%',
    gap: 16,
    // backgroundColor: 'purple'
  },
  ExploreContainer: {
    width: '110%',
    height: '42%',
    // backgroundColor: 'purple'
  },
  calender: {
    backgroundColor: 'white',
    width: '100%',
    zIndex: 1,
    position: 'absolute',
    top: '23%',
    // left: '5%',
    borderWidth: 0.5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 5, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  commodityScrollView: {
    backgroundColor: 'white',
    width: '100%',
    zIndex: 1,
    position: 'absolute',
    top: '108%',
    // left: '5%',
    //height: 443,
    borderWidth: 0.5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 5, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  UnitScrollView: {
    backgroundColor: 'white',
    width: '100%',
    zIndex: 1,
    position: 'absolute',
    top: '108%',
    //left: '65%',
    height: 'auto',
    borderWidth: 0.5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 5, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  BagSizeScrollView: {
    backgroundColor: 'white',
    width: '100%',
    zIndex: 1,
    position: 'absolute',
    top: '108%',
    //left: '65%',
    height: 'auto',
    borderWidth: 0.5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 5, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
