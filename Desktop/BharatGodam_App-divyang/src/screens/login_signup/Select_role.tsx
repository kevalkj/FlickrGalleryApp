import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import HeaderComponent from '../../components/Header';
import textStyles from '../../components/textStyles';
import componentMapping from '../../utils/componentMapping';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {authApi} from '../../service/api';
import {storeName, storeRole, storeToken} from '../../utils/auth';
import {
  updateLoggedIn,
  setRole,
  setToken,
  setName,
} from '../../redux/slices/user';
import {useDispatch} from 'react-redux';
import CustomModal from '../../components/LoadingModal';
import Layout from '../../layouts/layout';

interface Role {
  name: string;
  comp: string;
  backgroundColor: string;
  image: any;
}

const ChooseRoleScreen: React.FC = ({route}) => {
  const {token, nav} = route?.params;
  const dispatch = useDispatch();
  const [isVisible, setisVisible] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp<Record<string, object>>>();
  const roles = [
    {
      name: 'Farmer',
      backgroundColor: '#E1F5FF',
      image: require('../../assets/images/Group.png'),
      comp: 'FarmerRole',
    },
    {
      name: 'Trader',
      backgroundColor: '#FFF4BF',
      image: require('../../assets/images/Group.png'),
      comp: 'TraderRole',
    },
    {
      name: 'FPO',
      backgroundColor: '#FFD3D2',
      image: require('../../assets/images/Group.png'),
      comp: 'FpoRole',
    },
  ];

  const handleRoleSelection = async (roleName: string) => {
    // Handle role selection here
    setisVisible(true);
    const role = 'user';
    if (nav == 'email') {
      const response = await authApi.CREATE_FARMER_WITHROLE_EMAIL(
        roleName,
        token,
      );
      console.log(response.data.token);
      const auth_token = response.data.token;
      const name = response.data.data.firstName;
      await storeRole(role);
      await storeToken(auth_token);
      await storeName(name);
      dispatch(updateLoggedIn(true));
      dispatch(setRole(role));
      dispatch(setToken(auth_token));
      dispatch(setName(name));
    }
    if (nav == 'phone') {
      const response = await authApi.SIGNUP_FARMER_PHONE(roleName, token);
      const auth_token = response.data.token;
      const name = response.data.data.firstName;
      await storeRole(role);
      await storeToken(auth_token);
      await storeName(name);
      dispatch(updateLoggedIn(true));
      dispatch(setRole(role));
      dispatch(setToken(auth_token));
      dispatch(setName(name));
    }
    // setisVisible(false)
    // navigation.navigate('Dashboard', {})
  };

  const renderRoleItem = ({item}: {item: Role}) => {
    const RoleComponent = componentMapping[item.comp];
    return (
      <TouchableOpacity
        style={[styles.roleContainer, {backgroundColor: item.backgroundColor}]}
        onPress={() => handleRoleSelection(item.name)}>
        {RoleComponent && <RoleComponent />}
        <View style={styles.roleInfo}>
          <Text style={[textStyles.headingH7, styles.roleName]}>
            {item.name}
          </Text>
          {/* Additional information if needed */}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Layout>
      <View style={styles.container}>
        <HeaderComponent title="Choose a role" />
        <FlatList
          data={roles}
          renderItem={renderRoleItem}
          keyExtractor={item => item.name}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
        <CustomModal isVisible={isVisible} setIsVisible={setisVisible} />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  roleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingVertical: 12,
    marginVertical: 15,
    borderBottomWidth: 1,
    borderRadius: 8,
    borderBottomColor: '#ddd',
  },
  roleName: {
    color: '#1C1C1C',
    marginLeft: 10,
  },
  roleImage: {
    width: 50,
    height: 70,
    borderRadius: 25,
    marginHorizontal: 10,
  },
  roleInfo: {
    flex: 1,
    marginLeft: 5,
  },
});

export default ChooseRoleScreen;
