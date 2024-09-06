
import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {RadioButton} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import HeaderComponent from '../../components/Header';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import CustomInputText from '../../components/CustomInputText';
import textStyles from '../../components/textStyles';
import {authApi} from '../../service/api';
import {storeName, storeRole, storeToken} from '../../utils/auth';
import {
  updateLoggedIn,
  setRole,
  setToken,
  setName,
} from '../../redux/slices/user';
import CustomModal from '../../components/LoadingModal';
import Layout from '../../layouts/layout';
import CustomRadioButton from '../../components/CustomRadioButton';

const Register = ({route}) => {
  const {mobile, token} = route?.params;
  const [isVisible, setisVisible] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp<Record<string, object>>>();
  const dispatch = useDispatch();
  const [checked, setChecked] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [btnColor, setBtncolor] = useState<string>('gray');

  const allFieldsFilled = lname !== '' && fname !== '' && checked !== '';

  const handleCreateAccount = async () => {
    try {
      setisVisible(true);
      if (checked === 'Farmer/FPO/Trader') {
        const response = await authApi.CREATE_FARMER_WITH_PHONE(
          fname,
          lname,
          token,
        );
        console.log(response.data.token);
        navigation.navigate('SelectRole', {
          token: response.data.token,
          nav: 'phone',
        });
      } else {
        const response = await authApi.CREATE_ACCOUNT_WITH_PHONE(
          fname,
          lname,
          checked,
          token,
        );
        if (response.data) {
          const token = response.data.token;
          const name = response.data.data.firstName;
          const role = 'owner';
          await storeRole(role);
          await storeToken(token);
          await storeName(name);
          dispatch(updateLoggedIn(true));
          dispatch(setRole(role));
          dispatch(setToken(token));
          dispatch(setName(name));
        }
      }
    } catch (error) {
      console.error('Account creation failed:', error);
    } finally {
      setisVisible(false);
    }
  };

  return (
    <Layout>
      <View style={styles.container}>
        <HeaderComponent title="Finish creating account" />
        <View style={styles.inputContainer}>
          <CustomInputText
            PlaceHolder="First Name"
            onTextChange={text => setFname(text)}
          />
          <View style={styles.inputSeparator} />
          <CustomInputText
            PlaceHolder="Last Name"
            onTextChange={text => setLname(text)}
          />
        </View>
        <View>
          <View style={styles.phoneContainer}>
            <Text style={[styles.countryCode, textStyles.headingH8]}>+91</Text>
            <View style={styles.separator1} />
            <View style={styles.inputContainer1}>
              <Text style={[textStyles.bodyB4]}>Phone number</Text>
              <Text style={[textStyles.headingH8, {color: '#222222'}]}>
                {mobile}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.professionTextContainer}>
          <Text style={styles.professionText}>Select a profession</Text>
        </View>
        <View style={styles.radioButtonsContainer}>
          <View style={styles.radioButton}>
            <RadioButton
              value="Farmer/FPO/Trader"
              status={checked === 'Farmer/FPO/Trader' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('Farmer/FPO/Trader')}
            />
            <Text style={styles.radioButtonText}>Farmer/FPO/Trader</Text>
          </View>
          <View style={styles.radioButton}>
            <RadioButton
              value="Warehouse owner"
              status={checked === 'Warehouse owner' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('Warehouse owner')}
            />
            <Text style={styles.radioButtonText}>Warehouse owner</Text>
          </View>
          <View style={styles.radioButton}>
            <RadioButton
              value="Pledge"
              status={checked === 'Pledge' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('Pledge')}
            />
            <Text style={styles.radioButtonText}>Pledge</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            role="iButton"
            text="Register"
            txtcolor="#FFFFFF"
            bgcolor="#0C447D"
            borderColor="#0C447D"
            onPress={handleCreateAccount}
            disabled={!allFieldsFilled}
          />
        </View>
        <CustomModal isVisible={isVisible} setIsVisible={setisVisible} />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  countryCode: {
    fontSize: 16,
    marginHorizontal: 10,
    color: '#1C1C1C',
  },
  separator1: {
    borderLeftWidth: 1,
    height: '100%',
    borderColor: '#707371',
    marginHorizontal: 9,
  },
  inputContainer: {
    marginVertical: '3%',
    marginHorizontal: '4%',
    borderWidth: 1,
    borderColor: '#707371',
    borderRadius: 7,
  },
  inputContainer1: {
    gap: 5,
    padding: '2%',
  },
  inputSeparator: {
    borderTopWidth: 1,
    borderColor: '#707371',
    width: '100%',
  },
  professionTextContainer: {
    marginTop: '5%',
    marginHorizontal: '4%',
  },
  professionText: {
    fontWeight: '500',
    color: '#1C1C1C',
    fontSize: 14,
    fontFamily: 'Poppins',
  },
  radioButtonsContainer: {
    marginHorizontal: '4%',
    marginTop: '2%',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#1C1C1C',
    fontFamily: 'NotoSerif-Regular',
    lineHeight: 21,
  },
  buttonContainer: {
    // padding: 10,
    paddingTop: 15,
    marginHorizontal: '4%',
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: 'gray',
    marginHorizontal: '4%',
  },
});

export default Register;
