import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors, ENDPOINT_POST, formatReadableDate, LIST } from '../constants';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import useFetch from '../hooks/useFetch';
import { deletePostReducer } from '../redux/postSlice';
import { FetchParams, HomeNavigationProp, PostProps } from '../types';

// Sarebbe bello implementare una funzione che fa allargare il post se si vuole vedere di più, mi serve tempo però non riesco immedita. Pensavo di si

const Post: React.FC<PostProps> = ({ item, variant }) => {
  const { id, user, created_at, title, text, comments_count } = item || {};
  const { picture, full_name, id: userId } = user || {};
  const navigation = useNavigation<HomeNavigationProp>();

  const authUserId = useAppSelector(state => state.auth.id);

  const dispatch = useAppDispatch();

  const fetchDeletePost: FetchParams = {
    endpoint: ENDPOINT_POST + '/' + id.toString(),
    method: 'DELETE'
  };

  const { loading, error, data, fetchData } = useFetch(fetchDeletePost);

  const deletePost = async () => {
    await fetchData();
  };

  const handleDeletePost = () => {
    Alert.alert('Sei sicuro di voler eliminare il questo post?', '', [
      {
        text: 'Si, voglio eliminare',
        onPress: () => deletePost()
      },
      {
        text: 'Indietro',
        onPress: () => {},
        style: 'cancel'
      }
    ]);
  };

  useEffect(() => {
    if (data) {
      dispatch(deletePostReducer(id));
      navigation.goBack();
    } else if (error) {
      Alert.alert('Errore eliminazione post', error);
    }
  }, [data, error, loading, dispatch]);

  return variant === LIST ? (
    <Pressable style={styles.post} onPress={() => navigation.navigate('PostDetails', { item, variant })}>
      <View style={styles.userPostTopInfo}>
        <View style={styles.postHeader}>
          <Image source={{ uri: picture }} style={styles.profilePicture} />
          <Text style={styles.userName}>{full_name ?? 'ISACCO'}</Text>
        </View>
        <Text style={styles.info}>{formatReadableDate(created_at)}</Text>
      </View>
      <View style={styles.postSeparatorLine} />
      <Text style={styles.postTitle}>{title}</Text>
      <Text style={styles.postContent}>{text}</Text>
      <Text style={styles.info}>Comments: {comments_count}</Text>
    </Pressable>
  ) : (
    <View style={styles.postInfoContainer}>
      <View style={styles.userPostTopInfo}>
        <View style={styles.postHeader}>
          <Image source={{ uri: picture }} style={styles.profilePicture} />
          <Text style={styles.userName}>{full_name || 'ISACCO'}</Text>
        </View>
        <Text style={styles.info}>{formatReadableDate(created_at)}</Text>
      </View>
      <View style={styles.postSeparatorLine} />
      <Text style={styles.postTitle}>{title}</Text>
      <Text style={styles.postContent}>{text}</Text>
      <View style={styles.actionButtonsContainer}>
        {authUserId != undefined && userId != undefined && authUserId === userId ? (
          <>
            <Pressable style={styles.sendButton} onPress={() => navigation.navigate('PostUpdate', { title, text, id })}>
              <FontAwesomeIcon icon={faPenToSquare} color={Colors.backgroundSurfaces} />
            </Pressable>
            <Pressable style={styles.sendButton} onPress={handleDeletePost}>
              <FontAwesomeIcon icon={faTrash} color={Colors.backgroundSurfaces} />
            </Pressable>
          </>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  post: {
    padding: 16,
    backgroundColor: Colors.backgroundSurfaces,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden'
  },
  postInfoContainer: {
    padding: 16,
    backgroundColor: Colors.backgroundSurfaces,
    marginTop: 0,
    marginBottom: 20
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: Colors.lilla
  },
  postContent: {
    fontSize: 16,
    color: Colors.light,
    marginBottom: 4
  },
  userName: {
    fontSize: 14,
    color: Colors.lightRose,
    fontWeight: 'bold'
  },
  info: {
    fontSize: 12,
    color: Colors.lightRose,
    opacity: 0.7
  },
  postSeparatorLine: {
    marginTop: 5,
    marginBottom: 5,
    width: '100%',
    height: 1,
    backgroundColor: Colors.lightRose,
    opacity: 0.3
  },
  userPostTopInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: Colors.darkRose
  },
  postHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },
  sendButton: {
    width: 40,
    height: 40,
    backgroundColor: Colors.azure,
    padding: 10,
    marginRight: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  actionButtonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    top: 5
  }
});

export default Post;
