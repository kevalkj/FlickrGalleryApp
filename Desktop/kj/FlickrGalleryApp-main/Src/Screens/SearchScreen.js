/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import Snackbar from 'react-native-snackbar';

const FLICKR_API_URL = 'https://api.flickr.com/services/rest/';
const FLICKR_API_KEY = '6f102c62f41998d151e5a1b48713cf13';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(FLICKR_API_URL, {
        params: {
          method: 'flickr.photos.search',
          api_key: FLICKR_API_KEY,
          format: 'json',
          nojsoncallback: 1,
          extras: 'url_s',
          text: query,
        },
      });
      setPhotos(response.data.photos.photo);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Snackbar.show({
        text: 'Failed to search images. Retry?',
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          text: 'Retry',
          onPress: handleSearch,
        },
      });
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 20,
          width: '80%',
          color: '#000',
        }}
        placeholder="Search for images"
        value={query}
        onChangeText={setQuery}
        placeholderTextColor={'#000000'}
      />
      <Button title="Search" onPress={handleSearch} />
      {loading ? (
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
        />
      )}
    </View>
  );
}
