import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Colors, formatReadableDate } from '../constants';
import { CommentRendered } from '../types';

const Comment: React.FC<CommentRendered> = ({ ...props }) => {
  return (
    <View style={styles.commentContainer}>
      <View style={styles.commentHeader}>
        <View style={styles.postHeader}>
          <Image source={{ uri: props.user_picture }} style={styles.profilePicture} />
          <Text style={{ color: Colors.lightRose, fontWeight: 'bold' }}>{props.username}</Text>
        </View>
        <Text style={styles.info}>{formatReadableDate(props.created_at)}</Text>
      </View>
      <Text style={styles.commentText}>{props.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  postHeader: {
    flexDirection: 'row',
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
  }
});

export default Comment;
