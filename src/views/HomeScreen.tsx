import React from 'react';
import {StyleSheet, View} from 'react-native';
import PostList from '../components/PostList';
import UserHeader from '../components/UserHeader';
import {Colors} from '../constants';

const HomeScreen: React.FC = () => {
  // TODO: fare in modo che useFetch accetti un'oggetto di un tipo e poi in quell'oggetto passato ogni volta posso evitare di inserire il campo opzionale
  // così mi evito di scrivere undefined

  return (
    <View style={styles.container}>
      <UserHeader />
      <View style={styles.postsContainer}>
        <PostList />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  postsContainer: {
    flex: 2,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    paddingTop: 8,
  },
});

export default HomeScreen;
