import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {Marker, Region} from 'react-native-maps';
import {fetchGeocodeData} from '../utils/Location';
import getAddressFromLocation from '../utils/Location';
import Geolocation from '@react-native-community/geolocation';

export type Address = {
  locality_area: string;
  landmark: string;
  pincode: string;
  city: string;
  State: string;
};

export type Location = {
  latitude: number;
  longitude: number;
};

interface MapComponentProps {
  onAddressSelected: (address: Address | undefined) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({onAddressSelected}) => {
  const [region, setRegion] = useState<Region>({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [markerPosition, setMarkerPosition] = useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  useEffect(() => {
    console.log('Component mounted');

    getAddressFromLocation((address: Address, location: Location) => {
      if (address && location) {
        const {latitude, longitude} = location;
        console.log(latitude, longitude);

        setMarkerPosition({latitude, longitude});
        onAddressSelected(address);

        setRegion(prevRegion => ({
          ...prevRegion,
          latitude: latitude,
          longitude: longitude,
        }));
      }
    });
  }, []);

  const handleDragEnd = async (e: any) => {
    const {latitude, longitude} = e.nativeEvent.coordinate;
    console.log('Dragged to ', latitude);

    setMarkerPosition({latitude, longitude});
    const address = await fetchGeocodeData(latitude, longitude);
    onAddressSelected(address);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={region => setRegion(region)}>
        <Marker
          coordinate={markerPosition}
          draggable={true}
          onDragEnd={handleDragEnd}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
  },
});

export default MapComponent;
