import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '../components/Button';
import TextInputComponent from '../components/TextInputComponent';
import { ANNULLA, Colors, ENDPOINT_POST } from '../constants';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import useFetch from '../hooks/useFetch';
import { setPosts, updatePostContent } from '../redux/postSlice';
import { FetchParams, HomeNavigationProp, PostType, PostUpdateProps } from '../types';

export type updatePostInfoReducer = {
  newText: string;
  newTitle: string;
  newUpdatedAt: string;
  id: number;
};

const PostUpdateScreen: React.FC = () => {
  const route = useRoute();

  const { text, id, title, action } = (route.params as PostUpdateProps) || {};
  const { posts } = useAppSelector(state => state.posts);

  const [newTitle, setNewTitle] = useState<string>(title ?? '');
  const [newText, setNewText] = useState<string>(text ?? '');

  const insets = useSafeAreaInsets();
  const navigation = useNavigation<HomeNavigationProp>();

  const dispatch = useAppDispatch();

  const backgroundStyle = {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    paddingLeft: insets.left,
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingRight: insets.right
  };

  type PostInfo = {
    title: string;
    text: string;
  };

  const body: PostInfo = {
    title: newTitle,
    text: newText
  };

  const fetchPostUpdate: FetchParams<PostInfo> = {
    endpoint: action === 'PUT' ? ENDPOINT_POST + '/' + id?.toString() : ENDPOINT_POST,
    method: action,
    body
  };
  const { loading, error, data, fetchData } = useFetch<PostType, PostInfo>(fetchPostUpdate);

  const handleUpdatePost = async () => {
    await fetchData();
  };

  const handleCancel = () => {
    Alert.alert('Annullare la creazione di un nuovo post?', '', [
      {
        text: 'Si',
        onPress: () => navigation.goBack()
      },
      {
        text: 'No',
        onPress: () => {},
        style: 'cancel'
      }
    ]);
  };

  useEffect(() => {
    if (data && action === 'PUT') {
      const newPostInfo: updatePostInfoReducer = {
        newText: data.text,
        newTitle: data.title,
        newUpdatedAt: data.updated_at,
        id: data.id
      };
      dispatch(updatePostContent(newPostInfo));
      navigation.navigate('PostDetails', { item: data });
    } else if (data && action === 'POST') {
      dispatch(setPosts([...posts, data]));
      navigation.goBack();
    } else if (error) {
      Alert.alert('Errore di update', error);
    }
  }, [data, error, loading, dispatch]);

  return (
    <View style={[backgroundStyle, { display: 'flex', justifyContent: 'space-between' }]}>
      <View style={styles.mainContainer}>
        <Text style={styles.h1Text}>Post Title</Text>
        <TextInputComponent
          value={newTitle}
          placeholder="Title..."
          onChangeText={val => {
            setNewTitle(val);
          }}
        />
        <Text style={styles.h1Text}>Text</Text>
        <TextInputComponent
          value={newText}
          placeholder="Text..."
          multiline
          style={{ height: 'auto' }}
          onChangeText={val => {
            setNewText(val);
          }}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <Button title="Conferma" onPress={handleUpdatePost} />
        <Button title="Annulla" onPress={handleCancel} variant={ANNULLA} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 20,
    //backgroundColor: Colors.backgroundSurfaces,
    padding: 10
  },
  h1Text: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingLeft: 12,
    marginBottom: 5,
    color: Colors.lilla
  },
  buttonsContainer: {
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default PostUpdateScreen;
