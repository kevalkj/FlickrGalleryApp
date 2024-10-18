import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Help = () => {
  const [expanded, setExpanded] = useState(null);

  const toggleExpand = index => {
    setExpanded(expanded === index ? null : index);
  };

  const faqData = [
    {
      question: 'How do I book a ride?',
      answer:
        'To book a ride, open the app, enter your pickup and drop-off locations, choose your preferred ride option, and confirm your booking. A nearby driver will be assigned to you.',
    },
    {
      question: 'How can I contact my driver?',
      answer:
        'You can contact your driver via the app once a ride has been confirmed.',
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept all major credit cards, PayPal, and cash.',
    },
    {
      question: 'How can I provide feedback on my ride?',
      answer:
        'After completing a ride, you can provide feedback through the app’s rating system.',
    },
    {
      question: 'What should I do if I left something in the car?',
      answer:
        'If you left something in the car, contact the driver directly or get in touch with customer support.',
    },
    {
      question: 'How do I update my payment information?',
      answer:
        'You can update your payment information under the Payment section in your account settings.',
    },
    {
      question: 'How do I cancel a ride?',
      answer: 'You can cancel a ride via the app before the driver arrives.',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {}}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Help & Support</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#888" style={styles.icon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Where are you going?"
          placeholderTextColor="#888"
        />
      </View>

      <ScrollView style={styles.faqContainer}>
        {faqData.map((item, index) => (
          <View key={index}>
            <TouchableOpacity
              style={styles.questionContainer}
              onPress={() => toggleExpand(index)}>
              <Text style={styles.questionText}>{item.question}</Text>
              <Icon
                name={expanded === index ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="#000"
              />
            </TouchableOpacity>
            {expanded === index && (
              <Text style={styles.answerText}>{item.answer}</Text>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Contact Button */}
      <TouchableOpacity style={styles.contactButton}>
        <Icon name="call-outline" size={20} color="#fff" />
        <Text style={styles.contactButtonText}>Contact us</Text>
      </TouchableOpacity>
    </View>
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
    padding: 16,
    backgroundColor: '#fff',
    // elevation: 2,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 80,
    color: '#000000',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DFDFDF80',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
    marginHorizontal: 20,
  },
  searchInput: {
    borderRadius: 25,
    // paddingHorizontal: 20,
    height: 50,
    fontSize: 16,
  },
  faqContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginHorizontal: 15,
  },
  questionText: {
    fontSize: 16,
    color: '#404040',
    fontWeight: 'bold',
    // marginHorizontal: 15,
    width: '90%',
  },
  answerText: {
    paddingTop: 10,
    paddingBottom: 20,
    fontSize: 14,
    color: '#808080',
    marginHorizontal: 15,
  },
  contactButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fdbb0a',
    paddingVertical: 15,
    marginHorizontal: 16,
    borderRadius: 25,
    marginBottom: 20,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  },
});

export default Help;
