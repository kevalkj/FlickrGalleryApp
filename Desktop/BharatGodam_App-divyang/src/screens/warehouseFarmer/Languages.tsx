import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderComponent from '../../components/Header';
import BlueTick from '../../assets/BlueTick';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Languages = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const languages = [
    {displayName: 'English', languageCode: 'en'},
    {displayName: 'हिन्दी', languageCode: 'hi'},
    {displayName: 'বাংলা', languageCode: 'bn'},
    {displayName: 'తెలుగు', languageCode: 'te'},
    {displayName: 'मराठी', languageCode: 'mr'},
    {displayName: 'தமிழ்', languageCode: 'ta'},
    {displayName: 'ગુજરાતી', languageCode: 'gu'},
    {displayName: 'ಕನ್ನಡ', languageCode: 'kn'},
    {displayName: 'മലയാളം', languageCode: 'ml'},
    {displayName: 'ਪੰਜਾਬੀ', languageCode: 'pa'},
    {displayName: 'ଓଡ଼ିଆ', languageCode: 'or'},
  ];

  const changeLanguage = async languageCode => {
    try {
      setSelectedLanguage(languageCode);
      await AsyncStorage.setItem('lang', languageCode);
    } catch (error) {
      console.error('Failed to change language or save to storage', error);
    }
  };

  const getSavedLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('lang');
      console.log('savedLanguage', savedLanguage);
      if (savedLanguage) {
        setSelectedLanguage(savedLanguage);
      }
    } catch (error) {
      console.error(
        'Failed to fetch the selected language from storage',
        error,
      );
    }
  };

  useEffect(() => {
    getSavedLanguage();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderComponent title="Select language" />
      <View style={styles.container}>
        <FlatList
          data={languages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => changeLanguage(item.languageCode)}>
              <View
                style={[
                  styles.item,
                  selectedLanguage === item.languageCode
                    ? styles.selectedItem
                    : null, // Apply selected style
                ]}>
                <Text style={[styles.itemText]}>{item.displayName}</Text>
                {selectedLanguage === item.languageCode && <BlueTick />}
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Languages;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  item: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    marginVertical: 8,
    borderColor: '#ECECEC',
    borderWidth: 2,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedItem: {
    backgroundColor: '#CEDAE5',
    borderColor: '#0C447D',
    borderWidth: 2,
  },
  itemText: {
    fontSize: 16,
    color: '#1C1C1C',
  },
});
