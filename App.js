/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import { StatusBar } from 'react-native';

import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { Colors, hideSplashScreen } from './src/constants';
import RootNavigator from './src/navigation/RootNavigator';
import store from './src/redux/store';

// NOTA: HO USATO UNA VERSIONE DI REACT NATIVE SVG PRECEDENTE PERCHÈ MI DAVA ERRORE L'ULTIMA
// NOTA: HO USATO REACT-NATIVE-SCREENS alla versione 3.24.0 per problemi di incompatibilità

const App = () => {
  const backgroundStyle = {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  };

  useEffect(() => {
   hideSplashScreen(); 
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar backgroundColor={backgroundStyle.backgroundColor} />
        <RootNavigator />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
