import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import HeaderComponent from '../../components/Header';
import CheckBox from '../../components/CheckBox';
import CheckButton from '../../components/CheckButton';
import Slider from '../../components/Slider';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../../types/navigationTypes';
import Layout from '../../layouts/layout';

type FilterProps = NativeStackScreenProps<RootStackParamList, 'Filter'>;

type filters = [string, string[]];
interface warehouselicense {
  'WDRA license': boolean;
  'FSSAI license': boolean;
  'Procurement license': boolean;
  'Storage license': boolean;
}
interface ancillaryservices {
  'Warehouse Management': boolean;
  Finance: boolean;
  'Quality Testing': boolean;
  Fumigation: boolean;
  Monitoring: boolean;
  Insurance: boolean;
}
interface amenties {
  'Pakka room': boolean;
  'Kacha room': boolean;
}
interface bookingoption {
  Full: boolean;
  Partial: boolean;
}
interface warehousestructure {
  RCC: boolean;
  PEB: boolean;
  Hybrid: boolean;
}
interface checkbutton {
  Yes: boolean;
  No: boolean;
}
interface filterTextData {
  'Warehouse license': warehouselicense;
  'Ancillary Services': ancillaryservices;
  Amenties: amenties;
  'Booking Option': bookingoption;
  'Warehouse structure': warehousestructure;
  'Seperate guard room': checkbutton;
  'Brokerage room': checkbutton;
}
interface filterNumericData {
  'Distance from rake point (km)': number[];
  'Distance from APMC point (km)': number[];
}
type AllKeys =
  | keyof warehouselicense
  | keyof ancillaryservices
  | keyof amenties
  | keyof bookingoption
  | keyof warehousestructure
  | keyof checkbutton;

const Filter: React.FC<FilterProps> = ({navigation}) => {
  const [filterTextData, setFilterTextData] = useState<filterTextData>({
    'Warehouse license': {
      'WDRA license': false,
      'FSSAI license': false,
      'Procurement license': false,
      'Storage license': false,
    },
    'Ancillary Services': {
      'Warehouse Management': false,
      Finance: false,
      'Quality Testing': false,
      Fumigation: false,
      Monitoring: false,
      Insurance: false,
    },
    Amenties: {
      'Pakka room': false,
      'Kacha room': false,
    },
    'Booking Option': {
      Full: false,
      Partial: false,
    },
    'Warehouse structure': {
      RCC: false,
      PEB: false,
      Hybrid: false,
    },
    'Seperate guard room': {
      Yes: false,
      No: false,
    },
    'Brokerage room': {
      Yes: false,
      No: false,
    },
  });
  // min max data should be changed based on the data from client
  const [filterNumericData, setFilterNumericData] = useState<filterNumericData>(
    {
      'Distance from rake point (km)': [0, 10],
      'Distance from APMC point (km)': [0, 10],
    },
  );
  const handleTextFilter = (option: keyof filterTextData, value: AllKeys) => {
    const temp = filterTextData;
    temp[option][value] = !temp[option][value];
    setFilterTextData(temp);
  };
  const handleNumericFilter = (
    option: keyof filterNumericData,
    data: number,
    variant: string,
  ) => {
    const temp = filterNumericData;
    if (variant === 'min') {
      temp[option][0] = data;
    } else {
      temp[option][1] = data;
    }
    setFilterNumericData(temp);
  };
  const filtersWithCheckBox: filters[] = [
    [
      'Warehouse license',
      [
        'WDRA license',
        'FSSAI license',
        'Procurement license',
        'Storage license',
      ],
    ],
    [
      'Ancillary Services',
      [
        'Warehouse Management',
        'Finance',
        'Quality Testing',
        'Fumigation',
        'Monitoring',
        'Insurance',
      ],
    ],
    ['Amenties', ['Pakka room', 'Kacha room']],
    ['Booking Option', ['Full', 'Partial']],
    ['Warehouse structure', ['RCC', 'PEB', 'Hybrid']],
  ];
  const filtersWithCheckButton: string[] = [
    'Seperate guard room',
    'Brokerage room',
  ];
  const filtersWithSilder: string[] = [
    'Distance from rake point (km)',
    'Distance from APMC point (km)',
  ];

  const renderFilterWithCheckBox = (
    filterHeader: string,
    filterContent: string[],
  ) => {
    return (
      <View style={styles.filter}>
        <Text style={styles.filterHeader}>{filterHeader}</Text>
        {filterContent.map((content: string) => {
          return (
            <View style={styles.filterOption}>
              <CheckBox
                onPress={() =>
                  handleTextFilter(
                    filterHeader as keyof filterTextData,
                    content as AllKeys,
                  )
                }
              />
              <Text style={styles.filterOptionText}>{content}</Text>
            </View>
          );
        })}
      </View>
    );
  };
  const renderFilterWithCheckButton = (filterHeader: string) => {
    return (
      <View style={styles.filter}>
        <Text style={styles.filterHeader}>{filterHeader}</Text>
        <View style={styles.filterOptionContainer}>
          {['Yes', 'No'].map((content: string) => {
            return (
              <View style={styles.filterOption}>
                <CheckButton
                  onPress={() =>
                    handleTextFilter(
                      filterHeader as keyof filterTextData,
                      content as AllKeys,
                    )
                  }
                />
                <Text style={styles.filterOptionText}>{content}</Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  };
  // min max data should be changed based on the data from client
  const renderFilterWithSilder = (filterHeader: string) => {
    return (
      <View style={styles.filter}>
        <Text style={styles.filterHeader}>{filterHeader}</Text>
        <Slider
          min={0}
          max={10}
          onChange={handleNumericFilter}
          option={filterHeader}
        />
      </View>
    );
  };
  // write search logic here for now it goes back to the search page
  // filterTextData and filterNumericData contains all filter data for query
  const handleSearch = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <Layout>
        <HeaderComponent title={'Filters'} />
        <ScrollView contentContainerStyle={styles.filterContainer}>
          {filtersWithCheckBox
            .slice(0, 4)
            .map(item => renderFilterWithCheckBox(item[0], item[1]))}

          {filtersWithCheckButton.map(item =>
            renderFilterWithCheckButton(item),
          )}

          {renderFilterWithCheckBox(
            filtersWithCheckBox[4][0],
            filtersWithCheckBox[4][1],
          )}
          {filtersWithSilder.map(item => renderFilterWithSilder(item))}
          <TouchableOpacity style={styles.filterButton} onPress={handleSearch}>
            <Text style={styles.filterButtonText}>View 25 warehouses</Text>
          </TouchableOpacity>
        </ScrollView>
      </Layout>
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f7f6',
  },
  filterContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  filter: {
    backgroundColor: 'white',
    width: '90%',
    justifyContent: 'center',
    borderRadius: 10,
    padding: '3.5%',
    marginBottom: '3%',
  },
  filterHeader: {
    color: 'black',
    fontFamily: 'Poppins-Regular',
    marginBottom: '1.2%',
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '1.7%',
    flex: 1,
  },
  filterOptionText: {
    color: 'black',
    fontFamily: 'NotoSerif-Regular',
    marginLeft: '2%',
  },
  filterOptionSilderText: {
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
    marginLeft: '2%',
  },
  filterOptionContainer: {
    flexDirection: 'row',
  },
  filterInput: {
    width: '90%',
    aspectRatio: 2.5,
    borderWidth: 1,
    borderColor: '#939CA3',
    borderRadius: 8,
    color: 'black',
    fontFamily: 'NotoSerif-Regular',
    paddingLeft: '8%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButton: {
    width: '80%',
    aspectRatio: 5,
    borderRadius: 10,
    backgroundColor: '#0C447D',
    marginTop: '1.5%',
    marginBottom: '4%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButtonText: {
    color: 'white',
    fontFamily: 'Poppins-Regular',
  },
});
