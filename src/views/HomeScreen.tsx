import React, {useEffect} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import MyUserHeader from '../components/MyUserHeader';
import {Colors, ENDPOINT_GETME} from '../constants';
import {GetMeType} from '../types';
import useFetch from '../hooks/useFetch';
import {useDispatch, useSelector} from 'react-redux';
import {setUserInfo} from '../redux/authSlice';
import {RootState} from '../redux/store';
import MyPostList from '../components/MyPostList';

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

  // Qui sarebbe bene usare degli skeleton, quando hai tempo vedi come implementare
  return (
    <View style={styles.container}>
      <MyUserHeader name={fullName || ''} email={email || ''} />
      <View style={styles.postsContainer}>
        <MyPostList />
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
