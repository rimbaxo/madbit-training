import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Comment from '../components/Comment';
import Post from '../components/Post';
import TextInputComponent from '../components/TextInputComponent';
import { Colors, DEFAULT_USERPIC_URI, ENDPOINT_POST } from '../constants';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import useFetch from '../hooks/useFetch';
import { updateCommentPostNumber } from '../redux/postSlice';
import { CommentBody, CommentInfo, CommentResponse, FetchParams, PostProps } from '../types';

const PostDetailsScreen: React.FC = () => {
  const route = useRoute();

  const { item } = (route.params as PostProps) || {};
  const { id } = item || {};

  const dispatch = useAppDispatch();

  const authUser = useAppSelector(state => state.auth);

  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<CommentInfo[]>([]);

  // FETCH PER L'AGGIUNTA DI UN COMMENTO NUOVO
  const fetchPostNewComment: FetchParams<CommentBody> = {
    endpoint: ENDPOINT_POST + '/' + id.toString() + '/comments',
    method: 'POST',
    body: { text: newComment }
  };

  const {
    loading: loadingComment,
    error: errorComment,
    data: dataComment,
    fetchData: fetchAddNewComment
  } = useFetch<CommentResponse, CommentBody>(fetchPostNewComment);

  useEffect(() => {
    if (errorComment) {
      fetchCommentData();
    }
  }, [errorComment]);

  // TODO: usa componente https://kirillzyusko.github.io/react-native-keyboard-controller/docs/api/components/keyboard-aware-scroll-view

  // FETCH PER I COMMENTI ASSOCIATI A QUEL POST
  const fetchPostComments: FetchParams = {
    endpoint: ENDPOINT_POST + '/' + id.toString() + '/comments',
    method: 'GET'
  };
  const {
    loading: commentLoading,
    error: commentError,
    data: commentData,
    fetchData: fetchCommentData
  } = useFetch<CommentResponse[]>(fetchPostComments);

  useEffect(() => {
    fetchCommentData();
  }, [fetchCommentData, dataComment]);

  useEffect(() => {
    if (commentData) {
      const comments: CommentInfo[] = commentData.map(item => ({
        text: item.text,
        created_at: item.created_at,
        username: item.user.full_name,
        user_picture: item.user.picture,
        userId: item.user.id,
        postId: id,
        id: item.id
      }));

      setComments(comments);
    }
  }, [commentData]);

  const insets = useSafeAreaInsets();

  const backgroundStyle = {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    paddingLeft: insets.left,
    paddingRight: insets.right
  };

  // TODO: faccio la modifica dei commenti qui dentro così posso fare la fetch, con tutte le modali ecc

  const handleAddComment = () => {
    if (newComment.trim() && authUser) {
      console.log('NEWCOMMENT', newComment);
      fetchAddNewComment(); // Continue in the UseEffect, line 64
      setComments([
        ...comments,
        {
          text: newComment,
          created_at: Date.now.toString(),
          username: authUser.full_name ?? '',
          user_picture: authUser.picture ?? DEFAULT_USERPIC_URI,
          userId: authUser.id ?? -1,
          postId: id,
          id: null
        }
      ]);
      setNewComment('');
      dispatch(updateCommentPostNumber(id));
    } else {
      Alert.alert('Comment cannot be empty');
    }
  };

  return (
    <View style={backgroundStyle}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Post item={item} />
        <Text style={styles.h1Text}>Comments</Text>
        <View style={styles.commentsContainer}>
          {comments?.map((comment, idx) => (
            <Comment key={idx} comment={comment} />
          ))}
        </View>
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.select({ ios: 100, android: 500 })}
      >
        <View style={styles.addCommentComponent}>
          <TextInputComponent
            style={{ flex: 1 }}
            value={newComment}
            placeholder="Add a comment..."
            onChangeText={setNewComment}
          />

          <Pressable style={styles.sendButton} onPress={handleAddComment}>
            <FontAwesomeIcon icon={faPaperPlane} color={Colors.backgroundSurfaces} />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  sendButton: {
    width: 40,
    height: 40,
    backgroundColor: Colors.azure,
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  h1Text: {
    color: Colors.light,
    fontSize: 24,
    fontWeight: 'bold',
    paddingLeft: 12,
    marginBottom: 5
  },
  commentsContainer: {
    flex: 1,
    marginBottom: 100, // MESSO TENENDO CONTO DELL'ALTEZZA DELLA TASTIERA. NON MI PIACE TANTO
    backgroundColor: Colors.backgroundSurfaces
  },
  addCommentComponent: {
    borderTopWidth: 3,
    height: 100,
    borderColor: Colors.darkRose,
    backgroundColor: Colors.backgroundSurfaces,
    padding: 10,
    marginTop: -100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
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
  }
});

export default PostDetailsScreen;
