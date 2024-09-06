import {StyleSheet, View} from 'react-native';
import HeaderComponent from '../../components/Header';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../../types/navigationTypes';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Plus from '../../assets/Plus';
import {Text} from 'react-native';
import textStyles from '../../components/textStyles';
import {RadioButton} from 'react-native-paper';
import CustomButton from '../../components/CustomButton';
import React, {useEffect, useState} from 'react';
import {warehouseApi} from '../../service/api';
import {Manager} from '../../types/entities';
import Layout from '../../layouts/layout';

type ListScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ListManager'
>;

const managers = [
  {id: 1, name: 'Alice Johnson'},
  {id: 2, name: 'Ritesh Smith'},
  {id: 3, name: 'Charlie Brown'},
  {id: 4, name: 'David Williams'},
  {id: 5, name: 'Emma Davis'},
  {id: 6, name: 'Fiona Clark'},
  {id: 7, name: 'George Harris'},
  {id: 8, name: 'Hannah Lewis'},
  {id: 9, name: 'Ian Walker'},
  {id: 10, name: 'Julia Scott'},
];

const ListManager: React.FC<ListScreenProps> = ({navigation, route}) => {
  const [checked, setChecked] = useState('');
  const [managers, setmanagers] = useState<Manager[]>([]);
  const {warehouse} = route.params;

  const getmanagers = async () => {
    try {
      const response = await warehouseApi.getWarehouseManagerbyOwner();
      console.log(response, 100);
      if (response) {
        console.log('Manager data : ', response);
        setmanagers(response);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const assignManager = async () => {
    try {
      console.log(checked);

      const response = await warehouseApi.assignWarehouseManager(
        warehouse?._id || '',
        checked,
      );
      if (response) {
        console.log('Manager data : ', response.data);
      }
      navigation.navigate('Warehouse');
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    getmanagers();
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: '#ffffff', gap: 4}}>
      <Layout>
        <View>
          <HeaderComponent title="List of managers" />
        </View>

        <Text
          style={[
            textStyles.bodyBoldB3,
            {
              marginLeft: 20,
              color: 'black',
              marginBottom: 10,
            },
          ]}>
          Select a manager from the following list
        </Text>

        <ScrollView style={styles.radioButtonsContainer}>
          {managers.length > 0 ? (
            managers.map(manager => (
              <View key={manager._id} style={styles.radioButton}>
                {checked === manager._id ? (
                  <RadioButton
                    value={manager.name}
                    status="checked"
                    onPress={() => setChecked(manager._id)}
                    color="#0C447D" // Checked radio button color
                  />
                ) : (
                  <TouchableOpacity
                    style={styles.uncheckedBox}
                    onPress={() => setChecked(manager._id)}>
                    <View style={styles.innerUncheckedBox} />
                  </TouchableOpacity>
                )}
                <Text style={styles.radioButtonText}>{manager.name}</Text>
              </View>
            ))
          ) : (
            <Text>No managers available</Text>
          )}
        </ScrollView>

        <TouchableOpacity
          style={{
            gap: 4,
            padding: 4,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            navigation.navigate('Add Manager');
          }}>
          <Plus color={'#0C447D'} props={undefined} />
          <Text style={[textStyles.buttonTextUnderline]}>Add manager</Text>
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          <CustomButton
            role="iButton"
            text="Select a manager"
            txtcolor="#FFFFFF"
            bgcolor="#0C447D"
            borderColor="#0C447D"
            onPress={assignManager}
            disabled={checked === ''}
          />
        </View>
      </Layout>
    </View>
  );
};

const styles = StyleSheet.create({
  radioButtonsContainer: {
    padding: '1.5%',
    marginLeft: 10,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1C1C1C',
    marginLeft: 5,
  },
  uncheckedBox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#0C447D', // Color of the border for unchecked state
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
    marginVertical: 6,
  },
  innerUncheckedBox: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'white',
  },
  buttonContainer: {
    padding: 10,
    paddingTop: 15,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ListManager;
