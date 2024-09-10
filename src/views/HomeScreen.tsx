import React, {useEffect} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import MyUserHeader from '../components/MyUserHeader';
import {Colors, ENDPOINT_GETME} from '../constants';
import {GetMeType} from '../types';
import useFetch from '../hooks/useFetch';
import {useDispatch, useSelector} from 'react-redux';
import {setUserInfo} from '../redux/authSlice';
import {AppDispatch, RootState} from '../redux/store';
import MyPostList from '../components/MyPostList';
import {useAppSelector} from '../hooks/useAppSelector';

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const fullName = useAppSelector(state => state.auth.fullName);
  const email = useSelector((state: RootState) => state.auth.email);
  const token = useSelector((state: RootState) => state.auth.accessToken);
  const id = useSelector((state: RootState) => state.auth.id);

  // TODO: fare la fetch in MyUserHeader
  // TODO: fare in modo che useFetch accetti un'oggetto di un tipo e poi in quell'oggetto passato ogni volta posso evitare di inserire il campo opzionale
  // così mi evito di scrivere undefined

  const {loading, error, data, fetchData} = useFetch<GetMeType>(
    ENDPOINT_GETME,
    'GET',
    undefined,
    token,
  );

  useEffect(() => {
    // TODO: se i dati sono già presenti non ha senso rifare la fetch di nuovo, fai un controllo magari
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

  // TODO: sarebbe bene usare degli skeleton, quando hai tempo vedi come implementare
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
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    paddingTop: 8,
  },
});

export default HomeScreen;
