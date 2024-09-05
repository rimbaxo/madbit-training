import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const userInfo = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  bio: 'Software Developer at XYZ Corp.',
};

const posts = [
  { id: '1', title: 'Post 1', content: 'This is the content of post 1.' },
  { id: '2', title: 'Post 2', content: 'This is the content of post 2.' },
  { id: '3', title: 'Post 3', content: 'This is the content of post 3.' },
  // Add more posts as needed
];

const HomeScreen: React.FC = () => {
  const renderPost = ({ item }: { item: { title: string; content: string } }) => (
    <View style={styles.post}>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postContent}>{item.content}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{userInfo.name}</Text>
        <Text style={styles.userEmail}>{userInfo.email}</Text>
        <Text style={styles.userBio}>{userInfo.bio}</Text>
      </View>
      <View style={styles.postsContainer}>
        <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfo: {
    flex: 1,
    backgroundColor: '#007bff',
    padding: 16,
    justifyContent: 'flex-start',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  userName: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 16,
    color: '#fff',
    marginVertical: 4,
  },
  userBio: {
    fontSize: 14,
    color: '#fff',
  },
  postsContainer: {
    flex: 2,
    padding: 16,
  },
  post: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 1, // Adds a shadow on Android
    shadowColor: '#000', // Adds a shadow on iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postContent: {
    fontSize: 14,
    marginTop: 4,
  },
});

export default HomeScreen;
