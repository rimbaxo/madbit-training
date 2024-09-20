import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Colors, formatReadableDate } from '../constants';
import { CommentProps } from '../types';

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const { text, updated_at, username, user_picture, userId, id, postId } = comment || {};

  return (
    <View style={styles.commentContainer}>
      <View style={styles.commentHeader}>
        <View style={styles.postHeader}>
          <Image source={{ uri: user_picture }} style={styles.profilePicture} />
          <Text style={{ color: Colors.lightRose, fontWeight: 'bold' }}>{username}</Text>
        </View>
        <View style={styles.rightSection}>
          <Text style={styles.info}>{formatReadableDate(updated_at)}</Text>
        </View>
      </View>
      <Text style={styles.commentText}>{text}</Text>
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
