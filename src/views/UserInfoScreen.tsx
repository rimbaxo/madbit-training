import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import UserHeader from '../components/UserHeader';
import { Colors } from '../constants';

const UserInfoScreen: React.FC = () => {
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
    <View style={backgroundStyle}>
      <UserHeader />
    </View>
  );
};

export default UserInfoScreen;
