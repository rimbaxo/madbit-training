// src/components/PostList.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, NativeScrollEvent, NativeSyntheticEvent, Platform, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { ENDPOINT_POST } from '../constants';
import { useAppSelector } from '../hooks/useAppSelector';
import useFetch from '../hooks/useFetch';
import { setPosts } from '../redux/postSlice';
import { AppDispatch } from '../redux/store';
import { FetchParams, PostType } from '../types';
import Post from './Post';

const PostList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isEndReached, setIsEndReached] = useState(false); // Stato per tracciare se siamo alla fine della lista

  const { posts } = useAppSelector(state => state.posts);
  //const userId = useSelector((state: RootState) => state.auth.id);

  const fetchObj: FetchParams = {
    endpoint: ENDPOINT_POST,
    method: 'GET'
  };

  const handleEndReached = () => {
    setIsEndReached(true);
  };

  // Altezza approssimativa della tab bar
  const insets = useSafeAreaInsets();
  const tabBarHeight = Platform.select({ ios: 50, android: 94 }) + insets.bottom;

  const { error, data, fetchData } = useFetch<PostType[]>(fetchObj);

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

  const renderPost = ({ item }: { item: PostType }) => <Post {...item} />;

  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isEndReached ? 1 : 0,
      duration: 250,
      useNativeDriver: true
    }).start();
  }, [isEndReached, animatedValue]);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -tabBarHeight]
  });

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

    // Verifica se siamo vicini alla fine della lista
    const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;

    if (isCloseToBottom && !isEndReached) {
      // Se siamo alla fine della lista e non abbiamo già attivato `isEndReached`
      setIsEndReached(true);
    } else if (!isCloseToBottom && isEndReached) {
      // Se abbiamo superato la fine della lista e stiamo scorrendo verso l'alto
      setIsEndReached(false);
    }
  };

  return (
    <View style={[styles.container]}>
      <Animated.FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={item => item.id.toString()}
        style={[styles.list, , { transform: [{ translateY }] }]}
        showsVerticalScrollIndicator={false}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  list: {
    flex: 1,
    overflow: 'hidden'
  }
});

export default PostList;
