import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeScreen from '../views/HomeScreen';
import UserInfoScreen from '../views/UserInfoScreen';

const UserNavigation = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="UserInfo" component={UserInfoScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default UserNavigation;
