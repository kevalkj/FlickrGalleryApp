/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native';
import WelcomeImg from '../../assets/Welcome';
import CustomButton from '../../components/CustomButton';
import Or from '../../assets/Or';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import Dissmiss from '../../assets/Dissmiss';
import Google from '../../assets/Google';
import textStyles from '../../components/textStyles';
import {RootStackParamList} from '../../types/navigationTypes'; // Adjust import path as necessary
import Layout from '../../layouts/layout';

const {width, height} = Dimensions.get('window');

const WelcomeBGScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [role, setRole] = useState('');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#ffffff',
    },
    title: {
      marginTop: height * 0.05,
      marginBottom: height * 0.08,
      fontFamily: 'Poppins-SemiBold',
      fontSize: height * 0.04,
      lineHeight: 38.4,
      textAlign: 'center',
      color: '#1C1C1C',
      width: 328,
    } as TextStyle,
    buttonBox: {
      marginTop: height * 0.07375,
      width: width * 0.9111111111111111,
      height: height * 0.1775,
    },
    signup: {
      textAlign: 'center',
    } as TextStyle,
    textmodal: {
      position: 'absolute',
      top: height * 0.09,
      marginHorizontal: width * 0.1375,
      fontFamily: 'Poppins',
      fontSize: 20,
      fontWeight: 'bold',
      lineHeight: 24,
      textAlign: 'center',
      color: '#1C1C1C',
    } as TextStyle,
    DissmissBotton: {
      position: 'absolute',
      width: width * 0.0666666666666667,
      height: height * 0.03,
      justifyContent: 'center',
      alignItems: 'center',
      left: width - width * 0.1111111111111111,
      top: height * 0.02,
    },
    modelBox: {
      position: 'absolute',
      top: height * 0.15,
      marginHorizontal: width * 0.0444444444444444,
      height: role == 'Log in' ? height * 0.295 : height * 0.20625,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    modalContainer: {
      width: width,
      height: role == 'Log in' ? height * 0.5175 : height * 0.4375,
      bottom: 0,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      backgroundColor: 'white',
      position: 'absolute',
      alignItems: 'center',
    },
  });

  const openModal = () => {
    setIsVisible(true);
  };

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to BharatGodam</Text>
        <View>
          <WelcomeImg />
        </View>
        <View style={styles.buttonBox}>
          <CustomButton
            text={'Sign up'}
            role="iButton"
            bgcolor={'#0C447D'}
            txtcolor={'#FFFFFF'}
            borderColor="#0C447D"
            onPress={() => {
              setRole('Sign up');
              openModal();
            }}
          />
          <CustomButton
            text={'Log in'}
            role="iButton"
            bgcolor={''}
            txtcolor={'#07294B'}
            borderColor="#07294B"
            marginT={height * 0.02}
            marginB={height * 0.02}
            onPress={() => {
              setRole('Log in');
              openModal();
            }}
          />
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={[textStyles.buttonTextUnderline, styles.signup]}>
              {'Skip for now'}
            </Text>
          </TouchableOpacity>
          <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={() => setIsVisible(false)}>
            <TouchableOpacity
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                width: width,
                height: height,
              }}
              onPress={() => setIsVisible(false)}
            />
            <View style={[styles.modalContainer]}>
              <TouchableOpacity
                onPress={() => setIsVisible(false)}
                style={styles.DissmissBotton}>
                <Dissmiss />
              </TouchableOpacity>
              <Text style={styles.textmodal}>Choose a {role} method</Text>
              <View style={styles.modelBox}>
                <CustomButton
                  role="phone"
                  text={role}
                  bgcolor="#0C447D"
                  borderColor="#0C447D"
                  txtcolor="#FFFFFF"
                  onPress={() => {
                    if (role == 'Sign up') {
                      navigation.navigate('SignupMob');
                    } else {
                      navigation.navigate('LoginMob');
                    }
                    setIsVisible(false);
                  }}
                />
                <Or />
                <CustomButton
                  text={role}
                  bgcolor="white"
                  borderColor="#07294B"
                  txtcolor="#07294B"
                  onPress={() => {
                    if (role == 'Sign up') {
                      navigation.navigate('SignupEmail');
                    } else {
                      navigation.navigate('LoginEmail');
                    }
                    setIsVisible(false);
                  }}
                />
                {role == 'Log in' && (
                  <>
                    <Or />
                    <CustomButton
                      role="iButton"
                      text="   Log in with Google"
                      txtcolor="#07294B"
                      component={() => <Google />}
                    />
                  </>
                )}
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </Layout>
  );
};

export default WelcomeBGScreen;
