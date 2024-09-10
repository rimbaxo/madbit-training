import React, {useEffect} from 'react';
import {View, StyleSheet, FlatList, Alert} from 'react-native';
import MyPost from '../components/MyPost';
import MyUserHeader from '../components/MyUserHeader';
import {Colors, ENDPOINT_GETME} from '../constants';
import {GetMeType} from '../types';
import useFetch from '../hooks/useFetch';
import {useDispatch, useSelector} from 'react-redux';
import {setUserInfo} from '../redux/authSlice';
import {RootState} from '../redux/store';

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
  const dispatch = useDispatch();

  const fullName = useSelector((state: RootState) => state.auth.fullName);
  const email = useSelector((state: RootState) => state.auth.email);
  const token = useSelector((state: RootState) => state.auth.accessToken);
  const id = useSelector((state: RootState) => state.auth.id);

  const {loading, error, data, fetchData} = useFetch<GetMeType>(
    ENDPOINT_GETME,
    'GET',
    undefined,
    token,
  );

  // Per eliminare l'errore "Missing dependencies" ed includere fetchData fra le dipendenze dello useEffect ho racchiuso fetchData in una useCallback
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (data?.full_name && data?.email && data?.id) {
      dispatch(
        setUserInfo({fullName: data.full_name, email: data.email, id: data.id}),
      );
    } else if (error) {
      Alert.alert('Errore di retrieve dati', error);
    }
  }, [data, error, fullName, email, id, loading, dispatch]);

  const renderPost = ({item}: {item: {title: string; content: string}}) => (
    <MyPost title={item.title} content={item.content} />
  );

  // Qui sarebbe bene usare degli skeleton, quando hai tempo vedi come implementare
  return (
    <View style={styles.container}>
      <MyUserHeader name={fullName || ''} email={email || ''} />
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
