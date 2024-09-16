import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import { Colors } from '../constants';
import { useAppSelector } from '../hooks/useAppSelector';

import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LoginScreen from '../views/LoginScreen';
import UserNavigator from './UserNavigator';

const RootNavigator = () => {
  const Stack = createNativeStackNavigator();
  const accessToken = useAppSelector(state => state.auth.accessToken);

  const insets = useSafeAreaInsets();

  const backgroundStyle = {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right
  };

  return (
    <>
      <StatusBar backgroundColor={backgroundStyle.backgroundColor} />
      <NavigationContainer>
        <Stack.Navigator>
          {accessToken ? (
            <Stack.Screen name="User" component={UserNavigator} options={{ headerShown: false }} />
          ) : (
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default RootNavigator;
