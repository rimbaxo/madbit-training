import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import MyPost from '../components/MyPost';
import MyUserHeader from '../components/MyUserHeader';
import {Colors} from '../constants';

const userInfo = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  bio: 'Software Developer at XYZ Corp.',
};

const posts = [
  {id: '1', title: 'Post 1', content: 'This is the content of post 1.'},
  {id: '2', title: 'Post 2', content: 'This is the content of post 2.'},
  {id: '3', title: 'Post 3', content: 'This is the content of post 3.'},
  {id: '4', title: 'Post 1', content: 'This is the content of post 1.'},
  {id: '5', title: 'Post 2', content: 'This is the content of post 2.'},
  {id: '6', title: 'Post 3', content: 'This is the content of post 3.'},
  {id: '7', title: 'Post 1', content: 'This is the content of post 1.'},
  {id: '8', title: 'Post 2', content: 'This is the content of post 2.'},
  {id: '9', title: 'Post 3', content: 'This is the content of post 3.'},
  {id: '10', title: 'Post 1', content: 'This is the content of post 1.'},
  {id: '11', title: 'Post 2', content: 'This is the content of post 2.'},
  {id: '12', title: 'Post 3', content: 'This is the content of post 3.'},
];

const HomeScreen: React.FC = () => {
  const renderPost = ({item}: {item: {title: string; content: string}}) => (
    <MyPost title={item.title} content={item.content} />
  );

  return (
    <View style={styles.container}>
      <MyUserHeader
        name={userInfo.name}
        email={userInfo.email}
        bio={userInfo.bio}
      />
      <View style={styles.postsContainer}>
        <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
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
    padding: 16,
  },
});

export default HomeScreen;
