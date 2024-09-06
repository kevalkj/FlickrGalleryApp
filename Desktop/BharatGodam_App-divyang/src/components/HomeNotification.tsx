import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Cross from '../assets/Cross'; // Ensure you have a cross icon component
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  cacheNotifications,
  fetchNotificationsFromAPI,
  getCachedNotifications,
} from '../utils/Notification';

EStyleSheet.build({$rem: Dimensions.get('window').width / 380});

interface HomeMenuProps {
  exitCallBack: () => void;
  title: string;
}

interface Notification {
  title: string;
  content: string;
  read: boolean;
  time: string;
}

export default function HomeNotification(props: HomeMenuProps) {
  const dummyNotifications: Notification[] = [
    {
      title: 'Account Created',
      content: 'Your account has been created',
      read: true,
      time: '2 days ago',
    },
  ];

  const [notificationAll, setNotificationAll] =
    useState<Notification[]>(dummyNotifications);
  const [currentPage, setCurrentPage] = useState<string>('All');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);

  const notificationRead = notificationAll.filter(item => item.read);
  const notificationUnRead = notificationAll.filter(item => !item.read);

  const handleAll = () => {
    setCurrentPage('All');
  };

  const handleUnRead = () => {
    setCurrentPage('UnRead');
  };

  const handleRead = () => {
    setCurrentPage('Read');
  };

  const handleNotificationPress = async (notification: Notification) => {
    setSelectedNotification(notification);
    setModalVisible(true);
    if (!notification.read) {
      const updatedNotifications = notificationAll.map(n =>
        n === notification ? {...n, read: true} : n,
      );

      // Mark as read
      setNotificationAll(updatedNotifications);
      await cacheNotifications(updatedNotifications);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const cachedNotifications = await getCachedNotifications();
      if (cachedNotifications && cachedNotifications.length > 0) {
        setNotificationAll(cachedNotifications);
      } else {
        const notifications = await fetchNotificationsFromAPI(
          cachedNotifications || dummyNotifications,
        );
        if (notifications.length > 0) {
          setNotificationAll(notifications);
          await cacheNotifications(notifications);
        }
      }
    } catch (error) {
      console.error('Failed to fetch notifications', error);
      //Alert.alert('Error', 'Failed to fetch notifications.');
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedNotification(null);
  };

  return (
    <View style={styles.notificationContainer}>
      <View style={styles.notification}>
        <View style={styles.notificationHeader}>
          <View style={styles.notificationHeaderTextContainer}>
            <Text style={styles.notificationHeaderText}>{'Notifications'}</Text>
          </View>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={props.exitCallBack}>
            <Cross />
          </TouchableOpacity>
        </View>
        <View style={styles.notificationOptionsContainer}>
          <TouchableOpacity
            style={styles.notificationOptions}
            onPress={handleAll}>
            <Text
              style={
                currentPage == 'All'
                  ? styles.notificationOptionsTextActive
                  : styles.notificationOptionsTextIdle
              }>
              All
            </Text>
            <View style={styles.notificationOptionCountContainer}>
              <Text style={styles.notificationOptionCount}>
                {notificationUnRead.length}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.notificationOptions}
            onPress={handleUnRead}>
            <Text
              style={
                currentPage == 'UnRead'
                  ? styles.notificationOptionsTextActive
                  : styles.notificationOptionsTextIdle
              }>
              Unread
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.notificationOptions}
            onPress={handleRead}>
            <Text
              style={
                currentPage == 'Read'
                  ? styles.notificationOptionsTextActive
                  : styles.notificationOptionsTextIdle
              }>
              Read
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={
            currentPage === 'All'
              ? notificationAll
              : currentPage === 'UnRead'
              ? notificationUnRead
              : notificationRead
          }
          renderItem={({item}) => (
            <TouchableOpacity
              style={
                item.read ? styles.notificationRead : styles.notificationUnRead
              }
              onPress={() => handleNotificationPress(item)}>
              <Text style={styles.notificationTitle}>{item.title}</Text>
              <Text style={styles.notificationsTime}>{item.time}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      {modalVisible && selectedNotification && (
        <Modal
          visible={modalVisible}
          transparent={true}
          onRequestClose={closeModal}
          animationType="slide">
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Cross size={30} color="#fff" />
            </TouchableOpacity>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                {selectedNotification.title}
              </Text>
              <Text style={styles.modalText}>
                {selectedNotification.content}
              </Text>
              <Text style={styles.modalTime}>{selectedNotification.time}</Text>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = EStyleSheet.create({
  notificationContainer: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notification: {
    backgroundColor: 'white',
    width: '90%',
    height: '82%',
    borderRadius: 4,
  },
  notificationHeader: {
    width: '100%',
    height: '10%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationHeaderTextContainer: {
    flex: 5,
    alignItems: 'flex-end',
  },
  notificationHeaderText: {
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
    fontSize: '20rem',
  },
  headerButton: {
    flex: 2,
    alignItems: 'center',
  },
  notificationOptionsContainer: {
    height: '10%',
    width: '100%',
    flexDirection: 'row',
  },
  notificationOptions: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#707371',
  },
  notificationOptionsTextActive: {
    color: 'black',
    fontWeight: '500',
    marginRight: '2rem',
  },
  notificationOptionsTextIdle: {
    color: 'grey',
    fontWeight: '400',
    marginRight: '2rem',
    fontFamily: 'Poppins-Regular',
  },
  notificationOptionCountContainer: {
    backgroundColor: '#0C447D',
    width: '15%',
    aspectRatio: 1,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationOptionCount: {
    color: 'white',
    fontSize: '9rem',
  },
  notificationUnRead: {
    backgroundColor: '#CEDAE5',
    width: '100%',
    justifyContent: 'center',
    // alignItems: 'center',
    paddingVertical: '5%',
    paddingHorizontal: '7.5%',
    borderBottomWidth: 1,
    borderColor: '#707371',
  },
  notificationRead: {
    width: '100%',
    justifyContent: 'center',
    paddingVertical: '5%',
    paddingHorizontal: '7.5%',
    borderBottomWidth: 1,
    borderColor: '#707371',
  },
  notificationTitle: {
    color: 'black',
    fontFamily: 'NotoSerif-Regular',
    fontSize: '14rem',
    marginBottom: '2%',
  },
  notificationsTime: {
    color: '#8F8F8F',
    fontSize: '12rem',
    fontFamily: 'NotoSerif-Regular',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '80%',
    padding: '5%',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: '18rem',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: '2%',
  },
  modalText: {
    fontSize: '16rem',
    fontFamily: 'Poppins-Regular',
    marginBottom: '2%',
  },
  modalTime: {
    fontSize: '12rem',
    fontFamily: 'Poppins-Regular',
    color: '#2F6D8C',
  },
  closeButton: {
    position: 'absolute',
    top: 80,
    right: 30,
  },
});
