import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, formatReadableDate} from '../constants';
import {PostProps} from '../types';

// Sarebbe bello implementare una funzione che fa allargare il post se si vuole vedere di più, mi serve tempo però non riesco immedita. Pensavo di si

const MyPost: React.FC<PostProps> = ({
  title,
  text,
  created_at,
  comments_count,
  fullName,
}) => {
  return (
    <View style={styles.post}>
      <View style={styles.userPostTopInfo}>
        <Text style={styles.userName}>{fullName}</Text>
        <Text style={styles.info}>{formatReadableDate(created_at)}</Text>
      </View>
      <View style={styles.postSeparatorLine} />
      <Text style={styles.postTitle}>{title}</Text>
      <Text style={styles.postContent}>{text}</Text>
      <Text style={styles.info}>Comments: {comments_count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  post: {
    padding: 16,
    backgroundColor: Colors.backgroundSurfaces,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
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
  userName: {
    fontSize: 14,
    color: Colors.lightRose,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 12,
    color: Colors.lightRose,
    marginTop: 4,
    opacity: 0.7,
  },
  postSeparatorLine: {
    marginTop: 5,
    marginBottom: 5,
    width: '100%',
    height: 1,
    backgroundColor: Colors.lightRose,
    opacity: 0.3,
  },
  userPostTopInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default MyPost;
