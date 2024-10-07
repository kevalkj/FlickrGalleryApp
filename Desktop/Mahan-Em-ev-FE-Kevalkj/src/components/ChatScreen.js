import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const initialMessages = [
  { id: '8', text: 'Hello', time: '08:04 PM', isSent: true, date: '27/05/2024' },
  { id: '7', text: 'Yeah, everything good!', time: '08:04 PM', isSent: false },
  { id: '6', text: 'Whats your project update? Are you having any trouble?', time: '08:04 PM', isSent: false },
  { id: '5', text: 'No, going all perfect! Let me show you images of the project.', time: '08:04 PM', isSent: true },
  { id: '4', text: 'Look at these!!!', time: '08:04 PM', isSent: true },
  { id: '3', text: 'Yeah, everything good!', time: '08:04 PM', isSent: false },
  { id: '2', text: 'Whats your project update? Are you having any trouble?', time: '08:04 PM', isSent: false },
  { id: '1', text: 'Audio message', time: '08:04 PM', isSent: true, isAudio: true },
];

const ChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [headername, setheadername] = useState('Samay Rainaa');
  const [inputText, setInputText] = useState('');
  const [oldestMessageDate, setOldestMessageDate] = useState('');

  useEffect(() => {
    setMessages(initialMessages);
    setOldestMessageDate(initialMessages[initialMessages.length - 1].date);
  }, []);

  const sendMessage = () => {
    if (inputText.trim()) {
      const now = new Date();
      const newMessage = {
        id: Date.now().toString(),
        text: inputText,
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: now.toLocaleDateString('en-GB'),
        isSent: true,
      };
      setMessages([newMessage, ...messages]);
      setInputText('');
    }
  };

  const gotoCall = () => {
    navigation.navigate('CallScreen'); 
  };

  const renderMessage = ({ item, index }) => {
    const isFirstMessage = index === messages.length - 1;
    const isDateChanged = item.date !== messages[index + 1]?.date;

    return (
      <View style={styles.messageContainer}>
        {isFirstMessage && (
          <View style={styles.dateContainer}>
            <Text style={styles.date}>{oldestMessageDate}</Text>
          </View>
        )}
        {isDateChanged && (
          <View style={styles.dateContainer}>
            <Text style={styles.date}>{item.date}</Text>
          </View>
        )}
        
          <View style={[styles.messageBubble, item.isSent ? styles.sent : styles.received]}>
            {item.isAudio ? (
              <View style={styles.audioContainer}>
                <FontAwesome name="play" size={24} color="white" />
                <View style={styles.audioWave}></View>
                <Text style={styles.audioDuration}>0:15</Text>
              </View>
            ) : (
              <Text style={styles.messageText}>{item.text}</Text>
            )}
            <Text style={styles.time}>{item.time}</Text>
          </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => { navigation.goBack() }}>
          {/* <Ionicons name="arrow-back" size={24} color="black" /> */}
          <Image source={require('../assets/ArrowBack.png')}/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{headername}</Text>
        <TouchableOpacity onPress={gotoCall} style={styles.callButton}>
          {/* <FontAwesome name="phone" size={24} color="white" /> */}
          <Image source={require('../assets/Vector.png')}/>
        </TouchableOpacity>
      </View>
      <View style={styles.separatorLine} />
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messageList}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.actionButton} onPress={inputText.trim() ? sendMessage : () => { /* Mic button action */ }}>
          <Ionicons name={inputText.trim() ? "send" : "mic"} size={24} color="white" />
        </TouchableOpacity>
        
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'left',
    paddingLeft:10,
    fontSize: 16,
    fontFamily:'Inter',
    fontWeight: '500',
  },
  messageList: {
    padding: 16,
  },
  callButton: {
    width: 30.87,
    height: 31,
    borderRadius: 24,
    backgroundColor: '#808080',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 3,
  },
  messageContainer: {
    marginBottom: 16,
  },
  backButton: {
    // marginLeft:2,
  },
  dateContainer: {
    alignSelf: 'center',
    marginBottom: 8,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  date: {
    color: '#888',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 10,
  },
  sent: {
    alignSelf: 'flex-end',
    backgroundColor: '#FBDB75',
    borderTopEndRadius: 0,
  },
 
  received: {
    alignSelf: 'flex-start',
    backgroundColor: '#DFDFDF80',
    borderTopStartRadius: 0,
  },

  messageText: {
    fontSize: 16,
  },
  time: {
    // alignSelf: 'flex-end',
    marginTop: 5,
    fontSize: 10,
    color: '#666',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
  },
  actionButton: {
    marginLeft: 8,
    backgroundColor: '#808080',
    padding: 3.5,
    width:32,
    height:32,
    borderRadius: 25,
  },
  audioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  audioWave: {
    flex: 1,
    height: 24,
    backgroundColor: 'white',
    marginHorizontal: 10,
    borderRadius: 5,
  },
  audioDuration: {
    fontSize: 16,
    color: 'white',
  },
  separatorLine: {
    width: '90%',
    alignSelf: 'center',
    height: 2,
    bottom:1.5,
    backgroundColor: '#979797',
    borderRadius: 1,
    marginVertical: 0,
  },
});

export default ChatScreen;