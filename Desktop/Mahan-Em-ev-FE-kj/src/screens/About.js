import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const About = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {}}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>About Us</Text>
      </View>

      <Text style={styles.description}>
        Navigate is a trailblazer in the realm of last mile connectivity,
        revolutionizing the way people and goods move. We specialize in public
        and goods transportation, ensuring that every journey is secured, safe,
        and affordable.
      </Text>

      <Text style={styles.description}>
        At Navigate, our mission is to seamlessly connect communities and
        businesses by providing reliable and efficient transportation solutions.
        We strive to create a world where mobility is not just a necessity but a
        pleasant and accessible experience for everyone.
      </Text>

      <Text style={styles.subtitle}>Why Choose Navigate?</Text>

      <Text style={styles.bulletPoint}>
        • <Text style={styles.bold}>Innovative Solutions:</Text> We leverage the
        latest technology to enhance our services, ensuring that your travel
        experience is both convenient and cutting-edge.
      </Text>

      <Text style={styles.bulletPoint}>
        • <Text style={styles.bold}>Customer-Centric Approach:</Text> Our
        operations are driven by the needs and feedback of our customers. We are
        constantly evolving to better serve you.
      </Text>

      <Text style={styles.bulletPoint}>
        • <Text style={styles.bold}>Sustainability:</Text> Navigate is committed
        to sustainable practices. Our fleet includes Eco-friendly vehicles, and
        we continuously seek ways to reduce our carbon footprint.
      </Text>

      <Text style={styles.footerText}>
        Join us at Navigate, where we make every trip a journey worth taking.
        Whether you're moving people or goods, trust us to connect you to your
        destination with security, safety, and affordability.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    // padding: 16,
    backgroundColor: '#fff',
    // elevation: 2,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 80,
    color: '#000000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1B1501',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
    marginBottom: 15,
    color: '#404040',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#404040',
  },
  bulletPoint: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
    color: '#404040',
  },
  bold: {
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 20,
    textAlign: 'justify',
    color: '#404040',
  },
});

export default About;
