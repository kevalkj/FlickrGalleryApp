import {PermissionsAndroid, Platform} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {set} from './auth';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const GOOGLE_MAPS_API_KEY = 'AIzaSyA45cVTPi8-ePUls0EQsv2q7nSAZIUux9Y';

async function getAddressFromLocation(cb) {
  const granted = await requestLocationPermission();
  if (!granted) {
    console.warn('Location permission not granted');
    return;
  }
  try {
    const position = Geolocation.getCurrentPosition(async location => {
      const {latitude, longitude} = location.coords;
      console.log(latitude, longitude);
      const temp = await fetchGeocodeData(latitude, longitude);
      console.log(temp, 111);
      cb(temp, {latitude, longitude});
    });
    console.log(position, 102);
  } catch (error) {
    console.error('Error getting location:', error);
  }
}

export async function fetchGeocodeData(latitude: number, longitude: number) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  // console.log(data)

  if (data.status === 'OK') {
    const addressComponents = data.results[0].address_components;
    const address = {
      locality_area: '',
      landmark: '',
      pincode: '',
      city: '',
      State: '',
    };

    for (const component of addressComponents) {
      const types = component.types;
      switch (true) {
        case types.includes('sublocality_level_1'): // Locality (e.g., neighborhood)
          address.locality_area = component.long_name;
          break;
        case types.includes('sublocality_level_2'): // Landmark (e.g., point of interest)
          address.landmark = component.long_name;
          break;
        case types.includes('postal_code'):
          address.pincode = component.long_name;
          break;
        case types.includes('locality'):
          address.city = component.long_name;
          break;
        case types.includes('administrative_area_level_1'): // State
          address.State = component.long_name;
          break;
      }
    }

    return address;
  } else {
    console.error('Error fetching geocode data:', data.status);
  }
}

export async function requestLocationPermission() {
  try {
    let permission;
    if (Platform.OS === 'ios') {
      permission = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else if (Platform.OS === 'android') {
      permission = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    }

    return permission === RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
  }
}

export default getAddressFromLocation;
