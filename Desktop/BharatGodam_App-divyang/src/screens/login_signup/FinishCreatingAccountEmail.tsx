import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {RadioButton} from 'react-native-paper';
import HeaderComponent from '../../components/Header';
import CustomButton from '../../components/CustomButton';
import CustomInputText from '../../components/CustomInputText';
import PasswordInput from '../../components/PasswordInput';
import textStyles from '../../components/textStyles';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
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

const FinishWithEmail = ({route}) => {
  const {email} = route?.params;
  const {token} = route?.params;
  const navigation = useNavigation<NavigationProp<Record<string, object>>>();
  const [isVisible, setisVisible] = useState<boolean>(false);
  const [checked, setChecked] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [pass, setPass] = useState('');
  const dispatch = useDispatch();

  const allFieldsFilled =
    pass !== '' && lname !== '' && fname !== '' && checked !== '';

  const handleCreateAccount = async () => {
    try {
      setisVisible(true);
      if (checked == 'Farmer/FPO/Trader') {
        const response = await authApi.SIGNUP_WITH_FARMER_WITH_EMAIL(
          fname,
          lname,
          pass,
          token,
        );
        console.log(response.data.token);
        navigation.navigate('SelectRole', {
          token: response.data.token,
          nav: 'email',
        });
      } else {
        const response = await authApi.CREATE_ACCOUNT_WITH_EMAIL(
          fname,
          lname,
          checked,
          pass,
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

          checked == 'Warehouse owner'
            ? navigation.navigate('Dashboard', {variant: 'owner'})
            : null;
        }
      }
    } catch (error) {
      console.error('Verification failed:', error);
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
        <View style={[styles.inputContainer, {height: 60}]}>
          <Text style={[textStyles.bodyB4, styles.text]}>Email</Text>
          <Text
            style={[
              textStyles.headingH8,
              {color: '#222222', paddingHorizontal: 10},
            ]}>
            {email}
          </Text>
        </View>
        <View style={styles.EmailContainer}>
          <PasswordInput onTextChange={text => setPass(text)} />
          <Text style={styles.passMsg}>Use 6 or more characters</Text>
        </View>
        <View style={styles.professionTextContainer}>
          <Text style={styles.professionText}>Select a profession</Text>
        </View>
        <View style={styles.radioButtonsContainer}>
          <CustomRadioButton
            value="Farmer/FPO/Trader"
            label="Farmer/FPO/Trader"
            checked={checked}
            onPress={() => setChecked('Farmer/FPO/Trader')}
          />
          <CustomRadioButton
            value="Warehouse owner"
            label="Warehouse owner"
            checked={checked}
            onPress={() => setChecked('Warehouse owner')}
          />
          <CustomRadioButton
            value="Pledge"
            label="Pledge"
            checked={checked}
            onPress={() => setChecked('Pledge')}
          />
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            role="iButton"
            text="Register"
            txtcolor="#FFFFFF"
            bgcolor="#0C447D"
            borderColor="#0C447D"
            onPress={() => handleCreateAccount()}
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
  inputContainer: {
    marginVertical: '3%',
    marginHorizontal: '4%',
    borderWidth: 1,
    borderColor: '#707371',
    borderRadius: 7,
  },
  EmailContainer: {
    height: 55,
    paddingHorizontal: 10,
    marginHorizontal: 6,
    marginVertical: 10,
  },
  inputSeparator: {
    borderTopWidth: 1,
    width: '100%',
  },
  text: {
    paddingLeft: 12,
    padding: '2%',
  },
  professionTextContainer: {
    padding: '4%',
    marginTop: 6,
  },
  professionText: {
    fontWeight: 'bold',
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
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1C',
  },
  buttonContainer: {
    // padding: 10,
    paddingTop: 15,
    marginHorizontal: '4%',
  },
  passMsg: {
    fontSize: 12,
    fontFamily: 'NotoSerif-Regular',
    marginTop: 6,
    marginLeft: 2,
    color: '#707371',
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
});

export default FinishWithEmail;
