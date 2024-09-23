// src/components/PostList.tsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  StyleSheet,
  View
} from 'react-native';
import { Colors, ENDPOINT_POST, LIST } from '../constants';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import useFetch from '../hooks/useFetch';
import { setPosts } from '../redux/postSlice';
import { FetchParams, PostType } from '../types';
import Post from './Post';

const PostList: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isEndReached, setIsEndReached] = useState(false); // Stato per tracciare se siamo alla fine della lista
  const [refreshing, setRefreshing] = useState(false);

  const [newPostAdded, setNewPostAdded] = useState(false);

  const { posts } = useAppSelector(state => state.posts);

  const memoizedPosts = useMemo(() => posts, [posts]);

  useEffect(() => {
    setNewPostAdded(true);
  }, [memoizedPosts]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const fetchObj: FetchParams = {
    endpoint: ENDPOINT_POST,
    method: 'GET'
  };

  const handleEndReached = () => {
    setIsEndReached(true);
  };

  // Altezza approssimativa della tab bar
  //TODO: su android aggiungere dinamicamente il cambio colore bordo o altro comportamento quando raggiungi la fine
  const tabBarHeight = 80; //Platform.select({ ios: 80, android: 80 }) ?? 75 + insets.bottom;

  const { error, data, fetchData } = useFetch<PostType[]>(fetchObj);

  // Il fetch avviene solo se i post non sono stati precedentemente caricati
  useEffect(() => {
    if (!posts.length || newPostAdded) {
      fetchData();
      setNewPostAdded(false);
    }
  }, [fetchData, posts, memoizedPosts]);

  useEffect(() => {
    if (data) {
      dispatch(setPosts(data));
    } else if (error) {
      Alert.alert('Errore di retrieve dati', error);
    }
  }, [data, error, dispatch]);

  const renderPost = ({ item }: { item: PostType }) => <Post item={item} variant={LIST} />;

  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isEndReached ? 1 : 0,
      duration: 200,
      useNativeDriver: true
    }).start();
  }, [isEndReached, animatedValue]);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -tabBarHeight]
  });

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

    // La sottrazione di 50 è un margine che definisce "vicino alla fine", ossia quando mancano meno di 50 pixel alla fine della lista.
    const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;

    if (isCloseToBottom && !isEndReached) {
      setIsEndReached(true);
    } else if (!isCloseToBottom && isEndReached) {
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
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            progressBackgroundColor={Colors.light}
            tintColor={Colors.light}
          />
        }
      ></Animated.FlatList>
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
