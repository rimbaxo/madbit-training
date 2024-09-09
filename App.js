import React from 'react';
import './gesture-handler-native';
import {StatusBar, StyleSheet, View} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {Provider, useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import store from './src/redux/store';
import LoginScreen from './src/views/LoginScreen';
import HomeScreen from './src/views/HomeScreen';
import {Colors} from './src/constants';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
//const Stack = createNativeStackNavigator();



const AppContent = () => {
  const loginPressed = useSelector(state => state.auth.loginPressed);
  const insets = useSafeAreaInsets();

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
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {loginPressed ? (
            <Stack.Screen name="Home" component={HomeScreen} />
          ) : (
            <Stack.Screen name="Login" component={LoginScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
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

const styles = StyleSheet.create({});

export default App;
