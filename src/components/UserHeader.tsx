import {faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons'; // Importa l'icona specifica
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useEffect} from 'react';
import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {useDispatch} from 'react-redux';
import {Colors, ENDPOINT_GETME} from '../constants';
import {useAppSelector} from '../hooks/useAppSelector';
import useFetch from '../hooks/useFetch';
import {logout, setUserInfo} from '../redux/authSlice';
import {AppDispatch} from '../redux/store';
import {FetchParams, GetMeType} from '../types';

const UserHeader: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const fullName = useAppSelector(state => state.auth.fullName);
  const email = useAppSelector(state => state.auth.email);
  const token = useAppSelector(state => state.auth.accessToken);
  const id = useAppSelector(state => state.auth.id);

  const fetchObj: FetchParams = {
    endpoint: ENDPOINT_GETME,
    method: 'GET',
  };

  const {loading, error, data, fetchData} = useFetch<GetMeType>(fetchObj);

  // Il fetch avviene solo se manca uno dei dati sottostanti
  useEffect(() => {
    if (!fullName || !email || !token || !id) {
      fetchData();
    }
  }, [fetchData, id, email, fullName, token]);

  useEffect(() => {
    if (data?.full_name && data?.email && data?.id) {
      dispatch(
        setUserInfo({fullName: data.full_name, email: data.email, id: data.id}),
      );
    } else if (error) {
      Alert.alert('Errore di retrieve dati', error);
    }
  }, [data, error, fullName, email, id, loading, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.header}>
      <View style={styles.infoContainer}>
        {loading ? (
          <SkeletonPlaceholder>
            <>
              <SkeletonPlaceholder.Item
                width={180}
                height={20}
                borderRadius={4}
              />
              <SkeletonPlaceholder.Item
                marginTop={6}
                width={220}
                height={20}
                borderRadius={4}
              />
            </>
          </SkeletonPlaceholder>
        ) : (
          <>
            <Text style={styles.userName}>{fullName}</Text>
            <Text style={styles.userEmail}>{email}</Text>
          </>
        )}
      </View>
      <Pressable style={styles.iconContainer} onPress={handleLogout}>
        <FontAwesomeIcon
          icon={faArrowRightFromBracket}
          color={Colors.backgroundSurfaces}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContents: 'space-between',
    alignItems: 'flex-start',
    padding: 20,
    borderBottomWidth: 5,
    borderBottomColor: Colors.darkRose,
    borderLeftColor: Colors.darkRose,
    borderRightColor: Colors.darkRose,
    borderTopColor: Colors.darkRose,
  },
  infoContainer: {
    flex: 1,
  },
  iconContainer: {
    backgroundColor: Colors.azure,
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.lightRose,
  },
  userEmail: {
    fontSize: 16,
    color: Colors.light,
    marginBottom: 8,
    opacity: 0.7,
  },
});

export default UserHeader;
