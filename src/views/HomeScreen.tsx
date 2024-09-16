import React, { useEffect } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PostList from '../components/PostList';
import { Colors, ENDPOINT_GETME } from '../constants';
import { useAppDispatch } from '../hooks/useAppDispatch';
import useFetch from '../hooks/useFetch';
import { setUserInfo } from '../redux/authSlice';
import { FetchParams, GetMeType } from '../types';

const HomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();

  const backgroundStyle = {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    paddingTop: insets.top,
    paddingLeft: insets.left,
    paddingRight: insets.right
  };

  const fetchObj: FetchParams = {
    endpoint: ENDPOINT_GETME,
    method: 'GET'
  };
  const { loading, error, data, fetchData } = useFetch<GetMeType>(fetchObj);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (
      data?.full_name &&
      data?.email &&
      data?.id &&
      data?.created_at &&
      data?.first_name &&
      data?.last_name &&
      data?.picture
    ) {
      dispatch(
        setUserInfo({
          fullName: data.full_name,
          email: data.email,
          id: data.id,
          first_name: data.first_name,
          last_name: data.last_name,
          picture: data.picture,
          created_at: data.created_at
        })
      );
    } else if (error) {
      Alert.alert('Errore di retrieve dati', error);
    }
  }, [data, error, loading, dispatch]);

  return (
    <View style={backgroundStyle}>
      <View style={styles.postsContainer}>
        <PostList />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor
  },
  postsContainer: {
    flex: 2,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8
  }
});

export default HomeScreen;
