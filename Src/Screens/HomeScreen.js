/* eslint-disable prettier/prettier */
// screens/HomeScreen.js
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FLICKR_API_URL =
  'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=1&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s';

const HomeScreen = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const cachedPhotos = await AsyncStorage.getItem('photos');
      if (cachedPhotos) {
        setPhotos(JSON.parse(cachedPhotos));
        setLoading(false);
      }

      const response = await axios.get(FLICKR_API_URL);
      if (response.data.photos.photo.length > 0) {
        setPhotos(response.data.photos.photo);
        await AsyncStorage.setItem(
          'photos',
          JSON.stringify(response.data.photos.photo),
        );
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        data={photos}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Image source={{uri: item.url_s}} style={styles.image} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 150,
    height: 150,
    margin: 10,
  },
});

export default HomeScreen;
