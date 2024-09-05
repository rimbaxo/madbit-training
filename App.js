/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';

import {Provider, useSelector} from 'react-redux';
import store, {RootState} from './src/redux/store';
import LoginScreen from './src/views/LoginScreen';
import {Colors} from './src/constants';
import HomeScreen from './src/views/HomeScreen';

const AppContent = () => {
  const loginPressed = useSelector(state => state.auth.loginPressed);
  const backgroundStyle = {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  };

  return (
    <View style={backgroundStyle}>
      {loginPressed ? <HomeScreen /> : <LoginScreen />}
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
      <SafeAreaView style={backgroundStyle}>
        <StatusBar backgroundColor={backgroundStyle.backgroundColor} />
        <AppContent />
      </SafeAreaView>
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
