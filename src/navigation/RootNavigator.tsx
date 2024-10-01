import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import { Colors, getToken, hideSplashScreen } from '../constants';

import React, { useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomHeader from '../components/CustomHeader';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { setAccessToken } from '../redux/authSlice';
import { HomeStackParamList } from '../types';
import LoginScreen from '../views/LoginScreen';
import PostDetailsScreen from '../views/PostDetailsScreen';
import PostUpdateScreen from '../views/PostUpdateScreen';
import UserNavigator from './UserNavigator';

const RootNavigator = () => {
  const Stack = createNativeStackNavigator<HomeStackParamList>();
  const accessToken = useAppSelector(state => state.auth.accessToken);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();
      if (token) {
        dispatch(setAccessToken(token));
      }
    };
    checkAuth();
  }, []);

  const insets = useSafeAreaInsets();

  // TODO: https://github.com/zoontek/react-native-bootsplash
  // Quando ho access token tolgo la splash screen

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
      <NavigationContainer onReady={() => hideSplashScreen()}>
        <Stack.Navigator>
          {accessToken ? (
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
