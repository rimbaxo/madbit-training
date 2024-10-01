import { faFilter, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Filter from '../components/Filter';
import PostList from '../components/PostList';
import { Colors, ENDPOINT_GETME } from '../constants';
import { useAppDispatch } from '../hooks/useAppDispatch';
import useFetch from '../hooks/useFetch';
import { setUserInfo } from '../redux/authSlice';
import { FetchParams, GetMeType, HomeNavigationProp } from '../types';

const HomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();

  const [filterVisible, setFilterVisible] = useState(false);

  const navigation = useNavigation<HomeNavigationProp>();

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
      <View style={styles.filterButtonContainer}>
        <Pressable style={styles.newPostButton} onPress={() => setFilterVisible(!filterVisible)}>
          <FontAwesomeIcon icon={faFilter} color={Colors.backgroundSurfaces} />
        </Pressable>
      </View>
      <View></View>
      {filterVisible ? <Filter /> : null}
      <View style={styles.newPostButtonContainer}>
        <Pressable style={styles.newPostButton} onPress={() => navigation.navigate('PostUpdate', { action: 'POST' })}>
          <FontAwesomeIcon icon={faPlus} color={Colors.backgroundSurfaces} />
        </Pressable>
      </View>
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
  },
  newPostButton: {
    width: 40,
    height: 40,
    backgroundColor: Colors.azure,
    padding: 10,
    marginRight: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4
  },
  newPostButtonContainer: {
    position: 'absolute',
    top: 80,
    right: 0,
    elevation: 5,
    zIndex: 5,
    shadowColor: Colors.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4
  },
  filterButtonContainer: {
    paddingLeft: 16,
    elevation: 5,
    zIndex: 5,
    shadowColor: Colors.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4
  }
});

export default HomeScreen;
