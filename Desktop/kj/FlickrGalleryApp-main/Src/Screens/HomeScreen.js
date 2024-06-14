/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-catch-shadow */
// /* eslint-disable prettier/prettier */

import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Image, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Snackbar from 'react-native-snackbar';

const FLICKR_API_URL = 'https://api.flickr.com/services/rest/';
const FLICKR_API_KEY = '6f102c62f41998d151e5a1b48713cf13';

export default function HomeScreen() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchRecentPhotos();
  }, []);

  useEffect(() => {
    fetchRecentPhotos(page);
  }, [page]);

  const fetchRecentPhotos = async (page = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(FLICKR_API_URL, {
        params: {
          method: 'flickr.photos.getRecent',
          api_key: FLICKR_API_KEY,
          format: 'json',
          nojsoncallback: 1,
          extras: 'url_s',
          per_page: 30,
          page,
        },
      });
      const newPhotos = response.data.photos.photo;
      if (page === 1) {
        setPhotos(newPhotos);
      } else {
        setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
      }
      await AsyncStorage.setItem('cachedPhotos', JSON.stringify(newPhotos));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      Snackbar.show({
        text: 'Failed to load images. Retry?',
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          text: 'Retry',
          onPress: () => fetchRecentPhotos(page),
        },
      });
      const cachedPhotos = await AsyncStorage.getItem('cachedPhotos');
      if (cachedPhotos) {
        setPhotos(JSON.parse(cachedPhotos));
      }
    }
  };

  const handleEndReached = () => {
    if (!loading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {loading && page === 1 ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          numColumns={3}
          data={photos}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <Image
              source={{uri: item.url_s}}
              style={{width: 100, height: 100, margin: 5}}
            />
          )}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loading && <ActivityIndicator size="large" color="#0000ff" />
          }
        />
      )}
    </View>
  );
}
