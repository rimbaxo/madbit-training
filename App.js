/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';

import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import {Provider, useSelector} from 'react-redux';
import store, {RootState} from './src/redux/store';
import LoginScreen from './src/views/LoginScreen';
import {Colors} from './src/constants';
import HomeScreen from './src/views/HomeScreen';

// NOTA: HO USATO UNA VERSIONE DI REACT NATIVE SVG PRECEDENTE PERCHÈ MI DAVA ERRORE L'ULTIMA
// NOTA: HO USATO REACT-NATIVE-SCREENS alla versione 3.24.0 per problemi di incompatibilità

const AppContent = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const insets = useSafeAreaInsets();

  console.log("LOGINPRESSED", isLoggedIn)

  const backgroundStyle = {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };

  return (
    <View style={backgroundStyle}>
      {isLoggedIn ? <HomeScreen /> : <LoginScreen />}
    </View>
  );
};

const App = () => {
  const backgroundStyle = {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  };

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar backgroundColor={backgroundStyle.backgroundColor} />
        <AppContent />
      </SafeAreaProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;