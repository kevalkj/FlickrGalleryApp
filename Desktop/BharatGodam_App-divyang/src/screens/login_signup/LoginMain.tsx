import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import LoginBtn from '../../components/Modal';

const LoginMain: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleLoginButtonClick = () => {
    setIsModalVisible(true);
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={[styles.text, {top: 84}]}>Log in as</Text>
        <LoginBtn
          top={140}
          imageUrl={require('../../assets/Vector.png')}
          text={'Farmer/Trader'}
        />
        <LoginBtn
          top={248}
          imageUrl={require('../../assets/Vector.png')}
          text={'Warehouse owner'}
        />
        <LoginBtn
          top={356}
          imageUrl={require('../../assets/Vector.png')}
          text={'Bank employee'}
        />
      </View>
      <View style={[{flexDirection: 'row', position: 'absolute'}]}>
        <Text style={[styles.signup, {top: 470, left: 16}]}>
          Don’t have an account?
        </Text>
        <TouchableOpacity>
          <Text
            style={[
              styles.signup,
              {
                top: 470,
                left: 165,
                textDecorationLine: 'underline',
                fontWeight: 'bold',
              },
            ]}>
            {'Sign up'}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    position: 'absolute',
    marginLeft: '5%',
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 24,
    textAlign: 'center',
    color: '#626262',
  } as TextStyle,
  signup: {
    position: 'absolute',
    fontFamily: 'Noto Serif',
    fontSize: 14,
    lineHeight: 14,
    textAlign: 'center',
    color: '#232323',
  } as TextStyle,
});

export default LoginMain;
