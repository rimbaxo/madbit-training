// src/components/PostList.tsx
import React, {useEffect} from 'react';
import {Alert, FlatList, StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {ENDPOINT_POST} from '../constants';
import {useAppSelector} from '../hooks/useAppSelector';
import useFetch from '../hooks/useFetch';
import {setPosts} from '../redux/postSlice';
import {AppDispatch} from '../redux/store';
import {FetchParams, PostType} from '../types';
import Post from './Post';

const PostList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {posts} = useAppSelector(state => state.posts);
  //const userId = useSelector((state: RootState) => state.auth.id);

  const fetchObj: FetchParams = {
    endpoint: ENDPOINT_POST,
    method: 'GET',
  };

  const {error, data, fetchData} = useFetch<PostType[]>(fetchObj);

  // Il fetch avviene solo se i post non sono stati precedentemente caricati
  useEffect(() => {
    if (!posts.length) {
      fetchData();
    }
  }, [fetchData, posts]);

  useEffect(() => {
    if (data) {
      dispatch(setPosts(data));
    } else if (error) {
      Alert.alert('Errore di retrieve dati', error);
    }
  }, [data, error, dispatch]);

  // credevo avesse senso invece filtra solo per i "propri" post. Sarebbe da filtrare per i post della gente che segui. Ma vabbè
  //const filteredPosts = posts.filter(post => post.user.id === userId);
  // TODO: capire che su alcuni post, quelli creati da te, sarà possibile creare alcune operazioni CRUD

  const renderPost = ({item}: {item: PostType}) => <Post {...item} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
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

export default PostList;
