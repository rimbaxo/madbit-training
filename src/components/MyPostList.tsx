// src/components/PostList.tsx
import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import useFetch from '../hooks/useFetch';
import {PostType} from '../types';
import {getUserPostsEndpoint} from '../constants';

type PostListProps = {
  userId: number;
};

const PostList: React.FC<PostListProps> = ({userId}) => {
  const {
    loading,
    error,
    data: posts,
    fetchData,
  } = useFetch<PostType[]>(getUserPostsEndpoint(userId), 'GET');

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    Alert.alert('Error', error);
    return null;
  }

  const renderPost = ({item}: {item: PostType}) => (
    <View style={styles.postContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.text}</Text>
      <Text style={styles.info}>Created at: {item.created_at}</Text>
      <Text style={styles.info}>Comments count: {item.comments_count}</Text>
      <Text style={styles.info}>User: {item.user.full_name}</Text>
    </View>
  );

  return (
    <FlatList
      data={posts}
      renderItem={renderPost}
      keyExtractor={item => item.id.toString()}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postContainer: {
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 12,
    color: '#555',
    marginTop: 4,
  },
  list: {
    flex: 1,
  },
});

export default PostList;
