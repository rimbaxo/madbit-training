// src/components/PostList.tsx
import React, {useEffect} from 'react';
import {StyleSheet, FlatList, Alert, View} from 'react-native';
import useFetch from '../hooks/useFetch';
import {PostType} from '../types';
import {ENDPOINT_POST} from '../constants';
import {AppDispatch, RootState} from '../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {setPosts} from '../redux/postSlice';
import MyPost from './MyPost';

const MyPostList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {posts} = useSelector((state: RootState) => state.posts);
  const userId = useSelector((state: RootState) => state.auth.id);

  const {error, data, fetchData} = useFetch<PostType[]>(ENDPOINT_POST, 'GET');

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (data) {
      dispatch(setPosts(data));
    } else if (error) {
      Alert.alert('Errore di retrieve dati', error);
    }
  }, [data, error, dispatch]);

  // credevo avesse senso invece filtra solo per i "propri" post. Sarebbe da filtrare per i post della gente che segui. Ma vabbè
  const filteredPosts = posts.filter(post => post.user.id === userId);

  const renderPost = ({item}: {item: PostType}) => (
    <MyPost
      title={item.title}
      created_at={item.created_at}
      text={item.text}
      comments_count={item.comments_count}
      fullName={item.user.full_name}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredPosts}
        renderItem={renderPost}
        keyExtractor={item => item.id.toString()}
        style={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    flex: 1,
  },
});

export default MyPostList;
