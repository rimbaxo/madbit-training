import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants';

const CustomHeader = () => {
  const navigation = useNavigation();

  const insets = useSafeAreaInsets();

  const backgroundStyle = {
    backgroundColor: Colors.backgroundColor,
    paddingTop: insets.top,
    paddingLeft: insets.left,
    paddingRight: insets.right
  };
  return (
    <View style={backgroundStyle}>
      <View style={styles.postBackHeader}>
        <Pressable style={styles.goBackButton} onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon={faArrowLeft} color={Colors.backgroundSurfaces} />
        </Pressable>
        <Text style={styles.h2Text}>Posts</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postBackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingBottom: 10
  },
  goBackButton: {
    backgroundColor: Colors.azure,
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  h2Text: {
    color: Colors.light,
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 12
  }
});

export default CustomHeader;
