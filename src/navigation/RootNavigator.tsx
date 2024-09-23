import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import { Colors, getToken } from '../constants';

import React, { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomHeader from '../components/CustomHeader';
import { useAppSelector } from '../hooks/useAppSelector';
import { HomeStackParamList } from '../types';
import LoginScreen from '../views/LoginScreen';
import PostDetailsScreen from '../views/PostDetailsScreen';
import PostUpdateScreen from '../views/PostUpdateScreen';
import UserNavigator from './UserNavigator';

const RootNavigator = () => {
  const Stack = createNativeStackNavigator<HomeStackParamList>();
  const accessToken = useAppSelector(state => state.auth.accessToken);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();
      if (token) {
        setIsAuthenticated(true);
      }
    };
    checkAuth();
  }, []);

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
          {accessToken || isAuthenticated ? (
            <>
              <Stack.Screen name="Home" component={UserNavigator} options={{ headerShown: false }} />
              <Stack.Screen
                name="PostDetails"
                component={PostDetailsScreen}
                options={{ header: () => <CustomHeader /> }}
              />
              <Stack.Screen name="PostUpdate" component={PostUpdateScreen} options={{ headerShown: false }} />
            </>
          ) : (
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default RootNavigator;
