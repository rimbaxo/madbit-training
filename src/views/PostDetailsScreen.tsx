import { faPaperPlane, faPenClip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '../components/Button';
import Comment from '../components/Comment';
import Post from '../components/Post';
import TextInputComponent from '../components/TextInputComponent';
import { ANNULLA, Colors, ENDPOINT_POST } from '../constants';
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
  const insets = useSafeAreaInsets();

  const authUser = useAppSelector(state => state.auth);
  const authUserId = useAppSelector(state => state.auth.id);

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
    if (commentData) {
      const comments: CommentInfo[] = commentData.map(item => ({
        text: item.text,
        updated_at: item.updated_at,
        username: item.user.full_name,
        user_picture: item.user.picture,
        userId: item.user.id,
        postId: id,
        id: item.id
      }));

      setComments(comments);
    }
  }, [commentData]);

  const backgroundStyle = {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    paddingLeft: insets.left,
    paddingRight: insets.right
  };

  // TODO: faccio la modifica dei commenti qui dentro così posso fare la fetch, con tutte le modali ecc

  // FETCH PER LA MODIFICA DI UN COMMENTO
  const [modalVisible, setModalVisible] = useState(false);
  const [editedText, setEditedText] = useState('');
  const [currentCommentId, setCurrentCommentId] = useState<number | null>(null);

  const handleOpenModal = (text: string, id: number | null) => {
    setEditedText(text);
    setCurrentCommentId(id);
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const body: CommentBody = {
    text: editedText
  };

  const fetchPostUpdate: FetchParams<CommentBody> = {
    endpoint: ENDPOINT_POST + '/' + id.toString() + '/comments/' + currentCommentId?.toString(),
    method: 'PUT',
    body
  };
  const {
    loading,
    error,
    data: modifiedCommentData,
    fetchData
  } = useFetch<CommentResponse, CommentBody>(fetchPostUpdate);

  const handleSave = async () => {
    await fetchData();
    setModalVisible(false);
  };

  const handleAddComment = () => {
    if (newComment.trim() && authUser) {
      console.log('NEWCOMMENT', newComment);
      fetchAddNewComment();
      setNewComment('');
      dispatch(updateCommentPostNumber(id));
    } else {
      Alert.alert('Comment cannot be empty');
    }
  };

  useEffect(() => {
    fetchCommentData();
  }, [fetchCommentData, dataComment, modifiedCommentData]);

  return (
    <View style={backgroundStyle}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Post item={item} />
        <Text style={styles.h1Text}>Comments</Text>
        <View style={styles.commentsContainer}>
          {comments?.map((comment, idx) => {
            return (
              <View style={styles.innerCommentsContainer}>
                <Comment key={idx} comment={comment} />
                {authUserId != undefined && comment.userId != undefined && authUserId === comment.userId ? (
                  <Pressable
                    style={styles.modifyCommentButton}
                    onPress={() => handleOpenModal(comment.text, comment.id)}
                  >
                    <FontAwesomeIcon icon={faPenClip} color={Colors.backgroundSurfaces} size={10} />
                  </Pressable>
                ) : null}
              </View>
            );
          })}
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <KeyboardAvoidingView style={styles.modalContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Edit Comment</Text>
              <TextInputComponent
                placeholder=""
                multiline
                style={{ height: 'auto' }}
                value={editedText}
                onChangeText={setEditedText}
                autoFocus
              />
              <View style={styles.buttonContainer}>
                <Button title="Save" onPress={handleSave} />
                <Button title="Cancel" onPress={handleCancel} variant={ANNULLA} />
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
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
  innerCommentsContainer: {
    padding: 5,
    display: 'flex',
    flexDirection: 'row'
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
  },
  modifyCommentButton: {
    width: 22,
    height: 22,
    backgroundColor: Colors.azure,
    right: 5,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  },
  modalView: {
    width: '80%',
    backgroundColor: Colors.backgroundSurfaces,
    borderRadius: 20,
    padding: 20,
    shadowColor: Colors.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.lilla,
    marginBottom: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
});

export default PostDetailsScreen;
