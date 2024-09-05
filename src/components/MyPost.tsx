import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors} from '../constants';

interface PostProps {
  title: string;
  content: string;
}

const MyPost: React.FC<PostProps> = ({title, content}) => {
  return (
    <View style={styles.post}>
      <Text style={styles.postTitle}>{title}</Text>
      <Text style={styles.postContent}>{content}</Text>
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
});

export default MyPost;
