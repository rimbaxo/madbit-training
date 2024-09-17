import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TextInputComponent from '../components/TextInputComponent';
import { Colors, DEFAULT_USERPIC_URI, ENDPOINT_POST, formatReadableDate } from '../constants';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import useFetch from '../hooks/useFetch';
import { updateCommentPostNumber } from '../redux/postSlice';
import { CommentBody, CommentRendered, CommentResponse, FetchParams, PostType } from '../types';

const PostDetailsScreen: React.FC = () => {
  const route = useRoute();

  // TODO: passare tutte le info del post dalla navigazione senza fare la fetch per le info del post. La fetch del post però può servire in caso di update del post
  //FATTO
  const { id, user, created_at, title, text } = route.params as PostType;

  const dispatch = useAppDispatch();

  const authUser = useAppSelector(state => state.auth);

  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<CommentRendered[]>([]);

  // TODO: ottimizza la lista creando un tipo di commento per lo stato con solo le info che ti servono per mostrare i commenti, non tutte. FATTO
  // TODO: fare una header. FATTO
  // TODO: sistemare tastiera iphone (KEYBOARDAVOIDINGNEW non va...)

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
      const comments: CommentRendered[] = commentData.map(item => ({
        text: item.text,
        created_at: item.created_at,
        username: item.user.full_name,
        user_picture: item.user.picture
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

  const handleAddComment = () => {
    if (newComment.trim() && authUser) {
      fetchAddNewComment();
      setComments([
        ...comments,
        {
          text: newComment,
          created_at: Date.now.toString(),
          username: authUser.full_name ?? '',
          user_picture: authUser.picture ?? DEFAULT_USERPIC_URI
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
        {user ? (
          <View style={styles.postInfoContainer}>
            <View style={styles.userPostTopInfo}>
              <View style={styles.postHeader}>
                <Image source={{ uri: user.picture }} style={styles.profilePicture} />
                <Text style={styles.userName}>{user.full_name}</Text>
              </View>
              <Text style={styles.info}>{formatReadableDate(created_at)}</Text>
            </View>
            <View style={styles.separator} />
            <Text style={styles.postTitle}>{title}</Text>
            <Text style={styles.postContent}>{text}</Text>
          </View>
        ) : null}

        <Text style={styles.h1Text}>Comments</Text>
        <View style={styles.commentsContainer}>
          <View style={styles.commentsContainer}>
            {comments?.map(comment => (
              //CHE METTO COME ID PER OGNI VIEW RENDERIZZATA?????
              <View style={styles.commentContainer}>
                <View style={styles.commentHeader}>
                  <View style={styles.postHeader}>
                    <Image source={{ uri: comment.user_picture }} style={styles.profilePicture} />
                    <Text style={{ color: Colors.lightRose, fontWeight: 'bold' }}>{comment.username}</Text>
                  </View>
                  <Text style={styles.info}>{formatReadableDate(comment.created_at)}</Text>
                </View>
                <Text style={styles.commentText}>{comment.text}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={styles.commentInputContainer}>
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  sendButton: {
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
  postInfoContainer: {
    padding: 16,
    backgroundColor: Colors.backgroundSurfaces,
    marginTop: 0,
    marginBottom: 20
  },
  postTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.lilla
  },
  postContent: {
    fontSize: 16,
    color: Colors.light
  },
  separator: {
    height: 1,
    marginTop: 5,
    marginBottom: 5,
    opacity: 0.5,
    backgroundColor: Colors.darkRose
  },
  addCommentComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  commentsContainer: {
    backgroundColor: Colors.backgroundSurfaces
  },
  commentInputContainer: {
    padding: 10,
    backgroundColor: Colors.backgroundSurfaces,
    borderTopWidth: 3,
    borderColor: Colors.darkRose
  },
  commentContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark,
    borderRadius: 15
  },
  commentText: {
    color: Colors.light,
    opacity: 0.75,
    fontSize: 14
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: Colors.darkRose
  },
  commentHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  userName: {
    fontSize: 14,
    color: Colors.lightRose,
    fontWeight: 'bold'
  },
  userPostTopInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  info: {
    fontSize: 12,
    color: Colors.lightRose,
    opacity: 0.7
  }
});

export default PostDetailsScreen;
