import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  ImageBackground,
} from 'react-native';

const SafetyAlert = ({isVisible, navigation}) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Image style={styles.img} source={require('../assets/Objects.png')} />
          <Text style={styles.modalText}>Are you Safe?</Text>
          <Text style={styles.description}>
            Your vehicle has not moved for the past 10 minutes. If there is any
            problem, please contact us immediately for assistance.
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonY}
              onPress={() => {
                navigation.goBack();
              }}>
              <Text style={styles.textStyleY}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonN}
              onPress={() => {
                navigation.goBack();
              }}>
              <Text style={styles.textStyleN}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setModalVisible(true);
    }, 60);

    return () => clearTimeout(timer);
  }, []);

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/basemap.png')}
        style={styles.map}>
        <View style={styles.darkenOverlay} />
        {modalVisible && <View style={styles.overlay} />}
        <SafetyAlert isVisible={modalVisible} onClose={closeModal} />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  darkenOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 6.2)',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    zIndex: 2,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 34,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  img: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'Inter',
  },
  description: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  buttonY: {
    borderRadius: 27.5,
    paddingTop: 10,
    paddingRight: 60,
    paddingBottom: 10,
    paddingLeft: 60,
    elevation: 2,
    marginHorizontal: 10,
    backgroundColor: '#FFD700',
  },
  buttonN: {
    borderRadius: 27.5,
    borderWidth: 1.5,
    borderColor: '#F8C218',
    paddingTop: 10,
    paddingRight: 60,
    paddingBottom: 10,
    paddingLeft: 60,
    elevation: 2,
    marginHorizontal: 10,
    backgroundColor: 'white',
  },
  textStyleY: {
    color: 'black',
    fontFamily: 'Inter',
    textAlign: 'center',
  },
  textStyleN: {
    color: '#F8C218',
    fontFamily: 'Inter',
    textAlign: 'center',
  },
});

export default SafetyAlert;
