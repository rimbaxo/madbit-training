import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import { Colors } from '../constants';

import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomHeader from '../components/CustomHeader';
import { HomeStackParamList } from '../types';
import HomeScreen from '../views/HomeScreen';
import PostDetailsScreen from '../views/PostDetailsScreen';

const HomeNavigator = () => {
  const Stack = createNativeStackNavigator<HomeStackParamList>();

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
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PostDetails" component={PostDetailsScreen} options={{ header: () => <CustomHeader /> }} />
      </Stack.Navigator>
    </>
  );
};

export default HomeNavigator;
