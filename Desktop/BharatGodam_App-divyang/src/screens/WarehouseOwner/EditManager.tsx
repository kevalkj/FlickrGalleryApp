import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native';
import textStyles from '../../components/textStyles';
import CustomInputText from '../../components/CustomInputText';
import CustomButton from '../../components/CustomButton';
import {useState} from 'react';
import PasswordInput from '../../components/PasswordInput';
import {warehouseApi} from '../../service/api';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../../types/navigationTypes';
import HeaderComponent from '../../components/Header';
import Layout from '../../layouts/layout';

type EditmanagerScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Add Manager'
>;

const EditManager: React.FC<EditmanagerScreenProps> = ({navigation}) => {
  const [inputs1, setInputs1] = useState<{[key: string]: string}>({
    managerName: '',
    email: '',
    password: '',
  });

  const allFieldsFilled1 = Object.values(inputs1).every(input => input !== '');

  const handleTextChange1 = (key: string) => (text: string) => {
    setInputs1(prevInputs => ({
      ...prevInputs,
      [key]: text,
    }));
  };

  const handleAddManager = async () => {
    try {
      console.log(inputs1, 100);
      const response = await warehouseApi.addWarehouseManager(inputs1);
      console.log(response, 100);
      if (response.data) {
        console.log('Manager data : ', response.data);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleNavigation = () => {
    navigation.navigate('Warehouse');
  };

  return (
    <Layout>
      <View style={{marginHorizontal: 16, flex: 1}}>
        <HeaderComponent title={'Add manager'} />
        <Text
          style={[
            textStyles.headingH6_5,
            {color: '#1c1c1c', marginTop: 24, marginBottom: 14},
          ]}>
          Manager details
        </Text>
        <View style={{marginVertical: '2%', borderWidth: 1, borderRadius: 7}}>
          <CustomInputText
            PlaceHolder="Manager name"
            onTextChange={handleTextChange1('managerName')}
          />
        </View>
        <View style={{marginVertical: '2%', borderWidth: 1, borderRadius: 7}}>
          <CustomInputText
            PlaceHolder="Manager email id"
            onTextChange={handleTextChange1('email')}
          />
        </View>
        <View style={{marginVertical: '2%', borderRadius: 7}}>
          <PasswordInput
            onTextChange={handleTextChange1('password')}
            PlaceHolder="Create password"
          />
        </View>
        <Text style={[textStyles.bodyB4, {color: '#707371', marginBottom: 16}]}>
          Use 6 or more characters
        </Text>
        <CustomButton
          text="Register"
          txtcolor="#FFFFFF"
          bgcolor="#0C447D"
          borderColor="#0C447D"
          role="iButton"
          onPress={() => {
            handleAddManager();
            handleNavigation();
          }}
          disabled={!allFieldsFilled1}
        />
      </View>
    </Layout>
  );
};

export default EditManager;
