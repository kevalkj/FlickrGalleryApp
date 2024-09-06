// App.js
import React, {useEffect, useState} from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AuthStack from './src/screens/navigation/AuthStack';
import UserStack from './src/screens/navigation/UserStack';
import {store, RootState} from './src/redux/store';
import {updateLoggedIn} from './src/redux/slices/user';
import {getToken} from './src/utils/auth';
import Toast from 'react-native-toast-message';

const AppContent: React.FC = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state: RootState) => state.user.loggedIn);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = await getToken();
        console.log(storedData, 102);
        if (storedData !== null) {
          dispatch(updateLoggedIn(true));
        }
      } catch (error) {
        console.error('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  if (loading) {
    return null; // or a loading spinner, etc.
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {loggedIn ? <UserStack /> : <AuthStack />}
        <Toast />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const App: React.FC = () => (
  <Provider store={store}>
    <AppContent />
  </Provider>
);

export default App;
