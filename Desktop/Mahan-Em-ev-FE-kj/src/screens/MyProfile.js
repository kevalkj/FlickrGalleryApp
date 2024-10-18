import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ToastAndroid,
} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import { useEffect, useState } from 'react';

function MyProfile() {
  const [selected, setSelected] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const [errors, setErrors] = useState({
    phone: 'Phone number is required',
    email: 'Email is required',
    name: 'Name is required',
    gender: '', // No error for gender initially
  });

  const handlePress = (box) => {
    setSelected(box);
    setErrors((prev) => ({ ...prev, gender: '' }));
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      setErrors((prev) => ({ ...prev, phone: 'Phone number must be 10 digits.' }));
    } else {
      setErrors((prev) => ({ ...prev, phone: '' }));
    }
  };

  const validateEmail = (email) => {
    const emailRegex =  /^(?=.*[a-zA-Z])[a-zA-Z0-9+_.-]*[a-zA-Z][a-zA-Z0-9+_.-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setErrors((prev) => ({ ...prev, email: 'Please enter a valid email address.' }));
    } else {
      setErrors((prev) => ({ ...prev, email: '' }));
    }
  };

  // Validation on component load
  useEffect(() => {
    // Trigger initial validation
    validatePhone(phone);
    validateEmail(email);
    setErrors((prev) => ({
      ...prev,
      name: name ? '' : 'Name is required',
    }));
  }, []); // Empty dependency array to trigger only on mount

  const handleUpdate = () => {
    if (!errors.phone && !errors.email && name && selected) {
      console.log('Profile Data:', {
        name,
        phone,
        email,
        gender: selected,
      });

      ToastAndroid.show('Profile updated successfully!', ToastAndroid.SHORT);
    }
  };

  const isButtonDisabled = !name || !selected || !!errors.phone || !!errors.email;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.innerContainer}>
          <CustomHeader title={'My Profile'} />
          <View style={styles.imagebox}>
            <ImageBackground
              style={styles.image}
              source={require('../assets/profileImage.jpeg')}
              imageStyle={styles.imageStyle}>
              <View style={styles.pencil} />
            </ImageBackground>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Rahul Sharma"
              placeholderTextColor="#888"
              value={name}
              onChangeText={(text) => {
                setName(text);
                setErrors((prev) => ({ ...prev, name: text ? '' : 'Name is required' }));
              }}
            />
            {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone</Text>
            <TextInput
              style={styles.textInput}
              placeholder="1234567890"
              placeholderTextColor="#888"
              keyboardType="numeric"
              value={phone}
              onChangeText={(text) => {
                setPhone(text);
                validatePhone(text);
              }}
              maxLength={10}
            />
            {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.textInput}
              placeholder="rahul@gmail.com"
              placeholderTextColor="#888"
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                validateEmail(text);
              }}
            />
            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Gender</Text>
            <View style={styles.genderBox}>
              <Pressable
                style={[styles.box, selected === 'male' && styles.selectedBox]}
                onPress={() => handlePress('male')}>
                <Text style={[styles.text, selected === 'male' && { color: '#000' }]}>
                  Male
                </Text>
              </Pressable>

              <Pressable
                style={[styles.box, selected === 'female' && styles.selectedBox]}
                onPress={() => handlePress('female')}>
                <Text style={[styles.text, selected === 'female' && { color: '#000' }]}>
                  Female
                </Text>
              </Pressable>

              <Pressable
                style={[styles.box, selected === 'others' && styles.selectedBox]}
                onPress={() => handlePress('others')}>
                <Text style={[styles.text, selected === 'others' && { color: '#000' }]}>
                  Other
                </Text>
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <View style={styles.btnConatiner}>
            <Pressable
              disabled={isButtonDisabled}
              onPress={handleUpdate}
              style={[styles.btn, isButtonDisabled && { backgroundColor: '#ddd' }]}>
              <Text style={styles.btntitle}>Update</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default MyProfile;

const styles = StyleSheet.create({
  btnConatiner: {
    backgroundColor: '#fff',
    paddingVertical: 15,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    borderRadius: 50,
    marginHorizontal: 15,
    backgroundColor: '#F8C218',
  },
  btntitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1B1501',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  innerContainer: {
    paddingHorizontal: 15,
  },
  imagebox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  imageStyle: {
    borderRadius: 100,
  },
  pencil: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#0F6DDC',
    position: 'absolute',
    top: 70,
    right: 4,
    borderColor: '#fff',
    borderWidth: 1.5,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontSize: 14,
    color: '#000',
  },
  textInput: {
    height: 40,
    borderColor: '#9F9F9F',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    color: '#000',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    fontSize: 12,
  },
  genderBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  box: {
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#9F9F9F',
    borderRadius: 4,
  },
  selectedBox: {
    backgroundColor: '#FCE9AC',
    color: '#000',
  },
  text: {
    fontSize: 14,
    color: '#9F9F9F',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    backgroundColor: '#fff',
  },
});
