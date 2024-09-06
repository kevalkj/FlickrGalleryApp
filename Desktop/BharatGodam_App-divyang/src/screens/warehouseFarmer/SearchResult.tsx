import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import textStyles from '../../components/textStyles';
import Location from '../../assets/Location';
import Back from '../../assets/Back';
import Dropdown from '../../assets/Dropdown';
import ArrowSwap from '../../assets/ArrowSwap';
import Filter from '../../assets/Filter';
import Edit from '../../assets/Edit';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../../types/navigationTypes';
import {Warehouse} from '../../types/entities';
import {NavigationData} from './SearchWarehouse';
import Layout from '../../layouts/layout';
import HeartIcon from '../../assets/add-fav';

type SearchScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SearchResult'
>;

const sharedScrollViewStyle: ViewStyle = {
  backgroundColor: 'white',
  width: '100%',
  zIndex: 100,
  position: 'absolute',
  top: '108%',
  height: 'auto',
  borderWidth: 0.5,
  borderRadius: 8,
  shadowColor: '#000',
  shadowOffset: {width: 5, height: 2},
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
};

function calculateCostPerBagPerDay(
  warehouse: Warehouse,
  bookingdata: NavigationData,
): number | null {
  const selectedCommodity = warehouse.Commodity.find(
    commodity => commodity.name === bookingdata.SelectedCommodity,
  );
  if (!selectedCommodity) {
    console.error('Commodity not found in the warehouse');
    return null;
  }
  const bagWeight = parseFloat(bookingdata.SelectedBagsize.split(' ')[0]);
  const pricePerDay = selectedCommodity.price_perday.find(
    price => parseFloat(price.weight) === bagWeight,
  );
  if (!pricePerDay) {
    console.error('Price per day not found for the selected bag size');
    return null;
  }

  return pricePerDay.price;
}

const filterWarehousesByBagSize = (
  warehouses: Warehouse[],
  commodityName: string,
  desiredBagSize: string,
): Warehouse[] => {
  return warehouses.filter(warehouse =>
    warehouse.Commodity.some(
      commodity =>
        commodity.name === commodityName &&
        commodity.price_perday.some(
          price => price.weight === desiredBagSize.split(' ')[0],
        ),
    ),
  );
};

const DropdownOption = React.memo(({label, onPress}) => (
  <TouchableOpacity
    style={{
      borderRadius: 8,
      height: 50,
      justifyContent: 'center',
    }}
    onPress={onPress}>
    <Text style={{fontWeight: 'bold', paddingLeft: 20, color: 'black'}}>
      {label}
    </Text>
  </TouchableOpacity>
));

const SortByDropdown: React.FC<{onSelect: (label: string) => void}> =
  React.memo(({onSelect}) => {
    const SortBy = [
      {label: 'Price : low to high'},
      {label: 'Price : high to low'},
      {label: 'Highest user rating'},
      {label: 'Near me'},
    ];

    return (
      <View style={[sharedScrollViewStyle, {width: '50%'}]}>
        {SortBy.map((item, index) => (
          <DropdownOption
            key={index}
            label={item.label}
            onPress={() => onSelect(item.label)}
          />
        ))}
      </View>
    );
  });

const RatingsDropdown: React.FC<{onSelect: (label: string) => void}> =
  React.memo(({onSelect}) => {
    const Ratings = [
      {label: '5 star (65)'},
      {label: '4 Star (43)'},
      {label: '3 star (21)'},
    ];

    return (
      <View style={[sharedScrollViewStyle]}>
        {Ratings.map((item, index) => (
          <DropdownOption
            key={index}
            label={item.label}
            onPress={() => onSelect(item.label)}
          />
        ))}
      </View>
    );
  });

const SearchResult: React.FC<SearchScreenProps> = ({route, navigation}) => {
  const {warehouses, addr, Bookingdata} = route?.params;
  // let warehouses = [];
  // let Bookingdata = {};
  // let addr = 'testing';
  const [sortBy, setSortBy] = useState('');
  console.log(sortBy);
  const [rating, setRating] = useState('');
  console.log(rating);
  const [openSortByModal, setOpenSortByModal] = useState(false);
  const [openRatingsModal, setOpenRatingsModal] = useState(false);

  function formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.toLocaleString('en-US', {month: 'short'});
    const weekDay = date.toLocaleString('en-US', {weekday: 'short'});

    return `${day} ${month}, ${weekDay}`;
  }

  const today = new Date();
  const filteredWarehouses = filterWarehousesByBagSize(
    warehouses,
    Bookingdata?.SelectedCommodity,
    Bookingdata?.SelectedBagsize,
  );

  const handleSortBySelect = useCallback((label: string) => {
    setSortBy(label);
    setOpenSortByModal(false);
  }, []);

  const handleRatingsSelect = useCallback((label: string) => {
    setRating(label);
    setOpenRatingsModal(false);
  }, []);

  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              style={{marginLeft: 20, marginRight: 8}}
              onPress={() => navigation.goBack()}>
              <Back />
            </TouchableOpacity>
            <View>
              <Text style={[textStyles.headingH8, {color: 'black'}]}>
                {addr}
              </Text>
              <Text style={textStyles.bodyB4}>{formatDate(today)}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={{marginRight: 8}}
            onPress={() => navigation.goBack()}>
            <Edit />
            <Text style={textStyles.bodyB4}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.filtersContainer}>
          <TouchableOpacity
            style={styles.sortBy}
            onPress={() => setOpenSortByModal(!openSortByModal)}>
            <Text style={[textStyles.uiText, {lineHeight: 20}]}>Sort by</Text>
            <View>
              <ArrowSwap />
            </View>
          </TouchableOpacity>
          {openSortByModal && <SortByDropdown onSelect={handleSortBySelect} />}
          <TouchableOpacity
            onPress={() => navigation.navigate('Filter')}
            style={styles.filters}>
            <Text style={[textStyles.uiText, {lineHeight: 20}]}>Filters</Text>
            <View>
              <Filter />
            </View>
          </TouchableOpacity>
          <View>
            <TouchableOpacity
              style={styles.ratings}
              onPress={() => setOpenRatingsModal(!openRatingsModal)}>
              <Text style={[textStyles.uiText, {lineHeight: 20}]}>Ratings</Text>
              <View>
                <Dropdown />
              </View>
            </TouchableOpacity>
            {openRatingsModal && (
              <RatingsDropdown onSelect={handleRatingsSelect} />
            )}
          </View>
        </View>
        <View style={styles.resultListTitle}>
          <Text style={[textStyles.headingH6, {color: 'black'}]}>
            Showing warehouses in {addr?.split(',')[0]}
          </Text>
        </View>
        <View style={{padding: 16, height: '76.5%', zIndex: -10}}>
          <ScrollView>
            {warehouses && filteredWarehouses.length > 0 ? (
              filteredWarehouses.map((item, index) => {
                // console.log('Warehouses :', warehouses);
                const firstCommodity = item.Commodity[0];
                return (
                  <View key={index} style={styles.warehouseCard}>
                    <View style={styles.warehouseImageContainer}>
                      <Image
                        source={{uri: item.main_photo[0]}}
                        style={styles.warehouseImage}
                      />
                      <View style={styles.addToFavIcon}>
                        <TouchableOpacity>
                          <HeartIcon />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <TouchableOpacity
                      key={index + 1}
                      onPress={() =>
                        navigation.navigate('WarehouseDetails', {
                          warehouse: item,
                          Bookingdata: Bookingdata,
                          simmilarWarehouses: filteredWarehouses,
                        })
                      }
                      style={styles.warehouseDetailsContainer}>
                      <View style={styles.titleContainer}>
                        <Text
                          style={[textStyles.headingH6_5, {color: 'black'}]}>
                          {item.warehouse_name}
                        </Text>
                        <View style={styles.ratingContainer}>
                          <Image
                            source={require('../../assets/images/yellowStar.png')}
                            width={16}
                            height={16}
                          />
                          <Text>{3.5}</Text>
                        </View>
                      </View>
                      <View style={styles.locationContainer}>
                        <View style={{padding: 5}}>
                          <Location />
                        </View>
                        <Text
                          style={[
                            textStyles.bodyB3,
                            {color: 'black', marginLeft: 6},
                          ]}>{`${item.locality_area},\n${item.city},`}</Text>
                      </View>
                      <View>
                        <Text style={textStyles.bodyB4}>
                          {item.remainingCapacity}MT Available capacity
                        </Text>
                      </View>
                      <View style={{alignItems: 'flex-end'}}>
                        <View style={{flexDirection: 'row', marginBottom: 4}}>
                          <Text
                            style={[textStyles.headingH7, {color: 'black'}]}>
                            ₹{calculateCostPerBagPerDay(item, Bookingdata)}
                          </Text>
                          <Text style={[textStyles.bodyB4, {color: 'black'}]}>
                            /{firstCommodity ? firstCommodity.weight : '15'}{' '}
                            bag/day
                          </Text>
                        </View>
                        <View>
                          <Text style={textStyles.bodyB4}>
                            {'+₹ 5/km transport charge'}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })
            ) : (
              <View>
                <Text style={styles.noWarehouse}>
                  No Warehouse found in your Area
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Layout>
  );
};

export default SearchResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  headerContainer: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#707371',
    justifyContent: 'space-between',
    width: '90%',
    marginHorizontal: '5%',
    margin: 16,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filtersContainer: {
    flexDirection: 'row',
    width: '90%',
    marginHorizontal: '5%',
    marginBottom: 24,
    justifyContent: 'space-between',
  },
  sortBy: {
    borderWidth: 1,
    height: 32,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 8,
    borderColor: '#707371',
    flexDirection: 'row',
    width: 100,
    // marginRight: 70,
  },
  filters: {
    borderWidth: 1,
    height: 32,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 8,
    borderColor: '#707371',
    flexDirection: 'row',
    width: 88,
    marginLeft: 20,
  },
  ratings: {
    borderWidth: 1,
    height: 32,
    alignItems: 'center',
    borderRadius: 8,
    borderColor: '#707371',
    flexDirection: 'row',
    width: 100,
    marginLeft: 20,
    justifyContent: 'space-evenly',
  },
  resultListTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
    zIndex: -10,
  },
  warehouseCard: {
    width: '99%',
    height: 'auto',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  warehouseImageContainer: {
    width: '99%',
    height: 200,
    backgroundColor: 'brown',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  warehouseImage: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  warehouseDetailsContainer: {
    width: '99%',
    height: 160,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 12,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  noWarehouse: {
    textAlign: 'center',
  },
  addToFavIcon: {position: 'absolute', right: 15, top: 15},
  ratingContainer: {marginLeft: 6, flexDirection: 'row'},
  titleContainer: {flexDirection: 'row'},
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
});
