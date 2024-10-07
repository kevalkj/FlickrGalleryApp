import 'react-native-reanimated';
import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {UserProvider} from './src/hooks/userContext';
import MapplsGL from 'mappls-map-react-native';
import Config from 'react-native-config';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {store} from './src/redux/store';

// MAPPS MYINDA CONFIG
const {
  MAPPS_MYINDIA_SDK_KEY,
  MAPPS_MYINDIA_CLIENT_ID,
  MAPPS_MYINDIA_CLIENT_SECRET,
  MAPPS_MYINDIA_REST_API_KEY,
} = Config;
console.log(MAPPS_MYINDIA_CLIENT_ID);
MapplsGL.setMapSDKKey(MAPPS_MYINDIA_SDK_KEY);
MapplsGL.setAtlasClientId(MAPPS_MYINDIA_CLIENT_ID);
MapplsGL.setAtlasClientSecret(MAPPS_MYINDIA_CLIENT_SECRET);
MapplsGL.setRestAPIKey(MAPPS_MYINDIA_REST_API_KEY);

function App() {
  return (
    <>
      <Provider store={store}>
        <StatusBar style="light" />
        <UserProvider>
          <GestureHandlerRootView style={{flex: 1}}>
            <AppNavigator />
          </GestureHandlerRootView>
        </UserProvider>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({});

export default App;
