import {
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import HomeHeader from '../../components/HomeHeader';
import HomeMenu from '../../components/HomeMenu';
import HomeNotification from '../../components/HomeNotification';
import textStyles from '../../components/textStyles';

const PledgeLoanRequests = () => {
  const [menu, setMenu] = useState<boolean>(false);
  const [notification, setNotification] = useState<boolean>(false);
  const handleMenu = () => {
    setMenu(!menu);
  };
  const handleNotification = () => {
    setNotification(!notification);
  };
  return (
    <View>
      {Platform.OS === 'ios' && (
        <View
          style={{
            height: 35,
            width: '100%',
          }}
        />
      )}
      <HomeHeader
        menuCallBack={handleMenu}
        notificationCallBack={handleNotification}
        occupy={true}
      />
      <ScrollView>
        <Text style={[textStyles.headingH6, {color: '#000000'}]}>
          Loan requests
        </Text>
        <View>
          
        </View>
      </ScrollView>
      <Modal visible={menu} transparent={true}>
        <HomeMenu exitCallBack={handleMenu} />
      </Modal>
      <Modal visible={notification} transparent={true}>
        <HomeNotification exitCallBack={handleNotification} Notification={[]} />
      </Modal>
    </View>
  );
};

export default PledgeLoanRequests;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    height: '100%',
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
