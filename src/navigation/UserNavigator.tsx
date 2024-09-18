import { BlurView } from '@react-native-community/blur';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '../constants';
import { BottomTabParamList } from '../types';
import UserInfoScreen from '../views/UserInfoScreen';
import HomeNavigator from './HomeNavigator';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BlurBackground = ({ screenName }) => {
  const sstyle = StyleSheet.create({ blurStyle: { borderColor: Colors.darkRose, borderWidth: 2 } });

  return (
    <View style={[styles.blurContainer, screenName === 'UserInfo' ? sstyle.blurStyle : {}]}>
      <BlurView
        style={[StyleSheet.absoluteFill]}
        blurType="dark"
        blurAmount={4}
        reducedTransparencyFallbackColor="white"
      />
    </View>
  );
};

// TODO: sistema la navigazione per nascondere la tabBar
// https://reactnavigation.org/docs/hiding-tabbar-in-screens

const UserNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarBackground: () => <BlurBackground screenName={route.name} />,
        tabBarStyle: styles.tabBarStyle,
        tabBarItemStyle: styles.tabBarItemStyle,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIconStyle: styles.tabBarIcon,
        tabBarActiveTintColor: Colors.azure,
        tabBarInactiveTintColor: Colors.light
      })}
    >
      <Tab.Screen
        name="HomeNavigation"
        component={HomeNavigator}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route);
          const isTabBarVisible = routeName !== 'PostDetails';
          return {
            tabBarStyle: [{ display: isTabBarVisible ? 'flex' : 'none' }, styles.tabBarStyle],
            headerShown: false,
            tabBarLabel: 'Home'
          };
        }}
      />
      <Tab.Screen
        name="UserInfo"
        component={UserInfoScreen}
        options={{
          headerShown: false
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    flex: 1,
    borderTopWidth: 0,
    borderColor: Colors.darkRose,
    borderTopColor: Colors.darkRose,
    paddingBottom: 0,
    paddingTop: 0,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 20,
    right: 20,
    bottom: 30,
    height: 60
  },
  tabBarLabel: {
    fontSize: 18,
    textAlignVertical: 'center',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabBarIcon: {
    display: 'none'
  },
  tabBarItemStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  blurContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 30,
    overflow: 'hidden'
  },
  blurView: {
    flex: 1,
    borderRadius: 30
  },
  blurViewBorders: {
    borderColor: Colors.darkRose,
    borderWidth: 2,
    borderRadius: 30
  }
});

export default UserNavigator;
