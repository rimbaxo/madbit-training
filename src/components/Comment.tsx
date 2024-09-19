import { faPenClip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useEffect, useState } from 'react';
import { Image, KeyboardAvoidingView, Modal, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { ANNULLA, Colors, ENDPOINT_POST, formatReadableDate } from '../constants';
import { useAppSelector } from '../hooks/useAppSelector';
import useFetch from '../hooks/useFetch';
import { CommentProps, CommentResponse, FetchParams } from '../types';
import Button from './Button';
import TextInputComponent from './TextInputComponent';

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const { text, created_at, username, user_picture, userId, id, postId } = comment || {};
  const [modalVisible, setModalVisible] = useState(false);

  const [editedText, setEditedText] = useState(text);
  //const [commentText, setCommentText] = useState(text);

  console.log('TEXT- EDITEDTEXT', text, editedText);

  const authUserId = useAppSelector(state => state.auth.id);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setEditedText(text);
    setModalVisible(false);
  };

  type updateCommentInfo = {
    text: string;
  };

  const body: updateCommentInfo = {
    text: editedText
  };

  const fetchPostUpdate: FetchParams<updateCommentInfo> = {
    endpoint: ENDPOINT_POST + '/' + postId.toString() + '/comments/' + id?.toString(),
    method: 'PUT',
    body
  };
  const { loading, error, data, fetchData } = useFetch<CommentResponse, updateCommentInfo>(fetchPostUpdate);

  const handleSave = async () => {
    await fetchData();
    setModalVisible(false);
  };

  useEffect(() => {
    setEditedText(text);
  }, [text]);

  // useEffect(() => {
  //   if (data) {
  //     setCommentText(data.text);
  //   }
  // }, [data, error, loading]);

  return (
    <View style={styles.commentContainer}>
      <View style={styles.commentHeader}>
        <View style={styles.postHeader}>
          <Image source={{ uri: user_picture }} style={styles.profilePicture} />
          <Text style={{ color: Colors.lightRose, fontWeight: 'bold' }}>{username}</Text>
        </View>
        <View style={styles.rightSection}>
          {authUserId != undefined && userId != undefined && authUserId === userId && id != null ? (
            <Pressable style={styles.sendButton} onPress={handleOpenModal}>
              <FontAwesomeIcon icon={faPenClip} color={Colors.backgroundSurfaces} size={10} />
            </Pressable>
          ) : null}
          <Text style={styles.info}>{formatReadableDate(created_at)}</Text>
        </View>
      </View>
      <Text style={styles.commentText}>{text}</Text>
      <Text style={styles.commentText}>{text}</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  sendButton: {
    width: 22,
    height: 22,
    backgroundColor: Colors.azure,
    right: 5,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  commentContainer: {
    flex: 1,
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
  info: {
    fontSize: 12,
    color: Colors.lightRose,
    opacity: 0.7
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

export default Comment;
