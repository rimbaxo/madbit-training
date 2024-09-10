import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors} from '../constants';

type PostProps = {
  title: string;
  text: string;
  created_at: string;
  comments_count: number;
  fullName: string;
};

const MyPost: React.FC<PostProps> = ({
  title,
  text,
  created_at,
  comments_count,
  fullName,
}) => {
  console.log('Rendering post:', {
    title,
    text,
    created_at,
    comments_count,
    fullName,
  });

  return (
    <View style={styles.post}>
      <Text style={styles.postTitle}>{title}</Text>
      <Text style={styles.postContent}>{text}</Text>
      <Text style={styles.info}>Created at: {created_at}</Text>
      <Text style={styles.info}>Comments count: {comments_count}</Text>
      <Text style={styles.info}>User: {fullName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  post: {
    padding: 16,
    backgroundColor: Colors.backgroundSurfaces,
    marginBottom: 16,
    borderRadius: 16,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: Colors.lilla,
  },
  postContent: {
    fontSize: 16,
    color: Colors.light,
  },
  info: {
    fontSize: 12,
    color: '#555',
    marginTop: 4,
  },
});

export default MyPost;
