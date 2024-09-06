/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

AppRegistry.registerComponent('component_test', () => AppWrap);

const AppWrap = () => {
   return (
      <Provider store={store}>
         <App />
      </Provider>
   );
};